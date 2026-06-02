/**
 * Styled components and sx objects for CommonRowColumnUtils
 */

export const EllipsisTextSx = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export const getActionButtonSx = (canDelete) => ({
  opacity: canDelete ? 1 : 0.5,
  cursor: canDelete ? "pointer" : "not-allowed",
});
