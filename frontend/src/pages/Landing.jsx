import React from "react";
import { Link } from "react-router-dom";
import dqlogo from "../assets/dqlogo.png";

function Landing() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
    {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/chat" className="flex items-center gap-3">
            <img src={dqlogo} alt="DocuQuery" className="w-10 h-10 object-contain"/>
            <div>
              <h1 className="text-xl font-bold leading-none">
                <span className="text-slate-800">Docu</span>
                <span className="text-teal-600">Query</span>
              </h1>
              <p className="text-[10px] text-slate-400 mt-1">Multi-Document RAG Assistant</p>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-slate-600">
            <a href="#features" className="hover:text-teal-600 transition">Features</a>
            <a href="#how-it-works" className="hover:text-teal-600 transition">How It Works</a>
            <a href="#reliability" className="hover:text-teal-600 transition">Reliability</a>
            <a href="#technology" className="hover:text-teal-600 transition">Technology</a>
          </nav>
          <Link to="/chat" className="bg-teal-700 hover:bg-teal-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition">Start Chatting →</Link>
        </div>
      </header>

      {/*hero section*/}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-white to-slate-100" />
        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-15">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* leftside */}
            <div>
              <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-medium mb-6">📄 Your Documents. Smarter Answers.</div>
              <h2 className="text-5xl lg:text-6xl font-bold leading-tight text-slate-900">Turn your PDFs into a{" "}<span className="text-teal-600">conversation.</span></h2>
              <p className="mt-6 text-lg text-slate-600 leading-8 max-w-xl">Upload multiple documents, ask questions in natural language,and get answers grounded in the content of your documents.</p>

              <div className="flex flex-wrap gap-4 mt-8">
                <Link to="/chat" className="px-6 py-3.5 bg-teal-700 hover:bg-teal-600 text-white rounded-lg font-medium transition shadow-md">Start Chatting →</Link>
                <a href="#how-it-works" className="px-6 py-3.5 bg-white border border-slate-300 hover:border-teal-500 text-slate-700 rounded-lg font-medium transition">See How It Works</a>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-10">
                <div>
                  <div className="text-2xl mb-2">📚</div>
                  <p className="font-semibold text-slate-800 text-sm">Multiple Documents</p>
                  <p className="text-xs text-slate-500 mt-1">Upload multiple PDFs</p>
                </div>

                <div>
                  <div className="text-2xl mb-2">🔎</div>
                  <p className="font-semibold text-slate-800 text-sm">Relevant Retrieval</p>
                  <p className="text-xs text-slate-500 mt-1">Find relevant content</p>
                </div>

                <div>
                  <div className="text-2xl mb-2">📌</div>
                  <p className="font-semibold text-slate-800 text-sm">Source References</p>
                  <p className="text-xs text-slate-500 mt-1">Document & page details</p>
                </div>
              </div>
            </div>

            {/* rightside */}
            <div className="relative">
              <div className="bg-white border border-teal-100 rounded-2xl shadow-2xl overflow-hidden">
                <div className="px-5 py-4 bg-slate-900 flex items-center gap-3">
                  <img src={dqlogo} alt="" className="w-8 h-8 object-contain" />
                  <div>
                    <p className="text-white font-semibold text-sm">DocuQuery</p>
                    <p className="text-slate-400 text-xs">Multi-Document RAG Assistant</p>
                  </div>
                </div>

                <div className="p-5">
                  <div className="border border-dashed border-teal-300 bg-teal-50 rounded-xl p-4">
                    <p className="text-sm font-semibold text-slate-700">📄 Documents</p>
                    <div className="mt-3 space-y-2">
                      <div className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs">📄 GATE_syllabus.pdf</div>
                      <div className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs">📄 Civil_notes.pdf</div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-5">
                    <div className="bg-teal-700 text-white rounded-2xl rounded-br-sm px-4 py-3 text-sm max-w-[80%]">What are the main topics mentioned in the documents?</div>
                  </div>

                  <div className="mt-4 bg-slate-100 border border-slate-200 rounded-2xl rounded-bl-sm p-4">
                    <p className="text-sm text-slate-700 leading-6">Based on the retrieved document content, the main topics include Engineering Mathematics, Structural Engineering, Geotechnical Engineering and other sections mentioned in the uploaded documents.</p>
                    <div className="mt-3 pt-3 border-t border-slate-200 text-xs text-slate-500">📄 GATE_syllabus.pdf · Page 1</div>
                  </div>
                </div>
              </div>
              <div className="absolute -z-10 -top-8 -right-8 w-40 h-40 bg-teal-200/30 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section id="features" className="py-7 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-teal-600 text-3xl lg:text-4xl font-bold mb-7">Why DocuQuery?</p>
            <h2 className="font-semibold text-sm uppercase tracking-wider  text-slate-900 mt-4"> A smarter way to work with your documents</h2>
            <p className="text-slate-500 mt-4">Ask questions about your PDFs instead of manually searching through pages of information.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <Feature icon="📚" title="Multiple Documents" text="Upload multiple PDFs and work with them within a single conversation."/>
            <Feature icon="🔎" title="Intelligent Retrieval" text="Relevant document chunks are retrieved before generating an answer."/>
            <Feature icon="💬" title="Natural Conversations" text="Ask questions naturally and receive structured answers from your documents."/>
            <Feature icon="📌" title="Grounded Answers" text="Answers are based on retrieved document content with source and page references."/>
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section id="how-it-works" className="py-7 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Simple Workflow</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mt-3">How it works</h2>
            <p className="text-slate-500 mt-4">From document upload to grounded answers in a few simple steps.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mt-6">
            <Step number="Step 1" icon="📄" title="Upload Documents" text="Upload one or more PDF files to your conversation."/>
            <Step number="Step 2" icon="🔍" title="Find Relevant Content" text="DocuQuery retrieves relevant sections from your uploaded documents."/>
            <Step number="Step 3" icon="💬" title="Ask Questions" text="Ask questions about your documents using natural language."/>
            <Step number="Step 4" icon="✨" title="Get Grounded Answers" text="Receive answers based on retrieved document content with source references."/>
          </div>
        </div>
      </section>

      {/* Reliability section */}
      <section id="reliability" className="py-7 bg-green-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className=" p-8 lg:p-6">
            <div className="text-center">
              <div className="text-4xl mb-1">🛡️</div>
              <h2 className="text-3xl font-bold text-slate-900">Designed for grounded answers</h2>
              <p className="mt-4 text-slate-600 max-w-2xl mx-auto leading-7">DocuQuery uses Retrieval-Augmented Generation to retrieve relevant content from your uploaded documents before generating an answer.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-10">
              <div className="bg-white rounded-xl p-5 border border-slate-200">
                <h3 className="font-semibold text-slate-800">Document-Based</h3>
                <p className="text-sm text-slate-500 mt-2 leading-6">Answers are generated using content retrieved from your uploaded documents.</p>
              </div>

              <div className="bg-white rounded-xl p-5 border border-slate-200">
                <h3 className="font-semibold text-slate-800">Source References</h3>
                <p className="text-sm text-slate-500 mt-2 leading-6">Retrieved information can be traced back to the source document and page.</p>
              </div>

              <div className="bg-white rounded-xl p-5 border border-slate-200">
                <h3 className="font-semibold text-slate-800">Reduced Hallucination Risk</h3>
                <p className="text-sm text-slate-500 mt-2 leading-6">Retrieval grounding helps reduce unsupported answers, although no generative AI system can guarantee zero hallucinations.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology section*/}
      <section id="technology" className="py-7 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Technologies Used</p>
          <h2 className="text-3xl font-bold text-slate-900 mt-3">Built with modern AI technologies</h2>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            {["React","FastAPI","LangChain","Gemini","ChromaDB","Python","RAG",].map((tech) => 
            (
              <div key={tech} className="px-6 py-3 bg-white border border-slate-200 rounded-xl shadow-sm font-medium text-slate-700">{tech}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer section*/}
      <footer className="bg-slate-900 text-slate-400 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-sm">© 2026 DocuQuery</p>
          <p className="text-xs">Multi-Document RAG Assistant</p>
          <p className="text-xs">Created by : Prachi Mehetre</p>
        </div>
      </footer>
    </div>
  );
}
function Feature({ icon, title, text }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 hover:border-teal-200 transition">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="font-semibold text-lg text-slate-800">{title}</h3>
      <p className="text-sm text-slate-500 mt-2 leading-6">{text}</p>
    </div>
  );
}

function Step({ number, icon, title, text }) {
  return (
    <div className="relative bg-white border border-slate-200 rounded-xl p-4">
      <span className="text-xs font-bold text-teal-600">{number}</span>
      <div className="text-3xl mt-2">{icon}</div>
      <h3 className="font-semibold text-lg text-slate-800 mt-2">{title}</h3>
      <p className="text-sm text-slate-500 mt-2 leading-6">{text}</p>
    </div>
  );
}

export default Landing;