import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Box, Typography, TextField, FormControl, Select, MenuItem, Button, CircularProgress, alpha, useTheme } from '@mui/material';
import { LuLayoutTemplate } from 'react-icons/lu';
import { TEMPLATE_CATEGORIES } from './emailTemplateData';
import * as styles from './CreateTemplateDialogStyles';

export const CreateTemplateDialog = ({ open, onClose, onCreate, isCreating, type = 'email' }) => {
  const theme = useTheme();
  const [name, setName]               = useState('');
  const [category, setCategory]       = useState('onboarding');
  const [description, setDescription] = useState('');

  const handleCreate = () => {
    if (!name.trim()) return;
    onCreate({
      name: name.trim(),
      category,
      description: description.trim(),
      subject: '',
      showAccessDetails: false,
      showImportantNote: false,
      bodyHtml: '<p>Write your email content here...</p>',
    });
  };

  useEffect(() => {
    if (open) {
      setName('');
      setCategory('onboarding');
      setDescription('');
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={() => !isCreating && onClose()} maxWidth="xs" fullWidth>
      <DialogTitle sx={styles.getDialogTitleStyle()}>
        <Box sx={styles.getTitleContainerStyle()}>
          <Box sx={styles.getIconBoxStyle(theme)}>
            <LuLayoutTemplate size={18} color={theme.palette.primary.main} />
          </Box>
          <Box>
            <Typography fontWeight={700} fontSize={15}>
              {type === 'sms' ? 'Create SMS Template' : 'Create New Template'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {type === 'sms' 
                ? 'Fill in the basics — edit message body after saving.'
                : 'Fill in the basics — you can add subject & body after saving.'}
            </Typography>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent sx={styles.getDialogContentStyle()}>
        <Box sx={styles.getFormContainerStyle()}>
          <TextField
            label="Template Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            size="small" required fullWidth autoFocus
            placeholder="e.g., Claim Assignment Notification"
            disabled={isCreating}
          />
          {type !== 'sms' && (
            <FormControl size="small" fullWidth>
              <Typography variant="caption" color="text.secondary" sx={styles.getLabelStyle()}>
                Category
              </Typography>
              <Select value={category} onChange={(e) => setCategory(e.target.value)} disabled={isCreating}>
                {TEMPLATE_CATEGORIES.filter((c) => c.value !== 'all').map((c) => (
                  <MenuItem key={c.value} value={c.value}>{c.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <TextField
            label="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            size="small" fullWidth multiline rows={2}
            placeholder="Briefly describe when this template is used"
            disabled={isCreating}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={styles.getDialogActionsStyle()}>
        <Button onClick={onClose} size="small" disabled={isCreating}>
          Cancel
        </Button>
        <Button
          onClick={handleCreate} variant="contained" size="small"
          disabled={!name.trim() || isCreating}
          startIcon={isCreating ? <CircularProgress size={14} color="inherit" /> : null}
        >
          {isCreating ? 'Creating…' : 'Create Template'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
