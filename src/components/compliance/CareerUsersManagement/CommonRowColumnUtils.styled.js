export const EllipsisTextSx = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export const getActionButtonSx = (canDelete) => ({
  opacity: canDelete ? 1 : 0.5,
  cursor: canDelete ? "pointer" : "not-allowed",
});

export const CreatedDateTypographySx = {
  fontSize: 14,
};

export const CreatedTimeTypographySx = (theme) => ({
  fontSize: 14,
  color: theme.palette.text.secondary,
});

export const getStatusCellSx = (statusColor) => ({
  color: statusColor,
  fontWeight: 400,
});

export const UserNameTypographySx = {
  fontSize: 13,
};

export const RoleCellSx = {
  fontSize: 13,
  textTransform: "capitalize",
};

export const EmailTypographySx = (theme) => ({
  fontSize: 13,
  color: theme.palette.text.secondary,
});
