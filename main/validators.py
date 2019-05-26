from django.core.exceptions import ValidationError
from docx import Document

def validate_size(value):
    MAX_FILE_SIZE = 2097152 #2MB maximum
    file_size= value.size
    
    if file_size > MAX_FILE_SIZE:
        raise ValidationError("The maximum file size that can be uploaded is 2MB")
    else:
        return value

def validate_content(value):
    try:
        Document(value)
        return value
    except:  
         raise ValidationError("This is not a valid word file")