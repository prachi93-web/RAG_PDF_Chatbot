import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Chat from "./pages/Chat";

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="flex">
        <main className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<Chat />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
