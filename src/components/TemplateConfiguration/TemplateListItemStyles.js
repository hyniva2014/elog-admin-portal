import { alpha } from '@mui/material';

export const getListItemContainerStyle = (theme, selected) => ({
  px: 2, py: 1.5, cursor: 'pointer', borderRadius: 1.5, mx: 1, mb: 0.5,
  border: '1px solid',
  borderColor: selected ? 'primary.main' : 'transparent',
  backgroundColor: selected
    ? alpha(theme.palette.primary.main, 0.07)
    : 'transparent',
  '&:hover': {
    backgroundColor: selected
      ? alpha(theme.palette.primary.main, 0.1)
      : alpha(theme.palette.grey[500], 0.06),
  },
  transition: 'all 0.15s ease',
});

export const getAvatarStyle = (theme, selected) => ({
  width: 36, height: 36, flexShrink: 0, mt: 0.25,
  bgcolor: selected ? 'primary.main' : alpha(theme.palette.grey[500], 0.12),
  color: selected ? 'white' : 'text.secondary',
});

export const getTitleStyle = (selected) => ({
  color: selected ? 'primary.main' : 'text.primary', lineHeight: 1.3
});

export const getChipStyle = (statusColor) => ({
  height: 18, fontSize: '10px', fontWeight: 600,
  bgcolor: statusColor.bg, color: statusColor.text,
  borderRadius: '4px', flexShrink: 0,
});
