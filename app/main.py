from flask import Flask
from flask_restx import Api
from public.views import public_api
from task.views import task_api
from flask_cors import CORS
from werkzeug.exceptions import HTTPException
import logging
from settings import VALID_ORIGINS, DEV

app = Flask(__name__)

cors = CORS(app, resources=r"/public/*", origins=VALID_ORIGINS)

api = Api(app, doc=(DEV and '/'))

api.add_namespace(public_api)
api.add_namespace(task_api)


@app.errorhandler(Exception)
def handle_aborts(e):
    # pass through HTTP errors
    if isinstance(e, HTTPException):
        return e
    logging.error(e)
    return 'Internal Server Error', 500
