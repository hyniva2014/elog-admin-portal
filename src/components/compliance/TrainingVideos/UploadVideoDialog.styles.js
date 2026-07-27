import { Box, styled, IconButton, Typography } from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

export const UploadZone = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isDragging" && prop !== "isFieldDisabled",
})(({ theme, isDragging, isFieldDisabled }) => ({
  border: `2px dashed ${
    isDragging ? theme.palette.primary.main : theme.palette.divider
  }`,
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(4),
  textAlign: "center",
  cursor: "pointer",
  backgroundColor: isDragging
    ? theme.palette.action.hover
    : theme.palette.background.paper,
  transition: "all 0.3s ease",
  opacity: isFieldDisabled ? 0.5 : 1,
  "&:hover": {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.action.hover,
  },
}));

export const PreviewContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  paddingTop: "56.25%", // 16:9 aspect ratio
  backgroundColor: "black",
  borderRadius: theme.shape.borderRadius * 2,
  overflow: "hidden",
}));

export const PreviewVideo = styled("video")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
});

export const RemoveButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: 8,
  right: 8,
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  color: theme.palette.error.main,
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
}));

export const UploadIcon = styled(CloudUploadOutlinedIcon)(({ theme }) => ({
  fontSize: 48,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
}));

export const UploadPrimaryText = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  marginBottom: theme.spacing(1),
}));

export const UploadSecondaryText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const UploadSupportText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  display: "block",
  marginTop: theme.spacing(1),
}));

export const ErrorText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  display: "block",
  color: theme.palette.error.main,
}));
