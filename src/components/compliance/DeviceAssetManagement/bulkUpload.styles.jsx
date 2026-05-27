import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

export const UploadContainer = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius * 2,
  height: "180px",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.palette.background.default,
  transition: "0.2s",

  "&:hover": {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.action.hover,
  },
}));

export const UploadIconWrapper = styled(Box)(({ theme }) => ({
  width: 56,
  height: 56,
  borderRadius: "50%",
  backgroundColor: theme.palette.action.selected,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing(2),
}));

export const UploadText = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

export const FilePreviewContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius * 2,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: theme.palette.background.paper,
  position: "relative",
}));

export const FileInfoWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
}));

export const FileNameText = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: 14,
  color: theme.palette.text.primary,
}));

export const ErrorText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  display: "block",
  color: theme.palette.error.main,
}));

export const CsvIcon = styled("div")(({ theme }) => ({
  display: "flex",

  "& svg": {
    fontSize: 48,
    color: theme.palette.success.main,
  },
}));

export const ExcelIcon = styled("div")(({ theme }) => ({
  display: "flex",

  "& svg": {
    fontSize: 48,
    color: theme.palette.success.dark,
  },
}));

export const UploadCloudIcon = styled(CloudUploadOutlinedIcon)(({ theme }) => ({
  fontSize: 30,
  color: theme.palette.text.secondary,
}));

export const UploadHighlightText = styled("span")(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 600,
}));

export const UploadSubText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  color: theme.palette.text.secondary,
}));
