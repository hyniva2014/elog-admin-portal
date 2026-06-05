import { Box, Typography } from "@mui/material";
import {
  TooltipContainer,
  TooltipTitle,
  TooltipRow,
  TooltipDot,
  TooltipLabel,
  TooltipFooter,
  TooltipFooterLabel,
  TooltipFooterValue,
} from "./IncidentDistribution.styles";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  const chartPayload = [...payload]
    .filter((item) => item.value > 0)
    .sort((a, b) => b.value - a.value);

  const total = payload?.[0]?.payload?.total ?? 0;

  return (
    <TooltipContainer>
      <TooltipTitle>{label}</TooltipTitle>

      {chartPayload.map((item, index) => (
        <TooltipRow key={index}>
          <TooltipDot dotcolor={item.color} />

          <TooltipLabel>
            {item.name}: <strong>{item.value}</strong>
          </TooltipLabel>
        </TooltipRow>
      ))}

      <TooltipFooter>
        <TooltipFooterLabel>Total</TooltipFooterLabel>

        <TooltipFooterValue>{total}</TooltipFooterValue>
      </TooltipFooter>
    </TooltipContainer>
  );
};

export default CustomTooltip;