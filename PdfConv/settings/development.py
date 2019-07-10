from .base import *

DEBUG = True

ALLOWED_HOSTS = ['127.0.0.1']

SECRET_KEY = 'nbzp!-wcf#4z)%v6snm8i)*ya4cdayb2@*0ma)pjh&=0jtq&v*'

#Celery Settings
CELERY_RESULT_BACKEND = 'redis://localhost'

CELERY_BROKER_URL = 'redis://localhost'