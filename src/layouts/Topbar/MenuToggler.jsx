/*
 * Copyright (c) 2023.
 * File Name: MenuToggler.tsx
 * Author: Coderthemes
 */

import { IconButton } from "@mui/material";
import { useLayoutContext } from "@src/states";
import { LuMenu } from "react-icons/lu";
const MenuToggler = () => {
  const {
    settings,
    updateSidenav
  } = useLayoutContext();
  const toggleSideNav = () => {
    if (settings.sidenav.mode === "mobile") {
      updateSidenav({
        showMobileMenu: !settings.sidenav.showMobileMenu,
      });
    } else {
      updateSidenav({
        isCollapsed: !settings.sidenav.isCollapsed,
      });
    }
  };
  return (
    <IconButton color={"inherit"} onClick={toggleSideNav}>
      <LuMenu />
    </IconButton>
  );
};
export default MenuToggler;