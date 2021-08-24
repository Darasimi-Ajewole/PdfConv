import logging
import os
from . import taskqueue
from settings import DEV_WEB_HOST
from models import ConversionTaskStatus, RUNNING, SUCCESS, FAILED
from .cloudstorage import get_blob, upload_file
import subprocess


def start_session(blob_name):
    task_status = ConversionTaskStatus(
        blob_name=blob_name,
        task_id=blob_name.replace('/', '--')
    )
    task_status.save()
    logging.info(f'Starting conversion session for {blob_name}')
    task = taskqueue.add(
        url=f'{DEV_WEB_HOST}/task/convert',
        payload={
            'task_status_key': task_status.key
        },
        countdown=5,
        method='POST'
    )
    task_status.cloud_task_name = task.name
    return task_status.task_id


def convert_doc_to_pdf(blob_name):
    doc_blob = get_blob(blob_name)
    folder_name = blob_name.strip('/source').replace('/', '').replace('-', '')
    os.mkdir(folder_name)
    # TODO: Make source docx be real file name
    doc_file = f'{folder_name}/source.docx'
    doc_blob.download_to_filename(doc_file)

    subprocess.check_output(
        f'./scripts/convert.sh {folder_name}',
        stderr=subprocess.STDOUT,
        shell=True,
        universal_newlines=True)

    pdf_file = f'{folder_name}/source.pdf'
    pdf_blob_name = blob_name.replace('source', 'destination')
    upload_file(pdf_file, pdf_blob_name)

    subprocess.check_output(
        f'./scripts/clean.sh {folder_name}',
        stderr=subprocess.STDOUT,
        shell=True,
        universal_newlines=True)

    return 'done'


def run_conv_task(key):
    task = ConversionTaskStatus.collection.get(key)
    task.update_status(RUNNING)

    try:
        completed = convert_doc_to_pdf(task.blob_name)
    except Exception as e:
        logging.error(e)
        completed = False
    if not completed:
        task.update_status(FAILED)
        return 'Something went wrong'

    task.update_status(SUCCESS)
    return 'Done'
