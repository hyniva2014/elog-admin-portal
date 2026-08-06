import React from 'react';
import { Box, Typography, TextField, Button, Switch, FormControlLabel, IconButton, Tooltip, CircularProgress, alpha } from '@mui/material';
import { LuChevronDown, LuX, LuPlus, LuEye, LuCopy } from 'react-icons/lu';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import * as styles from './EmailTemplatesEditorStyles';

const QUILL_MODULES = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline'],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ['link'],
    ['clean'],
  ],
};

const QUILL_FORMATS = ['header', 'bold', 'italic', 'underline', 'color', 'background', 'align', 'link'];

export const EmailTemplatesEditor = ({
  theme,
  isDark,
  selectedTemplate,
  templateName,
  setTemplateName,
  templateSubject,
  setTemplateSubject,
  hasChanges,
  setHasChanges,
  subjectRef,
  insertTargetRef,
  setVariableAnchorEl,
  showAccessDetails,
  setShowAccessDetails,
  showImportantNote,
  setShowImportantNote,
  quillRef,
  bodyHtml,
  setBodyHtml,
  suppressQuillChange,
  quillSelectionRef,
  accessDetailsTitle,
  setAccessDetailsTitle,
  accessDetailsRows,
  setAccessDetailsRows,
  importantNoteText,
  setImportantNoteText,
  signoffNote,
  setSignoffNote,
  isSaving,
  savedTick,
  handleSave
}) => {
  return (
    <Box sx={styles.getEditorContainerStyle()}>
      {/* Editor Header */}
      <Box sx={styles.getEditorHeaderStyle()}>
        <Typography variant="subtitle1" fontWeight={700} color="text.primary" lineHeight={1.3}>
          Edit Email Template
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {selectedTemplate
            ? `Editing: ${selectedTemplate.name}`
            : 'Select a template from the list to edit'}
        </Typography>
      </Box>

      {/* Editor Content area */}
      <Box sx={styles.getEditorContentStyle(theme, isDark)}>
        {/* Design */}
        <Box>
            {/* ── Template Name & Subject ────────────────────────────────── */}
            <Box sx={styles.templateNameContainerStyle}>
              <Box sx={styles.templateNameInnerStyle}>
                <Typography variant="caption" fontWeight={600} color="text.secondary" sx={styles.templateNameLabelStyle}>
                  Template Name <span style={{ color: theme.palette.error.main }}>*</span>
                </Typography>
                <TextField
                  size="small" value={templateName}
                  onChange={(e) => { setTemplateName(e.target.value); setHasChanges(true); }}
                  fullWidth placeholder="Enter template name"
                  disabled={!selectedTemplate}
                  InputProps={{ sx: styles.templateNameInputPropsStyle }}
                />
              </Box>
              <Box>
                <Typography variant="caption" fontWeight={600} color="text.secondary" sx={styles.templateNameLabelStyle}>
                  Subject <span style={{ color: theme.palette.error.main }}>*</span>
                </Typography>
                <Box sx={styles.subjectContainerStyle}>
                  <TextField
                    ref={subjectRef} size="small" value={templateSubject}
                    onChange={(e) => { setTemplateSubject(e.target.value); setHasChanges(true); }}
                    fullWidth placeholder="e.g., Welcome to {{carrier_name}} Portal"
                    disabled={!selectedTemplate}
                    InputProps={{ sx: styles.templateNameInputPropsStyle }}
                  />
                  <Button
                    variant="outlined" size="small"
                    endIcon={<LuChevronDown size={13} />}
                    onClick={(e) => { insertTargetRef.current = 'subject'; setVariableAnchorEl(e.currentTarget); }}
                    disabled={!selectedTemplate}
                    sx={styles.subjectButtonStyle}
                  >
                    Insert Variable
                  </Button>
                </Box>
              </Box>
            </Box>

            {/* ── Section toggles ───────────────────────────────────────── */}
            <Box sx={styles.getSectionTogglesContainerStyle(isDark)}>
              <Typography variant="caption" fontWeight={700} color="text.secondary" display="block" mb={1}>
                Template Sections &nbsp;
                <Typography component="span" variant="caption" color="text.disabled">
                  (toggle to show / hide in the email)
                </Typography>
              </Typography>
              <Box sx={styles.sectionTogglesRowStyle}>
                <FormControlLabel
                  control={
                    <Switch
                      size="small"
                      checked={showAccessDetails}
                      onChange={(e) => { setShowAccessDetails(e.target.checked); setHasChanges(true); }}
                      color="success"
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="caption" fontWeight={600}>🔒 Portal Access Details</Typography>
                      <Typography variant="caption" color="text.secondary" display="block" fontSize={11}>
                        Portal URL · Username · Temp Password
                      </Typography>
                    </Box>
                  }
                  sx={styles.accessDetailsToggleStyle}
                />
                <FormControlLabel
                  control={
                    <Switch
                      size="small"
                      checked={showImportantNote}
                      onChange={(e) => { setShowImportantNote(e.target.checked); setHasChanges(true); }}
                      color="info"
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="caption" fontWeight={600}>ℹ️ Security Important Note</Typography>
                      <Typography variant="caption" color="text.secondary" display="block" fontSize={11}>
                        Change password reminder
                      </Typography>
                    </Box>
                  }
                  sx={styles.importantNoteToggleStyle}
                />
              </Box>
            </Box>

            {/* ── Email Body Card (sticky so it stays in view while fields scroll) ── */}
            <Box sx={styles.emailBodyCardStyle}>
              {/* Email header chrome */}
              <Box sx={styles.emailHeaderChromeStyle}>
                <Box sx={styles.logoBoxStyle}>
                  {selectedTemplate?.agencyLogo
                    ? <img src={selectedTemplate.agencyLogo} alt="" style={styles.logoImgStyle}
                        onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                    : '🛡️'}
                </Box>
                <Box>
                  <Typography variant="body2" fontWeight={700} sx={styles.carrierNameStyle}>
                    {'{{carrier_name}}'}
                  </Typography>
                  <Typography variant="caption" sx={styles.carrierPortalStyle}>
                    Carrier Portal
                  </Typography>
                </Box>
              </Box>

              {/* Quill body editor */}
              <Box sx={styles.quillContainerStyle}>
                {/* Body Insert Variable toolbar */}
                <Box sx={styles.quillToolbarStyle}>
                  <Button
                    variant="text" size="small"
                    endIcon={<LuChevronDown size={12} />}
                    disabled={!selectedTemplate}
                    onClick={(e) => {
                      insertTargetRef.current = 'body';
                      setVariableAnchorEl(e.currentTarget);
                    }}
                    sx={styles.quillInsertButtonStyle}
                  >
                    Insert Variable into Body
                  </Button>
                </Box>
                <ReactQuill
                  ref={quillRef}
                  theme="snow"
                  value={bodyHtml}
                  onChange={(v) => {
                    if (suppressQuillChange.current) {
                      setBodyHtml(v);
                      return;
                    }
                    setBodyHtml(v);
                    setHasChanges(true);
                  }}
                  onChangeSelection={(sel) => { if (sel != null) quillSelectionRef.current = sel; }}
                  modules={QUILL_MODULES}
                  formats={QUILL_FORMATS}
                  placeholder="Write your email body here…"
                  readOnly={!selectedTemplate}
                />
              </Box>

              {/* ── Access Details (editable) ───────────────────────────── */}
              {showAccessDetails && (
                <Box sx={styles.editableSectionBoxStyle}>
                  <Box sx={styles.getAccessDetailsBoxStyle(isDark)}>
                    {/* Editable title */}
                    <Box sx={styles.accessDetailsTitleRowStyle}>
                      <Typography variant="caption" sx={{ color: '#15803d', flexShrink: 0 }}>🔒</Typography>
                      <TextField
                        size="small" variant="standard" value={accessDetailsTitle}
                        onChange={(e) => { setAccessDetailsTitle(e.target.value); setHasChanges(true); }}
                        disabled={!selectedTemplate}
                        inputProps={{ style: styles.accessDetailsTitleInputPropsStyle }}
                        sx={styles.accessDetailsTitleSx}
                        placeholder="Section title…"
                      />
                    </Box>

                    {/* Editable rows */}
                    {accessDetailsRows.map((row, idx) => (
                      <Box key={idx} sx={styles.rowContainerStyle}>
                        <TextField
                          size="small" variant="standard" value={row.label}
                          onChange={(e) => {
                            const next = accessDetailsRows.map((r, i) => i === idx ? { ...r, label: e.target.value } : r);
                            setAccessDetailsRows(next); setHasChanges(true);
                          }}
                          disabled={!selectedTemplate}
                          inputProps={{ style: styles.getRowLabelInputPropsStyle(isDark) }}
                          sx={styles.rowLabelSx}
                          placeholder="Label"
                        />
                        <Typography variant="caption" color="text.disabled">:</Typography>
                        <TextField
                          size="small" variant="standard" value={row.variable}
                          onChange={(e) => {
                            const next = accessDetailsRows.map((r, i) => i === idx ? { ...r, variable: e.target.value } : r);
                            setAccessDetailsRows(next); setHasChanges(true);
                          }}
                          disabled={!selectedTemplate}
                          inputProps={{ style: styles.rowVariableInputPropsStyle }}
                          sx={styles.rowVariableSx}
                          placeholder="{{variable}}"
                        />
                        <Tooltip title="Remove row">
                          <span>
                            <IconButton
                              size="small" disabled={!selectedTemplate || accessDetailsRows.length <= 1}
                              onClick={() => { setAccessDetailsRows(accessDetailsRows.filter((_, i) => i !== idx)); setHasChanges(true); }}
                              sx={styles.rowRemoveButtonSx}
                            >
                              <LuX size={11} />
                            </IconButton>
                          </span>
                        </Tooltip>
                      </Box>
                    ))}

                    <Button
                      size="small" disabled={!selectedTemplate}
                      startIcon={<LuPlus size={11} />}
                      onClick={() => { setAccessDetailsRows([...accessDetailsRows, { label: 'New Field', variable: '{{variable}}' }]); setHasChanges(true); }}
                      sx={styles.addRowButtonSx}
                    >
                      Add row
                    </Button>
                  </Box>
                </Box>
              )}

              {/* ── Important Note (editable) ───────────────────────────── */}
              {showImportantNote && (
                <Box sx={styles.editableSectionBoxStyle}>
                  <Box sx={styles.getImportantNoteBoxStyle(isDark)}>
                    <Typography variant="caption" sx={styles.importantNoteTitleSx}>
                      ℹ️ Important
                    </Typography>
                    <TextField
                      size="small" variant="standard" multiline fullWidth value={importantNoteText}
                      onChange={(e) => { setImportantNoteText(e.target.value); setHasChanges(true); }}
                      disabled={!selectedTemplate}
                      inputProps={{ style: styles.importantNoteInputPropsStyle }}
                      sx={styles.importantNoteSx}
                      placeholder="Important note text…"
                    />
                  </Box>
                </Box>
              )}

              {/* ── Sign-off (editable) ─────────────────────────────────── */}
              <Box sx={styles.editableSectionBoxStyle}>
                <TextField
                  size="small" variant="standard" fullWidth value={signoffNote}
                  onChange={(e) => { setSignoffNote(e.target.value); setHasChanges(true); }}
                  disabled={!selectedTemplate}
                  inputProps={{ style: styles.getSignoffInputPropsStyle(isDark) }}
                  sx={styles.getSignoffSx(isDark)}
                  placeholder="Add a note to recipients…"
                />
                <Typography variant="caption" color="text.primary">
                  Best Regards,<br /><strong>{'{{company_name}}'} Team</strong>
                </Typography>
              </Box>

              {/* Footer chrome */}
              <Box sx={styles.getFooterChromeStyle(isDark)}>
                <Typography variant="caption" color="text.disabled" display="block">
                  © {'{{current_year}}'} {'{{company_name}}'}. All rights reserved.
                </Typography>
                <Box sx={styles.footerLinksRowStyle}>
                  {['Privacy Policy', 'Terms of Service', 'Contact Us'].map((link) => (
                    <Typography key={link} variant="caption" color="primary.main" sx={styles.footerLinkSx}>{link}</Typography>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
      </Box>

      {/* Action Bar */}
      <Box sx={styles.getEditorActionBarStyle()}>
        <Box sx={styles.actionBarLeftStyle}>
          <Tooltip title="Preview email">
            <IconButton size="small"><LuEye size={16} /></IconButton>
          </Tooltip>
          <Tooltip title="Duplicate template">
            <IconButton size="small"><LuCopy size={16} /></IconButton>
          </Tooltip>
        </Box>
        <Box sx={styles.actionBarRightStyle}>
          <Button
            variant="outlined" size="small"
            startIcon={isSaving ? <CircularProgress size={13} color="inherit" /> : null}
            onClick={() => handleSave(2)}
            disabled={!hasChanges || isSaving || !selectedTemplate}
            sx={styles.actionButtonStyle}
          >
            Save as Draft
          </Button>
          <Button
            variant="contained" size="small"
            startIcon={isSaving ? <CircularProgress size={13} color="inherit" /> : null}
            onClick={() => handleSave(1)}
            disabled={!hasChanges || isSaving || !selectedTemplate}
            sx={styles.actionButtonStyle}
          >
            {isSaving ? 'Saving…' : savedTick ? 'Saved!' : 'Save Template'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
