/*
 * Copyright (c) 2023.
 * File Name: index.tsx
 * Author: Coderthemes
 */

import { Drawer, styled } from "@mui/material";
import LogoBox from "./LogoBox";
import SimpleBar from "simplebar-react";
import SideMenu from "./SideMenu";
import { changeHTMLAttribute, getMenuItems, getFleetMenuItems } from "@src/helpers/menu";
import { useLayoutContext } from "@src/states";
import { useViewPort } from "@src/hooks";
import { useState, useEffect } from "react";

/* Sidemenu content */
const SideBarContent = ({ isCollapsed,isVisible }) => {
  // <SideMenu menuItems={getMenuItems()} isCollapsed={isCollapsed} />
    const allMenuItems = [
    ...getMenuItems(),
    // ...getFleetMenuItems(),
  ];
  return isVisible ? (
    <SideMenu menuItems={allMenuItems} isCollapsed={isCollapsed} />
  ) : null;
};
const LeftSideBarWrapper = styled("div")(({ settings }) => {
  const collapsed = settings?.sidenav?.isCollapsed;
  const width = collapsed ? 80 : 240;
  return {
    backgroundColor: "#284394",
    width,
    minWidth: width,
    height: "100vh",
    position: "sticky",
    top: 0,
    marginInlineStart: !settings.sidenav.showMobileMenu ? -width : 0,
    transition: "0.2s all",
    overflow: "hidden",
  };
});
const LeftSideBarMenu = () => {
  const { settings, updateSidenav } = useLayoutContext();
  const [isHoverExpanded, setIsHoverExpanded] = useState(false);

  const handleMouseEnter = () => {
    if (settings.sidenav.mode !== "default") {
      return;
    }

    setIsHoverExpanded(true);

    if (settings.sidenav.isCollapsed) {
      updateSidenav({
        isCollapsed: false,
      });
    }
  };

  const handleMouseLeave = () => {
    if (!isHoverExpanded || settings.sidenav.mode !== "default") {
      return;
    }

    setIsHoverExpanded(false);
    updateSidenav({
      isCollapsed: true,
    });
  };

  return (
    <LeftSideBarWrapper
      settings={settings}
      className="app-menu-do-not-remove"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <LogoBox backgroundColor isCollapsed={settings.sidenav.isCollapsed} />
      <SimpleBar
        style={{
          height: "calc(100% - 70px)",
        }}
      >
        <SideBarContent isCollapsed={settings.sidenav.isCollapsed} isVisible={true}/>
      </SimpleBar>
    </LeftSideBarWrapper>
  );
};
const LeftSideBar = () => {
  const { width } = useViewPort();
  const { settings, updateSidenav } = useLayoutContext();
  const showMobileMenu = settings.sidenav.showMobileMenu;
  useEffect(() => {
    changeHTMLAttribute("data-mode", settings.theme);
  }, [settings.theme]);
  useEffect(() => {
    changeHTMLAttribute("data-menu-color", settings.sidenav.theme);
  }, [settings.sidenav.theme]);
  useEffect(() => {
    changeHTMLAttribute("data-sidenav-view", settings.sidenav.mode);
  }, [settings.sidenav.mode]);
  useEffect(() => {
    if (width < 1140) {
      updateSidenav({
        mode: "mobile",
      });
    } else if (width >= 1140 && settings.sidenav.mode == "mobile") {
      updateSidenav({
        mode: "default",
      });
    }
  }, [width]);
  const hideSideNavMobile = () => {
    // const htmlElement = document.getElementsByTagName("html")[0];
    // htmlElement.classList.remove("sidenav-enable");
    updateSidenav({
      showMobileMenu: false,
    });
  };
  return settings.sidenav.mode == "default" ? (
    <LeftSideBarMenu />
  ) : (
    <Drawer open={showMobileMenu} onClose={hideSideNavMobile}>
      <LeftSideBarMenu />
    </Drawer>
  );
};
export default LeftSideBar;
