import {
  Box,
  Collapse,
  Typography,
  Tooltip,
  tooltipClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";
const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} arrow />
))(({ theme }) => {
  const isDark = theme.palette.mode === "dark";
  const bgColor = isDark ? "#222529" : "#6fa9e3";
  const textColor = isDark ? "#ffffff" : "#222529";
  const shadowColor = isDark ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.15)";

  return {
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: bgColor,
      color: textColor,
      gap: "8px",
      fontSize: "12px",
      padding: "6px 12px",
      boxShadow: `0 2px 8px ${shadowColor}`,
      marginLeft: "8px !important",
      borderRadius: "4px",
      fontWeight: 500,
    },
    [`& .${tooltipClasses.arrow}`]: {
      color: bgColor,
    },
  };
});
import {
  findAllParent,
  findMenuItem,
  getMenuItemFromURL,
} from "@src/helpers/menu";
import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { LuChevronRight } from "react-icons/lu";
import { Link, useLocation } from "react-router-dom";
import { useLayoutContext } from "@src/states";
import { getLeftbarTheme } from "@src/layouts/LeftSideBar/helpers";
// import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
// import { permissions } from "../../components/CommonRowColumnUtils";

const MenuIcon = ({ icon, size }) => {
  if (!icon) return null;

  if (typeof icon === "string") {
    return (
      <Box
        component="img"
        src={icon}
        alt=""
        sx={{
          width: size,
          height: size,
          objectFit: "contain",
          flexShrink: 0,
          display: "block",
        }}
      />
    );
  }

  const Icon = icon;
  return <Icon size={size} />;
};

const MenuItemWithChildren = ({
  item,
  activeMenuItems,
  toggleMenu,
  theme,
  isCollapsed,
}) => {
  const [open, setOpen] = useState(activeMenuItems.includes(item.key));

  useEffect(() => {
    setOpen(activeMenuItems.includes(item.key));
  }, [activeMenuItems, item.key]);

  const toggleMenuItem = () => {
    const status = !open;
    setOpen(status);
    toggleMenu?.(item, status);
  };

  const location = useLocation();

  const isChildActive = (item.children || []).some((child) =>
    location.pathname.startsWith(child.url),
  );

  return (
    <li>
      {isCollapsed ? (
        <Box
          sx={{
            p: "12px",
            display: "flex",
            justifyContent: "center",
            cursor: "pointer",
            borderRadius: "20px 0px 0px 20px",
            marginLeft: "5px",
            color: isChildActive ? "#284495" : "#fff",
            backgroundColor: isChildActive ? "#ffffff" : "transparent",
            // width: "80%",
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: isChildActive
                ? "#ffffff"
                : "rgba(255,255,255,0.12)",
            },
          }}
        >
          <MenuIcon icon={item.icon} size={30} />
        </Box>
      ) : (
        <Box
          onClick={toggleMenuItem}
          sx={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            padding: "12px 16px",
            gap: "12px",
            color: open ? theme.item.active : theme.item.color,
          }}
        >
          <MenuIcon icon={item.icon} size={20} />
          <Typography>{item.label}</Typography>
          <Box sx={{ marginLeft: "auto" }}>
            <LuChevronRight
              size={16}
              style={{
                transform: open ? "rotate(90deg)" : "rotate(0deg)",
                transition: "0.15s",
              }}
            />
          </Box>
        </Box>
      )}

      {!isCollapsed && (
        <Collapse in={open}>
          <ul style={{ listStyle: "none", paddingLeft: "28px" }}>
            {(item.children || []).map((child) => (
              <MenuItem
                key={child.key}
                item={child}
                theme={theme}
                activeMenuItems={activeMenuItems}
              />
            ))}
          </ul>
        </Collapse>
      )}
    </li>
  );
};

const MenuItem = ({ item, theme, activeMenuItems, isCollapsed }) => {
  const [open, setOpen] = useState(activeMenuItems.includes(item.key));
  const location = useLocation();

  const isChildActive = (item.children || []).some((child) =>
    location.pathname.startsWith(child.url),
  );

  const isDirectlyActive = activeMenuItems.includes(item.key);
  const active = isDirectlyActive || isChildActive;

  useEffect(() => {
    setOpen(isDirectlyActive);
  }, [isDirectlyActive]);
  const { settings, updateSidenav } = useLayoutContext();
  const toggleSidebar = () => {
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
    <li>
      {isCollapsed ? (
        <Box
          component={Link}
          to={item.url}
          onClick={toggleSidebar}
          sx={{
            p: "12px",
            display: "flex",
            justifyContent: "center",
            cursor: "pointer",
            borderRadius: "20px 0px 0px 20px",
            marginLeft: "5px",
            color: active ? "#284495" : "#fff",
            backgroundColor: active ? "#ffffff" : "transparent",
            textDecoration: "none",
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: active ? "#ffffff" : "rgba(255,255,255,0.12)",
            },
          }}
        >
          <MenuIcon icon={item.icon} size={30} />
        </Box>
      ) : (
        <Box
          component={Link}
          to={item.url}
          onClick={toggleSidebar}
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "10px 16px",
            color: active ? theme.item.active : theme.item.color,
            textDecoration: "none",
            borderRadius: "8px",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
          }}
        >
          <MenuIcon icon={item.icon} size={16} />
          <Typography ml={1}>{item.label}</Typography>
        </Box>
      )}
    </li>
  );
};

const SideMenu = ({ menuItems, isCollapsed }) => {
  const location = useLocation();
  const { settings } = useLayoutContext();
  const [activeMenuItems, setActiveMenuItems] = useState([]);

  // const permissions = useSelector((state) => state.loginSlice?.permissions);
  // console.log("permissions", permissions);

  // if (!permissions) return null;

  const theme = useMemo(
    () => getLeftbarTheme(settings.sidenav.theme),
    [settings.sidenav.theme],
  );

  const MENU_PERMISSION_MAP = {
    "compliance dashboard": "compliance_menu",
    "fleet dashboard": "fleet_menu",
  };

  const filteredMenuItems = useMemo(() => {
    // if (!permissions) return [];

    // const allPermissions = permissions["Menu Permissions"] || [];

    // return menuItems
    //   .map((menu) => {
    //     const filteredChildren = (menu.children || []).filter((child) => {
    //       const childLabel = child?.label?.toLowerCase?.() || "";
    //       const normalizedLabel = childLabel.replace(/\s/g, "_");

    //       const expectedDesc =
    //         MENU_PERMISSION_MAP[childLabel] || normalizedLabel;

    //       return allPermissions.some((perm) => {
    //         if (Number(perm?.granted) !== 1) return false;

    //         const desc = perm?.description?.toLowerCase?.() || "";

    //         return desc === expectedDesc;
    //       });
    //     });

    //     if (!filteredChildren.length) return null;

    //     return {
    //       ...menu,
    //       children: filteredChildren,
    //     };
    //   })
    //   .filter(Boolean);
      return menuItems || [];
  }, [menuItems]);
  const activateMenu = useCallback(() => {
    const match = getMenuItemFromURL(filteredMenuItems, location.pathname);

    if (match) {
      const item = findMenuItem(filteredMenuItems, match.key);
      const newActive = [item.key, ...findAllParent(filteredMenuItems, item)];

      setActiveMenuItems((prev) => {
        if (JSON.stringify(prev) === JSON.stringify(newActive)) {
          return prev;
        }
        return newActive;
      });
    }
  }, [location.pathname, filteredMenuItems]);

  const manualToggleRef = useRef(0);

  useEffect(() => {
    if (Date.now() - manualToggleRef.current > 50) {
      activateMenu();
    }
  }, [activateMenu]);

  const toggleMenu = (menuItem, show) => {
    manualToggleRef.current = Date.now();

    setActiveMenuItems((prev) => {
      if (show) {
        const currentMatch = getMenuItemFromURL(
          filteredMenuItems,
          location.pathname,
        );

        if (currentMatch) {
          const currentItem = findMenuItem(filteredMenuItems, currentMatch.key);

          const activeItems = [
            currentItem.key,
            ...findAllParent(filteredMenuItems, currentItem),
          ];

          if (!activeItems.includes(menuItem.key)) {
            return [menuItem.key, ...activeItems];
          }

          return activeItems;
        }

        return [menuItem.key, ...findAllParent(filteredMenuItems, menuItem)];
      } else {
        return prev.filter((key) => key !== menuItem.key);
      }
    });
  };

  return (
    <Box>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredMenuItems.map((item) =>
          item.children ? (
            <MenuItemWithChildren
              key={item.key}
              item={item}
              theme={theme}
              toggleMenu={toggleMenu}
              activeMenuItems={activeMenuItems}
              isCollapsed={isCollapsed}
            />
          ) : (
            <MenuItem
              key={item.key}
              item={item}
              theme={theme}
              activeMenuItems={activeMenuItems}
              isCollapsed={isCollapsed}
            />
          ),
        )}
      </ul>
    </Box>
  );
};

export default SideMenu;
