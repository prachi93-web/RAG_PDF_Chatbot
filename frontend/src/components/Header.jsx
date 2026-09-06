import React from "react";
import dqLogo from "../assets/dqlogo.png";
function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-slate-200">
      <div className="h-full flex items-center px-6">
        <img src={dqLogo} alt="DocuQuery logo" className="w-15 h-15 object-contain"/>
        <div className="ml-3">
          <h1 className="text-xl font-bold leading-tight">
            <span className="text-slate-800">Docu</span>
            <span className="text-teal-600">Query</span>
          </h1>
        </div>
      </div>
    </header>
  );
}

export default Header;
