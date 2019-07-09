from __future__ import absolute_import,unicode_literals
import os
from celery import Celery

from django.conf import settings
from decouple import config

DEBUG = config('DEBUG',default=True,cast=bool)
if DEBUG:
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'PdfConv.settings.development')
else:
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'PdfConv.settings.production')


app = Celery('PdfConv')

app.config_from_object('django.conf:settings',namespace='CELERY')

app.autodiscover_tasks()