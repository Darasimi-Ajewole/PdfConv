from flask_restx.fields import String
from . import task_api

ConvertDocsModel = task_api.model('ConvertDocsModel', {
    'task_status_key': String(
        description='ConversionTaskStatus key for the new doc to be converted',
    )
})
