from flask_restx import Namespace

task_api = Namespace(
    'task',
    description='Internal APIs for background task processing')
