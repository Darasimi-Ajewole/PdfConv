from functools import wraps
from flask_restx import abort
from flask import request
from settings import MAX_RETRY_COUNT
import logging


def task_request():
    def decorator(func):
        @wraps(func)
        def middleware(*args, **kwargs):
            task_name = request.headers.get("X-Cloudtasks-Taskname")
            # TODO: Find other ways to authenticate genuine task request
            if not task_name:
                abort(403, message='Access denied')

            task_execution_count = int(request.headers.get(
                "X-CloudTasks-TaskExecutionCount"))

            if task_execution_count > MAX_RETRY_COUNT:
                logging.error(f'Task getting suspended {task_name}')
                return 'done'

            return func(*args, **kwargs)
        return middleware
    return decorator
