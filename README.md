# DocuQuery – Multi-Document RAG Assistant

DocuQuery is a full-stack Retrieval-Augmented Generation (RAG) application built with LangChain that lets users upload multiple PDF documents and ask natural-language questions. It uses semantic search with Hugging Face embeddings, ChromaDB for vector storage, and Google Gemini for grounded answers.

## Features

- Upload and process multiple PDF documents
- Ask natural-language questions about uploaded documents
- Retrieval-Augmented Generation (RAG) using LangChain
- Semantic similarity search using vector embeddings
- Hugging Face `all-MiniLM-L6-v2` embeddings
- ChromaDB vector database for storing document embeddings
- Chat-level document isolation using unique chat IDs
- Source information with filename and page number
- Grounded responses based only on retrieved PDF context
- FastAPI backend with REST APIs
- React frontend with Markdown response rendering

## How It Works

```text
PDF Documents
      ↓
PyPDFLoader
      ↓
Text Chunking
      ↓
Hugging Face Embeddings
      ↓
ChromaDB
      ↓
Semantic Similarity Search
      ↓
Relevant Document Chunks
      ↓
Google Gemini
      ↓
Grounded Answer + Source

## Key Highlights

- Built a complete end-to-end RAG pipeline using LangChain
- Implemented multi-PDF document processing and semantic retrieval
- Used ChromaDB to store and retrieve document embeddings
- Integrated Google Gemini for context-grounded answer generation
- Implemented chat-level document isolation using unique chat IDs
- Added source-aware responses with document and page information
- Developed a React frontend and FastAPI backend for the complete application

## Author

**Prachi Mehetre**

GitHub: https://github.com/prachi93-web
