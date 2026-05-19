import React from "react";
import {
  TooltipContainer,
  TooltipLabel,
  TooltipRow,
  TooltipText,
  TooltipValue,
} from "./CarrierGrowthTrend.styled";

const ChartCustomTooltip = ({ active, payload, label, tooltipKeys = [] }) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const tooltipData = payload[0].payload;

  return (
    <TooltipContainer elevation={3}>
      <TooltipLabel>{label}</TooltipLabel>

      {tooltipKeys.map((item) => (
        <TooltipRow key={item.key}>
          <TooltipText>{item.label}</TooltipText>

          <TooltipValue textcolor={item.color}>
            {tooltipData[item.key]}
          </TooltipValue>
        </TooltipRow>
      ))}
    </TooltipContainer>
  );
};

export default ChartCustomTooltip;
