from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma
import tempfile
import os
import uuid

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

vectorstore = Chroma(
    collection_name="pdf_documents",
    embedding_function=embeddings,
    persist_directory=os.getenv("CHROMA_PERSIST_DIRECTORY", "./chroma_db")
)

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=800,
    chunk_overlap=150,
    separators=["\n\n", "\n", ". ", " ", ""]
)

def process_pdf(file,chat_id):

    document_id = str(uuid.uuid4())

    # saving pdf temporarily
    with tempfile.NamedTemporaryFile(
        delete=False,
        suffix=".pdf"
    ) as temp_file:

        temp_file.write(file.file.read())
        temp_path = temp_file.name

    try:

        loader = PyPDFLoader(temp_path)
        pages = loader.load()

        for page in pages:
            page.metadata["filename"] = file.filename
            page.metadata["document_id"] = document_id
            page.metadata["chat_id"] = chat_id

        chunks = text_splitter.split_documents(pages)

        for index, chunk in enumerate(chunks):

            chunk.metadata["chunk_id"] = index
            chunk.metadata["source"] = file.filename
            chunk.metadata["document_id"] = document_id
            chunk.metadata["chat_id"] = chat_id

        vectorstore.add_documents(
            documents=chunks
        )

        return {
            "filename": file.filename,
            "document_id": document_id,
            "chat_id": chat_id,
            "number_of_pages": len(pages),
            "number_of_chunks": len(chunks),
            "embedding_model": "all-MiniLM-L6-v2",
            "chunk_size": 800,
            "chunk_overlap": 150,
            "message": "PDF processed and stored in vector database!"
        }

    finally:

        if os.path.exists(temp_path):
            os.remove(temp_path)