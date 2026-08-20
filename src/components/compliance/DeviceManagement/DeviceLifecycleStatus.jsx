import { useMemo, useRef, useState, useEffect } from "react";
import { Grid, useTheme } from "@mui/material";
import ReactApexChart from "react-apexcharts";

import { useDeviceLifecycle } from "../../../hooks";

import {
  CardContainer,
  StyledCardContent,
  CardTitle,
  StatCardBox,
  StatCardLabel,
  StatCardCount,
  SegmentWrapper,
  SegmentRow,
  SegmentLabelWrapper,
  SegmentLabelContent,
  SegmentDot,
  SegmentLabel,
  ProgressBarWrapper,
  ProgressBarFill,
  ProgressCount,
  ProgressPercentage,
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
      case "allocated":
        chartColor = theme.palette.custom.allocatedOrange;
        bg = isDark ? "#FFE0B2" : "#FFF3E0";
        borderColor = "#FFCC80";
        labelColor = theme.palette.custom.allocatedOrange;
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

  const getBarColor = (key) => {
    switch (key) {
      case "active":
        return theme.palette.custom.activeGreen;

      case "inStock":
        return theme.palette.custom.inStockBlue;

      case "allocated":
        return theme.palette.custom.allocatedOrange;

      case "retired":
      default:
        return theme.palette.custom.retiredGrey;
    }
  };

  const getBarWidth = (segmentCount, percentage) => {
    if (segmentCount <= 0) return "0%";

    return percentage >= 95 ? "94%" : `${percentage}%`;
  };

  const getProgressBarColor = (segmentCount, key) => {
    return segmentCount > 0 ? getBarColor(key) : "transparent";
  };

  const getFormattedCount = (count) => {
    return count.toLocaleString();
  };

  const getFormattedPercentage = (percentage) => {
    return `${String(percentage).padStart(2, "0")}%`;
  };

  const renderDeviceStatus = () =>
    displayedSegments.map((segment) => {
      const percentage =
        total > 0 ? Math.round((segment.count / total) * 100) : 0;

      return (
        <SegmentWrapper item xs={12} key={segment.key}>
          <SegmentRow container alignItems="center" spacing={2} wrap="nowrap">
            <SegmentLabelWrapper item>
              <SegmentLabelContent>
                <SegmentDot dotcolor={getBarColor(segment.key)} />

                <SegmentLabel variant="inherit">{segment.label}</SegmentLabel>
              </SegmentLabelContent>
            </SegmentLabelWrapper>

            <Grid item xs>
              <ProgressBarWrapper>
                <ProgressBarFill
                  barwidth={getBarWidth(segment.count, percentage)}
                  barcolor={getProgressBarColor(segment.count, segment.key)}
                >
                  <ProgressCount variant="inherit">
                    {getFormattedCount(segment.count)}
                  </ProgressCount>
                </ProgressBarFill>

                <ProgressPercentage variant="inherit">
                  {getFormattedPercentage(percentage)}
                </ProgressPercentage>
              </ProgressBarWrapper>
            </Grid>
          </SegmentRow>
        </SegmentWrapper>
      );
    });

  return (
    <CardContainer variant="outlined" ref={containerRef}>
      <StyledCardContent>
        <CardTitle variant="inherit" component="h2">
          Device Status
        </CardTitle>

        <Grid container spacing={4}>
          {renderDeviceStatus()}
        </Grid>
      </StyledCardContent>
    </CardContainer>
  );
};

export default DeviceLifecycleStatus;
