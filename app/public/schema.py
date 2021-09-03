from flask_restx.fields import String
from . import public_api

GenerateUploadSessionModel = public_api.model('UploadSessionModel', {
    'mimetype': String(
        description='Mimetype of file whose session upload is about to begin')
})

GenerateUploadSessionResponse = public_api.model('SessionResponse', {
    'upload_url': String(description='Upload Session url'),
    'blob_name': String(description='Storage Object name')
})


ConvertDocumentParser = public_api.parser()
ConvertDocumentParser.add_argument(
    'pdf-name', default='Converted.pdf', help="PDF download name")
