import grpc
import datetime
from google.cloud.tasks_v2 import CloudTasksClient
from google.cloud.tasks_v2.services.cloud_tasks.transports \
    import CloudTasksGrpcTransport
from google.cloud.tasks_v2.types import task as gct_task
from google.cloud import tasks_v2
from settings import DEV_CLOUD_TASKS_HOST, DEV
from google.protobuf import timestamp_pb2

DEV_LOCATION = 'projects/dev/locations/here'
DEV_QUEUE = DEV_LOCATION + '/queues/anotherq'


def dev_client():
    channel = grpc.insecure_channel(DEV_CLOUD_TASKS_HOST)
    transport = CloudTasksGrpcTransport(channel=channel)
    client = CloudTasksClient(transport=transport)

    return client


def prod_client():
    return CloudTasksClient()


TASK_CLIENT = dev_client() if DEV else prod_client()


def add(url, method='POST', payload={}, countdown=None) -> gct_task.Task:
    task = {
        'http_request': {
            'http_method': getattr(tasks_v2.HttpMethod),
            'url': url
        }
    }
    if countdown is not None:
        d = datetime.datetime.utcnow() + datetime.timedelta(seconds=countdown)
        timestamp = timestamp_pb2.Timestamp()
        # pylint: disable=no-member
        timestamp.FromDatetime(d)
        task['schedule_time'] = timestamp
    task = TASK_CLIENT.create_task(task=task, parent=DEV_QUEUE)
    return task


def create_dummy_task():
    url = 'https://www.google.com'
    return add(url, method='GET')
