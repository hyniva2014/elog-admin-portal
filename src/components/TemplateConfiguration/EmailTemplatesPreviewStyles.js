import { alpha } from '@mui/material';

export const getPreviewPanelStyle = (previewWidth) => ({
  width: previewWidth, flexShrink: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden'
});

export const getPreviewHeaderStyle = () => ({
  px: 2, pt: 2, pb: 1.5, borderBottom: '1px solid', borderColor: 'divider',
  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
});

export const headerTitleRowStyle = {
  display: 'flex', alignItems: 'center', gap: 0.75
};

export const headerGripStyle = {
  display: 'flex', alignItems: 'center', color: 'text.disabled', cursor: 'default'
};

export const headerActionsStyle = {
  display: 'flex', alignItems: 'center', gap: 0.75
};

export const toggleGroupStyle = {
  '& .MuiToggleButton-root': { py: 0.25, px: 0.75, border: '1px solid', borderColor: 'divider' }
};

export const getThemeToggleStyle = (isDarkPreview, theme) => ({
  bgcolor: isDarkPreview ? '#1a2b5a' : alpha(theme.palette.grey[500], 0.1),
  '&:hover': { bgcolor: isDarkPreview ? '#1e3370' : alpha(theme.palette.grey[500], 0.18) },
});

export const expandButtonStyle = (theme) => ({
  bgcolor: alpha(theme.palette.grey[500], 0.1),
  '&:hover': { bgcolor: alpha(theme.palette.grey[500], 0.2) }
});

export const previewEmailBoxStyle = {
  px: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider', flexShrink: 0
};

export const previewEmailInputPropsStyle = {
  fontSize: 13, borderRadius: 1.5
};

export const previewEmailHelperTextStyle = {
  mt: 0.5, display: 'block'
};

export const getPreviewContentStyle = (isDarkPreview) => ({
  flex: 1, overflowY: 'auto', p: 1.5,
  bgcolor: isDarkPreview ? '#0f1117' : '#eef0f5',
});

export const getRenderedPreviewContainerStyle = (previewDevice) => ({
  maxWidth: previewDevice === 'mobile' ? 320 : '100%',
  mx: 'auto', borderRadius: 1.5, overflow: 'hidden',
  boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
});

export const renderedPreviewInnerStyle = {
  '& *': { maxWidth: '100%' }
};

export const emptyPreviewStyle = {
  display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%'
};

export const variablesSectionStyle = {
  flexShrink: 0, borderTop: '1px solid', borderColor: 'divider', px: 2, py: 1.5
};

export const variablesHeaderRowStyle = {
  display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1
};

export const variablesListStyle = {
  display: 'flex', flexWrap: 'wrap', gap: 0.5
};

export const getVariableChipStyle = (isDark) => ({
  height: 22, fontSize: '11px', fontFamily: 'monospace',
  bgcolor: isDark ? alpha('#3e60d5', 0.15) : '#eff6ff',
  color: isDark ? '#93c5fd' : '#1d4ed8',
  border: '1px solid',
  borderColor: isDark ? alpha('#3e60d5', 0.3) : '#bfdbfe',
  '&:hover': { bgcolor: isDark ? alpha('#3e60d5', 0.25) : '#dbeafe' },
});

export const moreVariablesChipStyle = {
  height: 22, fontSize: '11px', color: 'text.secondary'
};
