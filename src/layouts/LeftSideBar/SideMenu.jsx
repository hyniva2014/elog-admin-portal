import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Box,
  Collapse,
  Typography,
  Popper,
  Paper,
} from "@mui/material";
import { LuChevronRight } from "react-icons/lu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLayoutContext } from "@src/states";
import { getLeftbarTheme } from "@src/layouts/LeftSideBar/helpers";
import {
  findAllParent,
  findMenuItem,
  getMenuItemFromURL,
} from "@src/helpers/menu";
import {
  flyoutPaperSx,
  flyoutPopperSx,
  flyoutPopperModifiers,
  getFlyoutItemSx,
  getCollapsedIconBoxSx,
  getExpandedMenuRowSx,
  parentLabelLinkSx,
  chevronStyle,
  childrenListSx,
  getExpandedMenuItemSx,
  menuIconImgSx,
  menuListSx,
} from "./SideMenu.styles";

const MenuIcon = ({ icon, size }) => {
  if (!icon) return null;
  if (typeof icon === "string") {
    return <Box component="img" src={icon} alt="" sx={menuIconImgSx(size)} />;
  }
  const Icon = icon;
  return <Icon size={size} />;
};

const FlyoutItem = ({ child, currentPath, onItemClick }) => {
  const isActive = currentPath === child.url;

  const handleClick = useCallback(() => {
    onItemClick(child.url);
  }, [child.url, onItemClick]);

  return (
    <Box onClick={handleClick} sx={getFlyoutItemSx(isActive)}>
      {child.label}
    </Box>
  );
};

const CollapsedFlyout = ({ item, anchorEl, open, onClose, closeTimerRef }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleItemClick = useCallback((url) => {
    navigate(url);
    onClose();
  }, [navigate, onClose]);

  const handleMouseEnter = useCallback(() => {
    clearTimeout(closeTimerRef.current);
  }, [closeTimerRef]);

  const handleMouseLeave = useCallback(() => {
    closeTimerRef.current = setTimeout(onClose, 100);
  }, [closeTimerRef, onClose]);

  const allItems = useMemo(() => [
    ...(item.url ? [{ key: item.key, label: item.label, url: item.url }] : []),
    ...(item.children || []),
  ], [item]);

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement="right-start"
      modifiers={flyoutPopperModifiers}
      sx={flyoutPopperSx}
    >
      <Paper
        elevation={3}
        sx={flyoutPaperSx}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {allItems.map((child) => (
          <FlyoutItem
            key={child.key}
            child={child}
            currentPath={location.pathname}
            onItemClick={handleItemClick}
          />
        ))}
      </Paper>
    </Popper>
  );
};

const MenuItemWithChildren = ({
  item,
  activeMenuItems,
  toggleMenu,
  theme,
  isCollapsed,
  onNavigate,
}) => {
  const [open, setOpen] = useState(activeMenuItems.includes(item.key));
  const [flyoutOpen, setFlyoutOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const closeTimerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    setOpen(activeMenuItems.includes(item.key));
  }, [activeMenuItems, item.key]);

  const isChildActive = useMemo(
    () => (item.children || []).some((child) => location.pathname.startsWith(child.url)),
    [item.children, location.pathname],
  );

  const toggleMenuItem = useCallback(() => {
    const status = !open;
    setOpen(status);
    toggleMenu?.(item, status);
  }, [open, toggleMenu, item]);

  const stopLinkPropagation = useCallback((e) => {
    e.stopPropagation();
    onNavigate?.();
  }, [onNavigate]);

  const handleMouseEnter = useCallback((e) => {
    if (!isCollapsed) return;
    clearTimeout(closeTimerRef.current);
    setAnchorEl(e.currentTarget);
    setFlyoutOpen(true);
  }, [isCollapsed]);

  const handleMouseLeave = useCallback(() => {
    if (!isCollapsed) return;
    closeTimerRef.current = setTimeout(() => setFlyoutOpen(false), 100);
  }, [isCollapsed]);

  const handleFlyoutClose = useCallback(() => setFlyoutOpen(false), []);

  const collapsedIconSx = useMemo(() => getCollapsedIconBoxSx(isChildActive), [isChildActive]);
  const expandedRowSx = useMemo(() => getExpandedMenuRowSx(open, theme), [open, theme]);

  return (
    <li>
      {isCollapsed ? (
        <>
          <Box
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={collapsedIconSx}
          >
            <MenuIcon icon={item.icon} size={30} />
          </Box>
          <CollapsedFlyout
            item={item}
            anchorEl={anchorEl}
            open={flyoutOpen}
            onClose={handleFlyoutClose}
            closeTimerRef={closeTimerRef}
          />
        </>
      ) : (
        <Box onClick={toggleMenuItem} sx={expandedRowSx}>
          <MenuIcon icon={item.icon} size={20} />
          {item.url ? (
            <Typography component={Link} to={item.url} onClick={stopLinkPropagation} sx={parentLabelLinkSx}>
              {item.label}
            </Typography>
          ) : (
            <Typography>{item.label}</Typography>
          )}
          <Box sx={{ marginLeft: "auto" }}>
            <LuChevronRight size={16} style={chevronStyle(open)} />
          </Box>
        </Box>
      )}

      {!isCollapsed && (
        <Collapse in={open}>
          <ul style={childrenListSx}>
            {(item.children || []).map((child) => (
              <MenuItem
                key={child.key}
                item={child}
                theme={theme}
                activeMenuItems={activeMenuItems}
                onNavigate={onNavigate}
              />
            ))}
          </ul>
        </Collapse>
      )}
    </li>
  );
};

const MenuItem = ({ item, theme, activeMenuItems, isCollapsed, onNavigate }) => {
  const [flyoutOpen, setFlyoutOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const closeTimerRef = useRef(null);
  const location = useLocation();

  const isChildActive = useMemo(
    () => (item.children || []).some((child) => location.pathname.startsWith(child.url)),
    [item.children, location.pathname],
  );

  const isDirectlyActive = activeMenuItems.includes(item.key);
  const active = isDirectlyActive || isChildActive;

  const handleMouseEnter = useCallback((e) => {
    if (!isCollapsed) return;
    clearTimeout(closeTimerRef.current);
    setAnchorEl(e.currentTarget);
    setFlyoutOpen(true);
  }, [isCollapsed]);

  const handleMouseLeave = useCallback(() => {
    if (!isCollapsed) return;
    closeTimerRef.current = setTimeout(() => setFlyoutOpen(false), 100);
  }, [isCollapsed]);

  const handleFlyoutClose = useCallback(() => setFlyoutOpen(false), []);

  const collapsedIconSx = useMemo(() => getCollapsedIconBoxSx(active), [active]);
  const expandedItemSx = useMemo(() => getExpandedMenuItemSx(active, theme), [active, theme]);

  return (
    <li>
      {isCollapsed ? (
        <>
          <Box
            component={Link}
            to={item.url}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={collapsedIconSx}
          >
            <MenuIcon icon={item.icon} size={30} />
          </Box>
          <CollapsedFlyout
            item={item}
            anchorEl={anchorEl}
            open={flyoutOpen}
            onClose={handleFlyoutClose}
            closeTimerRef={closeTimerRef}
          />
        </>
      ) : (
        <Box component={Link} to={item.url} onClick={onNavigate} sx={expandedItemSx}>
          <MenuIcon icon={item.icon} size={16} />
          <Typography ml={1}>{item.label}</Typography>
        </Box>
      )}
    </li>
  );
};

const SideMenu = ({ menuItems, isCollapsed }) => {
  const location = useLocation();
  const { settings, updateSidenav } = useLayoutContext();
  const [activeMenuItems, setActiveMenuItems] = useState([]);

  const theme = useMemo(
    () => getLeftbarTheme(settings.sidenav.theme),
    [settings.sidenav.theme],
  );

  const filteredMenuItems = useMemo(() => menuItems || [], [menuItems]);

  const activateMenu = useCallback(() => {
    const match = getMenuItemFromURL(filteredMenuItems, location.pathname);
    if (match) {
      const item = findMenuItem(filteredMenuItems, match.key);
      const newActive = [item.key, ...findAllParent(filteredMenuItems, item)];
      setActiveMenuItems((prev) =>
        JSON.stringify(prev) === JSON.stringify(newActive) ? prev : newActive,
      );
    }
  }, [location.pathname, filteredMenuItems]);

  const manualToggleRef = useRef(0);

  useEffect(() => {
    if (Date.now() - manualToggleRef.current > 50) {
      activateMenu();
    }
  }, [activateMenu]);

  const handleNavigate = useCallback(() => {
    updateSidenav({ isCollapsed: true });
  }, [updateSidenav]);

  const toggleMenu = useCallback((menuItem, show) => {
    manualToggleRef.current = Date.now();
    setActiveMenuItems((prev) => {
      if (show) {
        const currentMatch = getMenuItemFromURL(filteredMenuItems, location.pathname);
        if (currentMatch) {
          const currentItem = findMenuItem(filteredMenuItems, currentMatch.key);
          const activeItems = [currentItem.key, ...findAllParent(filteredMenuItems, currentItem)];
          return activeItems.includes(menuItem.key)
            ? activeItems
            : [menuItem.key, ...activeItems];
        }
        return [menuItem.key, ...findAllParent(filteredMenuItems, menuItem)];
      }
      return prev.filter((key) => key !== menuItem.key);
    });
  }, [filteredMenuItems, location.pathname]);

  return (
    <Box>
      <ul style={menuListSx}>
        {filteredMenuItems.map((item) =>
          item.children ? (
            <MenuItemWithChildren
              key={item.key}
              item={item}
              theme={theme}
              toggleMenu={toggleMenu}
              activeMenuItems={activeMenuItems}
              isCollapsed={isCollapsed}
              onNavigate={handleNavigate}
            />
          ) : (
            <MenuItem
              key={item.key}
              item={item}
              theme={theme}
              activeMenuItems={activeMenuItems}
              isCollapsed={isCollapsed}
              onNavigate={handleNavigate}
            />
          ),
        )}
      </ul>
    </Box>
  );
};

export default SideMenu;
