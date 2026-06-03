export const TopHeaderSx = (theme) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: theme.palette.brand.main,
  color: theme.palette.common.white,
  px: 3,
  py: 2,
  borderRadius: "8px",
  mb: 3,
});

export const TopHeaderLeftSx = {
  display: "flex",
  alignItems: "center",
  gap: 2,
};

export const AvatarSx = (theme) => ({
  width: 56,
  height: 56,
  bgcolor: theme.palette.primary.light,
});

export const RoleTextSx = {
  opacity: 0.8,
};

export const UserNameTextSx = {
  fontWeight: 600,
};

export const TopHeaderRightSx = {
  display: "flex",
  gap: 4,
};
