from decouple import config
from .base import *

DEBUG = config('DEBUG',cast=bool)

SECRET_KEY = config('SECRET_KEY')

ALLOWED_HOSTS = config('ALLOWED_HOSTS', cast=lambda v: [s for s in v.split(',')])