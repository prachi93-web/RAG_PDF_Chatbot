import os
from dotenv import load_dotenv
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from langchain_google_genai import ChatGoogleGenerativeAI

load_dotenv()

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

vectorstore = Chroma(
    collection_name="pdf_documents",
    embedding_function=embeddings,
    persist_directory="./chroma_db"
)

llm = ChatGoogleGenerativeAI(
    model="gemini-3.6-flash",
    google_api_key=os.getenv("GEMINI_API_KEY")
)

def ask_rag(question,chat_id):

    retriever = vectorstore.as_retriever(
        search_kwargs={
            "k": 5,
            "filter": {
                "chat_id": chat_id
            }
        }
    )
    documents = retriever.invoke(question)
    if not documents:
        return {
            "question": question,
            "answer": "I could not find the answer in the PDF.",
            "source": None,
            "relevant_chunks": []
        }

    context = "\n\n".join(
        document.page_content
        for document in documents
    )

    prompt = f"""
You are a PDF question-answering assistant.
Rules:
1. Answer the user's question using ONLY the provided PDF context.
2. Do not use outside knowledge.
3. Do not invent or assume information.
4. Give a concise and clear answer.
5. If the answer cannot be found in the PDF context, say:
"I could not find the answer in the PDF."
PDF context: {context}
User question: {question}
Answer:
"""
    response = llm.invoke(prompt)
    answer = response.content

    if isinstance(answer, list):
        answer = "".join(
            block.get("text", "") if isinstance(block, dict)
            else getattr(block, "text", "")
            for block in answer
        )
    
    return {
        "question": question,
        "answer": answer,
        "source": {
            "filename": documents[0].metadata.get("filename"),
            "page": documents[0].metadata.get("page_label")
        },
        "relevant_chunks": [
            {
                "text": document.page_content,
                "metadata": document.metadata
            }
            for document in documents
        ]
    }