import { useMemo, useRef, useState, useEffect } from "react";
import { Grid, useTheme } from "@mui/material";
import ReactApexChart from "react-apexcharts";

import { useDeviceLifecycle } from "../../../hooks";

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

import {
  CURRENT_YEAR,
  mapLifecycleToSegments,
  getChartDimensions,
  getResponsiveSizes,
  getChartOptions,
} from "./DeviceLifecycleStatus.Utils";

const mapSegmentsWithTheme = (segments, theme) => {
  const isDark = theme.palette.mode === "dark";
  return segments.map((s) => {
    let chartColor, bg, borderColor, labelColor;
    switch (s.key) {
      case "active":
        chartColor = theme.palette.success.main;
        bg = isDark ? theme.palette.success.darker : theme.palette.success.lighter;
        borderColor = theme.palette.success.light;
        labelColor = theme.palette.success.main;
        break;
      case "inStock":
        chartColor = theme.palette.info.main;
        bg = isDark ? theme.palette.info.darker : theme.palette.info.lighter;
        borderColor = theme.palette.info.light;
        labelColor = theme.palette.info.main;
        break;
      case "inMaintenance":
        chartColor = theme.palette.warning.main;
        bg = isDark ? theme.palette.warning.darker : theme.palette.warning.lighter;
        borderColor = theme.palette.warning.light;
        labelColor = isDark ? theme.palette.warning.light : theme.palette.warning.dark;
        break;
      case "retired":
      default:
        chartColor = theme.palette.grey[500];
        bg = theme.palette.grey[isDark ? 800 : 100];
        borderColor = theme.palette.grey[isDark ? 700 : 300];
        labelColor = theme.palette.grey[isDark ? 300 : 700];
        break;
    }
    return {
      ...s,
      chartColor,
      bg,
      borderColor,
      labelColor,
    };
  });
};

const StatCardItem = ({
  segment,
  cardPx,
  cardPy,
  labelSize,
  numberSize,
}) => (
  <Grid item xs={6}>
    <StatCardBox
      bordercolor={segment.borderColor}
      bgcolor={segment.bg}
      cardpx={cardPx}
      cardpy={cardPy}
    >
      <StatCardLabel labelcolor={segment.labelColor} fontsize={labelSize}>
        {segment.label}
      </StatCardLabel>

      <StatCardCount labelcolor={segment.labelColor} fontsize={numberSize}>
        {segment.count.toLocaleString()}
      </StatCardCount>
    </StatCardBox>
  </Grid>
);

const DeviceLifecycleStatus = ({
  year = CURRENT_YEAR,
}) => {
  const containerRef = useRef(null);
  const theme = useTheme();

  const [containerWidth, setContainerWidth] = useState(0);

  const { deviceLifecycle } = useDeviceLifecycle(year);

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

  const displayedSegments = useMemo(() => {
    const rawSegments = mapLifecycleToSegments(deviceLifecycle || {});
    return mapSegmentsWithTheme(rawSegments, theme);
  }, [deviceLifecycle, theme]);

  const { isNarrow, isWide, chartPx, cardWidth } =
    getChartDimensions(containerWidth);

  const {
    labelSize,
    numberSize,
    cardPx,
    cardPy,
    totalFontSize,
    centerSubSize,
  } = getResponsiveSizes(cardWidth, chartPx, isWide);

  const series = useMemo(
    () => displayedSegments.map((s) => s.count),
    [displayedSegments],
  );

  const colors = useMemo(
    () => displayedSegments.map((s) => s.chartColor),
    [displayedSegments],
  );

  const total = deviceLifecycle?.total_device || 0;

  const chartOptions = useMemo(
    () => getChartOptions(displayedSegments, colors),
    [displayedSegments, colors],
  );

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
                {total}
              </ChartCenterTotal>
            </ChartCenterLabel>
          </ChartBox>

          <StatCardsWrapper>
            <Grid
              container
              columnSpacing={isNarrow ? 1.5 : 2}
              rowSpacing={isNarrow ? 2.5 : 4.5}
            >
              {displayedSegments.map((s) => (
                <StatCardItem
                  key={s.key}
                  segment={s}
                  cardPx={cardPx}
                  cardPy={cardPy}
                  labelSize={labelSize}
                  numberSize={numberSize}
                />
              ))}
            </Grid>
          </StatCardsWrapper>
        </ContentStack>
      </StyledCardContent>
    </CardContainer>
  );
};

export default DeviceLifecycleStatus;
