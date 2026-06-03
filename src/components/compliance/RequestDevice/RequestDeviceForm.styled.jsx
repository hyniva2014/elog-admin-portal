import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const FormContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
}));
