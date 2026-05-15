import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";

export const StretchGridContainer = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(2),
  alignItems: "stretch",
}));

export const FlexGridItem = styled(Grid)({
  display: "flex",
});
