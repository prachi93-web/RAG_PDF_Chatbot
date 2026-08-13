from fastapi import APIRouter, UploadFile, File
from backend.app.services.pdf_service import process_pdf

router = APIRouter()
@router.post("/upload-pdf")
def upload_pdf(file: UploadFile = File(...)):

    result = process_pdf(file)
    return result