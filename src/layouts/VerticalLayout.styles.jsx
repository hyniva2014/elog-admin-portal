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

export const MainContent = styled("div")(({ settings }) => {
  const collapsed = settings?.sidenav?.isCollapsed;
  const sidebarWidth = collapsed ? 80 : 240;
  return {
    flexDirection: "column",
    // display: "flex",
    // height: "100vh",
    // minHeight: 0,
    // overflow: "hidden",
    width: `calc(100% - ${sidebarWidth}px)`,
    marginLeft: sidebarWidth,
    transition: "0.2s all",
  };
});
