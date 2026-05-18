import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";

export const StretchGridContainer = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(2),
  alignItems: "stretch",
}));

// Placeholder grid items — styled separately to allow future per-section overrides
export const ChartGrid = styled(Grid)({});

export const AlertGrid = styled(Grid)({});

export const IncidentGrid = styled(Grid)({});

export const DeviceGrid = styled(Grid)({});

// Shared icon used by summary card data in AdminConstant.js
export const CardIcon = styled("img")({
  width: 24,
  height: 24,
  objectFit: "contain",
});
