export const getSidebarStyle = (isDark) => ({
  width: 268, flexShrink: 0, display: 'flex', flexDirection: 'column',
  borderRight: '1px solid', borderColor: 'divider',
  bgcolor: isDark ? 'background.paper' : '#fafbfc', overflow: 'hidden',
});

export const getSidebarHeaderStyle = () => ({ px: 2, pt: 2, pb: 1.5 });

export const getSidebarListStyle = () => ({ flex: 1, overflowY: 'auto', py: 1 });

export const headerTitleRowStyle = {
  display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5
};

export const headerActionsStyle = {
  display: 'flex', gap: 0.5
};

export const searchInputPropsStyle = {
  fontSize: 14, borderRadius: 1.5
};

export const filterSelectFormControlStyle = {
  mt: 1
};

export const filterSelectStyle = {
  fontSize: 14, borderRadius: 1.5
};

export const filterMenuItemStyle = {
  fontSize: 14
};

export const emptyStateContainerStyle = {
  textAlign: 'center', py: 4, px: 2
};

export const createButtonContainerStyle = {
  p: 1.5
};

export const createButtonStyle = {
  borderRadius: 1.5, fontSize: 14, fontWeight: 600,
  '&:hover': {
    backgroundColor: 'primary.main',
    color: 'white',
  }
};
