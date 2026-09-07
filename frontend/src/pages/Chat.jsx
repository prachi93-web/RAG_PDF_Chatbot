import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import UploadPdf from "../components/UploadPdf";
import Header from "../components/Header";

function Chat() {
  const [chatId] = useState(() => crypto.randomUUID());
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim() || loading) return;
    const currentQuestion = question.trim();

    const userMessage = {
      role: "user",
      text: currentQuestion,
    };

    setMessages((prev) => [...prev, userMessage]);
    setQuestion("");
    setLoading(true);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/ask?question=${encodeURIComponent(
          currentQuestion,
        )}&chat_id=${encodeURIComponent(chatId)}`,
        {
          method: "POST",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to get response from backend");
      }

      const data = await response.json();
      const botMessage = {
        role: "bot",
        text: data.answer,
        source: data.source,
      };
      setMessages((prev) => [...prev, botMessage]);

    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Something went wrong while connecting to the backend.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen bg-slate-50">
    <Header />
    <main className="pt-16 min-h-screen">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-slate-100">
      <div className="w-full px-8 py-4 flex flex-col">
        <div className="mb-4 mt-1 shrink-0">
          <h2 className="text-2xl font-bold text-slate-800">Chat with your PDF</h2>
          <p className="text-slate-500 mt-1 text-sm">Upload your documents and ask questions about their content.</p>
        </div>

        <div className="shrink-0"><UploadPdf chatId={chatId} /></div>
          <div className="min-h-[400px] bg-white/90 backdrop-blur-sm border border-teal-100 rounded-xl shadow-lg overflow-hidden flex flex-col">          <div className="shrink-0 px-5 py-3 bg-gradient-to-r from-teal-700 to-teal-600 text-white">
            <h3 className="font-semibold">💬 Conversation</h3>
            <p className="text-xs text-teal-100 mt-0.5">Ask questions based on your uploaded documents.</p>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto p-5 space-y-4">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center text-3xl mb-3">📄</div>
                <p className="text-slate-600 font-medium">Ready to answer your questions</p>
                <p className="text-sm text-slate-400 mt-1">Upload a PDF and start chatting below.</p>
              </div>
            ) : (
              messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[75%] px-4 py-3 rounded-2xl shadow-sm ${
                      message.role === "user"  ? "bg-teal-700 text-white rounded-br-sm" : "bg-slate-100 text-slate-800 border border-slate-200 rounded-bl-sm"
                    }`}>
                    <div className="text-sm leading-6">
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => (<p className="mb-2 last:mb-0">{children}</p>),
                          strong: ({ children }) => (<strong className="font-semibold"> {children} </strong>),
                          ul: ({ children }) => (<ul className="list-disc ml-5 mb-2 space-y-1">{children}</ul>),
                          ol: ({ children }) => (<ol className="list-decimal ml-5 mb-2 space-y-1">{children}</ol>),
                          li: ({ children }) => <li>{children}</li>,
                        }}
                      >
                        {message.text}
                      </ReactMarkdown>
                    </div>

                    {message.source?.filename && (
                      <div className={`mt-3 pt-2 border-t text-xs ${
                          message.role === "user"
                            ? "border-teal-600 text-teal-100"
                            : "border-slate-200 text-slate-500"
                        }`}
                      >
                        📄 {message.source.filename}
                        {message.source.page &&
                          ` • Page ${message.source.page}`}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 border border-slate-200 text-slate-500 px-4 py-3 rounded-2xl rounded-bl-sm text-sm">Thinking...</div>
              </div>
            )}
          </div>

          <div className="shrink-0 border-t border-slate-200 bg-slate-50 p-3">
            <div className="flex gap-3">
              <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { handleAsk(); }}}
                placeholder="Ask a question about your PDF..."
                disabled={loading}
                className="flex-1 border border-slate-300 bg-white rounded-lg px-4 py-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-slate-100"
              />

              <button onClick={handleAsk} disabled={loading || !question.trim()} className="px-6 py-3 bg-teal-700 text-white font-medium rounded-lg hover:bg-teal-600 transition disabled:bg-slate-300 disabled:cursor-not-allowed">
                {loading ? "Asking..." : "Ask"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </main>
  </div>
);
}
export default Chat;