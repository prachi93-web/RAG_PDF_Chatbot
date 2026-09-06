import React, { useState } from "react";

function UploadPdf({ chatId }) {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [uploadError, setUploadError] = useState("");

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
    setUploadMessage("");
    setUploadError("");
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setUploadError("Please select at least one PDF.");
      return;
    }
    setUploading(true);
    setUploadMessage("");
    setUploadError("");

    const formData = new FormData();

    files.forEach((file) => {
        formData.append("files", file);
    });
    formData.append("chat_id", chatId);

    try {
      const response = await fetch("http://127.0.0.1:8000/upload-pdf", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }
      const data = await response.json();

      setUploadMessage(
        `${data.uploaded_files.length} PDF(s) uploaded successfully!`,
      );

      setFiles([]);
    } catch (error) {
      console.error(error);

      setUploadError("Something went wrong while uploading the PDF.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white/90 border border-teal-100 rounded-xl p-4 mb-4 shadow-md">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-semibold text-slate-700">📄 Upload Documents</h3>
          <p className="text-xs text-slate-400 mt-1">Upload one or more PDF files to start chatting.</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <label className="flex-1 cursor-pointer">
          <div className="border border-dashed border-teal-300 bg-teal-50 rounded-lg px-4 py-2.5 hover:bg-teal-100 transition">
            <span className="text-sm text-teal-700 font-medium">📁 Choose PDF files</span>
            <span className="text-xs text-slate-400 ml-2">
              {files.length > 0
                ? `${files.length} file(s) selected`
                : "No files selected"}
            </span>
          </div>
          <input type="file" accept=".pdf,application/pdf" multiple onChange={handleFileChange} className="hidden"/>
        </label>

        <button onClick={handleUpload} disabled={uploading || files.length === 0} className="px-5 py-2.5 bg-teal-700 text-white text-sm font-medium rounded-lg hover:bg-teal-600 transition disabled:bg-slate-300 disabled:cursor-not-allowed">
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {files.length > 0 && (
        <div className="mt-3 space-y-1.5">
          {files.map((file, index) => (
            <div key={index} className="text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-md px-3 py-2"> 📄 {file.name} </div>
          ))}
        </div>
      )}

      {uploadMessage && (
        <div className="mt-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg px-3 py-2 text-xs">✓ {uploadMessage}</div>
      )}

      {uploadError && (
        <div className="mt-3 bg-red-50 border border-red-200 text-red-700 rounded-lg px-3 py-2 text-xs">{uploadError}</div>
      )}
    </div>
  );
}

export default UploadPdf;