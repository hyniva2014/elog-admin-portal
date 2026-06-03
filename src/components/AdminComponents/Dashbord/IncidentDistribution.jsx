import { useMemo, useState } from "react";
import { InputLabel, MenuItem, Select, useMediaQuery, useTheme } from "@mui/material";
import ReactApexChart from "react-apexcharts";
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
  getChartStyles,
} from "./IncidentDistribution.styles";
import { getIncidentChartOptions } from "./IncidentDistribution.config";
import useIncidentDistribution from "../../../hooks/useIncidentDistribution";

// ─── Sub-component ────────────────────────────────────────────────────────────

const ChartLegendItem = ({ seriesItem }) => (
  <LegendItem key={seriesItem.name}>
    <LegendDot dotcolor={seriesItem.color} />
    <LegendLabel>{seriesItem.name}</LegendLabel>
  </LegendItem>
);

// ─── Legend row helper ────────────────────────────────────────────────────────

const renderLegendRow = (items) => (
  <LegendRow>
    {items.map((s) => (
      <ChartLegendItem key={s.name} seriesItem={s} />
    ))}
  </LegendRow>
);

// ─── Component ────────────────────────────────────────────────────────────────

const IncidentDistribution = () => {
  const theme = useTheme();
  const downSm = useMediaQuery(theme.breakpoints.down("sm"));
  const chartHeight = downSm ? 200 : 240;

  const CHART_STYLES = getChartStyles(theme);

  // State for filters
  const [incidentScope, setIncidentScope] = useState("all");
  const [period, setPeriod] = useState("7d");

  // API hook - following CarrierGrowthTrend pattern
  const { incidentDistribution, loading } = useIncidentDistribution(period, incidentScope);

  // ── Named handlers ──────────────────────────────────────────────────────────
  const handleIncidentChange = (e) => setIncidentScope(e.target.value);
  const handlePeriodChange = (e) => setPeriod(e.target.value);

  // ── Series / colors from API data ──────────────────────────────────────────
  const series = useMemo(
    () => incidentDistribution?.series?.map(({ name, data }) => ({ name, data })) || [],
    [incidentDistribution],
  );

  const colors = useMemo(
    () => incidentDistribution?.series?.map((s) => s.color) || [],
    [incidentDistribution],
  );

  const categories = useMemo(
    () => incidentDistribution?.categories || [],
    [incidentDistribution],
  );

  const dateRange = useMemo(
    () => incidentDistribution?.dateRange || "No data available",
    [incidentDistribution],
  );

  // ── Chart options (extracted to config file) ────────────────────────────────
  const chartOptions = useMemo(
    () => getIncidentChartOptions(theme, colors, CHART_STYLES, categories),
    [colors, theme, CHART_STYLES, categories],
  );

  // ── Pre-computed legend items ───────────────────────────────────────────────
  const topLegendItems = incidentDistribution?.series?.slice(0, 3) || [];
  const bottomLegendItems = incidentDistribution?.series?.slice(3) || [];

  return (
    <CardContainer variant="outlined">
      <StyledCardContent>
        <HeaderStack>
          <TitleBox>
            <ChartTitle variant="h6" component="h2">
              Incident Distribution
            </ChartTitle>
            <ChartSubtitle variant="body2">
              {dateRange}
            </ChartSubtitle>
          </TitleBox>

          <FiltersStack>
            <FilterControl size="small">
              <InputLabel id="incident-filter-label">Incident</InputLabel>
              <Select
                labelId="incident-filter-label"
                label="Incident"
                value={incidentScope}
                onChange={handleIncidentChange}
              >
                <MenuItem value="all">All Incident</MenuItem>
                <MenuItem value="open">Open only</MenuItem>
                <MenuItem value="resolved">Resolved</MenuItem>
              </Select>
            </FilterControl>
            <PeriodControl size="small">
              <InputLabel id="period-label">Period</InputLabel>
              <Select
                labelId="period-label"
                label="Period"
                value={period}
                onChange={handlePeriodChange}
              >
                <MenuItem value="7d">7 days</MenuItem>
                <MenuItem value="30d">30 days</MenuItem>
                <MenuItem value="90d">90 days</MenuItem>
              </Select>
            </PeriodControl>
          </FiltersStack>
        </HeaderStack>

        <ChartWrapper>
          <ReactApexChart
            key={`${chartHeight}-${period}`}
            type="bar"
            height={chartHeight}
            series={series}
            options={chartOptions}
          />
        </ChartWrapper>

        {series.length > 0 && (
          <LegendGrid>
            {topLegendItems.length > 0 && renderLegendRow(topLegendItems)}
            {bottomLegendItems.length > 0 && renderLegendRow(bottomLegendItems)}
          </LegendGrid>
        )}
      </StyledCardContent>
    </CardContainer>
  );
};

export default IncidentDistribution;
