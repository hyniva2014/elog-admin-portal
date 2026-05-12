import { Box, styled } from "@mui/material";

export const PageContainer = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === "dark";

  return {
    backgroundColor: isDark
      ? theme.palette.grey[100]
      : theme.palette.common.white,

    borderRadius: theme.shape.borderRadius * 2,
    padding: theme.spacing(2),

    // height: "calc(100vh - 150px)",
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(2),
  };
});