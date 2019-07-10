release: python manage.py migrate
worker: celery -A PdfConv worker -l info
web: gunicorn PdfConv.production-wsgi --log-file -