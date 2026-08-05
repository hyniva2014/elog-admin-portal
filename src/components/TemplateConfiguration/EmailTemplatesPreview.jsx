import React from 'react';
import { Box, Typography, Tooltip, ToggleButtonGroup, ToggleButton, IconButton, TextField, Chip, alpha, useTheme } from '@mui/material';
import { LuGripVertical, LuMonitor, LuSmartphone, LuMoon, LuSun, LuMaximize2 } from 'react-icons/lu';
import { AVAILABLE_VARIABLES } from './emailTemplateData';
import * as styles from './EmailTemplatesPreviewStyles';

export const EmailTemplatesPreview = ({
  isDark,
  selectedTemplate,
  previewWidth,
  previewDevice,
  setPreviewDevice,
  isDarkPreview,
  setIsDarkPreview,
  setFullPreviewOpen,
  previewEmail,
  setPreviewEmail,
  previewHtml,
  quillRef,
  quillSelectionRef,
  setBodyHtml,
  setHasChanges
}) => {
  const theme = useTheme();

  return (
    <Box sx={styles.getPreviewPanelStyle(previewWidth)}>
      {/* Preview Header */}
      <Box sx={styles.getPreviewHeaderStyle()}>
        <Box sx={styles.headerTitleRowStyle}>
          <Typography variant="subtitle2" fontWeight={700}>Live Preview</Typography>
          <Tooltip title="Drag the ◀▶ handle on the left edge to resize this panel">
            <Box sx={styles.headerGripStyle}>
              <LuGripVertical size={13} />
            </Box>
          </Tooltip>
        </Box>
        <Box sx={styles.headerActionsStyle}>
          <ToggleButtonGroup
            value={previewDevice} exclusive
            onChange={(_, v) => v && setPreviewDevice(v)}
            size="small"
            sx={styles.toggleGroupStyle}
          >
            <ToggleButton value="desktop"><LuMonitor size={14} /></ToggleButton>
            <ToggleButton value="mobile"><LuSmartphone size={14} /></ToggleButton>
          </ToggleButtonGroup>
          <Tooltip title={isDarkPreview ? 'Switch to light preview' : 'Switch to dark preview'}>
            <IconButton
              size="small"
              onClick={() => setIsDarkPreview((p) => !p)}
              sx={styles.getThemeToggleStyle(isDarkPreview, theme)}
            >
              {isDarkPreview ? <LuMoon size={14} color="white" /> : <LuSun size={14} />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Expand full preview">
            <IconButton
              size="small" disabled={!selectedTemplate}
              onClick={() => setFullPreviewOpen(true)}
              sx={styles.expandButtonStyle(theme)}
            >
              <LuMaximize2 size={14} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Preview Email To */}
      <Box sx={styles.previewEmailBoxStyle}>
        <TextField
          size="small" fullWidth label="Preview Email To"
          value={previewEmail} onChange={(e) => setPreviewEmail(e.target.value)}
          InputProps={{ sx: styles.previewEmailInputPropsStyle }}
        />
        <Typography variant="caption" color="text.secondary" sx={styles.previewEmailHelperTextStyle}>
          This is how your email will appear to recipients.
        </Typography>
      </Box>

      {/* Rendered Preview */}
      <Box sx={styles.getPreviewContentStyle(isDarkPreview)}>
        {selectedTemplate ? (
          <Box sx={styles.getRenderedPreviewContainerStyle(previewDevice)}>
            <Box
              dangerouslySetInnerHTML={{ __html: previewHtml }}
              sx={styles.renderedPreviewInnerStyle}
            />
          </Box>
        ) : (
          <Box sx={styles.emptyPreviewStyle}>
            <Typography variant="caption" color="text.disabled">
              Select a template to see the preview
            </Typography>
          </Box>
        )}
      </Box>

      {/* Available Variables */}
      <Box sx={styles.variablesSectionStyle}>
        <Box sx={styles.variablesHeaderRowStyle}>
          <Typography variant="caption" fontWeight={700} color="text.primary">
            ℹ️ Available Variables
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Click to insert into template
          </Typography>
        </Box>
        <Box sx={styles.variablesListStyle}>
          {AVAILABLE_VARIABLES.slice(0, 10).map(({ key }) => (
            <Chip
              key={key} label={key} size="small" clickable
              onClick={() => {
                const editor = quillRef.current?.getEditor();
                if (editor) {
                  const sel = quillSelectionRef.current;
                  const index = sel != null ? sel.index : (editor.getLength() - 1);
                  editor.focus();
                  editor.insertText(index, key, 'user');
                  editor.setSelection(index + key.length, 0, 'silent');
                  setBodyHtml(editor.root.innerHTML);
                } else {
                  setBodyHtml((prev) => prev + key);
                }
                setHasChanges(true);
              }}
              sx={styles.getVariableChipStyle(isDark)}
            />
          ))}
          <Chip label="… and more" size="small" sx={styles.moreVariablesChipStyle} />
        </Box>
      </Box>
    </Box>
  );
};
