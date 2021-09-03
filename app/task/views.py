from . import task_api
from flask_restx import Resource
from utils.request import task_request
from utils.converter import run_conv_task
from .schema import ConvertDocsModel


class TaskResource(Resource):
    method_decorators = [task_request()]


@task_api.route('/hello')
class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}


@task_api.route('/convert')
class ConvertDocs(TaskResource):
    @task_api.doc('Converts docx file to pdf')
    @task_api.expect(ConvertDocsModel, validate=True)
    def post(self):
        payload = self.api.payload
        key = payload.get('task_status_key')
        response = run_conv_task(key)
        return response
