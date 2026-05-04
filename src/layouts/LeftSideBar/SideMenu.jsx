// import {
//   Box,
//   Collapse,
//   Typography,
//   Tooltip,
//   tooltipClasses,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// const StyledTooltip = styled(({ className, ...props }) => (
//   <Tooltip {...props} classes={{ popper: className }} arrow />
// ))(({ theme }) => {
//   const isDark = theme.palette.mode === "dark";
//   const bgColor = isDark ? "#222529" : "#6fa9e3";
//   const textColor = isDark ? "#ffffff" : "#222529";
//   const shadowColor = isDark ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.15)";

//   return {
//     [`& .${tooltipClasses.tooltip}`]: {
//       backgroundColor: bgColor,
//       color: textColor,
//       gap: "8px",
//       fontSize: "12px",
//       padding: "6px 12px",
//       boxShadow: `0 2px 8px ${shadowColor}`,
//       marginLeft: "8px !important",
//       borderRadius: "4px",
//       fontWeight: 500,
//     },
//     [`& .${tooltipClasses.arrow}`]: {
//       color: bgColor,
//     },
//   };
// });
// import {
//   findAllParent,
//   findMenuItem,
//   getMenuItemFromURL,
// } from "@src/helpers/menu";
// import {
//   Fragment,
//   useCallback,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from "react";
// import { LuChevronRight } from "react-icons/lu";
// import { Link, useLocation } from "react-router-dom";
// import { useLayoutContext } from "@src/states";
// import { getLeftbarTheme } from "@src/layouts/LeftSideBar/helpers";
// // import { Link, useLocation } from "react-router-dom";
// // import CollapsedMenuPopper from "../../common/ChildrenTooltipContent";
// import { useSelector } from "react-redux";
// import CollapsedMenuPopper from "../../common/CollapsedMenuPopper";
// // import { permissions } from "../../components/CommonRowColumnUtils";
// const MenuItemWithChildren = ({
//   item,
//   activeMenuItems,
//   toggleMenu,
//   theme,
//   isCollapsed,
// }) => {
//   const [open, setOpen] = useState(activeMenuItems.includes(item.key));
//   const Icon = item.icon;
//   const [anchorEl, setAnchorEl] = useState(null);
//   const closeTimer = useRef(null);

//   useEffect(() => {
//     setOpen(activeMenuItems.includes(item.key));
//   }, [activeMenuItems, item.key]);

//   const toggleMenuItem = () => {
//     const status = !open;
//     setOpen(status);
//     toggleMenu?.(item, status);
//   };

//   const location = useLocation();

//   const isChildActive = (item.children || []).some((child) =>
//     location.pathname.startsWith(child.url),
//   );

//   return (
//     <li>
//       {isCollapsed ? (
//         <>
//           <Box
//             onMouseEnter={(e) => {
//               if (closeTimer.current) {
//                 clearTimeout(closeTimer.current);
//               }
//               setAnchorEl(e.currentTarget);
//             }}
//             onMouseLeave={() => {
//               closeTimer.current = setTimeout(() => {
//                 setAnchorEl(null);
//               }, 150);
//             }}
//             sx={{
//               p: "12px",
//               display: "flex",
//               justifyContent: "center",
//               cursor: "pointer",
//               borderRadius: "20px 0px 0px 20px",
//               marginLeft: "5px",
//               color: isChildActive ? "#284495" : "#fff",
//               backgroundColor: isChildActive ? "#ffffff" : "transparent",
//               // width: "80%",
//               transition: "all 0.2s ease",
//               "&:hover": {
//                 backgroundColor: isChildActive
//                   ? "#ffffff"
//                   : "rgba(255,255,255,0.12)",
//               },
//             }}
//           >
//             {Icon && <Icon size={30} />}
//           </Box>

//           <CollapsedMenuPopper
//             anchorEl={anchorEl}
//             open={Boolean(anchorEl)}
//             item={item}
//             onClose={() => setAnchorEl(null)}
//             closeTimer={closeTimer}
//           />
//         </>
//       ) : (
//         <Box
//           onClick={toggleMenuItem}
//           sx={{
//             cursor: "pointer",
//             display: "flex",
//             alignItems: "center",
//             padding: "12px 16px",
//             gap: "12px",
//             color: open ? theme.item.active : theme.item.color,
//           }}
//         >
//           {Icon && <Icon size={20} />}
//           <Typography>{item.label}</Typography>
//           <Box sx={{ marginLeft: "auto" }}>
//             <LuChevronRight
//               size={16}
//               style={{
//                 transform: open ? "rotate(90deg)" : "rotate(0deg)",
//                 transition: "0.15s",
//               }}
//             />
//           </Box>
//         </Box>
//       )}

//       {!isCollapsed && (
//         <Collapse in={open}>
//           <ul style={{ listStyle: "none", paddingLeft: "28px" }}>
//             {(item.children || []).map((child) => (
//               <MenuItem
//                 key={child.key}
//                 item={child}
//                 theme={theme}
//                 activeMenuItems={activeMenuItems}
//               />
//             ))}
//           </ul>
//         </Collapse>
//       )}
//     </li>
//   );
// };

// const MenuItem = ({ item, theme, activeMenuItems, isCollapsed }) => {
//   const [open, setOpen] = useState(activeMenuItems.includes(item.key));
//   const Icon = item.icon;
//   const location = useLocation();

//   const isChildActive = (item.children || []).some((child) =>
//     location.pathname.startsWith(child.url),
//   );

//   const isDirectlyActive = activeMenuItems.includes(item.key);
//   const active = isDirectlyActive || isChildActive;

//   useEffect(() => {
//     setOpen(isDirectlyActive);
//   }, [isDirectlyActive]);
//   const { settings, updateSidenav } = useLayoutContext();
//   const toggleSidebar = () => {
//     if (settings.sidenav.mode === "mobile") {
//       updateSidenav({
//         showMobileMenu: !settings.sidenav.showMobileMenu,
//       });
//     } else {
//       updateSidenav({
//         isCollapsed: !settings.sidenav.isCollapsed,
//       });
//     }
//   };
//   return (
//     <li>
//       <Box
//         component={Link}
//         to={item.url}
//         onClick={toggleSidebar}
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           padding: "10px 16px",
//           color: active ? theme.item.active : theme.item.color,
//           textDecoration: "none",
//           borderRadius: "8px",
//           "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
//         }}
//       >
//         {Icon && <Icon size={16} />}
//         <Typography ml={1}>{item.label}</Typography>
//       </Box>
//     </li>
//   );
// };

// const SideMenu = ({ menuItems, isCollapsed }) => {
//   const location = useLocation();
//   const { settings } = useLayoutContext();
//   const [activeMenuItems, setActiveMenuItems] = useState([]);

//   const permissions = useSelector((state) => state.loginSlice?.permissions);
//   console.log("permissions", permissions);

//   if (!permissions) return null;

//   const theme = useMemo(
//     () => getLeftbarTheme(settings.sidenav.theme),
//     [settings.sidenav.theme],
//   );

//   const MENU_PERMISSION_MAP = {
//     "compliance dashboard": "compliance_menu",
//     "fleet dashboard": "fleet_menu",
//   };

//   const filteredMenuItems = useMemo(() => {
//     if (!permissions) return [];

//     const allPermissions = permissions["Menu Permissions"] || [];

//     return menuItems
//       .map((menu) => {
//         const filteredChildren = (menu.children || []).filter((child) => {
//           const childLabel = child?.label?.toLowerCase?.() || "";
//           const normalizedLabel = childLabel.replace(/\s/g, "_");

//           const expectedDesc =
//             MENU_PERMISSION_MAP[childLabel] || normalizedLabel;

//           return allPermissions.some((perm) => {
//             if (Number(perm?.granted) !== 1) return false;

//             const desc = perm?.description?.toLowerCase?.() || "";

//             return desc === expectedDesc;
//           });
//         });

//         if (!filteredChildren.length) return null;

//         return {
//           ...menu,
//           children: filteredChildren,
//         };
//       })
//       .filter(Boolean);
//   }, [menuItems, permissions]);
//   const activateMenu = useCallback(() => {
//     const match = getMenuItemFromURL(filteredMenuItems, location.pathname);

//     if (match) {
//       const item = findMenuItem(filteredMenuItems, match.key);
//       const newActive = [item.key, ...findAllParent(filteredMenuItems, item)];

//       setActiveMenuItems((prev) => {
//         if (JSON.stringify(prev) === JSON.stringify(newActive)) {
//           return prev;
//         }
//         return newActive;
//       });
//     }
//   }, [location.pathname, filteredMenuItems]);

//   const manualToggleRef = useRef(0);

//   useEffect(() => {
//     if (Date.now() - manualToggleRef.current > 50) {
//       activateMenu();
//     }
//   }, [activateMenu]);

//   const toggleMenu = (menuItem, show) => {
//     manualToggleRef.current = Date.now();

//     setActiveMenuItems((prev) => {
//       if (show) {
//         const currentMatch = getMenuItemFromURL(
//           filteredMenuItems,
//           location.pathname,
//         );

//         if (currentMatch) {
//           const currentItem = findMenuItem(filteredMenuItems, currentMatch.key);

//           const activeItems = [
//             currentItem.key,
//             ...findAllParent(filteredMenuItems, currentItem),
//           ];

//           if (!activeItems.includes(menuItem.key)) {
//             return [menuItem.key, ...activeItems];
//           }

//           return activeItems;
//         }

//         return [menuItem.key, ...findAllParent(filteredMenuItems, menuItem)];
//       } else {
//         return prev.filter((key) => key !== menuItem.key);
//       }
//     });
//   };

//   return (
//     <Box>
//       <ul style={{ listStyle: "none", padding: 0 }}>
//         {filteredMenuItems.map((item) =>
//           item.children ? (
//             <MenuItemWithChildren
//               key={item.key}
//               item={item}
//               theme={theme}
//               toggleMenu={toggleMenu}
//               activeMenuItems={activeMenuItems}
//               isCollapsed={isCollapsed}
//             />
//           ) : (
//             <MenuItem
//               key={item.key}
//               item={item}
//               theme={theme}
//               activeMenuItems={activeMenuItems}
//             />
//           ),
//         )}
//       </ul>
//     </Box>
//   );
// };

// export default SideMenu;

// import { Box, Collapse, Typography, Tooltip, tooltipClasses } from "@mui/material";
// import { styled } from "@mui/material/styles";

// const StyledTooltip = styled(({ className, ...props }) => (
//   <Tooltip {...props} classes={{ popper: className }} arrow />
// ))(({ theme }) => {
//   const isDark = theme.palette.mode === 'dark';
//   const bgColor = isDark ? '#222529' : '#6fa9e3';
//   const textColor = isDark ? '#ffffff' : '#222529';
//   const shadowColor = isDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.15)';

//   return {
//     [`& .${tooltipClasses.tooltip}`]: {
//       backgroundColor: bgColor,
//       color: textColor,
//       fontSize: '12px',
//       padding: '6px 12px',
//       boxShadow: `0 2px 8px ${shadowColor}`,
//       marginLeft: '8px !important',
//       borderRadius: '4px',
//       fontWeight: 500,
//     },
//     [`& .${tooltipClasses.arrow}`]: {
//       color: bgColor,
//     },
//   };
// });
// import { findAllParent, findMenuItem, getMenuItemFromURL } from "@src/helpers/menu";
// import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
// import { LuChevronRight } from "react-icons/lu";
// import { Link, useLocation } from "react-router-dom";
// import { useLayoutContext } from "@src/states";
// import { getLeftbarTheme } from "@src/layouts/LeftSideBar/helpers";

// const MenuItemWithChildren = ({ item, activeMenuItems, toggleMenu, theme, isCollapsed = false }) => {
//   const [open, setOpen] = useState(activeMenuItems.includes(item.key));
//   const Icon = item.icon;

//   useEffect(() => {
//     setOpen(activeMenuItems.includes(item.key));
//   }, [activeMenuItems, item]);

//   const toggleMenuItem = () => {
//     const status = !open;
//     setOpen(status);
//     if (toggleMenu) toggleMenu(item, status);
//   };

//   return (
//     <li>
//       <Box
//         onClick={toggleMenuItem}
//         sx={{
//           cursor: "pointer",
//           display: "flex",
//           padding: "12px 16px",
//           gap: "12px",
//           alignItems: "center",
//           color: open ? theme.item.active : theme.item.color,
//           "&:hover": {
//             color: open ? theme.item.active : theme.item.hover,
//           },
//         }}
//       >
//         {Icon && <Icon size={16} />}
//         {!isCollapsed && (
//           <Typography variant="subtitle1" sx={{ lineHeight: 1 }}>
//             {item.label}
//           </Typography>
//         )}
//         <Box sx={{ marginInlineStart: "auto" }}>
//           {!item.badge ? (
//             <LuChevronRight
//               size={16}
//               style={{
//                 display: "flex",
//                 transform: open ? "rotate(90deg)" : "rotate(0deg)",
//                 transition: "0.15s all",
//               }}
//             />
//           ) : (
//             <Box
//               sx={{
//                 bgcolor: "success.main",
//                 width: "16px",
//                 height: "16px",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 borderRadius: 1,
//               }}
//             >
//               <Typography variant="body2" fontWeight={500} lineHeight={1}>
//                 {item.badge.text}
//               </Typography>
//             </Box>
//           )}
//         </Box>
//       </Box>
//       <Collapse in={open}>
//         <ul style={{ listStyle: "none", paddingInlineStart: "28px" }}>
//           {(item.children || []).map((child, idx) => (
//             <Fragment key={idx}>
//               {child.children ? (
//                 <MenuItemWithChildren
//                   item={child}
//                   theme={theme}
//                   activeMenuItems={activeMenuItems}
//                   toggleMenu={toggleMenu}
//                   isCollapsed={isCollapsed}
//                 />
//               ) : (
//                 <MenuItem
//                   item={child}
//                   theme={theme}
//                   activeMenuItems={activeMenuItems}
//                   isCollapsed={isCollapsed}
//                 />
//               )}
//             </Fragment>
//           ))}
//         </ul>
//       </Collapse>
//     </li>
//   );
// };

// const MenuItem = ({ item, theme, activeMenuItems, isCollapsed = false }) => {
//   const [open, setOpen] = useState(activeMenuItems.includes(item.key));
//   const Icon = item.icon;
//   const active = activeMenuItems.includes(item.key);

//   useEffect(() => {
//     setOpen(activeMenuItems.includes(item.key));
//   }, [activeMenuItems, item]);

//   const menuItemContent = (
//     <Box
//       component={Link}
//       to={item.url || "#"}
//       target={item.target}
//       data-menu-key={item.key}
//       sx={{
//         display: "flex",
//         alignItems: "center",
//         padding: isCollapsed ? "12px" : "10px 16px",
//         color: active ? theme.item.active : theme.item.color,
//         backgroundColor: active ? "rgba(255, 255, 255, 0.1)" : "transparent",
//         textDecoration: "none",
//         borderRadius: "8px",
//         margin: "0 8px 4px",
//         justifyContent: isCollapsed ? "center" : "flex-start",
//         "&:hover": {
//           backgroundColor: "rgba(255, 255, 255, 0.1)",
//           color: theme.item.hover,
//         },
//         position: "relative",
//         cursor: "pointer",
//       }}
//     >
//       {Icon && <Icon size={20} />}
//       {!isCollapsed && (
//         <Typography
//           variant="body3"
//           sx={{
//             whiteSpace: "nowrap",
//             overflow: "hidden",
//             textOverflow: "ellipsis",
//             marginLeft: "12px",
//             flexGrow: 1,
//           }}
//         >
//           {item.label}
//         </Typography>
//       )}
//     </Box>
//   );

//   return (
//     <li>
//       {isCollapsed ? (
//         <StyledTooltip
//           title={item.label}
//           placement="right"
//           arrow
//         >
//           {menuItemContent}
//         </StyledTooltip>
//       ) : (
//         menuItemContent
//       )}
//     </li>
//   );
// };

// const AppMenu = ({ menuItems, isCollapsed = false }) => {
//   const location = useLocation();
//   const { settings } = useLayoutContext();
//   const menuRef = useRef(null);
//   const [activeMenuItems, setActiveMenuItems] = useState([]);

//   const toggleMenu = (menuItem, show) => {
//     if (show) {
//       setActiveMenuItems([menuItem.key, ...findAllParent(menuItems, menuItem)]);
//     }
//   };

//   const theme = useMemo(() => getLeftbarTheme(settings.sidenav.theme), [settings.sidenav.theme]);

//   const activeMenu = useCallback(() => {
//     const trimmedURL = location?.pathname?.replaceAll("", "");
//     const matchingMenuItem = getMenuItemFromURL(menuItems, trimmedURL);
//     if (matchingMenuItem) {
//       const activeMt = findMenuItem(menuItems, matchingMenuItem.key);
//       if (activeMt) {
//         setActiveMenuItems([activeMt.key, ...findAllParent(menuItems, activeMt)]);
//       }
//     }
//   }, [location.pathname, menuItems]);

//   useEffect(() => {
//     if (menuItems && menuItems.length > 0) activeMenu();
//   }, [activeMenu, menuItems]);

//   return (
//     <Box sx={{ padding: isCollapsed ? "8px 0" : "8px" }}>
//       <ul
//         ref={menuRef}
//         id="main-side-menu"
//         style={{
//           margin: 0,
//           padding: 0,
//           listStyle: "none",
//           display: "flex",
//           flexDirection: "column",
//           gap: "4px",
//         }}
//       >
//         {(menuItems || []).map((item, idx) => (
//           <Fragment key={idx}>
//             {item.isTitle ? (
//               !isCollapsed && (
//                 <li style={{ padding: "12px 16px" }}>
//                   <Typography
//                     fontWeight={500}
//                     variant="subtitle2"
//                     color={theme.label.color}
//                     sx={{
//                       opacity: isCollapsed ? 0 : 1,
//                       transition: "opacity 0.2s",
//                       whiteSpace: "nowrap",
//                       overflow: "hidden",
//                       textOverflow: "ellipsis",
//                     }}
//                   >
//                     {item.label}
//                   </Typography>
//                 </li>
//               )
//             ) : item.children ? (
//               <MenuItemWithChildren
//                 item={item}
//                 theme={theme}
//                 toggleMenu={toggleMenu}
//                 activeMenuItems={activeMenuItems}
//                 isCollapsed={isCollapsed}
//               />
//             ) : (
//               <MenuItem
//                 item={item}
//                 theme={theme}
//                 activeMenuItems={activeMenuItems}
//                 isCollapsed={isCollapsed}
//               />
//             )}
//           </Fragment>
//         ))}
//       </ul>
//     </Box>
//   );
// };

// export default AppMenu;

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
import CollapsedMenuPopper from "../../common/CollapsedMenuPopper";
import { useSelector } from "react-redux";
// import { permissions } from "../../components/CommonRowColumnUtils";
const MenuItemWithChildren = ({
  item,
  activeMenuItems,
  toggleMenu,
  theme,
  isCollapsed,
}) => {
  const [open, setOpen] = useState(activeMenuItems.includes(item.key));
  const Icon = item.icon;
  const [anchorEl, setAnchorEl] = useState(null);
  const closeTimer = useRef(null);

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
        <>
          <Box
            onMouseEnter={(e) => {
              if (closeTimer.current) {
                clearTimeout(closeTimer.current);
              }
              setAnchorEl(e.currentTarget);
            }}
            onMouseLeave={() => {
              closeTimer.current = setTimeout(() => {
                setAnchorEl(null);
              }, 150);
            }}
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
            {Icon && <Icon size={30} />}
          </Box>

          <CollapsedMenuPopper
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            item={item}
            onClose={() => setAnchorEl(null)}
            closeTimer={closeTimer}
          />
        </>
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
          {Icon && <Icon size={20} />}
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
  const Icon = item.icon;
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
        {Icon && <Icon size={16} />}
        <Typography ml={1}>{item.label}</Typography>
      </Box>
    </li>
  );
};

const SideMenu = ({ menuItems, isCollapsed }) => {
  const location = useLocation();
  const { settings } = useLayoutContext();
  const [activeMenuItems, setActiveMenuItems] = useState([]);

  const permissions = useSelector((state) => state.loginSlice?.permissions);
  console.log("permissions", permissions);

  if (!permissions) return null;

  const theme = useMemo(
    () => getLeftbarTheme(settings.sidenav.theme),
    [settings.sidenav.theme],
  );

  const MENU_PERMISSION_MAP = {
    "compliance dashboard": "compliance_menu",
    "fleet dashboard": "fleet_menu",
  };

  const filteredMenuItems = useMemo(() => {
    if (!permissions) return [];

    const allPermissions = permissions["Menu Permissions"] || [];

    return menuItems
      .map((menu) => {
        const filteredChildren = (menu.children || []).filter((child) => {
          const childLabel = child?.label?.toLowerCase?.() || "";
          const normalizedLabel = childLabel.replace(/\s/g, "_");

          const expectedDesc =
            MENU_PERMISSION_MAP[childLabel] || normalizedLabel;

          return allPermissions.some((perm) => {
            if (Number(perm?.granted) !== 1) return false;

            const desc = perm?.description?.toLowerCase?.() || "";

            return desc === expectedDesc;
          });
        });

        if (!filteredChildren.length) return null;

        return {
          ...menu,
          children: filteredChildren,
        };
      })
      .filter(Boolean);
  }, [menuItems, permissions]);
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
            />
          ),
        )}
      </ul>
    </Box>
  );
};

export default SideMenu;