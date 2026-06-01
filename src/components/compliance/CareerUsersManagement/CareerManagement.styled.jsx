import { Box, Typography, Button, Grid, IconButton } from "@mui/material";
import styled from "@emotion/styled";

export const InspectionContainer = styled(Box)(() => ({
  background: "#fff",
  padding: 24,
  borderRadius: 12,
  fontSize: 13,
  marginTop: 10,
}));

export const PageTitle = styled(Typography)(() => ({
  fontSize: 20,
  fontWeight: 700,
  color: "#1C2434",
}));

export const CategoryTitle = styled(Typography)(() => ({
  marginTop: 15,
  fontSize: 16,
  fontWeight: 700,
  color: "#2D303F",
}));

export const SubCategoryTitle = styled(Typography)(() => ({
  fontSize: 12,
  fontWeight: 500,
  color: "#62748E",
}));

export const LoadingBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  p: 4,
}));

export const ButtonContainer = styled(Box)(() => ({
  mt: 4,
  display: 'flex',
  gap: 1,
  justifyContent: 'center',
}));

export const CancelButton = styled(Button)(() => ({
  color: "#284495",
  borderColor: "#284495",
  px: 2.25,
  py: 1.25,
  fontSize: 14,
  borderWidth: 1,
  borderRadius: 4,
  minWidth: 237.28,
  height: 44,
}));

export const SubmitButton = styled(Button)(() => ({
  backgroundColor: "#284495",
  color: "#FFFFFF",
  px: 2.25,
  py: 1.25,
  fontSize: 14,
  borderRadius: 4,
  minWidth: 237.28,
  height: 44,
  marginLeft:5,
  '&:hover': {
    backgroundColor: "#203776",
  },
}));

export const HeaderBox = styled(Box)(() => ({
  mb: 2,
  mt: 2,
}));

export const AddDriverButton = styled(Button)(() => ({
  color: "#FFFFFF",
  backgroundColor: "#284495",
}));

export const SummaryCardBox = styled(Box)(() => ({
  mt: 2,
}));

export const LicenseHeaderContainer = styled(Grid)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  mb: 1,
}));

export const FileUploadTypography = styled(Typography)(() => ({
  variant: "subtitle1",
  fontWeight: 400,
  fontSize: 12,
  color: "#000000",
}));

export const FormHeaderBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  mb: 2,
}));

export const EditButton = styled(Button)(() => ({
  ml: 2,
}));

export const CancelEditButton = styled(Button)(() => ({
  ml: 2,
}));

export const FullWidthField = styled(Box)(() => ({
  width: "100%",
  minWidth: "unset",
}));

export const ImagePreviewModal = styled(Box)(() => ({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
}));

export const ImagePreviewContainer = styled(Box)(() => ({
  position: "relative",
  maxWidth: "90%",
  maxHeight: "90%",
  backgroundColor: "#fff",
  borderRadius: 2,
  overflow: "hidden",
}));

export const ClosePreviewButton = styled(IconButton)(() => ({
  position: "absolute",
  top: 10,
  right: 10,
  backgroundColor: "#fff",
  borderRadius: "50%",
  padding: 4,
}));