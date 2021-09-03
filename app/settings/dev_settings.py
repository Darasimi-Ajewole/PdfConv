import os

VALID_ORIGINS = [
    'http://localhost:3000',
]

WEB_HOST = os.environ.get('WEB_HOST')
CLOUD_TASKS_HOST = os.environ.get('TASK_EMULATOR_HOST')

firebase_options = None
firebase_service_account = None
