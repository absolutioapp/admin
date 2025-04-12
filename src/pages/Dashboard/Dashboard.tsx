import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import useDashboardStore, { Chapters } from "../../stores/dashboard.store";

const Dashboard: React.FC = () => {
  const { currentChapter } = useDashboardStore();

  return (
    <div>
      <Sidebar></Sidebar>
      <div className="ml-64 min-h-screen bg-gray-100 p-4">
        <h1 className="text-2xl font-bold">
          {Chapters[currentChapter].split("_").join(" ")}
        </h1>
      </div>
    </div>
  );
};

export default React.memo(Dashboard);
