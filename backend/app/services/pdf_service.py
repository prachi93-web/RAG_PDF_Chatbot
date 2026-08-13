from pypdf import PdfReader
from sentence_transformers import SentenceTransformer
import chromadb


model = SentenceTransformer("all-MiniLM-L6-v2")

client = chromadb.PersistentClient(path="./chroma_db")
collection = client.get_or_create_collection(
    name="pdf_documents"
)


def process_pdf(file):

    pdf = PdfReader(file.file)
    text = ""

    for page in pdf.pages:
        page_text = page.extract_text()
        if page_text:
            text += page_text

    chunk_size = 500
    chunks = []

    for i in range(0, len(text), chunk_size):
        chunk = text[i:i + chunk_size]
        chunks.append(chunk)

    embeddings = model.encode(chunks)

    ids = []

    for i in range(len(chunks)):
        ids.append(f"{file.filename}_chunk_{i}")

    collection.add(
        ids=ids,
        documents=chunks,
        embeddings=embeddings.tolist()
    )

    return {
        "filename": file.filename,
        "number_of_chunks": len(chunks),
        "embedding_size": len(embeddings[0]),
        "message": "PDF stored in vector database!"
    }