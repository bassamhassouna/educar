import React from "react";

const DashboardOverview = () => {
  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-gray-500">Average Score</h2>
          <p className="text-2xl font-bold text-[#426ED8]">94.2</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-gray-500">Lessons Analyzed</h2>
          <p className="text-2xl font-bold text-[#426ED8]">21</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-gray-500">Score Change</h2>
          <p className="text-2xl font-bold text-green-600">+ 3.2</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow h-64 flex flex-col">
          <h2 className="text-[#426ED8] font-semibold mb-2">Card 1</h2>
          <div className="flex-1 flex items-center justify-center text-gray-400">
            [Waiting for you to decide cards...]
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow h-64 flex flex-col">
          <h2 className="text-[#426ED8] font-semibold mb-2">Card 2</h2>
          <div className="flex-1 flex items-center justify-center text-gray-400">
            [Waiting for you to decide cards...]
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
