export const getColumnsWithAssign = (
  columns,
  handleAttachmentClick,
) =>
  columns.map((col) =>
    col.field === "action"
      ? {
          ...col,
          onView: handleAttachmentClick,
        }
      : col,
  );