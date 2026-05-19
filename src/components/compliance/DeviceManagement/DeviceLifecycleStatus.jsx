import { useMemo, useRef, useState, useEffect } from "react";
import { Grid } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import {
  CardContainer,
  StyledCardContent,
  CardTitle,
  ContentStack,
  ChartBox,
  ChartCenterLabel,
  ChartCenterSubText,
  ChartCenterTotal,
  StatCardsWrapper,
  StatCardBox,
  StatCardLabel,
  StatCardCount,
} from "./DeviceLifecycleStatus.styles";

const DEFAULT_SEGMENTS = [
  {
    key: "active",
    label: "Active",
    count: 1095,
    chartColor: "#48bb78",
    bg: "#f0fff4",
    borderColor: "#9ae6b4",
    labelColor: "#48bb78",
  },
  {
    key: "inStock",
    label: "In Stock",
    count: 227,
    chartColor: "#4299e1",
    bg: "#ebf8ff",
    borderColor: "#90cdf4",
    labelColor: "#4299e1",
  },
  {
    key: "inMaintenance",
    label: "In Maintenance",
    count: 35,
    chartColor: "#ed8936",
    bg: "#fffaf0",
    borderColor: "#fbd38d",
    labelColor: "#dd6b20",
  },
  {
    key: "retired",
    label: "Retired",
    count: 23,
    chartColor: "#4a5568",
    bg: "#f7fafc",
    borderColor: "#cbd5e0",
    labelColor: "#4a5568",
  },
];

const DeviceLifecycleStatus = ({ segments = DEFAULT_SEGMENTS }) => {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const isNarrow = containerWidth > 0 && containerWidth < 420;
  const isWide = containerWidth >= 680;

  const chartPx = containerWidth === 0
    ? 360
    : isNarrow
      ? Math.min(containerWidth - 32, 320)
      : isWide
        ? 400
        : Math.min(Math.round(containerWidth * 0.50), 360);

  const cardAreaWidth = isNarrow
    ? containerWidth - 32
    : containerWidth - chartPx - 48;

  const cardWidth = Math.max((cardAreaWidth - 12) / 2, 60);

  // Font sizes scale with actual card width
  const labelSize  = cardWidth < 70  ? "0.6rem"
                   : cardWidth < 90  ? "0.68rem"
                   : cardWidth < 120 ? "0.75rem"
                   : cardWidth < 160 ? "0.8rem"
                   : "0.875rem";

  const numberSize = cardWidth < 70  ? "1.1rem"
                   : cardWidth < 90  ? "1.3rem"
                   : cardWidth < 120 ? "1.55rem"
                   : cardWidth < 160 ? "1.85rem"
                   : isWide          ? "2.4rem"
                   : "2.1rem";

  const cardPx = cardWidth < 80 ? 1 : cardWidth < 110 ? 1.25 : 1.5;
  const cardPy = cardWidth < 80 ? 1 : cardWidth < 110 ? 1.25 : 1.75;

  // Center label font sizes scale with chart size
  const totalFontSize = chartPx < 220 ? "1rem" : chartPx < 280 ? "1.375rem" : "1.75rem";
  const centerSubSize = chartPx < 220 ? "0.65rem" : "0.85rem";

  const series = useMemo(() => segments.map((s) => s.count), [segments]);
  const colors = useMemo(() => segments.map((s) => s.chartColor), [segments]);
  const total = useMemo(() => segments.reduce((acc, s) => acc + s.count, 0), [segments]);

  const chartOptions = useMemo(
    () => ({
      chart: {
        type: "donut",
        toolbar: { show: false },
        animations: { enabled: true },
      },
      labels: segments.map((s) => s.label),
      colors,
      legend: { show: false },
      dataLabels: { enabled: false },
      stroke: { width: 3, colors: ["#ffffff"] },
      plotOptions: {
        pie: {
          donut: {
            size: "70%",
            labels: { show: false },
          },
        },
      },
      tooltip: {
        y: { formatter: (val) => `${val} devices` },
      },
      states: {
        hover: { filter: { type: "lighten", value: 0.04 } },
      },
    }),
    [colors, segments],
  );


  const chartElement = chartPx > 0 ? (
    <ChartBox chartsize={chartPx}>
      <ReactApexChart
        key={chartPx}
        type="donut"
        height={chartPx}
        width={chartPx}
        series={series}
        options={chartOptions}
      />
      <ChartCenterLabel>
        <ChartCenterSubText fontsize={centerSubSize}>
          Total
        </ChartCenterSubText>
        <ChartCenterTotal fontsize={totalFontSize}>
          {total.toLocaleString()}
        </ChartCenterTotal>
      </ChartCenterLabel>
    </ChartBox>
  ) : null;

  const segmentCards = segments.map((s) => (
    <Grid item xs={6} key={s.key}>
      <StatCardBox
        bordercolor={s.borderColor}
        bgcolor={s.bg}
        cardpx={cardPx}
        cardpy={cardPy}
      >
        <StatCardLabel labelcolor={s.labelColor} fontsize={labelSize}>
          {s.label}
        </StatCardLabel>
        <StatCardCount labelcolor={s.labelColor} fontsize={numberSize}>
          {s.count.toLocaleString()}
        </StatCardCount>
      </StatCardBox>
    </Grid>
  ));

  return (
    <CardContainer variant="outlined" ref={containerRef}>
      <StyledCardContent>
        <CardTitle variant="h6" component="h2">
          Device Lifecycle Status
        </CardTitle>

        <ContentStack
          direction={isNarrow ? "column" : "row"}
          spacing={2}
          alignItems="center"
        >
          {chartElement}

          <StatCardsWrapper>
            <Grid
              container
              columnSpacing={isNarrow ? 1.5 : 2}
              rowSpacing={isNarrow ? 2.5 : 4.5}
              alignItems="stretch"
            >
              {segmentCards}
            </Grid>
          </StatCardsWrapper>
        </ContentStack>
      </StyledCardContent>
    </CardContainer>
  );
};

export default DeviceLifecycleStatus;
