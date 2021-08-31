import logging

from . import public_api
from .schema import (GenerateUploadSessionModel,
                     GenerateUploadSessionResponse,
                     ConvertDocumentParser)
from flask_restx import Resource, abort
from utils.cloudstorage import generate_upload_url, check_upload, validate_file
from utils.converter import start_session
from utils import taskqueue
from models import ConversionTaskStatus
from settings import DEV


@public_api.route('/hello')
class HelloWorld(Resource):
    def get(self):
        return {'Hello': 'World'}


@public_api.route('/test/crud')
class CRUDTest(Resource):
    def post(self):
        if not DEV:
            return {'CRUD': 'Golden'}

        taskqueue.create_dummy_task()
        dummy_status = ConversionTaskStatus(
            blob_name='dummy233', task_id='ohHappyDay')
        dummy_status.save()

        return {'hello': dummy_status.key}

    def put(self):
        if not DEV:
            return {'CRUD': 'Golden'}
        key = 'conversion_task_status/ohHappyDay'
        task = ConversionTaskStatus.collection.get(key)
        task.status = 'running'
        task.save()
        return {'hello': task.key}


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
    @public_api.doc('Starts conversion session')
    def post(self, blob_name):
        successful_upload = check_upload(blob_name)
        if not successful_upload:
            return abort(404, 'Upload was not completed')

        valid_upload, err_msg = validate_file(blob_name)
        if not valid_upload:
            return abort(400, err_msg)

        args = ConvertDocumentParser.parse_args()
        task_status_id = start_session(blob_name, args['pdf-name'])

        logging.info(
            f'Conversion Task: {task_status_id}, Enqueued Successfully')
        return task_status_id
