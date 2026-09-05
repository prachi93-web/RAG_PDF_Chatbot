from fastapi import APIRouter
from backend.app.services.rag_service import ask_rag

router = APIRouter()

@router.post("/ask")
def ask_question(question: str,chat_id: str):

    result = ask_rag(question, chat_id)
    return result