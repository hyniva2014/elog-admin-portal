import React from 'react';
import { Popover, Box, Typography, Tooltip, Chip, alpha, useTheme } from '@mui/material';
import { AVAILABLE_VARIABLES } from './emailTemplateData';

export const VariablePopover = ({
  open,
  anchorEl,
  onClose,
  insertTarget,
  onInsertVariable,
  isDark
}) => {
  const theme = useTheme();

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      PaperProps={{ sx: { p: 1.5, width: 280, borderRadius: 2 } }}
    >
      <Typography variant="caption" fontWeight={700} color="text.secondary" display="block" mb={0.5}>
        Insert variable into <strong>{insertTarget === 'body' ? 'Body' : 'Subject'}</strong>
      </Typography>
      <Typography variant="caption" color="text.disabled" display="block" mb={1}>
        {insertTarget === 'body' ? 'Inserted at cursor position in the body editor' : 'Inserted at cursor position in the subject line'}
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
        {AVAILABLE_VARIABLES.map(({ key, description }) => (
          <Tooltip key={key} title={description} placement="top">
            <Chip
              label={key} size="small" clickable
              onClick={() => onInsertVariable(key)}
              sx={{
                height: 24, fontSize: '11px', fontFamily: 'monospace',
                bgcolor: isDark ? alpha('#3e60d5', 0.15) : '#eff6ff',
                color: isDark ? '#93c5fd' : '#1d4ed8',
                border: '1px solid',
                borderColor: isDark ? alpha('#3e60d5', 0.3) : '#bfdbfe',
                '&:hover': { bgcolor: isDark ? alpha('#3e60d5', 0.25) : '#dbeafe' },
              }}
            />
          </Tooltip>
        ))}
      </Box>
    </Popover>
  );
};
