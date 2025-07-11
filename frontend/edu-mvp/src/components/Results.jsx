import React, { useState } from "react";

const Results = () => {
  const [activeTab, setActiveTab] = useState("summary");

  return (
    <div className="space-y-6">
      <div className="relative border-2 border-gray-300 rounded-md p-6 bg-white shadow-sm">
        <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-800 font-bold text-sm">
          2
        </div>

        <h2 className="text-lg font-semibold text-gray-800 mb-4">Results</h2>


        <div className="flex border-b border-gray-300 mt-6">
          <button
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === "summary"
                ? "text-[#426ED8] border-b-2 border-[#426ED8]"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("summary")}
          >
            Summary
          </button>
          <button
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === "details"
                ? "text-[#426ED8] border-b-2 border-[#426ED8]"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("details")}
          >
            Details
          </button>
          <button
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === "gynecomastias"
                ? "text-[#426ED8] border-b-2 border-[#426ED8]"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("gynecomastias")}
          >
            Gyno Results
          </button>
        </div>

        <div className="mt-4">
          {activeTab === "summary" && (
            <div className="p-4 bg-gray-50 rounded-md">
              <p className="text-gray-700">This is a placeholder for summary results.</p>
            </div>
          )}
          {activeTab === "details" && (
            <div className="p-4 bg-gray-50 rounded-md">
              <p className="text-gray-700">This is a placeholder for detailed results.</p>
            </div>
          )}
          {activeTab === "gynecomastias" && (
            <div className="p-4 bg-gray-50 rounded-md">
              <p className="text-gray-700">This is a placeholder for gynecomastia results.</p>
            </div>
          )}
        </div>

        <div className="flex space-x-4 mt-6">
          <button className="bg-[#426ED8] text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition">
            Download
          </button>
          <button className="bg-gray-600 text-white px-4 py-2 rounded-md shadow hover:bg-gray-700 transition">
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
