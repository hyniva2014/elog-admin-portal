import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Box, Typography, Paper, useTheme } from "@mui/material";

const CarrierGrowthTrend = ({
  title = "Chart",
  data = [],
  dataKey = "value",
  xAxisKey = "month",
  lineColor = "#2563EB",
  height = 360,
  tooltipKeys = [],
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const tooltipData = payload[0].payload;

      return (
        <Paper
          elevation={3}
          sx={{
            p: 2,
            borderRadius: 2,
            minWidth: 160,
          }}
        >
          <Typography fontSize={16} fontWeight={700} mb={1}>
            {label}
          </Typography>

          {tooltipKeys.map((item) => (
            <Box
              key={item.key}
              display="flex"
              justifyContent="space-between"
              mb={0.5}
            >
              <Typography fontSize={13} fontWeight={500}>
                {item.label}
              </Typography>

              <Typography fontSize={13} fontWeight={700} color={item.color}>
                {tooltipData[item.key]}
              </Typography>
            </Box>
          ))}
        </Paper>
      );
    }

    return null;
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        paddingTop: 1,
        paddingBottom: 1,
        border: "1px solid #E5E7EB",
        borderRadius: 2,
        height: 360,
      }}
    >
      <Typography
        fontSize={18}
        fontWeight={700}
        mb={3}
        color={isDark ? "#FFFFFF" : "#111827"}
      >
        {title}
      </Typography>

      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey={xAxisKey} />

          <YAxis />

          <Tooltip content={<CustomTooltip />} />

          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={lineColor}
            strokeWidth={3}
            dot={{
              r: 5,
              fill: lineColor,
            }}
            activeDot={{
              r: 7,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default CarrierGrowthTrend;
