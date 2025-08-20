import React, { useState } from "react";
import { Upload, CheckCircle, Trash2, FileText, Loader2, AlertCircle } from "lucide-react";

export default function UploadScreen({ goBack, upload, showHistory }) {
  const [files, setFiles] = useState([]);
  const [autoAnalyse, setAutoAnalyse] = useState(false);
  const [generateSuggestions, setGenerateSuggestions] = useState(false);
  const [comptencyAnalyse, setComptencyAnalyse] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleFiles = (uploaded) => {
    const newFiles = Array.from(uploaded).map((file) => ({
      file, // original file
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(1) + " MB",
      status: "pending",
      progress: 0,
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleFileUpload = (e) => {
    handleFiles(e.target.files);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const startUpload = async () => {
    if (files.length === 0) {
      setErrorMsg("Please upload at least one file before analysing.");
      return;
    }
    setErrorMsg("");

    // Upload each file sequentially
    for (let i = 0; i < files.length; i++) {
      const updatedFiles = [...files];
      updatedFiles[i].status = "uploading";
      setFiles([...updatedFiles]);

      const formData = new FormData();
      formData.append("file", updatedFiles[i].file);
      formData.append("options", JSON.stringify({ autoAnalyse, comptencyAnalyse, generateSuggestions }));

      try {
        await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        updatedFiles[i].status = "uploaded";
        updatedFiles[i].progress = 100;
        setFiles([...updatedFiles]);
      } catch (err) {
        updatedFiles[i].status = "error";
        setFiles([...updatedFiles]);
      }
    }

    // Call parent upload callback after all uploads complete
    if (upload) {
      upload(files, { autoAnalyse, comptencyAnalyse, generateSuggestions });
    }
  };

  return (
    <div className="px-4 py-6 flex flex-col items-center font-[Inter]">
      <div className="max-w-3xl w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-neutral-800 mb-2">
            Upload Lesson Materials
          </h1>
          <p className="text-neutral-600">
            Upload your course outlines and lesson documents to generate insights and suggestions instantly.
          </p>
        </div>

        {/* Error Message */}
        {errorMsg && (
          <div className="flex items-center gap-2 p-3 mb-4 rounded-lg bg-red-50 text-red-600 border border-red-200">
            <AlertCircle size={18} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Upload Card */}
        <div className="bg-white rounded-xl shadow-md mb-6">
          <div className="p-8">
            <label
              htmlFor="fileUpload"
              className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-10 cursor-pointer transition
                ${isDragging ? "border-[#426ED8] bg-blue-50" : "border-neutral-300 hover:border-[#426ED8]"}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload size={40} className="text-[#426ED8] mb-4" />
              <p className="text-neutral-700 text-lg">
                Drag & drop your files here, or click to browse.
              </p>
              <input
                id="fileUpload"
                type="file"
                multiple
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
            <p className="text-sm text-neutral-500 mt-2">
              Allowed formats: .pdf, .docx, .pptx
            </p>
          </div>
        </div>

        {/* Uploaded Files */}
        {files.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm mb-6">
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-4">Uploaded Files</h2>
              <div className="space-y-3">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-neutral-100 transition"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="text-neutral-600" />
                      <div>
                        <p className="text-neutral-800">{file.name}</p>
                        <p className="text-sm text-neutral-500">{file.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {file.status === "uploading" && (
                        <Loader2 className="animate-spin text-orange-500" />
                      )}
                      {file.status === "uploaded" && (
                        <CheckCircle className="text-green-500" />
                      )}
                      {file.status === "pending" && (
                        <span className="text-gray-400">Pending</span>
                      )}
                      {file.status === "error" && (
                        <span className="text-red-500">Error</span>
                      )}
                      <button onClick={() => removeFile(index)}>
                        <Trash2 className="text-neutral-500 hover:text-red-500 transition" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* AI Auto-analysis Options */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">AI Analysis Options</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-neutral-700">Auto-analyse for curriculum gaps</span>
                <input
                  type="checkbox"
                  checked={autoAnalyse}
                  onChange={() => setAutoAnalyse(!autoAnalyse)}
                  className="w-5 h-5 accent-sky-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-700">Generate competency analysis</span>
                <input
                  type="checkbox"
                  checked={comptencyAnalyse}
                  onChange={() => setComptencyAnalyse(!comptencyAnalyse)}
                  className="w-5 h-5 accent-sky-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-700">Generate teaching suggestions</span>
                <input
                  type="checkbox"
                  checked={generateSuggestions}
                  onChange={() => setGenerateSuggestions(!generateSuggestions)}
                  className="w-5 h-5 accent-sky-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            className="w-full sm:w-auto bg-[#426ED8] hover:bg-[#355bb3] hover:cursor-pointer text-white font-semibold px-6 py-3 rounded-lg transition"
            onClick={() => {
              if (files.length === 0) {
                setErrorMsg("Please upload at least one file before analysing.");
                return;
              } else {
                showHistory()
              }
              setErrorMsg("");
              
            }}
          >
            Upload & Analyse
          </button>
          <button
            className="w-full sm:w-auto text-neutral-600 hover:text-neutral-800 hover:cursor-pointer font-medium px-6 py-3 rounded-lg transition"
            onClick={() => goBack()}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
