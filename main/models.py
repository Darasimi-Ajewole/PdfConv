from django.db import models
from .validators import validate_size,validate_content
from main.tasks import convert

# Create your models here.

class Task(models.Model):
    name = models.CharField(max_length=70,verbose_name='Task Name',blank=True,null=True)
    doc = models.FileField(upload_to='',validators=[validate_size,validate_content])
    completed = models.BooleanField(default=False)

    def _str_(self):
        return self.name
    
    def setup(self):
        task = convert.delay(self.doc.path)
        task_id = task.task_id
        self.name = task_id
        self.save()
        return task_id