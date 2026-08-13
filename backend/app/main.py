from fastapi import FastAPI
from backend.app.routes.pdf_routes import router as pdf_router
from backend.app.routes.chat_routes import router as chat_router

app = FastAPI()
app.include_router(pdf_router)
app.include_router(chat_router)

@app.get("/")
def home():
    return {
        "message": "RAG chatbot backend is running!"
    }