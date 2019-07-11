from decouple import config
from .base import *

DEBUG = config('DEBUG',cast=bool)

file_directory = os.path.dirname(BASE_DIR)

MEDIA_ROOT = os.path.join(file_directory , 'tmp')

SECRET_KEY = config('SECRET_KEY')

ALLOWED_HOSTS = config('ALLOWED_HOSTS', cast=lambda v: [s for s in v.split(',')])

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {process:d} {thread:d} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'console': {
            'level': 'INFO',
            'class': 'logging.StreamHandler',
            'formatter': 'verbose'
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
        },
    },
}

#Celery Settings
CELERY_RESULT_BACKEND = os.environ['REDIS_URL']

CELERY_BROKER_URL = os.environ['REDIS_URL']