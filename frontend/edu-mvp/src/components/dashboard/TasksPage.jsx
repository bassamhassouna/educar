import React from "react";

const TasksPage = () => {
  // Example placeholder tasks
  const tasks = [
    { id: 1, title: "Upload Module 1", status: "Pending" },
    { id: 2, title: "Review AI Feedback", status: "In Progress" },
    { id: 3, title: "Adjust Lesson Plan", status: "Completed" },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-[#426ED8] font-semibold mb-4">Tasks</h2>
      <ul className="divide-y divide-gray-200">
        {tasks.map((task) => (
          <li key={task.id} className="flex justify-between py-3">
            <span>{task.title}</span>
            <span
              className={`text-sm px-2 py-1 rounded-full ${
                task.status === "Completed"
                  ? "bg-green-100 text-green-700"
                  : task.status === "In Progress"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {task.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksPage;
