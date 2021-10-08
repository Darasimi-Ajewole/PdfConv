import os

VALID_ORIGINS = [
    '*',
]

WEB_HOST = os.environ.get('WEB_HOST')
CLOUD_TASKS_HOST = os.environ.get('TASK_EMULATOR_HOST')

FIREBASE_OPTIONS = None
FIREBASE_SERVICE_ACCOUNT = None
