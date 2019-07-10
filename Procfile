release: python manage.py migrate
web: gunicorn PdfConv.production-wsgi --log-file -
worker: celery -A PdfConv worker -l info