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

const CATEGORIES = ["Mar 28", "Mar 29", "Mar 30", "Mar 31", "Apr 1", "Apr 2", "Apr 3", "Apr 4"];

const INCIDENT_SERIES = [
  { name: "ELD device Issue",            color: "#FE5429", data: [2, 3, 2, 4, 3, 2, 3, 2] },
  { name: "Web - Compliance Management", color: "#2563EB", data: [2, 2, 1, 2, 3, 2, 2, 2] },
  { name: "Mobile - Driver Log",         color: "#E20021", data: [2, 2, 1, 2, 2, 1, 2, 2] },
  { name: "Fleet Management",            color: "#30C151", data: [3, 2, 4, 3, 2, 3, 2, 3] },
];

const IncidentDistribution = () => {
  const theme = useTheme();
  const downSm = useMediaQuery(theme.breakpoints.down("sm"));
  const chartHeight = downSm ? 200 : 240;

  const CHART_STYLES = getChartStyles(theme);

  const [incidentScope, setIncidentScope] = useState("all");
  const [period, setPeriod] = useState("7d");

  const series = useMemo(
    () => INCIDENT_SERIES.map(({ name, data }) => ({ name, data })),
    [],
  );

  const colors = useMemo(() => INCIDENT_SERIES.map((s) => s.color), []);

  const chartOptions = useMemo(
    () => ({
      chart: {
        type: "bar",
        stacked: true,
        stackType: "normal",
        toolbar: { show: false },
        fontFamily: theme.typography.fontFamily,
      },
      plotOptions: {
        bar: { horizontal: false, columnWidth: "58%", borderRadius: 2 },
      },
      colors,
      dataLabels: { enabled: false },
      stroke: { width: 0 },
      xaxis: {
        categories: CATEGORIES,
        labels: {
          style: {
            colors: CHART_STYLES.axisLabelColor,
            fontSize: CHART_STYLES.axisLabelFontSize,
            fontWeight: CHART_STYLES.axisLabelFontWeight,
          },
        },
        axisBorder: { show: true, color: CHART_STYLES.axisBorderColor },
        axisTicks: { show: false },
      },
      yaxis: {
        max: 20,
        tickAmount: 4,
        title: {
          text: "Incident Distribution",
          style: {
            color: CHART_STYLES.axisLabelColor,
            fontSize: CHART_STYLES.yAxisTitleFontSize,
            fontWeight: CHART_STYLES.yAxisTitleFontWeight,
          },
        },
        labels: {
          style: {
            colors: CHART_STYLES.axisLabelColor,
            fontSize: CHART_STYLES.axisLabelFontSize,
          },
        },
        axisBorder: { show: true, color: CHART_STYLES.axisBorderColor },
      },
      grid: {
        borderColor: CHART_STYLES.gridBorderColor,
        strokeDashArray: 4,
        padding: { left: 8, right: 8 },
      },
      legend: { show: false },
      tooltip: {
        shared: true,
        intersect: false,
        custom: ({ series, dataPointIndex, w }) => {
          const category = w.globals.labels[dataPointIndex];
          const total = series.reduce((sum, s) => sum + (s[dataPointIndex] ?? 0), 0);

          const rows = w.globals.seriesNames
            .map((name, i) => {
              const val = series[i][dataPointIndex];
              if (val == null || val === 0) return "";
              const color = w.globals.colors[i];
              return `
                <div style="display:flex;align-items:center;gap:${CHART_STYLES.tooltipRowGap};padding:${CHART_STYLES.tooltipRowPadding};">
                  <span style="width:${CHART_STYLES.tooltipDotSize};height:${CHART_STYLES.tooltipDotSize};border-radius:50%;background:${color};flex-shrink:0;display:inline-block;"></span>
                  <span style="color:${CHART_STYLES.tooltipLabelColor};font-size:${CHART_STYLES.tooltipLabelFontSize};flex:1;">${name}:</span>
                  <span style="color:${CHART_STYLES.tooltipValueColor};font-weight:${CHART_STYLES.tooltipValueFontWeight};font-size:${CHART_STYLES.tooltipValueFontSize};">${val}</span>
                </div>`;
            })
            .join("");

          return `
            <div style="background:${CHART_STYLES.tooltipBg};border:1px solid ${CHART_STYLES.tooltipBorder};border-radius:${CHART_STYLES.tooltipBorderRadius};padding:${CHART_STYLES.tooltipPadding};box-shadow:${CHART_STYLES.tooltipShadow};min-width:${CHART_STYLES.tooltipMinWidth};">
              <div style="font-weight:${CHART_STYLES.tooltipCategoryFontWeight};font-size:${CHART_STYLES.tooltipCategoryFontSize};color:${CHART_STYLES.tooltipCategoryColor};margin-bottom:${CHART_STYLES.tooltipCategoryMarginBottom};padding-bottom:${CHART_STYLES.tooltipCategoryPaddingBottom};border-bottom:1px solid ${CHART_STYLES.tooltipDivider};">
                ${category}
              </div>
              ${rows}
              <div style="display:flex;align-items:center;gap:${CHART_STYLES.tooltipRowGap};padding:${CHART_STYLES.tooltipTotalPaddingTop} 0 0;margin-top:${CHART_STYLES.tooltipTotalMarginTop};border-top:1px solid ${CHART_STYLES.tooltipDivider};">
                <span style="width:${CHART_STYLES.tooltipDotSize};height:${CHART_STYLES.tooltipDotSize};flex-shrink:0;display:inline-block;"></span>
                <span style="color:${CHART_STYLES.tooltipLabelColor};font-size:${CHART_STYLES.tooltipLabelFontSize};flex:1;font-weight:${CHART_STYLES.tooltipTotalFontWeight};">Total:</span>
                <span style="color:${CHART_STYLES.tooltipValueColor};font-weight:${CHART_STYLES.tooltipValueFontWeight};font-size:${CHART_STYLES.tooltipValueFontSize};">${total}</span>
              </div>
            </div>`;
        },
      },
    }),
    [colors, theme.typography.fontFamily],
  );

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
                onChange={(e) => setIncidentScope(e.target.value)}
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
                onChange={(e) => setPeriod(e.target.value)}
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
          <LegendRow>
            {INCIDENT_SERIES.slice(0, 3).map((s) => (
              <LegendItem key={s.name}>
                <LegendDot dotcolor={s.color} />
                <LegendLabel>{s.name}</LegendLabel>
              </LegendItem>
            ))}
          </LegendRow>
          <LegendRow>
            {INCIDENT_SERIES.slice(3).map((s) => (
              <LegendItem key={s.name}>
                <LegendDot dotcolor={s.color} />
                <LegendLabel>{s.name}</LegendLabel>
              </LegendItem>
            ))}
          </LegendRow>
        </LegendGrid>
      </StyledCardContent>
    </CardContainer>
  );
};

export default IncidentDistribution;
