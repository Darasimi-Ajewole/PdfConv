from __future__ import absolute_import,unicode_literals
from celery import shared_task
from subprocess import PIPE,Popen

@shared_task
def convert(file_path):
    process = Popen(["abiword","--to=pdf",file_path],stdout=PIPE)
    process.communicate()
    return 