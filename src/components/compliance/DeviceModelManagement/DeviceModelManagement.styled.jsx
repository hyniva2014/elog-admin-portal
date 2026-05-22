import { Box, Button, Typography, IconButton } from "@mui/material";
import styled from "@emotion/styled";
import eyeIcon from "../../../assets/images/svg/eyeicon.png";

export const EditButton = styled(Button)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 400,
  color: "#FFFFFF",
  backgroundColor: "#284495",
  border: 1,
  borderRadius: 2,
  borderColor: "#284495",
}));

export const CancelEditButton = styled(Button)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 400,
  color: "#284495",
  border: 1,
  borderRadius: 2,
  borderColor: "#284495",
  backgroundColor: "#F3F8FF",
}));

export const HeaderContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const AddButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  textTransform: "none",
  fontWeight: 600,
  minWidth: 102,
  height: 36,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export const GridContainer = styled(Box)(() => ({
  flex: 1,
  minHeight: 0,
}));

export const StatusText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "status",
})(({ status, theme }) => ({
  color: status === "Active" ? theme.palette.success.main : theme.palette.error.main,
  fontSize: 13,
  fontWeight: 400,
}));

export const ActionIcon = styled("img")({
  width: 18,
  height: 18,
  cursor: "pointer",
});

export const ActionCell = ({ row, onView }) => {
  const handleClick = () => onView(row);
  return (
    <IconButton size="small" onClick={handleClick}>
      <ActionIcon src={eyeIcon} alt="view" />
    </IconButton>
  );
};

export const DialogFormContainer = styled(Box)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1),
}));