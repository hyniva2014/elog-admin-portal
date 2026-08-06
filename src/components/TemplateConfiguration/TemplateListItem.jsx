import React from 'react';
import { Box, Avatar, Typography, Chip, Skeleton, useTheme, alpha } from '@mui/material';
import {
  LuBuilding2, LuUsers, LuLock, LuFileText, LuCreditCard,
  LuShield, LuClipboardList, LuAlertCircle
} from 'react-icons/lu';
import * as styles from './TemplateListItemStyles';

export const TEMPLATE_ICONS = {
  agency: LuBuilding2,
  user: LuUsers,
  lock: LuLock,
  billing: LuCreditCard,
  receipt: LuFileText,
  policy: LuShield,
  claim: LuClipboardList,
  alert: LuAlertCircle,
};

export const STATUS_COLORS = {
  Active:   { bg: '#dcfce7', text: '#15803d' },
  Draft:    { bg: '#fef9c3', text: '#854d0e' },
  Inactive: { bg: '#fee2e2', text: '#991b1b' },
};

export const TemplateListItem = ({ template, selected, onClick }) => {
  const theme = useTheme();
  const Icon = TEMPLATE_ICONS[template.iconType] || LuFileText;
  const statusColor = STATUS_COLORS[template.status] || STATUS_COLORS.Active;

  return (
    <Box
      onClick={onClick}
      sx={styles.getListItemContainerStyle(theme, selected)}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
        <Avatar sx={styles.getAvatarStyle(theme, selected)}>
          <Icon size={16} />
        </Avatar>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
            <Typography
              variant="body2" fontWeight={600} noWrap
              sx={styles.getTitleStyle(selected)}
            >
              {template.name}
            </Typography>
            <Chip
              label={template.status} size="small"
              sx={styles.getChipStyle(statusColor)}
            />
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.25 }} noWrap>
            {template.description}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '10px' }}>
            Updated: {template.updatedAt}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export const ListItemSkeleton = () => {
  return (
    <Box sx={{ px: 2, py: 1.5, mx: 1, mb: 0.5 }}>
      <Box sx={{ display: 'flex', gap: 1.5 }}>
        <Skeleton variant="circular" width={36} height={36} sx={{ flexShrink: 0 }} />
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width="70%" height={16} />
          <Skeleton variant="text" width="90%" height={13} sx={{ mt: 0.5 }} />
          <Skeleton variant="text" width="40%" height={12} sx={{ mt: 0.25 }} />
        </Box>
      </Box>
    </Box>
  );
};
