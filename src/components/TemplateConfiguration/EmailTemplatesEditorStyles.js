import { alpha } from '@mui/material';

export const getEditorContainerStyle = () => ({
  flex: 1, display: 'flex', flexDirection: 'column',
  overflow: 'hidden', borderRight: '1px solid', borderColor: 'divider',
  bgcolor: 'background.paper'
});

export const getEditorHeaderStyle = () => ({
  px: 3, pt: 2, pb: 1.5, borderBottom: '1px solid', borderColor: 'divider'
});

export const getEditorContentStyle = (theme, isDark) => ({
  flex: 1, overflow: 'auto', px: 3, py: 2,
  '& .ql-toolbar': {
    borderRadius: '8px 8px 0 0',
    border: `1px solid ${theme.palette.divider}`,
    bgcolor: isDark ? 'rgba(255,255,255,0.04)' : '#fafbfc',
    fontSize: 13,
  },
  '& .ql-container': {
    borderRadius: '0 0 8px 8px',
    border: `1px solid ${theme.palette.divider}`,
    borderTop: 'none',
    fontSize: 13,
    minHeight: 200,
  },
  '& .ql-editor': { minHeight: 200, fontSize: 13, lineHeight: 1.65, color: theme.palette.text.primary },
});

export const templateNameContainerStyle = { mb: 1.5 };
export const templateNameInnerStyle = { mb: 1.5 };
export const templateNameLabelStyle = { mb: 0.5, display: 'block' };
export const templateNameInputPropsStyle = { fontSize: 13, borderRadius: 1.5 };

export const subjectContainerStyle = { display: 'flex', gap: 1 };
export const subjectButtonStyle = { whiteSpace: 'nowrap', borderRadius: 1.5, fontSize: 12, flexShrink: 0 };

export const getSectionTogglesContainerStyle = (isDark) => ({
  mb: 1.5, p: 1.5, borderRadius: 1.5,
  border: '1px solid', borderColor: 'divider',
  bgcolor: isDark ? 'rgba(255,255,255,0.03)' : '#fafbfc',
});

export const sectionTogglesRowStyle = { display: 'flex', flexWrap: 'wrap', gap: 1 };
export const accessDetailsToggleStyle = { m: 0, mr: 2, alignItems: 'flex-start' };
export const importantNoteToggleStyle = { m: 0, alignItems: 'flex-start' };

export const emailBodyCardStyle = {
  position: 'sticky', top: 0, zIndex: 1,
  border: '1px solid', borderColor: 'divider',
  borderRadius: 2, overflow: 'hidden', mb: 1,
  bgcolor: 'background.paper',
};

export const emailHeaderChromeStyle = {
  background: 'linear-gradient(135deg, #1a2b5a 0%, #284394 100%)',
  px: 3, py: 2, display: 'flex', alignItems: 'center', gap: 2,
};

export const logoBoxStyle = {
  width: 40, height: 40, bgcolor: '#3e60d5', borderRadius: 1.5,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  fontSize: 18, flexShrink: 0, overflow: 'hidden',
};

export const logoImgStyle = { width: '100%', height: '100%', objectFit: 'cover', borderRadius: 6, display: 'block' };
export const carrierNameStyle = { color: 'white', lineHeight: 1.3 };
export const carrierPortalStyle = { color: 'rgba(255,255,255,0.6)' };

export const quillContainerStyle = { bgcolor: 'background.paper', p: 1 };
export const quillToolbarStyle = { display: 'flex', justifyContent: 'flex-end', mb: 0.5 };
export const quillInsertButtonStyle = { fontSize: 11, color: 'text.secondary', textTransform: 'none', px: 1, py: 0.25, borderRadius: 1 };

export const editableSectionBoxStyle = { bgcolor: 'background.paper', px: 2, pb: 2 };

export const getAccessDetailsBoxStyle = (isDark) => ({
  bgcolor: isDark ? alpha('#22c55e', 0.07) : '#f0fdf4',
  border: '1px solid', borderColor: isDark ? alpha('#22c55e', 0.3) : '#86efac',
  borderRadius: 1.5, p: 1.5,
});

export const accessDetailsTitleRowStyle = { display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 };
export const accessDetailsTitleInputPropsStyle = { fontSize: 12, fontWeight: 700, color: '#15803d', padding: '2px 0' };
export const accessDetailsTitleSx = { flex: 1, '& .MuiInput-underline:before': { borderColor: 'transparent' }, '& .MuiInput-underline:hover:before': { borderColor: '#86efac' } };

export const rowContainerStyle = { display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.5 };
export const getRowLabelInputPropsStyle = (isDark) => ({ fontSize: 12, color: isDark ? '#94a3b8' : '#6b7280', padding: '2px 0', width: 110 });
export const rowLabelSx = { width: 110, '& .MuiInput-underline:before': { borderColor: 'transparent' }, '& .MuiInput-underline:hover:before': { borderColor: '#86efac' } };
export const rowVariableInputPropsStyle = { fontSize: 12, color: '#3e60d5', fontFamily: 'monospace', padding: '2px 0' };
export const rowVariableSx = { flex: 1, '& .MuiInput-underline:before': { borderColor: 'transparent' }, '& .MuiInput-underline:hover:before': { borderColor: '#86efac' } };
export const rowRemoveButtonSx = { p: 0.25, opacity: 0.5, '&:hover': { opacity: 1 } };

export const addRowButtonSx = { mt: 0.5, fontSize: 11, color: '#15803d', textTransform: 'none', p: '2px 6px', minWidth: 0 };

export const getImportantNoteBoxStyle = (isDark) => ({
  bgcolor: isDark ? alpha('#3e60d5', 0.07) : '#eff6ff',
  border: '1px solid', borderColor: isDark ? alpha('#3e60d5', 0.3) : '#93c5fd',
  borderRadius: 1.5, p: 1.5,
});

export const importantNoteTitleSx = { color: '#1d4ed8', fontWeight: 700, display: 'block', mb: 0.5 };
export const importantNoteInputPropsStyle = { fontSize: 12, color: '#1d4ed8', lineHeight: 1.5 };
export const importantNoteSx = { '& .MuiInput-underline:before': { borderColor: 'transparent' }, '& .MuiInput-underline:hover:before': { borderColor: '#93c5fd' } };

export const getSignoffInputPropsStyle = (isDark) => ({ fontSize: 12, color: isDark ? '#94a3b8' : '#6b7280' });
export const getSignoffSx = (isDark) => ({ mb: 0.75, '& .MuiInput-underline:before': { borderColor: 'transparent' }, '& .MuiInput-underline:hover:before': { borderColor: isDark ? '#334155' : '#d1d5db' } });

export const getFooterChromeStyle = (isDark) => ({
  bgcolor: isDark ? 'rgba(255,255,255,0.03)' : '#f8f9fa',
  borderTop: '1px solid', borderColor: 'divider',
  px: 2, py: 1.5, textAlign: 'center',
});

export const footerLinksRowStyle = { display: 'flex', justifyContent: 'center', gap: 1, mt: 0.25 };
export const footerLinkSx = { cursor: 'pointer' };

export const getEditorActionBarStyle = () => ({
  px: 3, py: 1.5, borderTop: '1px solid', borderColor: 'divider',
  display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0,
});

export const actionBarLeftStyle = { display: 'flex', gap: 1 };
export const actionBarRightStyle = { display: 'flex', gap: 1 };
export const actionButtonStyle = { borderRadius: 1.5, fontSize: 13 };
