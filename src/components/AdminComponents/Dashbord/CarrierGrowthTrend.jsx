import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useMemo, useState } from "react";
import { useTheme, MenuItem } from "@mui/material";

import {
  ChartContainer,
  ChartHeader,
  ChartTitle,
  ChartSubtitle,
  YearSelect,
} from "./CarrierGrowthTrend.styled";

import ChartCustomTooltip from "./ChartCustomTooltip";
import { TooltipKeys } from "./AdminConstant";
import { TitleBox } from "./IncidentDistribution.styles";
import { useCarrierGrowthTrend } from "../../../hooks";

import {
  CURRENT_YEAR,
  AVAILABLE_YEARS,
  CHART_TITLE,
  DATA_KEY,
  X_AXIS_KEY,
  CHART_HEIGHT,
  getTrendArray,
  getVisibleTrendData,
  formatSubtitle,
} from "./CarrierGrowthTrend.utils";


const CarrierGrowthTrend = () => {
  const DEFAULT_OPTION = "Last 6 months";

  const [selectedYear, setSelectedYear] = useState(DEFAULT_OPTION);

  const apiYear =
    selectedYear === "Last 6 months" ? CURRENT_YEAR : selectedYear;

  const { carrierGrowthTrend } = useCarrierGrowthTrend(apiYear);


  const theme = useTheme();

  const chartLineColor = theme.palette.primary.main;

  const trendData = useMemo(() => {
    const parsedTrend = getTrendArray(carrierGrowthTrend || {});

    return getVisibleTrendData(parsedTrend, selectedYear);
  }, [carrierGrowthTrend, selectedYear]);

  const subtitle = useMemo(
    () => formatSubtitle(trendData, selectedYear),
    [trendData, selectedYear],
  );

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <ChartContainer elevation={0} chartheight={CHART_HEIGHT}>
      <ChartHeader>
        <TitleBox>
          <ChartTitle variant="h6" component="h2">
            {CHART_TITLE}
          </ChartTitle>

          <ChartSubtitle variant="body2">{subtitle}</ChartSubtitle>
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
        <LineChart data={trendData}>
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
