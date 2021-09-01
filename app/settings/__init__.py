import os
DEV = bool(os.environ.get('FLASK_ENV', None))

if DEV:
    from .dev_settings import *  # noqa: F401, F403
else:
    from .prod_settings import *  # noqa: F401, F403

UPLOAD_BUCKET_NAME = 'pdf-conv'
MAX_FILE_SIZE = 100 * 1024 * 1024  # 100 MB
MAX_RETRY_COUNT = 5
