release: python manage.py migrate
web: gunicorn PdfConv.production-wsgi --log-file -
worker: python manage.py celery worker --loglevel=info
