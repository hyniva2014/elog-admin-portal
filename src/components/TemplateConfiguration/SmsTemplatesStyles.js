export const mainContainerStyle = { display: 'flex', flex: 1, minHeight: 0, overflow: 'hidden' };

export const getLeftPanelStyle = (isDark) => ({
  width: 268,
  flexShrink: 0,
  display: 'flex',
  flexDirection: 'column',
  borderRight: '1px solid',
  borderColor: 'divider',
  bgcolor: isDark ? 'background.paper' : '#fafbfc',
});

export const leftPanelHeaderStyle = { px: 2, pt: 2, pb: 1.5 };
export const headerTitleRowStyle = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 };
export const headerTitleBadgeStyle = { ml: 0.75 };
export const headerActionsStyle = { display: 'flex', gap: 0.5 };
export const searchInputPropsStyle = { fontSize: 14, borderRadius: 1.5 };
export const listContainerStyle = { flex: 1, overflowY: 'auto', py: 1 };
export const loadingContainerStyle = { display: 'flex', justifyContent: 'center', py: 4 };
export const emptyStateContainerStyle = { textAlign: 'center', py: 4, px: 2 };

export const getListItemStyle = (isSelected, theme, alpha) => ({
  px: 2, py: 1.5, cursor: 'pointer', mx: 1, mb: 0.5, borderRadius: 1.5,
  border: '1px solid',
  borderColor: isSelected ? 'primary.main' : 'transparent',
  bgcolor: isSelected ? alpha(theme.palette.primary.main, 0.07) : 'transparent',
  '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.06) },
});

export const getListItemAvatarStyle = (isSelected, theme, alpha) => ({
  width: 32, height: 32,
  bgcolor: isSelected ? 'primary.main' : alpha(theme.palette.grey[500], 0.12),
  color: isSelected ? 'white' : 'text.secondary'
});

export const listItemContentStyle = { display: 'flex', alignItems: 'flex-start', gap: 1.5 };
export const listItemTextContainerStyle = { flex: 1, minWidth: 0 };
export const listItemHeaderStyle = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 };

export const getListItemTitleStyle = (isSelected) => ({
  color: isSelected ? 'primary.main' : 'text.primary'
});

export const getStatusChipStyle = (statusColor) => ({
  height: 18, fontSize: '10px', fontWeight: 600,
  bgcolor: statusColor?.bg,
  color: statusColor?.text,
  borderRadius: '4px', flexShrink: 0
});

export const createButtonContainerStyle = { p: 1.5 };
export const createButtonStyle = {
  borderRadius: 1.5, fontSize: 14, fontWeight: 600,
  '&:hover': {
    backgroundColor: 'primary.main',
    color: 'white',
  }
};

export const middlePanelStyle = { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRight: '1px solid', borderColor: 'divider' };
export const middlePanelHeaderStyle = { px: 3, pt: 2.5, pb: 1.5, borderBottom: '1px solid', borderColor: 'divider' };
export const middlePanelContentStyle = { px: 3, py: 2, flex: 1, overflow: 'auto' };

export const editorInputPropsStyle = { fontSize: 14, borderRadius: 1.5 };
export const charCountContainerStyle = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 };
export const variableContainerStyle = { display: 'flex', flexWrap: 'wrap', gap: 0.5 };

export const getVariableChipStyle = (isDark, alpha) => ({
  height: 22, fontSize: '11px', fontFamily: 'monospace',
  bgcolor: isDark ? alpha('#3e60d5', 0.15) : '#eff6ff',
  color: isDark ? '#93c5fd' : '#1d4ed8',
  border: '1px solid',
  borderColor: isDark ? alpha('#3e60d5', 0.3) : '#bfdbfe'
});

export const editorFooterStyle = { px: 3, py: 1.5, borderTop: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'flex-end', gap: 1 };
export const editorFooterButtonStyle = {
  borderRadius: 1.5, fontSize: 14,
  '&:hover': {
    backgroundColor: 'primary.main',
    color: 'white',
  }
};

export const rightPanelStyle = { width: 320, flexShrink: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' };
export const rightPanelHeaderStyle = { px: 2, pt: 2, pb: 1.5, borderBottom: '1px solid', borderColor: 'divider' };

export const getPhoneContainerStyle = (isDark) => ({
  flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 3,
  bgcolor: isDark ? 'rgba(255,255,255,0.02)' : '#f8f9fa'
});

export const phoneFrameStyle = { width: 240, bgcolor: '#1a1a2e', borderRadius: 4, p: 1.5, boxShadow: '0 8px 32px rgba(0,0,0,0.25)' };
export const phoneStatusBarStyle = { display: 'flex', justifyContent: 'space-between', px: 1, pb: 1 };
export const phoneStatusBarTextStyle = { color: 'rgba(255,255,255,0.7)', fontSize: 10 };
export const phoneMessageThreadStyle = { bgcolor: '#f2f2f7', borderRadius: 2.5, p: 1.5, minHeight: 200 };
export const phoneSenderTextStyle = { fontSize: 11, color: '#8e8e93', textAlign: 'center', mb: 1 };
export const phoneMessageBubbleStyle = { bgcolor: '#e9e9eb', borderRadius: '16px 16px 16px 4px', px: 1.5, py: 1, maxWidth: '90%' };
export const phoneMessageTextStyle = { fontSize: 12, color: '#000', lineHeight: 1.5 };
export const phoneDeliveredTextStyle = { fontSize: 10, color: '#8e8e93', mt: 0.5 };
