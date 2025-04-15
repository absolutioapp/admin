interface ChartWidgetProps {
  title: string;
  legend?: string;
  type: "line" | "bar" | "area";
  data: any[];
  xKey: string;
  dataKey: string;
  color?: string;
}


export type { ChartWidgetProps };