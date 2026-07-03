import { styled } from "@mui/material";
import { LinearProgress } from "@mui/material";

export const LayoutRoot = styled("div")({
  // height: "100vh",
  overflow: "auto",
});

export const LoadingProgress = styled(LinearProgress)({
  width: "110%",
  marginLeft: -3,
});

export const ContentWrapper = styled("div")(({ theme }) => {
  return {
    backgroundColor: theme.palette.background.default,
    padding: "24px",
    paddingTop: "16px",
    flex: 1,
    minHeight: 0,
    overflow: "auto",
    boxSizing: "border-box",
  };
});

export const MainContent = styled("div")(({ theme, settings }) => {
  const collapsed = settings?.sidenav?.isCollapsed;
  const isMobile = settings?.sidenav?.mode === "mobile";
  const sidebarWidth = collapsed ? 80 : 240;
  return {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: theme.palette.background.default,
    width: isMobile ? "100%" : `calc(100% - ${sidebarWidth}px)`,
    marginLeft: isMobile ? 0 : sidebarWidth,
    transition: "0.2s all",
  };
});
