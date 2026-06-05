import { useMemo, useState } from "react";
import {
  InputLabel,
  MenuItem,
  Select,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import {
  CardContainer,
  StyledCardContent,
  HeaderStack,
  TitleBox,
  ChartTitle,
  ChartSubtitle,
  FiltersStack,
  FilterControl,
  PeriodControl,
  ChartWrapper,
  LegendGrid,
  LegendRow,
  LegendItem,
  LegendDot,
  LegendLabel,
  NoDataBox,
} from "./IncidentDistribution.styles";

import useIncidentDistribution from "../../../hooks/useIncidentDistribution";
import CustomTooltip from "./IncidentDistributionTooltip";
import {
  getChartConfig,
  getBarRadius,
  incidentOptions,
  periodOptions,
  splitLegendItems,
  transformChartData,
  getBarConfigs,
} from "./IncidentDistribution.utils";


const ChartLegendItem = ({ seriesItem }) => (
  <LegendItem>
    <LegendDot dotcolor={seriesItem.color} />
    <LegendLabel>{seriesItem.name}</LegendLabel>
  </LegendItem>
);

const IncidentDistribution = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [incidentScope, setIncidentScope] = useState("all");
  const [period, setPeriod] = useState("7d");

  const { incidentDistribution, loading } = useIncidentDistribution(
    period,
    incidentScope,
  );

  const handleIncidentChange = (e) => {
    setIncidentScope(e.target.value);
  };

  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
  };

  const categories = incidentDistribution?.categories || [];

  const dateRange =
    incidentDistribution?.dateRange?.replaceAll(",", "") || "No data available";

  // Transform chart data
  const chartData = useMemo(
    () => transformChartData(incidentDistribution, categories),
    [incidentDistribution, categories],
  );

  // Get chart configuration
  const chartConfig = getChartConfig(isMobile);
  const hasData = chartData.length > 0;
  const isLoading = loading;
  const isEmpty = !hasData && !isLoading;

  // Split legend items
  const { topLegendItems, bottomLegendItems } = splitLegendItems(
    incidentDistribution?.series,
  );

  // Get bar configurations
  const barConfigs = getBarConfigs(
    incidentDistribution?.series,
    chartConfig.barMaxSize,
  );

  // Helper to render legend items
  const renderLegendItems = (legendItems) => {
    return legendItems.map((item) => (
      <ChartLegendItem key={item.name} seriesItem={item} />
    ));
  };

  // Render legend section
  const renderLegendSection = () => {
    if (!hasData || isLoading || !incidentDistribution?.series?.length) {
      return null;
    }

    const hasTopLegend = topLegendItems.length > 0;
    const hasBottomLegend = bottomLegendItems.length > 0;

    return (
      <LegendGrid>
        {hasTopLegend && (
          <LegendRow>{renderLegendItems(topLegendItems)}</LegendRow>
        )}
        {hasBottomLegend && (
          <LegendRow>{renderLegendItems(bottomLegendItems)}</LegendRow>
        )}
      </LegendGrid>
    );
  };

  // Filter renderers
  const renderIncidentFilter = () => (
    <FilterControl size="small" fullWidth={isMobile}>
      <InputLabel id="incident-filter-label">Incident</InputLabel>
      <Select
        labelId="incident-filter-label"
        label="Incident"
        value={incidentScope}
        onChange={handleIncidentChange}
        disabled={isLoading}
      >
        {incidentOptions.map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FilterControl>
  );

  const renderPeriodFilter = () => (
    <PeriodControl size="small" fullWidth={isMobile}>
      <InputLabel id="period-label">Period</InputLabel>
      <Select
        labelId="period-label"
        label="Period"
        value={period}
        onChange={handlePeriodChange}
        disabled={isLoading}
      >
        {periodOptions.map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </PeriodControl>
  );

  // Chart content renderer
  const renderChartContent = () => {
    if (isLoading) {
      return <NoDataBox>Loading incident data...</NoDataBox>;
    }

    if (isEmpty) {
      return <NoDataBox>No incident data available</NoDataBox>;
    }

    if (hasData) {
      return (
        <ResponsiveContainer width="100%" height={chartConfig.chartHeight}>
          <BarChart data={chartData} margin={chartConfig.chartMargins}>
            <CartesianGrid
              stroke="#E5E7EB"
              strokeDasharray="4 4"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tick={{
                fill: "#64748B",
                fontSize: chartConfig.xAxisFontSize,
              }}
            />
            <YAxis
              tick={{
                fill: "#64748B",
                fontSize: chartConfig.yAxisFontSize,
              }}
              axisLine={{
                stroke: "#CBD5E1",
              }}
              label={{
                value: "Incident Distribution",
                angle: -90,
                position: "insideLeft",
                style: {
                  fill: "#64748B",
                  fontSize: chartConfig.labelFontSize,
                  textAnchor: "middle",
                },
              }}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={chartConfig.tooltipCursor}
            />
            {barConfigs.map((config) => (
              <Bar key={config.key} {...config} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      );
    }

    return null;
  };

  return (
    <CardContainer variant="outlined">
      <StyledCardContent>
        <HeaderStack>
          <TitleBox>
            <ChartTitle>Incident Distribution</ChartTitle>
            <ChartSubtitle>{dateRange}</ChartSubtitle>
          </TitleBox>
          <FiltersStack>
            {renderIncidentFilter()}
            {renderPeriodFilter()}
          </FiltersStack>
        </HeaderStack>

        <ChartWrapper>{renderChartContent()}</ChartWrapper>

        {renderLegendSection()}
      </StyledCardContent>
    </CardContainer>
  );
};

export default IncidentDistribution;
