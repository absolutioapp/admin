import React from "react";
import ChartWidget from "../../../../components/Charts/Chart";

const DashboardMain = () => {
  const chartData = [
    { month: "Jan", users: 400 },
    { month: "Feb", users: 800 },
    { month: "Mar", users: 600 },
    { month: "Apr", users: 900 },
    { month: "May", users: 1100 },
  ];

  return (
    <div className="flex flex-wrap gap-8">
      <ChartWidget
        title="Monthly Active Users"
        legend="Active users in 2025"
        type="line"
        data={chartData}
        xKey="month"
        dataKeys={[{ key: "users", color: "#10b981", name: "User" }]} // Tailwind emerald-500
      />
      <ChartWidget
        title="Monthly Active Subscribers"
        legend="Active subscribers in 2025"
        type="area"
        data={chartData}
        xKey="month"
        dataKeys={[
          { key: "users", color: "rgba(217, 232, 117, 1)", name: "User" },
        ]} // Tailwind emerald-500
      />
      <ChartWidget
        title="Subscription Procent"
        type="bar"
        data={chartData}
        xKey={"month"}
        dataKeys={[
          { key: "users", color: "rgba(217, 232, 117, 1)", name: "User" },
        ]}
      />
    </div>
  );
};

export default DashboardMain;
