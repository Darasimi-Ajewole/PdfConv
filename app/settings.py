import os
DEV = bool(os.environ.get('FLASK_ENV', None))
UPLOAD_BUCKET_NAME = 'pdf-conv'

DEV_CLOUD_TASKS_HOST = os.environ.get('TASK_EMULATOR_HOST')
DEV_FIRESTORE_HOST = os.environ.get('FIRESTORE_EMULATOR_HOST')
DEV_WEB_HOST = os.environ.get('WEB_HOST')
