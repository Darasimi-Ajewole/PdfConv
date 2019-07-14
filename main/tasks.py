from __future__ import absolute_import,unicode_literals
from celery import shared_task
from django.conf import settings
from subprocess import PIPE,Popen
import os
from xhtml2pdf import pisa
import mammoth

@shared_task
def convert(file_path):
    if settings.DEBUG:
        #DEVELOPMENT ENVIRONMENT
        process = Popen(["abiword","--to=pdf",file_path],stdout=PIPE)
        process.communicate()
    else:
        #production environment
        status,html = convertDocxToHtml(file_path)
        if status:
            convertHtmlToPdf(html,file_path.replace("docx","pdf"))
        """
        process = Popen(["docx2txt",file_path],stdout=PIPE)
        #process = Popen(["unoconv","-f","pdf",file_path],stdout=PIPE)
        process.communicate()
        process = Popen(["abiword","--to=pdf",file_path.replace('docx','txt')],stdout=PIPE)
        process.communicate()"""
    return 

def convertHtmlToPdf(html, outputFilename):
    # open output file for writing (truncated binary)
    with open(outputFilename, "w+b") as pdf:
    # convert HTML to PDF
        pisaStatus = pisa.CreatePDF(html,dest=pdf)

    # return True on success and False on errors
    return pisaStatus.err

def convertDocxToHtml(docxPath):
    try:
        with open(docxPath, "rb") as docx_file:
            result = mammoth.convert_to_html(docx_file)
            html = result.value # The generated HTML
        return True,html
    except Exception as e:
        return False,e