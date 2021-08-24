from flask import Flask
from flask_restx import Api
from public.views import public_api
from task.views import task_api
from flask_cors import CORS
from werkzeug.exceptions import HTTPException
import logging

# pylint: disable=C0103
app = Flask(__name__)
# TODO: Change this to valid origins
cors = CORS(app, resources=r"/public/*", origins=['http://localhost:3000'])

api = Api(app)

api.add_namespace(public_api)
api.add_namespace(task_api)


@app.errorhandler(Exception)
def handle_aborts(e):
    # pass through HTTP errors
    if isinstance(e, HTTPException):
        return e
    logging.error(e)
    return 'Internal Server Error', 500
