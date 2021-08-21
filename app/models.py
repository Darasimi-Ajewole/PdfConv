from fireo.models import Model
from fireo import fields
from google.cloud import firestore
from fireo.fields import errors


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
    def db_value(self, val):
        val = super().db_value(val)
        val = not val and firestore.SERVER_TIMESTAMP
        return val


class TextChoiceField(fields.TextField):
    def attr_choices(self, choices, field_val):
        if field_val not in choices:
            msg = f'{field_val} not part of acceptable choices - {choices}'
            raise errors.FieldValidationFailed(msg)
        return field_val


class Base(Model):
    created = fields.DateTime(auto=True)
    modified = AutoModifiedDateTime(auto=True)


class ConversionTaskStatus(Base):
    blob_name = fields.IDField(required=True)
    status = TextChoiceField(default=STASIS, choices=POSSIBLE_STATUS)
    task_id = fields.TextField()
