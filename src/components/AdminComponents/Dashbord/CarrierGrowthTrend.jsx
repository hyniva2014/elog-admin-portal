import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useState } from "react";
import { useTheme, TextField, MenuItem } from "@mui/material";

import {
  ChartContainer,
  ChartHeader,
  ChartTitle,
  ChartSubtitle,
  YearSelect,
} from "./CarrierGrowthTrend.styled";

import ChartCustomTooltip from "./ChartCustomTooltip";
import { chartData, TooltipKeys } from "./AdminConstant";
import { TitleBox } from "./IncidentDistribution.styles";

const CarrierGrowthTrend = () => {
  const [selectedYear, setSelectedYear] = useState("2026");

  const theme = useTheme();

  const title = "Carrier Growth Trend";
  const subtitle = "Jan.26 - Jun 26";
  const dataKey = "value";
  const xAxisKey = "month";
  const height = 360;
  const chartLineColor = theme.palette.primary.main;


  return (
    <ChartContainer elevation={0} chartheight={height}>
      <ChartHeader>
        <TitleBox>
          <ChartTitle variant="h6" component="h2">
            {title}
          </ChartTitle>
          <ChartSubtitle variant="body2">{subtitle}</ChartSubtitle>
        </TitleBox>

        <YearSelect
          select
          size="small"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <MenuItem value="2024">2024</MenuItem>
          <MenuItem value="2025">2025</MenuItem>
          <MenuItem value="2026">2026</MenuItem>
        </YearSelect>
      </ChartHeader>

      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxisKey} />
          <YAxis />

          <Tooltip content={<ChartCustomTooltip tooltipKeys={TooltipKeys} />} />

          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={chartLineColor}
            strokeWidth={3}
            dot={{
              r: 5,
              fill: chartLineColor,
            }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default CarrierGrowthTrend;
