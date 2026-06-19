export const getColumnsWithAssign = (
  columns,
  handleAttachmentClick,
  canView = true,
) =>
  columns.map((col) =>
    col.field === "action"
      ? {
          ...col,
          onView: handleAttachmentClick,
          canView,
        }
      : col,
  );