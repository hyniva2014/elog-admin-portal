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
  getIncidentColors,
} from "./IncidentDistribution.styles";

import useIncidentDistribution from "../../../hooks/useIncidentDistribution";

import CustomTooltip from "./IncidentDistributionTooltip";

import {
  getChartConfig,
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


const ChartBars = ({ barConfigs }) => {
  return barConfigs.map((config) => <Bar key={config.key} {...config} />);
};

const LegendItems = ({ items }) => {
  return items.map((item) => (
    <ChartLegendItem key={item.name} seriesItem={item} />
  ));
};

const IncidentDistribution = () => {
  const theme = useTheme();
  const incidentColors = useMemo(() => getIncidentColors(theme), [theme]);

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [incidentScope, setIncidentScope] = useState("all");

  const [period, setPeriod] = useState("7d");

  const { incidentDistribution, loading } = useIncidentDistribution(
    period,

    incidentScope,
  );
  const seriesWithColors =
    incidentDistribution?.series?.map((item) => ({
      ...item,
      color: incidentColors[item.name] || theme.palette.grey[500],
    })) || [];

  const handleIncidentChange = (e) => {
    setIncidentScope(e.target.value);
  };

  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
  };

  const categories = incidentDistribution?.categories || [];

  const dateRange =
    incidentDistribution?.dateRange?.replaceAll(",", "") || "No data available";


  const chartData = useMemo(
    () => transformChartData(incidentDistribution, categories),

    [incidentDistribution, categories],
  );

  const chartConfig = getChartConfig(isMobile);

  const hasData = chartData.length > 0;

  const isLoading = loading;

  const isEmpty = !hasData && !isLoading;


  const { topLegendItems, bottomLegendItems } =
    splitLegendItems(seriesWithColors);


  const barConfigs = getBarConfigs(seriesWithColors, chartConfig.barMaxSize);


  const renderLegendSection = () => {
    if (!hasData || isLoading || !incidentDistribution?.series?.length) {
      return null;
    }

    const hasTopLegend = topLegendItems.length > 0;

    const hasBottomLegend = bottomLegendItems.length > 0;

    return (
      <LegendGrid>
        {hasTopLegend && (
          <LegendRow>
            <LegendItems items={topLegendItems} />
          </LegendRow>
        )}

        {hasBottomLegend && (
          <LegendRow>
            <LegendItems items={bottomLegendItems} />
          </LegendRow>
        )}
      </LegendGrid>
    );
  };


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
        <MenuItem value="all">All Incident</MenuItem>
        <MenuItem value="open">Open Only</MenuItem>
        <MenuItem value="resolved">Resolved</MenuItem>
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
        <MenuItem value="7d">7 Days</MenuItem>
        <MenuItem value="30d">30 Days</MenuItem>
        <MenuItem value="90d">90 Days</MenuItem>
      </Select>
    </PeriodControl>
  );


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
              stroke={theme.palette.divider}
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis
              dataKey="name"
              tick={{
                fill: theme.palette.text.secondary,

                fontSize: chartConfig.xAxisFontSize,
              }}
            />

            <YAxis
              tick={{
                fill: theme.palette.text.secondary,

                fontSize: chartConfig.yAxisFontSize,
              }}
              axisLine={{
                stroke: theme.palette.divider,
              }}
              label={{
                value: "Incident Distribution",

                angle: -90,

                position: "insideLeft",

                style: {
                  fill: theme.palette.text.secondary,

                  fontSize: chartConfig.labelFontSize,

                  textAnchor: "middle",
                },
              }}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={chartConfig.tooltipCursor}
            />

            <ChartBars barConfigs={barConfigs} />
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
