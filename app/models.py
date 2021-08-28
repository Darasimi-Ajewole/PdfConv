import firebase_admin

from fireo.models import Model
from fireo import fields
from fireo.fields import errors
from firebase_admin import firestore as _firestore
from google.cloud import firestore

firebase_admin.initialize_app()

db = _firestore.client()


FAILED = 'failed'
SUCCESS = 'success'
RUNNING = 'running'
STASIS = 'stasis'
POSSIBLE_STATUS = {
    FAILED,
    RUNNING,
    STASIS,
    SUCCESS,
}


class AutoModifiedDateTime(fields.DateTime):

    def field_value(self, val):
        self._old_value = val
        return val

    def db_value(self, val):
        old_value = getattr(self, '_old_value', None)
        modified = val != old_value
        if modified:
            return val
        return firestore.SERVER_TIMESTAMP

    def attr_auto(self, attr_val, field_val):
        return super().attr_auto(attr_val, field_val)


class TextChoiceField(fields.TextField):
    allowed_attributes = ['choices']

    def attr_choices(self, choices, field_val):
        if field_val not in choices:
            msg = f'{field_val} not part of acceptable choices - {choices}'
            raise errors.FieldValidationFailed(msg)
        return field_val


class Base(Model):
    created = fields.DateTime(auto=True)
    modified = AutoModifiedDateTime(auto=True)

    class Meta:
        abstract = True


class ConversionTaskStatus(Base):
    blob_name = fields.TextField(required=True)
    status = TextChoiceField(default=STASIS, choices=POSSIBLE_STATUS)
    cloud_task_name = fields.TextField()
    task_id = fields.IDField(required=True)
    download_url = fields.TextField()
    pdf_name = fields.TextField()

    def update_status(self, new_status):
        self.status = new_status
        self.save()
