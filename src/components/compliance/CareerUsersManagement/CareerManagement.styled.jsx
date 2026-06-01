import { Box, Typography, Button, Grid, IconButton } from "@mui/material";
import styled from "@emotion/styled";

export const InspectionContainer = styled(Box)(({ theme }) => ({
  background: theme.palette.background.paper,
  padding: 24,
  borderRadius: 12,
  fontSize: 13,
  marginTop: 10,
}));

export const PageTitle = styled(Typography)(({ theme }) => ({
  fontSize: 20,
  fontWeight: 700,
  color: theme.palette.text.primary,
}));

export const CategoryTitle = styled(Typography)(({ theme }) => ({
  marginTop: 15,
  fontSize: 16,
  fontWeight: 700,
  color: theme.palette.text.primary,
}));

export const SubCategoryTitle = styled(Typography)(({ theme }) => ({
  fontSize: 12,
  fontWeight: 500,
  color: theme.palette.text.secondary,
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

export const CancelButton = styled(Button)(({ theme }) => ({
  color: theme.palette.brand.main,
  borderColor: theme.palette.brand.main,
  px: 2.25,
  py: 1.25,
  fontSize: 14,
  borderWidth: 1,
  borderRadius: 4,
  minWidth: 237.28,
  height: 44,
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.brand.main,
  color: theme.palette.common.white,
  px: 2.25,
  py: 1.25,
  fontSize: 14,
  borderRadius: 4,
  minWidth: 237.28,
  height: 44,
  marginLeft: 5,
  '&:hover': {
    backgroundColor: theme.palette.brand.dark,
  },
}));

export const HeaderBox = styled(Box)(() => ({
  mb: 2,
  mt: 2,
}));

export const AddDriverButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: theme.palette.brand.main,
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

export const FileUploadTypography = styled(Typography)(({ theme }) => ({
  variant: "subtitle1",
  fontWeight: 400,
  fontSize: 12,
  color: theme.palette.text.primary,
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

export const ImagePreviewContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  maxWidth: "90%",
  maxHeight: "90%",
  backgroundColor: theme.palette.background.paper,
  borderRadius: 2,
  overflow: "hidden",
}));

export const ClosePreviewButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: 10,
  right: 10,
  backgroundColor: theme.palette.common.white,
  borderRadius: "50%",
  padding: 4,
}));

export const PreviewImageSx = {
  maxWidth: "100%",
  maxHeight: "80vh",
  display: "block",
};