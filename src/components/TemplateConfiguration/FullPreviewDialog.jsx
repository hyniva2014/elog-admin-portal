import React from 'react';
import { Dialog, Box, Typography, ToggleButtonGroup, ToggleButton, Tooltip, IconButton, alpha, useTheme } from '@mui/material';
import { LuMonitor, LuSmartphone, LuMoon, LuSun, LuX } from 'react-icons/lu';
import * as styles from './EmailTemplatesPreviewStyles';

export const FullPreviewDialog = ({
  open,
  onClose,
  selectedTemplate,
  previewDevice,
  setPreviewDevice,
  isDarkPreview,
  setIsDarkPreview,
  previewHtml
}) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{ sx: { height: '90vh', display: 'flex', flexDirection: 'column' } }}
    >
      <Box sx={{ px: 3, py: 2, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="subtitle1" fontWeight={700}>Full Preview</Typography>
          <Typography variant="caption" color="text.secondary">{selectedTemplate?.name}</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <ToggleButtonGroup
            value={previewDevice} exclusive
            onChange={(_, v) => v && setPreviewDevice(v)}
            size="small"
            sx={{ '& .MuiToggleButton-root': { py: 0.25, px: 0.75, border: '1px solid', borderColor: 'divider' } }}
          >
            <ToggleButton value="desktop"><LuMonitor size={14} /></ToggleButton>
            <ToggleButton value="mobile"><LuSmartphone size={14} /></ToggleButton>
          </ToggleButtonGroup>
          <Tooltip title={isDarkPreview ? 'Light mode' : 'Dark mode'}>
            <IconButton size="small" onClick={() => setIsDarkPreview((p) => !p)}
              sx={{ bgcolor: isDarkPreview ? '#1a2b5a' : alpha(theme.palette.grey[500], 0.1) }}>
              {isDarkPreview ? <LuMoon size={14} color="white" /> : <LuSun size={14} />}
            </IconButton>
          </Tooltip>
          <IconButton size="small" onClick={onClose}
            sx={{ bgcolor: alpha(theme.palette.grey[500], 0.1) }}>
            <LuX size={15} />
          </IconButton>
        </Box>
      </Box>
      <Box sx={styles.getPreviewContentStyle(isDarkPreview)}>
        {selectedTemplate && (
          <Box
            sx={{
              maxWidth: previewDevice === 'mobile' ? 400 : 640,
              mx: 'auto', borderRadius: 2, overflow: 'hidden',
              boxShadow: isDarkPreview ? '0 4px 24px rgba(0,0,0,0.5)' : '0 4px 24px rgba(0,0,0,0.14)',
            }}
          >
            <Box
              dangerouslySetInnerHTML={{ __html: previewHtml }}
              sx={{ '& *': { maxWidth: '100%' } }}
            />
          </Box>
        )}
      </Box>
    </Dialog>
  );
};
