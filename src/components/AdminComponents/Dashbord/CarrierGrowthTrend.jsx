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
import { useTheme, MenuItem } from "@mui/material";

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

const AVAILABLE_YEARS = ["2024", "2025", "2026"];

const CHART_TITLE = "Carrier Growth Trend";
const CHART_SUBTITLE = "Jan.26 - Jun 26";
const DATA_KEY = "value";
const X_AXIS_KEY = "month";
const CHART_HEIGHT = 360;

const getFilteredData = (year) =>
  chartData.filter((item) => !item.year || item.year === year);

const CarrierGrowthTrend = () => {
  const [selectedYear, setSelectedYear] = useState("2026");

  const theme = useTheme();
  const chartLineColor = theme.palette.primary.main;
  const filteredData = getFilteredData(selectedYear);

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  return (
    <ChartContainer elevation={0} chartheight={CHART_HEIGHT}>
      <ChartHeader>
        <TitleBox>
          <ChartTitle variant="h6" component="h2">
            {CHART_TITLE}
          </ChartTitle>
          <ChartSubtitle variant="body2">{CHART_SUBTITLE}</ChartSubtitle>
        </TitleBox>

        <YearSelect
          select
          size="small"
          value={selectedYear}
          onChange={handleYearChange}
        >
          {AVAILABLE_YEARS.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </YearSelect>
      </ChartHeader>

      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={X_AXIS_KEY} />
          <YAxis />

          <Tooltip content={<ChartCustomTooltip tooltipKeys={TooltipKeys} />} />

          <Line
            type="monotone"
            dataKey={DATA_KEY}
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
