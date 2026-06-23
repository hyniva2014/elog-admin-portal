import { styled } from "@mui/material";
import SimpleBar from "simplebar-react";

export const LeftSideBarWrapper = styled("div")(({ theme, settings }) => {
  const collapsed = settings?.sidenav?.isCollapsed;
  const width = collapsed ? 80 : 240;
  return {
    backgroundColor: theme.palette.sidebar.main,
    width,
    minWidth: width,
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1000,
    transition: "0.2s all",
    overflow: "hidden",
  };
});

export const SidebarScrollContainer = styled(SimpleBar)(() => ({
  height: "calc(100% - 70px)",
  '& .simplebar-scrollbar': {
    '&.simplebar-visible:before': {
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
  },
  '& .simplebar-track.simplebar-vertical': {
    width: '6px',
  },
}));
