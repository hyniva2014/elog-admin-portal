import { styled } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";

export const DataGridWrapper = styled(Box)({
  width: "100%",
  marginTop: 8,
});

export const ActionBox = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  marginTop: theme.spacing(1),
  display: "flex",
  justifyContent: "center",
}));

export const BackButton = styled(Button)(({ theme }) => ({
  minWidth: 200,
  backgroundColor: theme.palette.sidebar.main,
  textTransform: "none",
  fontWeight: 600,
  borderRadius: theme.spacing(1),
  "&:hover": {
    backgroundColor: theme.palette.sidebar.dark,
  },
}));

export const CreatedOnWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: 0,
});

export const CreatedDateText = styled(Typography)({
  fontSize: "0.875rem",
  fontWeight: 500,
  lineHeight: 1.2,
});

export const CreatedTimeText = styled(Typography)(({ theme }) => ({
  fontSize: "0.75rem",
  color: theme.palette.text.secondary,
  lineHeight: 1.2,
}));


