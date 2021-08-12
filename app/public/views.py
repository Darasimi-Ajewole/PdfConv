import logging

from . import public_api
from .schema import (GenerateUploadSessionModel,
                     GenerateUploadSessionResponse)
from flask_restx import Resource, abort
from utils import generate_upload_url, check_upload


@public_api.route('/hello')
class HelloWorld(Resource):
    def get(self):
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


@public_api.route('/validate-upload/<path:blob_name>')
class ValidateUpload(Resource):
    def get(self, blob_name):
        valid_upload = check_upload(blob_name)
        if not valid_upload:
            return abort(404, 'Upload was not completed')
        return '', 200


class ConvertDocument(Resource):
    def post(self):
        pass
