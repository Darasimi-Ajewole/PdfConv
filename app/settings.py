import os
DEV = bool(os.environ.get('FLASK_ENV', None))
UPLOAD_BUCKET_NAME = 'pdf-conv'

DEV_CLOUD_TASKS_HOST = os.environ.get('TASK_EMULATOR_HOST')
DEV_FIRESTORE_HOST = os.environ.get('FIRESTORE_EMULATOR_HOST')
DEV_WEB_HOST = os.environ.get('WEB_HOST')

SERVICE_ACCOUNT_EMAIL = 'open-source-320820@appspot.gserviceaccount.com'
MAX_FILE_SIZE = 100 * 1024 * 1024  # 100 MB
