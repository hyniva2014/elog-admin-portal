import { Drawer } from "@mui/material";
import LogoBox from "./LogoBox";
import SideMenu from "./SideMenu";
import { changeHTMLAttribute, getMenuItems, getFleetMenuItems } from "@src/helpers/menu";
import { useLayoutContext } from "@src/states";
import { useViewPort } from "@src/hooks";
import { useEffect } from "react";
import { LeftSideBarWrapper, SidebarScrollContainer } from "./index.styles";

const SideBarContent = ({ isCollapsed,isVisible }) => {
    const allMenuItems = [
    ...getMenuItems(),
  ];
  return isVisible ? (
    <SideMenu menuItems={allMenuItems} isCollapsed={isCollapsed} />
  ) : null;
};
const LeftSideBarMenu = () => {
  const { settings } = useLayoutContext();

  return (
    <LeftSideBarWrapper
      settings={settings}
      className="app-menu-do-not-remove"
    >
      <LogoBox backgroundColor isCollapsed={settings.sidenav.isCollapsed} />
      <SidebarScrollContainer>
        <SideBarContent isCollapsed={settings.sidenav.isCollapsed} isVisible={true}/>
      </SidebarScrollContainer>
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
