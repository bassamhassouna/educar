// src/components/Results.jsx

import React, { useState } from "react";

const Results = ({ data }) => {
  const placeholder = {
    curriculumAligned: "86%",
    missingTopics: [
      "Mitochondria function",
      "Photosynthesis process",
      "Energy conversion",
    ],
    teachingSuggestionsLevel: "Moderate",
    curriculumCoverage: {
      covered: 86,
      uncovered: 14,
    },
    competencies: [
      { name: "Cell structure identification", score: 85, level: "Strong" },
      { name: "Organelle functions", score: 73, level: "Satisfactory" },
      { name: "Microscopy skills", score: null, level: "Needs Improvement" },
    ],
    teachingSuggestions: [
      { objective: "Understand cell organelles", blooms: "Analyse" },
      { objective: "Describe cell energy conversion", blooms: "Understand" },
    ],
  };

  const info = data || placeholder;

  const [activeTab, setActiveTab] = useState("Curriculum Coverage");

  const tabs = [
    "Curriculum Coverage",
    "Competency Analysis",
    "Teaching Suggestions",
    "Learning Outcomes",
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow-xl rounded-2xl mt-32">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-[#426ED8]">
          Analysis Results for <em>lesson.pdf</em>
        </h2>
        <div className="space-x-2">
          <button className="bg-[#426ED8] text-white px-3 py-1 rounded-lg shadow">
            Share
          </button>
          <button className="bg-[#426ED8] text-white px-3 py-1 rounded-lg shadow">
            Export as PDF
          </button>
          <button className="bg-[#426ED8] text-white px-3 py-1 rounded-lg shadow">
            Copy
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-300 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 -mb-px text-sm font-medium border-b-2 ${
              activeTab === tab
                ? "border-[#426ED8] text-[#426ED8]"
                : "border-transparent text-gray-500 hover:text-[#426ED8]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "Curriculum Coverage" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-[#426ED8] text-white p-4 rounded-xl flex flex-col items-center justify-center shadow">
              <p className="text-xl font-bold">
                Curriculum {info.curriculumAligned} aligned
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl shadow">
              <p className="font-semibold mb-2 text-[#426ED8]">
                Missing or under-covered topics
              </p>
              <ul className="list-disc list-inside text-sm">
                {info.missingTopics.map((topic, idx) => (
                  <li key={idx}>{topic}</li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl flex flex-col items-center justify-center shadow">
              <p className="font-semibold text-[#426ED8]">Teaching suggestions</p>
              <p>{info.teachingSuggestionsLevel}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-[#426ED8]">
              Curriculum Coverage
            </h3>
            <div className="flex items-center space-x-4">
              <div className="w-24 h-24 rounded-full border-8 border-[#426ED8] flex items-center justify-center text-xl font-bold text-[#426ED8]">
                {info.curriculumCoverage.covered}%
              </div>
              <div>
                <p>Covered: {info.curriculumCoverage.covered}%</p>
                <p>Uncovered topics: {info.curriculumCoverage.uncovered}%</p>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === "Competency Analysis" && (
        <div>
          <h3 className="text-lg font-semibold mb-2 text-[#426ED8]">
            Competency Analysis
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm rounded-xl overflow-hidden shadow">
              <thead className="bg-[#426ED8] text-white">
                <tr>
                  <th className="py-2 px-4 text-left">Competency</th>
                  <th className="py-2 px-4 text-left">Score</th>
                  <th className="py-2 px-4 text-left">Level</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {info.competencies.map((comp, idx) => (
                  <tr key={idx} className="border-b last:border-none">
                    <td className="py-2 px-4">{comp.name}</td>
                    <td className="py-2 px-4">{comp.score ?? "N/A"}</td>
                    <td className="py-2 px-4">{comp.level}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "Teaching Suggestions" && (
        <div>
          <h3 className="text-lg font-semibold mb-2 text-[#426ED8]">
            Teaching Suggestions
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm rounded-xl overflow-hidden shadow">
              <thead className="bg-[#426ED8] text-white">
                <tr>
                  <th className="py-2 px-4 text-left">Lesson Objective</th>
                  <th className="py-2 px-4 text-left">Bloom's Level</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {info.teachingSuggestions.map((ts, idx) => (
                  <tr key={idx} className="border-b last:border-none">
                    <td className="py-2 px-4">{ts.objective}</td>
                    <td className="py-2 px-4">{ts.blooms}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "Learning Outcomes" && (
        <div className="text-gray-500 italic">Learning outcomes analysis not yet implemented.</div>
      )}
    </div>
  );
};

export default Results;
