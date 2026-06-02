export const flyoutPaperSx = {
  minWidth: 180,
  borderRadius: 3,
  overflow: "hidden",
  py: 1,
  backgroundColor: "background.paper",
  boxShadow: 3,
};

export const flyoutPopperSx = { zIndex: 1300 };

export const flyoutPopperModifiers = [
  { name: "offset", options: { offset: [-8, 8] } },
];

export const getFlyoutItemSx = (isActive) => ({
  mx: 1,
  px: 1.5,
  py: 1,
  cursor: "pointer",
  fontSize: "0.9375rem",
  borderRadius: 2.5,
  transition: "color 0.15s, background-color 0.15s",
  fontWeight: 400,
  color: isActive ? "primary.main" : "text.secondary",
  backgroundColor: isActive ? "action.hover" : "transparent",
  "&:hover": {
    color: "primary.main",
    backgroundColor: "action.hover",
  },
});

export const getCollapsedIconBoxSx = (isActive) => ({
  p: 1.5,
  display: "flex",
  justifyContent: "center",
  cursor: "pointer",
  borderRadius: "20px 0px 0px 20px",
  ml: 0.625,
  color: isActive ? "primary.main" : "common.white",
  backgroundColor: isActive ? "common.white" : "transparent",
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: isActive ? "common.white" : "common.sidebar",
  },
});

export const getExpandedMenuRowSx = (isOpen, theme) => ({
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  px: 2,
  py: 1.5,
  gap: 1.5,
  color: isOpen ? theme.item.active : theme.item.color,
});

export const parentLabelLinkSx = {
  textDecoration: "none",
  color: "inherit",
  flexGrow: 1,
};

export const chevronStyle = (isOpen) => ({
  transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
  transition: "0.15s",
});

export const childrenListSx = { listStyle: "none", pl: 3.5 };

export const getExpandedMenuItemSx = (isActive, theme) => ({
  display: "flex",
  alignItems: "center",
  px: 2,
  py: 1.25,
  color: isActive ? theme.item.active : theme.item.color,
  textDecoration: "none",
  borderRadius: 2,
  "&:hover": { backgroundColor: "action.hover" },
});

export const menuIconImgSx = (size) => ({
  width: size,
  height: size,
  objectFit: "contain",
  flexShrink: 0,
  display: "block",
});

export const menuListSx = { listStyle: "none", p: 0 };

export const chevronContainerSx = { marginLeft: "auto" };
