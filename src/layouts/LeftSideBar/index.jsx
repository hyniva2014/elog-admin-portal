import { useCallback, useEffect, useRef } from "react";
import { Drawer, useTheme, useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";
import LogoBox from "./LogoBox";
import SideMenu from "./SideMenu";
import { changeHTMLAttribute, getMenuItems } from "@src/helpers/menu";
import { useLayoutContext } from "@src/states";
import { LeftSideBarWrapper, SidebarScrollContainer } from "./index.styles";

const SIDEBAR_WIDTHS = {
  COLLAPSED: 80,
  EXPANDED: 240,
};

const MobileDrawer = styled(Drawer)(({ sidebarWidth }) => ({
  width: sidebarWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: sidebarWidth,
    boxSizing: "border-box",
  },
}));

const SideBarContent = ({ isCollapsed, isVisible }) => {
  if (!isVisible) return null;
  const allMenuItems = getMenuItems();
  return <SideMenu menuItems={allMenuItems} isCollapsed={isCollapsed} />;
};

const LeftSideBarMenu = () => {
  const { settings } = useLayoutContext();
  const { sidenav } = settings;
  const isMobile = sidenav.mode === "mobile";
  const isCollapsed = isMobile ? false : sidenav.isCollapsed;

  return (
    <LeftSideBarWrapper
      settings={settings}
      className="app-menu-do-not-remove"
    >
      <LogoBox backgroundColor isCollapsed={isCollapsed} />
      <SidebarScrollContainer>
        <SideBarContent isCollapsed={isCollapsed} isVisible />
      </SidebarScrollContainer>
    </LeftSideBarWrapper>
  );
};

const LeftSideBar = () => {
  const { settings, updateSidenav } = useLayoutContext();
  const { sidenav } = settings;
  const showMobileMenu = sidenav.showMobileMenu;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const hasInitializedCollapse = useRef(false);

  const getSidebarWidth = useCallback(() => {
    if (sidenav.mode === "mobile") return SIDEBAR_WIDTHS.EXPANDED;
    return sidenav.isCollapsed ? SIDEBAR_WIDTHS.COLLAPSED : SIDEBAR_WIDTHS.EXPANDED;
  }, [sidenav.mode, sidenav.isCollapsed]);

  const hideSideNavMobile = useCallback(() => {
    updateSidenav({ showMobileMenu: false });
  }, [updateSidenav]);

  const updateSidenavMode = useCallback(() => {
    if (isMobile && sidenav.mode !== "mobile") {
      updateSidenav({ mode: "mobile" });
    } else if (!isMobile && sidenav.mode === "mobile") {
      updateSidenav({ mode: "default" });
    }
  }, [isMobile, sidenav.mode, updateSidenav]);

  useEffect(() => {
    if (!hasInitializedCollapse.current && isMobile) {
      updateSidenav({ isCollapsed: true });
      hasInitializedCollapse.current = true;
    }
  }, [isMobile, updateSidenav]);

  useEffect(() => {
    changeHTMLAttribute("data-mode", settings.theme);
    changeHTMLAttribute("data-menu-color", sidenav.theme);
    changeHTMLAttribute("data-sidenav-view", sidenav.mode);
  }, [settings.theme, sidenav.theme, sidenav.mode]);

  useEffect(() => {
    updateSidenavMode();
  }, [updateSidenavMode]);

  const sidebarWidth = getSidebarWidth();

  if (sidenav.mode === "default") {
    return <LeftSideBarMenu />;
  }

  return (
    <MobileDrawer
      variant="temporary"
      open={showMobileMenu}
      onClose={hideSideNavMobile}
      ModalProps={{ keepMounted: true }}
      sidebarWidth={sidebarWidth}
    >
      <LeftSideBarMenu />
    </MobileDrawer>
  );
};

export default LeftSideBar;
