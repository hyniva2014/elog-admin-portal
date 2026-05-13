import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useTheme } from "@mui/material";
// import { TooltipContainer } from "./CarrierGrowthTrend.styled";

import {
  ChartContainer,
  ChartTitle,
  TooltipContainer,
  TooltipLabel,
  TooltipRow,
  TooltipText,
  TooltipValue,
} from "./CarrierGrowthTrend.styled";

const CarrierGrowthTrend = ({
  title = "Chart",
  data = [],
  dataKey = "value",
  xAxisKey = "month",
  lineColor = "#2563EB",
  height = 360,
  tooltipKeys = [],
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const tooltipData = payload[0].payload;

      return (
        <TooltipContainer elevation={3}>
          <TooltipLabel>{label}</TooltipLabel>

          {tooltipKeys.map((item) => (
            <TooltipRow key={item.key}>
              <TooltipText>{item.label}</TooltipText>

              <TooltipValue textcolor={item.color}>
                {tooltipData[item.key]}
              </TooltipValue>
            </TooltipRow>
          ))}
        </TooltipContainer>
      );
    }

    return null;
  };

  return (
    <ChartContainer elevation={0} chartheight={height}>
      <ChartTitle isdark={isDark}>{title}</ChartTitle>

      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey={xAxisKey} />

          <YAxis />

          <Tooltip content={<CustomTooltip />} />

          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={lineColor}
            strokeWidth={3}
            dot={{
              r: 5,
              fill: lineColor,
            }}
            activeDot={{
              r: 7,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default CarrierGrowthTrend;
