export const flyoutPaperSx = {
  minWidth: 180,
  borderRadius: "12px",
  overflow: "hidden",
  py: 1,
  backgroundColor: "background.paper",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.12)",
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
  fontSize: "15px",
  borderRadius: "10px",
  transition: "color 0.15s, background-color 0.15s",
  fontWeight: 400,
  color: isActive ? "primary.main" : "#5a6270",
  backgroundColor: isActive ? "action.hover" : "transparent",
  "&:hover": {
    color: "primary.main",
    backgroundColor: "action.hover",
  },
});

export const getCollapsedIconBoxSx = (isActive) => ({
  p: "12px",
  display: "flex",
  justifyContent: "center",
  cursor: "pointer",
  borderRadius: "20px 0px 0px 20px",
  marginLeft: "5px",
  color: isActive ? "primary.main" : "common.white",
  backgroundColor: isActive ? "common.white" : "transparent",
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: isActive ? "common.white" : "rgba(255,255,255,0.12)",
  },
});

export const getExpandedMenuRowSx = (isOpen, theme) => ({
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  padding: "12px 16px",
  gap: "12px",
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

export const childrenListSx = { listStyle: "none", paddingLeft: "28px" };

export const getExpandedMenuItemSx = (isActive, theme) => ({
  display: "flex",
  alignItems: "center",
  padding: "10px 16px",
  color: isActive ? theme.item.active : theme.item.color,
  textDecoration: "none",
  borderRadius: "8px",
  "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
});

export const menuIconImgSx = (size) => ({
  width: size,
  height: size,
  objectFit: "contain",
  flexShrink: 0,
  display: "block",
});

export const menuListSx = { listStyle: "none", padding: 0 };
