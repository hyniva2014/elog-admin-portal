import { alpha } from '@mui/material';

export const getDialogTitleStyle = () => ({ pb: 1 });

export const getTitleContainerStyle = () => ({ display: 'flex', alignItems: 'center', gap: 1.5 });

export const getIconBoxStyle = (theme) => ({
  width: 36, height: 36,
  bgcolor: alpha(theme.palette.primary.main, 0.1),
  borderRadius: 1.5, display: 'flex', alignItems: 'center',
  justifyContent: 'center', flexShrink: 0
});

export const getDialogContentStyle = () => ({ pb: 2 });

export const getFormContainerStyle = () => ({ display: 'flex', flexDirection: 'column', gap: 2, mt: 1.5 });

export const getLabelStyle = () => ({ mb: 0.5, fontWeight: 600 });

export const getDialogActionsStyle = () => ({ px: 3, pb: 2, gap: 1 });
