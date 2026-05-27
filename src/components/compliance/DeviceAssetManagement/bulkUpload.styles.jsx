import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

export const UploadContainer = styled(Box)(({ theme }) => ({
  border: "1px solid #E0E0E0",
  borderRadius: "16px",
  height: "180px",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#FAFAFA",
  transition: "0.2s",

  "&:hover": {
    borderColor: "#284495",
    backgroundColor: "#F5F8FF",
  },
}));

export const UploadIconWrapper = styled(Box)(({ theme }) => ({
  width: 56,
  height: 56,
  borderRadius: "50%",
  backgroundColor: "#F3F4F6",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing(2),
}));

export const UploadText = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  fontWeight: 600,
}));

export const FilePreviewContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  border: "1px solid #E5E7EB",
  borderRadius: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "#fff",
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
}));

export const ErrorText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  display: "block",
}));

export const CsvIcon = styled("div")({
  display: "flex",

  "& svg": {
    fontSize: 48,
    color: "#4CAF50",
  },
});

export const ExcelIcon = styled("div")({
  display: "flex",

  "& svg": {
    fontSize: 48,
    color: "#1D6F42",
  },
});

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