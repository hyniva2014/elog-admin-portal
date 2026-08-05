import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Box, Typography, TextField, InputAdornment,
  Button, IconButton, Chip, Select, MenuItem,
  FormControl, FormControlLabel, Switch, Divider,
  Tooltip, Dialog, DialogTitle, DialogContent, DialogActions,
  Popover, useTheme, ToggleButton, ToggleButtonGroup, Avatar,
  alpha, CircularProgress, Skeleton,
} from '@mui/material';

import {
  LuPlus,
} from 'react-icons/lu';
import { MdOutlineEmail } from 'react-icons/md';
import { useServices } from '@src/services/services';
import CommonSnackbar from '@src/common/CommonSnackbar';
import {
  DEFAULT_TEMPLATES, DEFAULT_PREVIEW_VALUES, generateEmailPreviewHtml, DEFAULT_ACCESS_ROWS,
} from './emailTemplateData';
import { CreateTemplateDialog } from './CreateTemplateDialog';
import { FullPreviewDialog } from './FullPreviewDialog';
import { VariablePopover } from './VariablePopover';
import { EmailTemplatesSidebar } from './EmailTemplatesSidebar';
import { EmailTemplatesEditor } from './EmailTemplatesEditor';
import { EmailTemplatesPreview } from './EmailTemplatesPreview';
import * as styles from './EmailTemplatesStyles';

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Constants                                                                   */
/* ─────────────────────────────────────────────────────────────────────────── */




/* ─────────────────────────────────────────────────────────────────────────── */
/*  Data normalizers – API ↔ local model                                       */
/* ─────────────────────────────────────────────────────────────────────────── */

/**
 * Parse section_config from the API.
 * Handles object, JSON string, and double-encoded JSON string responses.
 * Accepts both camelCase and snake_case keys.
 */
const parseSectionConfig = (raw) => {
  let config = raw ?? {};
  try {
    // Unwrap string / double-encoded JSON (common when FE stringifies and BE stringifies again)
    if (typeof config === 'string') {
      config = JSON.parse(config);
      if (typeof config === 'string') config = JSON.parse(config);
    }
  } catch {
    config = {};
  }
  if (!config || typeof config !== 'object' || Array.isArray(config)) config = {};

  const rowsRaw =
    config.accessDetailsRows ??
    config.access_details_rows ??
    null;

  const rows = Array.isArray(rowsRaw)
    ? rowsRaw
      .map((r) => ({
        label: r?.label ?? r?.field_label ?? '',
        variable: r?.variable ?? r?.field_variable ?? r?.value ?? '',
      }))
      .filter((r) => r.label || r.variable)
    : null;

  return {
    accessDetailsTitle:
      config.accessDetailsTitle ??
      config.access_details_title ??
      'Your Portal Access Details',
    accessDetailsRows: rows && rows.length > 0 ? rows : [...DEFAULT_ACCESS_ROWS],
    importantNoteText:
      config.importantNoteText ??
      config.important_note_text ??
      'For security reasons, please change your password after your first login.',
    signoffNote:
      config.signoffNote ??
      config.signoff_note ??
      'If you have any questions, feel free to contact our support team.',
  };
}

/**
 * Convert an API row (snake_case) to the local template shape used by the UI.
 */
const normalizeTemplate = (row) => {
  let variables = [];
  try {
    variables = row.variables
      ? (typeof row.variables === 'string' ? JSON.parse(row.variables) : row.variables)
      : [];
  } catch { variables = []; }

  const sectionConfig = parseSectionConfig(row.section_config);

  const statusMap = { 1: 'Active', 2: 'Draft', 0: 'Inactive' };
  const status = statusMap[row.status] ?? (row.status_label ?? 'Active');

  const updatedAt = row.updated_at
    ? formatRelativeTime(row.updated_at)
    : (row.created_at ? formatRelativeTime(row.created_at) : '–');

  return {
    id: String(row.template_id),
    name: row.template_name ?? row.name ?? '',
    description: row.description ?? '',
    category: row.category ?? 'general',
    status,
    updatedAt,
    iconType: row.icon_type ?? 'agency',
    subject: row.subject ?? '',
    bodyHtml: row.body_html ?? '',
    showAccessDetails: Boolean(row.show_access_details),
    showImportantNote: Boolean(row.show_important_note),
    variables,
    // Logo from API response (not editable by user)
    carrierLogo: row.carrier_logo ?? '',
    // Editable section config
    accessDetailsTitle: sectionConfig.accessDetailsTitle,
    accessDetailsRows: sectionConfig.accessDetailsRows,
    importantNoteText: sectionConfig.importantNoteText,
    signoffNote: sectionConfig.signoffNote,
  };
};

/**
 * Build the payload sent to the API when saving / creating a template.
 * @param {'create'|'update'} mode
 */
const buildPayload = (mode, templateId, {
  name, subject, bodyHtml, category, description, iconType,
  showAccessDetails, showImportantNote, variables,
  accessDetailsTitle, accessDetailsRows, importantNoteText, signoffNote,
}, status) => {
  // Send as a plain object (NOT pre-stringified). Axios JSON-encodes the body once.
  // Pre-stringifying caused double-encoding → backend couldn't restore custom rows.
  const sectionConfig = {
    accessDetailsTitle: accessDetailsTitle ?? 'Your Portal Access Details',
    accessDetailsRows: Array.isArray(accessDetailsRows) && accessDetailsRows.length > 0
      ? accessDetailsRows.map((r) => ({
        label: r.label ?? '',
        variable: r.variable ?? '',
      }))
      : [...DEFAULT_ACCESS_ROWS],
    importantNoteText: importantNoteText ?? 'For security reasons, please change your password after your first login.',
    signoffNote: signoffNote ?? 'If you have any questions, feel free to contact our support team.',
  };

  // Keep variables array in sync with access-detail row variables
  const rowVars = sectionConfig.accessDetailsRows
    .map((r) => r.variable)
    .filter((v) => typeof v === 'string' && v.includes('{{'));
  const mergedVariables = Array.from(
    new Set([...(Array.isArray(variables) ? variables : []), ...rowVars]),
  );

  const payload = {
    template_name: name,
    subject,
    body_html: bodyHtml,
    category,
    description,
    icon_type: iconType ?? 'agency',
    show_access_details: showAccessDetails ? 1 : 0,
    show_important_note: showImportantNote ? 1 : 0,
    variables: mergedVariables,
    section_config: sectionConfig,
    status: status ?? 1,
  };
  if (mode === 'update') payload.template_id = Number(templateId);
  return payload;
};

/** Simple "x time ago / Today, HH:MM" formatter */
const formatRelativeTime = (isoString) => {
  try {
    const date = new Date(isoString);
    const diffMs = Date.now() - date.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 2) return 'Just now';
    if (diffMin < 60) return `${diffMin} minutes ago`;
    const diffH = Math.floor(diffMin / 60);
    if (diffH < 24) return `${diffH} hour${diffH > 1 ? 's' : ''} ago`;
    const diffD = Math.floor(diffH / 24);
    if (diffD === 1) return 'Yesterday';
    if (diffD < 7) return `${diffD} days ago`;
    if (diffD < 14) return '1 week ago';
    if (diffD < 30) return `${Math.floor(diffD / 7)} weeks ago`;
    if (diffD < 60) return '1 month ago';
    return date.toLocaleDateString();
  } catch { return '–'; }
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Sub-components                                                              */
/* ─────────────────────────────────────────────────────────────────────────── */


/* ─────────────────────────────────────────────────────────────────────────── */
/*  Main EmailTemplates Component                                               */
/* ─────────────────────────────────────────────────────────────────────────── */

const EmailTemplates = ({ setLoading }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { fetchApi, createApi } = useServices();

  /* ── Data state ── */
  const [templates, setTemplates] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  /* ── Filter state ── */
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  /* ── Editor state ── */
  const [templateName, setTemplateName] = useState('');
  const [templateSubject, setTemplateSubject] = useState('');
  const [bodyHtml, setBodyHtml] = useState('');
  const [showAccessDetails, setShowAccessDetails] = useState(false);
  const [showImportantNote, setShowImportantNote] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  /* ── Editable section config ── */
  const [accessDetailsTitle, setAccessDetailsTitle] = useState('Your Portal Access Details');
  const [accessDetailsRows, setAccessDetailsRows] = useState([...DEFAULT_ACCESS_ROWS]);
  const [importantNoteText, setImportantNoteText] = useState('For security reasons, please change your password after your first login.');
  const [signoffNote, setSignoffNote] = useState('If you have any questions, feel free to contact our support team.');

  /* ── Preview state ── */
  const [isDarkPreview, setIsDarkPreview] = useState(false);
  const [previewDevice, setPreviewDevice] = useState('desktop');
  const [previewEmail, setPreviewEmail] = useState('jose@allwaystrack.com');
  const [previewWidth, setPreviewWidth] = useState(360);
  const [fullPreviewOpen, setFullPreviewOpen] = useState(false);

  /* ── UI state ── */
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [variableAnchorEl, setVariableAnchorEl] = useState(null);
  const [savedTick, setSavedTick] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (setLoading) {
      setLoading(isFetching || isSaving || isCreating);
    }
  }, [isFetching, isSaving, isCreating, setLoading]);

  const subjectRef = useRef(null);
  const quillRef = useRef(null);   // ReactQuill instance
  const quillSelectionRef = useRef(null);   // saved Quill cursor before popover steals focus
  const insertTargetRef = useRef('subject'); // 'subject' | 'body'
  const savedTickTimerRef = useRef(null);  // cleanup on unmount
  const suppressResetTimer = useRef(null);  // cleanup for the post-load hasChanges reset timeout
  const suppressQuillChange = useRef(false); // suppresses programmatic onChange from value-prop sync
  const hasFetched = useRef(false); // prevents double fetch from React 18 StrictMode

  /* ── Drag-resize handle ── */
  const dragRef = useRef({ active: false, startX: 0, startWidth: 0 });
  const handleResizeMouseDown = useCallback((e) => {
    dragRef.current = { active: true, startX: e.clientX, startWidth: previewWidth };
    e.preventDefault();
  }, [previewWidth]);

  useEffect(() => {
    const onMove = (e) => {
      if (!dragRef.current.active) return;
      const delta = dragRef.current.startX - e.clientX;
      setPreviewWidth(Math.max(260, Math.min(760, dragRef.current.startWidth + delta)));
    };
    const onUp = () => { dragRef.current.active = false; };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    return () => { document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); };
  }, []);

  // Clear the "Saved!" tick timer if the component unmounts while it's pending
  useEffect(() => () => {
    if (savedTickTimerRef.current) clearTimeout(savedTickTimerRef.current);
    if (suppressResetTimer.current) clearTimeout(suppressResetTimer.current);
  }, []);

  /* ──────────────────────────────────────────────────────────────────────── */
  /*  API helpers                                                              */
  /* ──────────────────────────────────────────────────────────────────────── */

  const showSnackbar = (message, severity = 'success') =>
    setSnackbar({ open: true, message, severity });

  /** Fetch all email templates from the API. Falls back to seed data in dev. */
  const fetchTemplates = useCallback(async (keepSelection = false) => {
    setIsFetching(true);
    try {
      const response = await fetchApi('/masteradmin/email-templates', false);
      const raw = response?.body?.data ?? response?.body ?? [];
      const list = Array.isArray(raw) ? raw.map(normalizeTemplate) : [];

      setTemplates(list);

      if (!keepSelection) {
        // Auto-select: first Active template, else first template
        const first = list.find((t) => t.status === 'Active') ?? list[0] ?? null;
        setSelectedTemplate(first);
      }
    } catch (err) {
      console.warn('[EmailTemplates] API unavailable – using seed data.', err?.message);
      // Graceful fallback: load seed templates so the UI is usable without a backend
      setTemplates(DEFAULT_TEMPLATES);
      if (!keepSelection) setSelectedTemplate(DEFAULT_TEMPLATES[0] ?? null);
    } finally {
      setIsFetching(false);
    }
  }, [fetchApi]);

  /** Save (update) the currently selected template. */
  const handleSave = async (statusValue = 1) => {
    if (!selectedTemplate || isSaving) return;
    setIsSaving(true);
    try {
      const payload = buildPayload(
        'update',
        selectedTemplate.id,
        {
          name: templateName,
          subject: templateSubject,
          bodyHtml,
          category: selectedTemplate.category,
          description: selectedTemplate.description,
          iconType: selectedTemplate.iconType,
          showAccessDetails,
          showImportantNote,
          variables: selectedTemplate.variables,
          accessDetailsTitle,
          accessDetailsRows,
          importantNoteText,
          signoffNote,
        },
        statusValue,
      );

      const response = await createApi(payload, '/masteradmin/email-templates/update', false);

      if (response?.statusCode >= 400) {
        throw new Error(response?.body?.message || 'Failed to save template');
      }

      if (!response?.body?.data && !response?.body?.success && response?.body?.message !== 'success') {
        // API returned no data — still optimistic but warn via snackbar
      }

      // Preserve current editor section config even if the API response omits / mangles it.
      const sectionConfigOverride = {
        accessDetailsTitle,
        accessDetailsRows: accessDetailsRows.map((r) => ({ label: r.label ?? '', variable: r.variable ?? '' })),
        importantNoteText,
        signoffNote,
      };

      const updated = response?.body?.data
        ? { ...normalizeTemplate(response.body.data), ...sectionConfigOverride }
        : {
          ...selectedTemplate,
          name: templateName,
          subject: templateSubject,
          bodyHtml,
          showAccessDetails,
          showImportantNote,
          status: statusValue === 2 ? 'Draft' : 'Active',
          updatedAt: 'Just now',
          ...sectionConfigOverride,
        };

      setTemplates((prev) => prev.map((t) => (t.id === selectedTemplate.id ? updated : t)));
      setSelectedTemplate(updated);
      setHasChanges(false);
      setSavedTick(true);
      savedTickTimerRef.current = setTimeout(() => setSavedTick(false), 2500);
      showSnackbar('Template saved successfully');
    } catch (err) {
      console.error('[EmailTemplates] Save failed', err);
      showSnackbar(err?.response?.data?.message ?? err?.message ?? 'Failed to save template', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  /** Create a new template via the API and auto-select it. */
  const handleCreateTemplate = async ({ name, category, description, subject, showAccessDetails: sad, showImportantNote: sin, bodyHtml: starterBody }) => {
    setIsCreating(true);
    try {
      const payload = buildPayload(
        'create',
        null,
        {
          name,
          subject: subject || '',
          bodyHtml: starterBody || '<p>Write your email content here...</p>',
          category,
          description: description || 'Custom email template',
          iconType: 'agency',
          showAccessDetails: sad ?? false,
          showImportantNote: sin ?? false,
          variables: [],
        },
        2, // Draft status
      );

      const response = await createApi(payload, '/masteradmin/email-templates', false);

      if (response?.statusCode >= 400) {
        throw new Error(response?.body?.message || 'Failed to create template');
      }

      if (!response?.body?.data) {
        // API did not echo back the created row — surface a clear error instead of faking success
        showSnackbar('Template may not have been saved — please refresh and check.', 'warning');
        setCreateDialogOpen(false);
        return;
      }

      const created = normalizeTemplate(response.body.data);
      setTemplates((prev) => [created, ...prev]);
      setSelectedTemplate(created);
      setCreateDialogOpen(false);
      showSnackbar('Template created successfully');
    } catch (err) {
      console.error('[EmailTemplates] Create failed', err);
      showSnackbar(err?.response?.data?.message ?? err?.message ?? 'Failed to create template', 'error');
    } finally {
      setIsCreating(false);
    }
  };

  /* ──────────────────────────────────────────────────────────────────────── */
  /*  Effects                                                                  */
  /* ──────────────────────────────────────────────────────────────────────── */

  // Initial load — guarded by hasFetched to prevent the double invocation
  // that React 18 StrictMode causes in development (mount → unmount → remount).
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchTemplates();
  }, []);

  // Sync editor fields when a new template is selected
  useEffect(() => {
    if (selectedTemplate) {
      setTemplateName(selectedTemplate.name);
      setTemplateSubject(selectedTemplate.subject);
      suppressQuillChange.current = true; // prevent Quill onChange from marking dirty
      setBodyHtml(selectedTemplate.bodyHtml);
      setShowAccessDetails(selectedTemplate.showAccessDetails ?? false);
      setShowImportantNote(selectedTemplate.showImportantNote ?? false);
      setAccessDetailsTitle(selectedTemplate.accessDetailsTitle ?? 'Your Portal Access Details');
      setAccessDetailsRows(
        Array.isArray(selectedTemplate.accessDetailsRows) && selectedTemplate.accessDetailsRows.length > 0
          ? selectedTemplate.accessDetailsRows.map((r) => ({ label: r.label ?? '', variable: r.variable ?? '' }))
          : DEFAULT_ACCESS_ROWS.map((r) => ({ ...r })),
      );
      setImportantNoteText(selectedTemplate.importantNoteText ?? 'For security reasons, please change your password after your first login.');
      setSignoffNote(selectedTemplate.signoffNote ?? 'If you have any questions, feel free to contact our support team.');
      setHasChanges(false);
      // Belt-and-suspenders: Quill can fire onChange asynchronously after HTML normalisation.
      // Keep the suppress flag active and force hasChanges back to false once settled.
      if (suppressResetTimer.current) clearTimeout(suppressResetTimer.current);
      suppressResetTimer.current = setTimeout(() => {
        suppressQuillChange.current = false;
        setHasChanges(false);
      }, 150);
    }
  }, [selectedTemplate?.id]);

  /* ──────────────────────────────────────────────────────────────────────── */
  /*  Derived values                                                           */
  /* ──────────────────────────────────────────────────────────────────────── */

  const filteredTemplates = templates.filter((t) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q);
    const matchesCategory = categoryFilter === 'all' || t.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const previewHtml = selectedTemplate
    ? generateEmailPreviewHtml(
      {
        ...selectedTemplate,
        bodyHtml, showAccessDetails, showImportantNote,
        accessDetailsTitle, accessDetailsRows, importantNoteText, signoffNote,
      },
      DEFAULT_PREVIEW_VALUES,
      isDarkPreview,
    )
    : '';

  const handleInsertVariable = (variable) => {
    if (insertTargetRef.current === 'body') {
      const editor = quillRef.current?.getEditor();
      if (editor) {
        const sel = quillSelectionRef.current;
        const index = sel != null ? sel.index : (editor.getLength() - 1);
        editor.focus();
        editor.insertText(index, variable, 'user');
        editor.setSelection(index + variable.length, 0, 'silent');
        setBodyHtml(editor.root.innerHTML);
      }
    } else {
      const input = subjectRef.current?.querySelector('input');
      if (input) {
        const start = input.selectionStart ?? templateSubject.length;
        const end = input.selectionEnd ?? templateSubject.length;
        setTemplateSubject(templateSubject.slice(0, start) + variable + templateSubject.slice(end));
      } else {
        setTemplateSubject((prev) => prev + variable);
      }
    }
    setHasChanges(true);
    setVariableAnchorEl(null);
  };

  /* ──────────────────────────────────────────────────────────────────────── */
  /*  Render                                                                   */
  /* ──────────────────────────────────────────────────────────────────────── */

  return (
    <Box sx={styles.getMainContainerStyle()}>

      {/* ══════════════════════════════════════════════════════════════════
          LEFT PANEL – Template List
          ══════════════════════════════════════════════════════════════════ */}
      <EmailTemplatesSidebar
        isDark={isDark}
        isFetching={isFetching}
        filteredTemplates={filteredTemplates}
        fetchTemplates={fetchTemplates}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        selectedTemplate={selectedTemplate}
        setSelectedTemplate={setSelectedTemplate}
        hasChanges={hasChanges}
        setCreateDialogOpen={setCreateDialogOpen}
      />

      {/* ══════════════════════════════════════════════════════════════════
          EMPTY STATE – shown when no template is selected
          ══════════════════════════════════════════════════════════════════ */}
      {!selectedTemplate && !isFetching && (
        <Box
          sx={{
            flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: 1.5, px: 4, textAlign: 'center',
          }}
        >
          <Box
            sx={{
              width: 64, height: 64, borderRadius: 3,
              bgcolor: isDark ? 'rgba(255,255,255,0.05)' : alpha(theme.palette.primary.main, 0.08),
              display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 0.5,
            }}
          >
            <MdOutlineEmail size={32} color={theme.palette.primary.main} />
          </Box>
          <Typography variant="subtitle1" fontWeight={700} color="text.primary">
            No template selected
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300, lineHeight: 1.6 }}>
            Select a template from the list on the left, or create a new one to start editing.
          </Typography>
          <Button
            variant="outlined" size="small"
            startIcon={<LuPlus size={14} />}
            onClick={() => setCreateDialogOpen(true)}
            sx={{ mt: 0.5, borderRadius: 1.5, fontWeight: 600 }}
          >
            Create New Template
          </Button>
        </Box>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          MIDDLE PANEL – Editor  (only when a template is selected)
          ══════════════════════════════════════════════════════════════════ */}
      {selectedTemplate && (
        <EmailTemplatesEditor
          theme={theme}
          isDark={isDark}
          selectedTemplate={selectedTemplate}
          templateName={templateName}
          setTemplateName={setTemplateName}
          templateSubject={templateSubject}
          setTemplateSubject={setTemplateSubject}
          hasChanges={hasChanges}
          setHasChanges={setHasChanges}
          subjectRef={subjectRef}
          insertTargetRef={insertTargetRef}
          setVariableAnchorEl={setVariableAnchorEl}
          showAccessDetails={showAccessDetails}
          setShowAccessDetails={setShowAccessDetails}
          showImportantNote={showImportantNote}
          setShowImportantNote={setShowImportantNote}
          quillRef={quillRef}
          bodyHtml={bodyHtml}
          setBodyHtml={setBodyHtml}
          suppressQuillChange={suppressQuillChange}
          quillSelectionRef={quillSelectionRef}
          accessDetailsTitle={accessDetailsTitle}
          setAccessDetailsTitle={setAccessDetailsTitle}
          accessDetailsRows={accessDetailsRows}
          setAccessDetailsRows={setAccessDetailsRows}
          importantNoteText={importantNoteText}
          setImportantNoteText={setImportantNoteText}
          signoffNote={signoffNote}
          setSignoffNote={setSignoffNote}
          isSaving={isSaving}
          savedTick={savedTick}
          handleSave={handleSave}
        />
      )}

      {/* ══════════════════════════════════════════════════════════════════
          DRAG HANDLE – between Editor and Preview (only when template selected)
          ══════════════════════════════════════════════════════════════════ */}
      {selectedTemplate && (
        <Box
          onMouseDown={handleResizeMouseDown}
          sx={{
            width: 6, flexShrink: 0, cursor: 'ew-resize', position: 'relative',
            bgcolor: 'divider', zIndex: 1,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background-color 0.15s',
            '&:hover': { bgcolor: 'primary.main' },
            '&:hover .grip-dots': { opacity: 1 },
            '&:active': { bgcolor: 'primary.dark' },
          }}
        >
          <Box className="grip-dots" sx={{ opacity: 0.3, display: 'flex', flexDirection: 'column', gap: '4px', transition: 'opacity 0.15s' }}>
            {[0, 1, 2, 3].map((i) => (
              <Box key={i} sx={{ width: 3, height: 3, borderRadius: '50%', bgcolor: 'background.paper' }} />
            ))}
          </Box>
        </Box>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          RIGHT PANEL – Live Preview  (only when a template is selected)
          ══════════════════════════════════════════════════════════════════ */}
      {selectedTemplate && (
        <EmailTemplatesPreview
          isDark={isDark}
          selectedTemplate={selectedTemplate}
          previewWidth={previewWidth}
          previewDevice={previewDevice}
          setPreviewDevice={setPreviewDevice}
          isDarkPreview={isDarkPreview}
          setIsDarkPreview={setIsDarkPreview}
          setFullPreviewOpen={setFullPreviewOpen}
          previewEmail={previewEmail}
          setPreviewEmail={setPreviewEmail}
          previewHtml={previewHtml}
          quillRef={quillRef}
          quillSelectionRef={quillSelectionRef}
          setBodyHtml={setBodyHtml}
          setHasChanges={setHasChanges}
        />
      )}

      {/* Full Preview Dialog */}
      <FullPreviewDialog
        open={fullPreviewOpen}
        onClose={() => setFullPreviewOpen(false)}
        selectedTemplate={selectedTemplate}
        previewDevice={previewDevice}
        setPreviewDevice={setPreviewDevice}
        isDarkPreview={isDarkPreview}
        setIsDarkPreview={setIsDarkPreview}
        previewHtml={previewHtml}
      />

      {/* Variable Popover */}
      <VariablePopover
        open={Boolean(variableAnchorEl)}
        anchorEl={variableAnchorEl}
        onClose={() => setVariableAnchorEl(null)}
        insertTarget={insertTargetRef.current}
        onInsertVariable={handleInsertVariable}
        isDark={isDark}
      />

      {/* Snackbar */}
      <CommonSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar((p) => ({ ...p, open: false }))}
      />

      {/* Create Dialog */}
      <CreateTemplateDialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        onCreate={handleCreateTemplate}
        isCreating={isCreating}
      />

      {/* Spin animation for refresh icon */}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </Box>
  );
};

export default EmailTemplates;
