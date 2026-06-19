import { styled } from "@mui/material/styles";
import { Button, Box, Typography } from "@mui/material";

export const ActionBox = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  marginTop: theme.spacing(1),
  display: "flex",
  justifyContent: "center",
}));

export const BackButton = styled(Button)(({ theme }) => ({
  minWidth: 200,
  backgroundColor: theme.palette.primary.dark,
  textTransform: "none",
  fontWeight: 600,
  borderRadius: theme.spacing(1),
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

export const DataGridWrapper = styled(Box)({
  "& .MuiDataGrid-cell.sticky-col-left-2": {
    borderRight: "none !important",
  },
  "& .MuiDataGrid-columnHeader.sticky-col-left-2": {
    borderRight: "none !important",
  },
});

export const ActionContainer = styled(Box)({
  width: "100%",
  display: "flex",
  gap: 8,
});

export const GroupIconImage = styled(Box)({
  width: 20,
  height: 20,
});