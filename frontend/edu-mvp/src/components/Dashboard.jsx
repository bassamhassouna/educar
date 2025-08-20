import React, { useState } from "react";
import { FaTasks, FaChartBar, FaUser } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";

// Import other feature components
import DashboardOverview from "./dashboard/DashboardOverview";
import TasksPage from "./dashboard/TasksPage";
import AnalysisPage from "./dashboard/AnalysisPage";
import ProfilePage from "./dashboard/ProfilePage";
import ParentAnalyse from "./dashboard/ParentAnalyse";

const Dashboard = ({ onUpload }) => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [analysisHistory, setAnalysisHistory] = useState([]);

  const [newAnalysis, setNewAnalysis] = useState(false);

  const tabs = [
    { name: "Dashboard", icon: <FaChartBar size={18} /> },
    { name: "Tasks", icon: <FaTasks size={18} /> },
    { name: "Analyse", icon: <IoAddCircleOutline size={20} /> },
    { name: "Profile", icon: <FaUser size={18} /> },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return <DashboardOverview />;

      case "Tasks":
        return <TasksPage />;

      case "Analyse":
        return newAnalysis ? (
          <AnalysisPage goBack={() => setNewAnalysis(false)} showHistory={() => setAnalysisHistory([
              {
                title: "Lesson 1: Intro to Physics",
                summary: "Covers Newton's laws, gravity, and motion.",
                status: "complete",
              },
              {
                title: "Lesson 2: Advanced Chemistry",
                summary: "Analysing bonding types and reaction rates.",
                status: "in-progress",
              },
          ])}/>
        ) : (
          <ParentAnalyse
            analyses={analysisHistory}
            startNewAnalysis={() => setNewAnalysis(true)}
          />
        );

      case "Profile":
        return <ProfilePage />;

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-[#f4f7ff]">
      {/* Sidebar */}
      <aside
        className={`transition-all duration-300 bg-white shadow-md ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="flex items-center justify-between p-6">
          {sidebarOpen && (
            <span className="text-2xl font-bold text-[#426ED8]">
              C.B.E Ready
            </span>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-500 text-xl font-bold hover:text-[#426ED8]"
          >
            {sidebarOpen ? "<" : ">"}
          </button>
        </div>
        <nav className="mt-6 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => {
                setActiveTab(tab.name);
                if (tab.name !== "Analyse") {
                  setShowNewAnalysis(false); // Reset if leaving Analyse
                }
              }}
              className={`flex items-center w-full px-4 py-2 text-left hover:bg-[#f4f7ff] transition hover:cursor-pointer ${
                activeTab === tab.name
                  ? "bg-[#e8efff] text-[#426ED8] font-semibold"
                  : "text-gray-700"
              }`}
            >
              <span className="mr-3">{tab.icon}</span>
              {sidebarOpen && tab.name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        {/* Topbar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">{activeTab}</h1>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search everything..."
              className="w-64 px-4 py-2 rounded-full border border-[#d0d7f5] bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#426ED8] focus:ring-0 transition"
            />
          </div>
        </div>

        {/* Dynamic Page Content */}
        {renderTabContent()}
      </main>
    </div>
  );
};

export default Dashboard;
