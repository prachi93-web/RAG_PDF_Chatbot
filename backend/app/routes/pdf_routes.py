from typing import Annotated
from fastapi import APIRouter, UploadFile, File, Form
from backend.app.services.pdf_service import process_pdf

router = APIRouter()
@router.post("/upload-pdf")
def upload_pdf(
    files: Annotated[list[UploadFile], File()],
    chat_id: Annotated[str, Form()],
):
    
    results = []
    for file in files:
        result = process_pdf(file,chat_id)
        results.append(result)
    return {
        "chat_id": chat_id,
        "uploaded_files": results
    }