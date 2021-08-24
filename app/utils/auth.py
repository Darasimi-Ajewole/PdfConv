from functools import wraps
from flask_restx import abort
from flask import request


def task_auth_required():
    def decorator(func):
        @wraps(func)
        def middleware(*args, **kwargs):
            task_name = request.headers.get("X-Cloudtasks-Taskname")
            # TODO: Find other ways to authenticate genuine task request
            if not task_name:
                abort(403, message='Access denied')
            return func(*args, **kwargs)
        return middleware
    return decorator
