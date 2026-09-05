from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.routes.pdf_routes import router as pdf_router
from backend.app.routes.chat_routes import router as chat_router

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(pdf_router)
app.include_router(chat_router)

@app.get("/")
def home():
    return {
        "message": "RAG chatbot backend is running!"
    }