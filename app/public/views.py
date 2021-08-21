import logging

from . import public_api
from .schema import (GenerateUploadSessionModel,
                     GenerateUploadSessionResponse)
from flask_restx import Resource, abort
from utils.cloudstorage import generate_upload_url, check_upload
from utils.converter import start_session
from utils import taskqueue


@public_api.route('/hello')
class HelloWorld(Resource):
    def get(self):
        taskqueue.create_dummy_task()
        return {'hello': 'world'}


@public_api.route('/start-upload')
class GenerateUploadSession(Resource):
    @public_api.doc('Create upload session')
    @public_api.expect(GenerateUploadSessionModel, validate=True)
    @public_api.marshal_with(GenerateUploadSessionResponse)
    def post(self):
        payload = self.api.payload
        mimetype = payload.get('mimetype')
        upload_url, blob_name = generate_upload_url(mimetype)
        logging.info("Generated URL: %s" % upload_url)
        return {'upload_url': upload_url, 'blob_name': blob_name}


@public_api.route('/convert-document/<path:blob_name>')
class ConvertDocument(Resource):
    def post(self, blob_name):
        valid_upload = check_upload(blob_name)
        if not valid_upload:
            return abort(404, 'Upload was not completed')
        task = start_session(blob_name)
        return f'Conversion Task -{task.name}, Enqueued Successfully', 200
