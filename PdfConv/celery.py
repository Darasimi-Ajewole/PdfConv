from __future__ import absolute_import,unicode_literals
import os
from celery import Celery

from django.conf import settings

if settings.DEBUG:
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'PdfConv.settings.production')
else:
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'PdfConv.settings.development')

app = Celery('PdfConv')

app.config_from_object('django.conf:settings',namespace='CELERY')

app.autodiscover_tasks()