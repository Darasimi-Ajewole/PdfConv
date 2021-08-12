import os
from flask import Flask
from flask_restx import Api
from public.views import public_api
from flask_cors import CORS


# pylint: disable=C0103
app = Flask(__name__)
# TODO: Change this to valid origins
cors = CORS(app, resources=r"/public/*", origins=['http://localhost:3000'])

api = Api(app)

api.add_namespace(public_api)

if __name__ == '__main__':
    server_port = os.environ.get('PORT', '8080')
    app.run(debug=True, port=server_port, host='0.0.0.0')
