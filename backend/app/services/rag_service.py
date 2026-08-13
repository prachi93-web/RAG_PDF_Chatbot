import os
from dotenv import load_dotenv
from google import genai
from sentence_transformers import SentenceTransformer
import chromadb


load_dotenv()

gemini_client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = SentenceTransformer("all-MiniLM-L6-v2")

client = chromadb.PersistentClient(path="./chroma_db")
collection = client.get_or_create_collection(
    name="pdf_documents"
)


def ask_rag(question):

    question_embedding = model.encode([question])

    # Search in ChromaDB
    results = collection.query(
        query_embeddings=question_embedding.tolist(),
        n_results=2
    )

    chunks = results["documents"][0]
    context = "\n\n".join(chunks)

    #asking gemini
    response = gemini_client.models.generate_content(
    model="gemini-3.6-flash",
    contents=f"""
You are a PDF question-answering assistant.

Rules:
1. Answer the user's question using ONLY the provided PDF context.
2. Do not use outside knowledge.
3. Do not invent or assume information.
4. Give a concise and clear answer.
5. If the answer cannot be found in the PDF context, say:
"I could not find the answer in the PDF."

PDF context:
{context}

User question:
{question}

Answer:
"""
)
    return {
        "question": question,
        "answer": response.text,
        "relevant_chunks": chunks
    }