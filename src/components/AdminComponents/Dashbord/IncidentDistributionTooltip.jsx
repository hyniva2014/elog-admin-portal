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

const TooltipItemRow = ({ item }) => {
  return (
    <TooltipRow>
      <TooltipDot dotcolor={item.color} />

      <TooltipLabel>
        {item.name}: <strong>{item.value}</strong>
      </TooltipLabel>
    </TooltipRow>
  );
};

const TooltipRows = ({ chartPayload }) => {
  return chartPayload.map((item, index) => (
    <TooltipItemRow key={`${item.name}-${index}`} item={item} />
  ));
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  const chartPayload = [...payload]

    .filter(({value},item) => value > 0)

    .sort((a, b) => b.value - a.value);

  const total = payload?.[0]?.payload?.total ?? 0;

  return (
    <TooltipContainer>
      <TooltipTitle>{label}</TooltipTitle>

      <TooltipRows chartPayload={chartPayload} />

      <TooltipFooter>
        <TooltipFooterLabel>Total</TooltipFooterLabel>

        <TooltipFooterValue>{total}</TooltipFooterValue>
      </TooltipFooter>
    </TooltipContainer>
  );
};

export default CustomTooltip;
