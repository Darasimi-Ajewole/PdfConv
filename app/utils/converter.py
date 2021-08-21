from . import taskqueue
from settings import DEV_WEB_HOST
from models import ConversionTaskStatus


def start_session(blob_name):
    task = taskqueue.add(
        url=f'{DEV_WEB_HOST}/task/convert',
        payload={
            'task_status_id': blob_name
        },
        countdown=5,
        method='POST'
    )
    task_status = ConversionTaskStatus(
        blob_name=blob_name,
        task_id=task.name
    )
    task_status.save()

    return task
