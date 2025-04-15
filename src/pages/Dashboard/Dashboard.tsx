import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import useDashboardStore, { Chapters } from "../../stores/dashboard.store";
import DashboardMain from "./components/Main/DashboardMain";
import DashboardSettings from "./components/Settings/DashboardSettings";
import DashboardImage from "./components/Image/DashboardImage";
import DashboardUser from "./components/User/DashboardUser";

const Dashboard: React.FC = () => {
  const { currentChapter } = useDashboardStore();

  return (
    <div>
      <Sidebar></Sidebar>
      <div className="ml-64 min-h-screen bg-none p-4">
        <h1 className="text-2xl font-bold">
          {Chapters[currentChapter].split("_").join(" ")}
        </h1>
        <div className="mt-4 bg-none p-4">
          {Chapters[currentChapter] === "Dashboard" && <DashboardMain />}
          {Chapters[currentChapter] === "Settings" && <DashboardSettings />}
          {Chapters[currentChapter] === "Image_Editor" && <DashboardImage />}
          {Chapters[currentChapter] === "User_Editor" && <DashboardUser />}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Dashboard);
