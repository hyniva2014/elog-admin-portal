import React from 'react';
import { Box, Typography, Tooltip, IconButton, TextField, InputAdornment, FormControl, Select, MenuItem, Divider, Button, useTheme } from '@mui/material';
import { LuRefreshCw, LuFilter, LuSearch } from 'react-icons/lu';
import { MdOutlineEmail } from 'react-icons/md';
import { TEMPLATE_CATEGORIES } from './emailTemplateData';
import { TemplateListItem, ListItemSkeleton } from './TemplateListItem';
import * as styles from './EmailTemplatesSidebarStyles';
import useUnsavedChangesDialog from '../compliance/useUnsavedChangesDialog';

export const EmailTemplatesSidebar = ({
  isDark,
  isFetching,
  filteredTemplates,
  fetchTemplates,
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  selectedTemplate,
  setSelectedTemplate,
  hasChanges,
  setCreateDialogOpen
}) => {
  const theme = useTheme();
  const [pendingTemplate, setPendingTemplate] = React.useState(null);

  const { handleCancel, UnsavedChangesDialog } = useUnsavedChangesDialog(
    () => {
      if (pendingTemplate === 'CREATE') {
        setCreateDialogOpen(true);
      } else if (pendingTemplate) {
        setSelectedTemplate(pendingTemplate);
      }
      setPendingTemplate(null);
    },
    () => setPendingTemplate(null)
  );

  return (
    <Box sx={styles.getSidebarStyle(isDark)}>
      {/* Header */}
      <Box sx={styles.getSidebarHeaderStyle()}>
        <Box sx={styles.headerTitleRowStyle}>
          <Typography variant="subtitle2" fontWeight={700} color="text.primary">
            Templates
            {!isFetching && (
              <Typography component="span" variant="caption" color="text.disabled" sx={{ ml: 0.75 }}>
                ({filteredTemplates.length})
              </Typography>
            )}
          </Typography>
          <Box sx={styles.headerActionsStyle}>
            <Tooltip title="Refresh list">
              <IconButton size="small" onClick={() => fetchTemplates()} disabled={isFetching}>
                <LuRefreshCw size={13} style={{ animation: isFetching ? 'spin 1s linear infinite' : 'none' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Filter options">
              <IconButton size="small">
                <LuFilter size={13} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <TextField
          size="small" placeholder="Search templates…" value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LuSearch size={14} color={theme.palette.text.secondary} />
              </InputAdornment>
            ),
            sx: styles.searchInputPropsStyle,
          }}
        />

        <FormControl fullWidth size="small" sx={styles.filterSelectFormControlStyle}>
          <Select
            value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}
            displayEmpty sx={styles.filterSelectStyle}
          >
            {TEMPLATE_CATEGORIES.map((c) => (
              <MenuItem key={c.value} value={c.value} sx={styles.filterMenuItemStyle}>{c.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Divider />

      {/* List */}
      <Box sx={styles.getSidebarListStyle()}>
        {isFetching ? (
          /* Loading skeletons */
          Array.from({ length: 5 }).map((_, i) => <ListItemSkeleton key={i} />)
        ) : filteredTemplates.length === 0 ? (
          <Box sx={styles.emptyStateContainerStyle}>
            <MdOutlineEmail size={32} color={theme.palette.text.disabled} />
            <Typography variant="caption" color="text.disabled" display="block" mt={1}>
              No templates found
            </Typography>
          </Box>
        ) : (
          filteredTemplates.map((tpl) => (
            <TemplateListItem
              key={tpl.id} template={tpl}
              selected={selectedTemplate?.id === tpl.id}
              onClick={() => {
                if (hasChanges && selectedTemplate?.id !== tpl.id) {
                  setPendingTemplate(tpl);
                  handleCancel(true);
                } else {
                  setSelectedTemplate(tpl);
                }
              }}
            />
          ))
        )}
      </Box>

      <Divider />

      {/* Create Button */}
      <Box sx={styles.createButtonContainerStyle}>
        <Button
          variant="outlined" fullWidth size="small"
          onClick={() => {
            if (hasChanges) {
              setPendingTemplate('CREATE');
              handleCancel(true);
            } else {
              setCreateDialogOpen(true);
            }
          }}
          sx={styles.createButtonStyle}
        >
          Create New Template
        </Button>
      </Box>

      {UnsavedChangesDialog}
    </Box>
  );
};
