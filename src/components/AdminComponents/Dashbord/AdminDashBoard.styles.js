import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";

export const StretchGridContainer = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(2),
  alignItems: "stretch",
}));

export const ChartGrid = styled(Grid)({});

export const AlertGrid = styled(Grid)({});

export const IncidentGrid = styled(Grid)({});

export const DeviceGrid = styled(Grid)({});