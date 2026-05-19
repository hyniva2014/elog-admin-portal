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

const CATEGORIES = ["Mar 28", "Mar 29", "Mar 30", "Mar 31", "Apr 1", "Apr 2", "Apr 3", "Apr 4"];

const INCIDENT_SERIES = [
  { name: "ELD device Issue",            color: "#FE5429", data: [2, 3, 2, 4, 3, 2, 3, 2] },
  { name: "Web - Compliance Management", color: "#2563EB", data: [2, 2, 1, 2, 3, 2, 2, 2] },
  { name: "Mobile - Driver Log",         color: "#E20021", data: [2, 2, 1, 2, 2, 1, 2, 2] },
  { name: "Fleet Management",            color: "#30C151", data: [3, 2, 4, 3, 2, 3, 2, 3] },
];

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

  const [incidentScope, setIncidentScope] = useState("all");
  const [period, setPeriod] = useState("7d");

  // ── Named handlers ──────────────────────────────────────────────────────────
  const handleIncidentChange = (e) => setIncidentScope(e.target.value);
  const handlePeriodChange = (e) => setPeriod(e.target.value);

  // ── Series / colors ─────────────────────────────────────────────────────────
  const series = useMemo(
    () => INCIDENT_SERIES.map(({ name, data }) => ({ name, data })),
    [],
  );

  const colors = useMemo(() => INCIDENT_SERIES.map((s) => s.color), []);

  // ── Chart options (extracted to config file) ────────────────────────────────
  const chartOptions = useMemo(
    () => getIncidentChartOptions(theme, colors, CHART_STYLES, CATEGORIES),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [colors, theme.typography.fontFamily],
  );

  // ── Pre-computed legend rows ─────────────────────────────────────────────────
  const topLegendItems    = INCIDENT_SERIES.slice(0, 3);
  const bottomLegendItems = INCIDENT_SERIES.slice(3);

  return (
    <CardContainer variant="outlined">
      <StyledCardContent>
        <HeaderStack>
          <TitleBox>
            <ChartTitle variant="h6" component="h2">
              Incident Distribution
            </ChartTitle>
            <ChartSubtitle variant="body2">
              Mar 28, 2026 – Apr 4, 2026
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
                <MenuItem value="critical">Critical</MenuItem>
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
            key={chartHeight}
            type="bar"
            height={chartHeight}
            series={series}
            options={chartOptions}
          />
        </ChartWrapper>

        <LegendGrid>
          {renderLegendRow(topLegendItems)}
          {renderLegendRow(bottomLegendItems)}
        </LegendGrid>
      </StyledCardContent>
    </CardContainer>
  );
};

export default IncidentDistribution;
