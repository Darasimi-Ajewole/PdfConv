from django.shortcuts import render,get_object_or_404
from django.http import HttpResponse,JsonResponse,FileResponse,Http404
from .models import Task
from .forms import TaskForm
from django.views.decorators.csrf import csrf_protect
from PdfConv.celery import app
from time import sleep

@csrf_protect
def index(request):
    #setting up more than one task is not allowed, checking taskID in session ensures that
    if request.method == 'POST' and "taskID" not in request.session: 
        form = TaskForm(request.POST,request.FILES)
        if form.is_valid():
            new_task = form.save()
            prepTask(new_task,request)
            response = {'message':'upload_successful'}
        else:
            response = {'message':form.errors}
        return JsonResponse(response)

    if request.method == 'GET':
        state = request.session.get('state')
        return render(request,"main/index.html", {'state': state })

def converting(request):
    """
        TO-DO: Move logic to models.py
    """

    #calls delay on celery task
    #returns link to download file
    #and task_id
    task_id = request.session.get("task_id",None)

    all_tasks = Task.objects.all()
    task_check = all_tasks.filter(name=task_id)
    completed = False
    if task_check.exists():
        task_rec = task_check[0]
        completed = task_rec.completed

    #checking if task does not  exists or its completed
    if not task_check or completed:
        response = {'status':'reset'}
        return JsonResponse(response)
    
    #task not yet completed
    """
    TO-DO: fix condition that an error occured in conversion 
    in order to avoid an infinite while loop
    """
    task = app.AsyncResult(task_id)
    while  not task.ready():
        sleep(3)
    task.get()
    task_rec.completed = True
    task_rec.save()

    response = {'status':'download'}
    return JsonResponse(response)

def download(request):
    #download
    task_id = request.session.get("task_id",None)
    task_rec = get_object_or_404(Task,name=task_id)
    file_path = task_rec.doc.path.replace("docx","pdf")
    del request.session['state']

    try:
        print(file_path)
        _file = open(file_path,"rb").read()
        return HttpResponse(_file,content_type="application/pdf")
    except FileNotFoundError:
        raise Http404("File deleted from server")

def prepTask(new_task,request):
    task_id = new_task.setup()
    request.session['task_id'] = task_id
    request.session['state'] = 'task_existing'