from __future__ import absolute_import,unicode_literals
from celery import shared_task
from django.conf import settings
from subprocess import PIPE,Popen
import os

@shared_task
def convert(file_path):
    print(2222222233,os.listdir(settings.MEDIA_ROOT))
    print('hope',file_path)
UNO_PATH=/opt/libreoffice4.4
    process = Popen(["UNO_PATH=~/.apt/usr/lib/libreoffice","unoconv","-f","pdf",file_path],stdout=PIPE)
    #process = Popen(["abiword","--to=pdf",file_path],stdout=PIPE)
    process.communicate()
    print(2222222233,os.listdir(settings.MEDIA_ROOT))

    return 
