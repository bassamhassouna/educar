import React from "react";
import { FileText } from "lucide-react";

export default function ParentAnalyse({ analyses, startNewAnalysis }) {
  const hasAnalyses = analyses && analyses.length > 0;

  // Skeleton loader card to show for "in-progress" items
  const LoadingCard = () => (
    <div className="bg-white rounded-xl shadow-md animate-pulse p-6 w-[475px] h-[240px] flex flex-col justify-between">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-10 h-10 rounded-full bg-gray-300" />
        <div className="h-6 bg-gray-300 rounded w-3/4" />
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded w-full" />
        <div className="h-4 bg-gray-300 rounded w-5/6" />
        <div className="h-4 bg-gray-300 rounded w-2/3" />
      </div>
      <div className="mt-6 w-24 h-6 bg-gray-300 rounded" />
    </div>
  );

  return (
    <div className="px-6 py-8 font-[Inter] min-h-[70vh]">
      {!hasAnalyses && (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center">
          <div className="w-56 h-56 bg-[#E9EEFB] rounded-full flex items-center justify-center mb-8">
            <FileText size={64} className="text-[#426ED8]" />
          </div>

          <h2 className="text-xl font-semibold text-neutral-800 mb-2">
            No analyses yet
          </h2>
          <p className="text-neutral-600 max-w-sm mb-6">
            Upload and analyse your first lesson to start generating insights and
            suggestions.
          </p>

          <button
            onClick={startNewAnalysis}
            className="bg-[#426ED8] hover:bg-[#355bb3] hover:cursor-pointer text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Analyse your first lesson
          </button>
        </div>
      )}

      {hasAnalyses && (
        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(auto-fill, 400px)",
            columnGap: "8rem",
            rowGap: "2.5rem",
            justifyContent: "start",
          }}
        >
          {analyses.map((analysis, idx) =>
            analysis.status === "in-progress" ? (
              <LoadingCard key={idx} />
            ) : (
              <div
                key={idx}
                className="relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:scale-[1.03] transition-transform duration-300 p-6 w-[475px] h-[240px] flex flex-col justify-between"
              >
                {/* Card header */}
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="text-[#426ED8]" size={32} />
                  <h3 className="font-semibold text-neutral-900 text-xl leading-tight">
                    {analysis.title}
                  </h3>
                </div>

                {/* Summary */}
                <p className="text-base text-neutral-700 mb-6 leading-relaxed line-clamp-3">
                  {analysis.summary}
                </p>

                {/* Footer with status and button */}
                <div className="flex justify-between items-center">
                  <span
                    className={`inline-block px-5 py-2 rounded-full text-sm font-medium ${
                      analysis.status === "complete"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {analysis.status === "complete" ? "Complete" : "In Progress"}
                  </span>

                  <button
                    className="text-[#426ED8] hover:text-[#355bb3] font-semibold text-sm"
                    onClick={() => alert(`View details for "${analysis.title}"`)}
                  >
                    View Details →
                  </button>
                </div>

                {/* Optional footer info (e.g. last updated) */}
                <p className="mt-3 text-xs text-gray-400 italic text-right">
                  Last updated: {new Date().toLocaleDateString()}
                </p>
              </div>

            )
          )}
        </div>
      )}
    </div>
  );
}
