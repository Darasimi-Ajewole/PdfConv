import datetime
import uuid

from google.cloud import storage
from settings import UPLOAD_BUCKET_NAME
from requests import put


import grpc
from google.cloud.tasks_v2 import CloudTasksClient
from google.cloud.tasks_v2.services.cloud_tasks.transports \
    import CloudTasksGrpcTransport

channel = grpc.insecure_channel('gcloud-tasks-emulator:8123')

# TODO: Make sure the queue is updated to match the one in staging
transport = CloudTasksGrpcTransport(channel=channel)
client = CloudTasksClient(transport=transport)

parent = 'projects/dev/locations/here'
queue_name = parent + '/queues/anotherq'


def generate_upload_url(mimetype: str) -> tuple:
    fileuuid = uuid.uuid4().hex
    current_date = datetime.datetime.now().strftime("%d-%m-%y")
    blob_name = '{}/{}'.format(current_date, fileuuid)

    storage_client = storage.Client()
    bucket = storage_client.bucket(UPLOAD_BUCKET_NAME)
    blob = bucket.blob(blob_name)

    url = blob.generate_signed_url(
        version="v4",
        expiration=datetime.timedelta(minutes=15),
        method="PUT",
        content_type=mimetype,
    )

    return url, blob_name


def check_upload(blob_name: str) -> bool:
    storage_client = storage.Client()
    bucket = storage_client.bucket(UPLOAD_BUCKET_NAME)
    blob = bucket.blob(blob_name)
    return blob.exists()


def cors_configuration(bucket_name):
    """Set a bucket's CORS policies configuration."""
    # bucket_name = "your-bucket-name"
    storage_client = storage.Client()
    bucket = storage_client.get_bucket(bucket_name)
    bucket.cors = [
        {
            "origin": ["*"],
            "responseHeader": ["*"],
            "method": ["*"],
            "maxAgeSeconds": 10
        }
    ]
    bucket.patch()
    print("Set CORS policies for bucket {} is {}"
          .format(bucket.name, bucket.cors))
    return bucket


def upload_test_file(upload_url):
    MIMETYPE = 'application/' \
               'vnd.openxmlformats-officedocument.wordprocessingml.document'
    files = open('requirements.txt', 'rb')
    headers = {'Content-Type': MIMETYPE}
    r = put(upload_url, files, headers=headers)
    return r


def create_dummy_task():
    task = {'http_request': {'http_method': 'GET', 'url': 'https://www.google.com'}}
    client.create_task(task=task, parent=queue_name) # 200
