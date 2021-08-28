import datetime
import uuid

from google.cloud import storage
from settings import UPLOAD_BUCKET_NAME
from requests import put


storage_client = storage.Client()
bucket = storage_client.bucket(UPLOAD_BUCKET_NAME)


def generate_upload_url(mimetype: str) -> tuple:
    fileuuid = uuid.uuid4().hex
    current_date = datetime.datetime.now().strftime("%d-%m-%y")
    blob_name = '{}/{}/source'.format(current_date, fileuuid)

    blob: storage.Blob = bucket.blob(blob_name)

    url = blob.generate_signed_url(
        version="v4",
        expiration=datetime.timedelta(minutes=15),
        method="PUT",
        content_type=mimetype,
    )

    return url, blob_name


def check_upload(blob_name: str) -> bool:
    bucket = storage_client.bucket(UPLOAD_BUCKET_NAME)
    blob = bucket.blob(blob_name)
    return blob.exists()


def cors_configuration(bucket_name):
    """Set a bucket's CORS policies configuration."""
    # bucket_name = "your-bucket-name"
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


def get_blob(blob_name):
    blob = bucket.blob(blob_name)
    # TODO: check if blob exists
    return blob


def upload_file(file, target_blob_name):
    pdf_blob = bucket.blob(target_blob_name)
    pdf_blob.upload_from_filename(filename=file)

    return pdf_blob


def generate_download_signed_url_v4(blob: storage.Blob, download_name: str):
    """Generates a v4 signed URL for downloading a blob.

    Note that this method requires a service account key file. You can not use
    this if you are using Application Default Credentials from Google Compute
    Engine or from the Google Cloud SDK.
    """
    disposition = 'response-content-disposition'
    url = blob.generate_signed_url(
        version="v4",
        expiration=datetime.timedelta(minutes=60),
        method="GET",
        query_parameters={
            disposition: f'attachment;filename={download_name}'}
    )

    return url
