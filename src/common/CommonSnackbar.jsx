import React from "react";
import { Snackbar, Box, Typography, IconButton } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CloseIcon from "@mui/icons-material/Close";

const severityConfig = {
  success: {
    color: "#2e7d32",
    bg: "#F0FDF4",
    icon: <CheckCircleOutlineIcon sx={{ color: "#33ac39" }} />,
  },
  error: {
    color: "#d32f2f",
    bg: "#FFC9C9",
    icon: <ErrorOutlineIcon sx={{ color: "#d32f2f" }} />,
  },
  warning: {
    color: "#ed6c02",
    bg: "#FFF4CE",
    icon: <WarningAmberOutlinedIcon sx={{ color: "#ed6c02" }} />,
  },
  info: {
    color: "#0288d1",
    bg: "#E0F2FE",
    icon: <InfoOutlinedIcon sx={{ color: "#0288d1" }} />,
  },
};

const CommonSnackbar = ({
  open,
  message,
  severity = "success",
  autoHideDuration = 3000,
  onClose,
}) => {
  const config = severityConfig[severity];

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: config.bg,
          borderRadius: "10px",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.12)",
          minWidth: 420,
          overflow: "hidden",
        }}
      >
        {/* Left colored bar */}
        <Box
          sx={{
            width: 6,
            height: "100%",
            backgroundColor: config.color,
          }}
        />

        {/* Content */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            px: 2,
            py: 1.5,
            flex: 1,
          }}
        >
          {config.icon}
          <Typography fontSize={16} fontWeight={500} color="#444">
            {message}
          </Typography>
        </Box>

        {/* Close button */}
        <IconButton onClick={onClose} sx={{ mr: 1 }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
    </Snackbar>
  );
};

export default CommonSnackbar;
