import { useMemo, useRef, useState, useEffect } from "react";

import { Grid } from "@mui/material";
import ReactApexChart from "react-apexcharts";

import { useServices } from "../../../services/services";

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
  // DEFAULT_SEGMENTS,
  CURRENT_YEAR,
  mapLifecycleToSegments,
  getChartDimensions,
  getResponsiveSizes,
  getChartOptions,
} from "./DeviceLifecycleStatus.Utils";

const DeviceLifecycleStatus = ({
  // segments = DEFAULT_SEGMENTS,
  year = CURRENT_YEAR,
}) => {
  const containerRef = useRef(null);

  const [containerWidth, setContainerWidth] = useState(0);

  const [apiSegments, setApiSegments] = useState(null);

  const { fetchApi } = useServices();

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

  const fetchLifecycle = async () => {
    try {
      const response = await fetchApi(
        `/masteradmin/dashboard-metrics?year=${year}`,
      );

      const lifecycle = response?.body?.device_life_cycle;

      if (lifecycle) {
        setApiSegments(mapLifecycleToSegments(lifecycle));
      }
    } catch (error) {
      console.error("Error fetching device lifecycle status:", error);
    }
  };

  useEffect(() => {
    fetchLifecycle();
  }, [year]);

  const displayedSegments = apiSegments ?? mapLifecycleToSegments();

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

  const total = useMemo(
    () => displayedSegments.reduce((acc, s) => acc + s.count, 0),
    [displayedSegments],
  );

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
                {total.toLocaleString()}
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
                <Grid item xs={6} key={s.key}>
                  <StatCardBox
                    bordercolor={s.borderColor}
                    bgcolor={s.bg}
                    cardpx={cardPx}
                    cardpy={cardPy}
                  >
                    <StatCardLabel
                      labelcolor={s.labelColor}
                      fontsize={labelSize}
                    >
                      {s.label}
                    </StatCardLabel>

                    <StatCardCount
                      labelcolor={s.labelColor}
                      fontsize={numberSize}
                    >
                      {s.count.toLocaleString()}
                    </StatCardCount>
                  </StatCardBox>
                </Grid>
              ))}
            </Grid>
          </StatCardsWrapper>
        </ContentStack>
      </StyledCardContent>
    </CardContainer>
  );
};

export default DeviceLifecycleStatus;
