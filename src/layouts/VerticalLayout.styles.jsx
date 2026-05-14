import { styled } from "@mui/material";
import { LinearProgress } from "@mui/material";

export const LoadingProgress = styled(LinearProgress)({
  width: "110%",
  marginLeft: -3,
});

export const ContentWrapper = styled("div")(({ theme }) => {
  return {
    backgroundColor: theme.palette.background.default,
    padding: "24px",
    paddingTop: 0,
    height: "100%",
    minHeight: "100vh",
  };
});

export const MainContent = styled("div")(({ settings }) => {
  const collapsed = settings?.sidenav?.isCollapsed;
  const sidebarWidth = collapsed ? 80 : 240;
  return {
    flexDirection: "column",
    display: "flex",
    width: `calc(100% - ${sidebarWidth}px)`,
    marginLeft: sidebarWidth,
    transition: "0.2s all",
  };
});
