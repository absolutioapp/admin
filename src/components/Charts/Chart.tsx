import React from "react";
import {
  LineChart,
  BarChart,
  AreaChart,
  Line,
  Bar,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type ChartType = "line" | "bar" | "area";

interface ChartWidgetProps {
  title: string;
  legend?: string;
  type: ChartType;
  data: any[];
  xKey: string;
  dataKeys: {
    key: string;
    color: string;
    name?: string; // отображаемое имя на легенде
  }[];
}

const ChartWidget: React.FC<ChartWidgetProps> = ({
  title,
  legend,
  type,
  data,
  xKey,
  dataKeys,
}) => {
  const renderChart = () => {
    switch (type) {
      case "bar":
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            {dataKeys.map(({ key, color, name }) => (
              <Bar key={key} dataKey={key} fill={color} name={name || key} />
            ))}
          </BarChart>
        );
      case "area":
        return (
          <AreaChart data={data}>
            <defs>
              {dataKeys.map(({ key, color }) => (
                <linearGradient
                  id={`gradient-${key}`}
                  key={key}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            {dataKeys.map(({ key, color, name }) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke={color}
                fill={`url(#gradient-${key})`}
                name={name || key}
              />
            ))}
          </AreaChart>
        );
      case "line":
      default:
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            {dataKeys.map(({ key, color, name }) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={color}
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                name={name || key}
              />
            ))}
          </LineChart>
        );
    }
  };

  return (
    <div className="w-full max-w-3xl rounded-2xl bg-white p-6 shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        {legend && <div className="text-sm text-gray-500">{legend}</div>}
      </div>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartWidget;
