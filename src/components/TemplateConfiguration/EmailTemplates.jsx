import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Box, Typography, TextField, InputAdornment,
  Button, IconButton, Chip, Select, MenuItem,
  FormControl, FormControlLabel, Switch, Checkbox, Divider,
  Tooltip, Dialog, DialogTitle, DialogContent, DialogActions,
  Popover, useTheme, ToggleButton, ToggleButtonGroup, Avatar,
  alpha, CircularProgress, Skeleton,
} from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  LuSearch, LuFilter, LuPlus,
  LuMonitor, LuSmartphone, LuMoon, LuSun, LuEye,
  LuChevronDown, LuBuilding2, LuUsers,
  LuLock, LuFileText, LuCreditCard, LuShield, LuClipboardList,
  LuAlertCircle,
  LuCopy, LuRefreshCw, LuX,
  LuLayoutTemplate,
  LuMaximize2, LuGripVertical,
} from 'react-icons/lu';
import { MdOutlineEmail } from 'react-icons/md';
import { useServices } from '@src/services/services';
import CommonSnackbar from '@src/common/CommonSnackbar';
import {
  DEFAULT_TEMPLATES, TEMPLATE_CATEGORIES, AVAILABLE_VARIABLES,
  DEFAULT_PREVIEW_VALUES, generateEmailPreviewHtml, DEFAULT_ACCESS_ROWS,
} from './emailTemplateData';

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Constants                                                                   */
/* ─────────────────────────────────────────────────────────────────────────── */

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

const TEMPLATE_ICONS = {
  agency: LuBuilding2,
  user: LuUsers,
  lock: LuLock,
  billing: LuCreditCard,
  receipt: LuFileText,
  policy: LuShield,
  claim: LuClipboardList,
  alert: LuAlertCircle,
};

const STATUS_COLORS = {
  Active:   { bg: '#dcfce7', text: '#15803d' },
  Draft:    { bg: '#fef9c3', text: '#854d0e' },
  Inactive: { bg: '#fee2e2', text: '#991b1b' },
};

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Data normalizers – API ↔ local model                                       */
/* ─────────────────────────────────────────────────────────────────────────── */

/**
 * Parse section_config from the API.
 * Handles object, JSON string, and double-encoded JSON string responses.
 * Accepts both camelCase and snake_case keys.
 */
function parseSectionConfig(raw) {
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
function normalizeTemplate(row) {
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
    carrierLogo:         row.carrier_logo                  ?? '',
    // Editable section config
    accessDetailsTitle: sectionConfig.accessDetailsTitle,
    accessDetailsRows:  sectionConfig.accessDetailsRows,
    importantNoteText:  sectionConfig.importantNoteText,
    signoffNote:        sectionConfig.signoffNote,
  };
}

/**
 * Build the payload sent to the API when saving / creating a template.
 * @param {'create'|'update'} mode
 */
function buildPayload(mode, templateId, {
  name, subject, bodyHtml, category, description, iconType,
  showAccessDetails, showImportantNote, variables,
  accessDetailsTitle, accessDetailsRows, importantNoteText, signoffNote,
}, status) {
  // Send as a plain object (NOT pre-stringified). Axios JSON-encodes the body once.
  // Pre-stringifying caused double-encoding → backend couldn't restore custom rows.
  const sectionConfig = {
    accessDetailsTitle: accessDetailsTitle ?? 'Your Portal Access Details',
    accessDetailsRows:  Array.isArray(accessDetailsRows) && accessDetailsRows.length > 0
      ? accessDetailsRows.map((r) => ({
          label: r.label ?? '',
          variable: r.variable ?? '',
        }))
      : [...DEFAULT_ACCESS_ROWS],
    importantNoteText:  importantNoteText  ?? 'For security reasons, please change your password after your first login.',
    signoffNote:        signoffNote        ?? 'If you have any questions, feel free to contact our support team.',
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
}

/** Simple "x time ago / Today, HH:MM" formatter */
function formatRelativeTime(isoString) {
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

function TemplateListItem({ template, selected, onClick }) {
  const theme = useTheme();
  const Icon = TEMPLATE_ICONS[template.iconType] || LuFileText;
  const statusColor = STATUS_COLORS[template.status] || STATUS_COLORS.Active;

  return (
    <Box
      onClick={onClick}
      sx={{
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
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
        <Avatar
          sx={{
            width: 36, height: 36, flexShrink: 0, mt: 0.25,
            bgcolor: selected ? 'primary.main' : alpha(theme.palette.grey[500], 0.12),
            color: selected ? 'white' : 'text.secondary',
          }}
        >
          <Icon size={16} />
        </Avatar>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
            <Typography
              variant="body2" fontWeight={600} noWrap
              sx={{ color: selected ? 'primary.main' : 'text.primary', lineHeight: 1.3 }}
            >
              {template.name}
            </Typography>
            <Chip
              label={template.status} size="small"
              sx={{
                height: 18, fontSize: '10px', fontWeight: 600,
                bgcolor: statusColor.bg, color: statusColor.text,
                borderRadius: '4px', flexShrink: 0,
              }}
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
}

function ListItemSkeleton() {
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
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Create Template Dialog                                                      */
/* ─────────────────────────────────────────────────────────────────────────── */


function CreateTemplateDialog({ open, onClose, onCreate, isCreating }) {
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

  // Reset when dialog opens
  useEffect(() => {
    if (open) {
      setName('');
      setCategory('onboarding');
      setDescription('');
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={() => !isCreating && onClose()} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ width: 36, height: 36, bgcolor: alpha(theme.palette.primary.main, 0.1), borderRadius: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <LuLayoutTemplate size={18} color={theme.palette.primary.main} />
          </Box>
          <Box>
            <Typography fontWeight={700} fontSize={15}>Create New Template</Typography>
            <Typography variant="caption" color="text.secondary">
              Fill in the basics — you can add subject &amp; body after saving.
            </Typography>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Template Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            size="small" required fullWidth autoFocus
            placeholder="e.g., Claim Assignment Notification"
            disabled={isCreating}
          />
          <FormControl size="small" fullWidth>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, fontWeight: 600 }}>
              Category
            </Typography>
            <Select value={category} onChange={(e) => setCategory(e.target.value)} disabled={isCreating}>
              {TEMPLATE_CATEGORIES.filter((c) => c.value !== 'all').map((c) => (
                <MenuItem key={c.value} value={c.value}>{c.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
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

      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
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
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Main EmailTemplates Component                                               */
/* ─────────────────────────────────────────────────────────────────────────── */

export default function EmailTemplates() {
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
  const [accessDetailsRows, setAccessDetailsRows]   = useState([...DEFAULT_ACCESS_ROWS]);
  const [importantNoteText, setImportantNoteText]   = useState('For security reasons, please change your password after your first login.');
  const [signoffNote, setSignoffNote]               = useState('If you have any questions, feel free to contact our support team.');

  /* ── Preview state ── */
  const [isDarkPreview, setIsDarkPreview]     = useState(false);
  const [previewDevice, setPreviewDevice]     = useState('desktop');
  const [previewEmail, setPreviewEmail]       = useState('jose@allwaystrack.com');
  const [previewWidth, setPreviewWidth]       = useState(360);
  const [fullPreviewOpen, setFullPreviewOpen] = useState(false);

  /* ── UI state ── */
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [isCreating, setIsCreating]             = useState(false);
  const [variableAnchorEl, setVariableAnchorEl] = useState(null);
  const [savedTick, setSavedTick]               = useState(false);
  const [snackbar, setSnackbar]                 = useState({ open: false, message: '', severity: 'success' });

  const subjectRef          = useRef(null);
  const quillRef            = useRef(null);   // ReactQuill instance
  const quillSelectionRef   = useRef(null);   // saved Quill cursor before popover steals focus
  const insertTargetRef     = useRef('subject'); // 'subject' | 'body'
  const savedTickTimerRef    = useRef(null);  // cleanup on unmount
  const suppressResetTimer   = useRef(null);  // cleanup for the post-load hasChanges reset timeout
  const suppressQuillChange  = useRef(false); // suppresses programmatic onChange from value-prop sync
  const hasFetched           = useRef(false); // prevents double fetch from React 18 StrictMode

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
    if (savedTickTimerRef.current)  clearTimeout(savedTickTimerRef.current);
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
      setImportantNoteText(selectedTemplate.importantNoteText  ?? 'For security reasons, please change your password after your first login.');
      setSignoffNote(selectedTemplate.signoffNote              ?? 'If you have any questions, feel free to contact our support team.');
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
        const end   = input.selectionEnd   ?? templateSubject.length;
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
    <Box sx={{ display: 'flex', flex: 1, minHeight: 0, overflow: 'hidden' }}>

      {/* ══════════════════════════════════════════════════════════════════
          LEFT PANEL – Template List
          ══════════════════════════════════════════════════════════════════ */}
      <Box
        sx={{
          width: 268, flexShrink: 0, display: 'flex', flexDirection: 'column',
          borderRight: '1px solid', borderColor: 'divider',
          bgcolor: isDark ? 'background.paper' : '#fafbfc', overflow: 'hidden',
        }}
      >
        {/* Header */}
        <Box sx={{ px: 2, pt: 2, pb: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
            <Typography variant="subtitle2" fontWeight={700} color="text.primary">
              Templates
              {!isFetching && (
                <Typography component="span" variant="caption" color="text.disabled" sx={{ ml: 0.75 }}>
                  ({filteredTemplates.length})
                </Typography>
              )}
            </Typography>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
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
              sx: { fontSize: 13, borderRadius: 1.5 },
            }}
          />

          <FormControl fullWidth size="small" sx={{ mt: 1 }}>
            <Select
              value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}
              displayEmpty sx={{ fontSize: 13, borderRadius: 1.5 }}
            >
              {TEMPLATE_CATEGORIES.map((c) => (
                <MenuItem key={c.value} value={c.value} sx={{ fontSize: 13 }}>{c.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Divider />

        {/* List */}
        <Box sx={{ flex: 1, overflowY: 'auto', py: 1 }}>
          {isFetching ? (
            /* Loading skeletons */
            Array.from({ length: 5 }).map((_, i) => <ListItemSkeleton key={i} />)
          ) : filteredTemplates.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4, px: 2 }}>
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
                    if (!window.confirm('You have unsaved changes. Switch template and discard them?')) return;
                  }
                  setSelectedTemplate(tpl);
                }}
              />
            ))
          )}
        </Box>

        <Divider />

        {/* Create Button */}
        <Box sx={{ p: 1.5 }}>
          <Button
            variant="outlined" fullWidth size="small"
            onClick={() => setCreateDialogOpen(true)}
            sx={{ borderRadius: 1.5, fontSize: 13, fontWeight: 600 }}
          >
            Create New Template
          </Button>
        </Box>
      </Box>

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
      {selectedTemplate && <Box
        sx={{
          flex: 1, display: 'flex', flexDirection: 'column',
          overflow: 'hidden', borderRight: '1px solid', borderColor: 'divider',
        }}
      >
        {/* Editor Header */}
        <Box sx={{ px: 3, pt: 2, pb: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
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
        <Box
          sx={{
            flex: 1, overflow: 'auto', px: 3, py: 2,
            '& .ql-toolbar': {
              borderRadius: '8px 8px 0 0',
              border: `1px solid ${theme.palette.divider}`,
              bgcolor: isDark ? 'rgba(255,255,255,0.04)' : '#fafbfc',
              fontSize: 13,
            },
            '& .ql-container': {
              borderRadius: '0 0 8px 8px',
              border: `1px solid ${theme.palette.divider}`,
              borderTop: 'none',
              fontSize: 13,
              minHeight: 200,
            },
            '& .ql-editor': { minHeight: 200, fontSize: 13, lineHeight: 1.65, color: theme.palette.text.primary },
          }}
        >
          {/* Design */}
          <Box>
              {/* ── Template Name & Subject ────────────────────────────────── */}
              <Box sx={{ mb: 1.5 }}>
                <Box sx={{ mb: 1.5 }}>
                  <Typography variant="caption" fontWeight={600} color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
                    Template Name <span style={{ color: theme.palette.error.main }}>*</span>
                  </Typography>
                  <TextField
                    size="small" value={templateName}
                    onChange={(e) => { setTemplateName(e.target.value); setHasChanges(true); }}
                    fullWidth placeholder="Enter template name"
                    disabled={!selectedTemplate}
                    InputProps={{ sx: { fontSize: 13, borderRadius: 1.5 } }}
                  />
                </Box>
                <Box>
                  <Typography variant="caption" fontWeight={600} color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
                    Subject <span style={{ color: theme.palette.error.main }}>*</span>
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                      ref={subjectRef} size="small" value={templateSubject}
                      onChange={(e) => { setTemplateSubject(e.target.value); setHasChanges(true); }}
                      fullWidth placeholder="e.g., Welcome to {{carrier_name}} Portal"
                      disabled={!selectedTemplate}
                      InputProps={{ sx: { fontSize: 13, borderRadius: 1.5 } }}
                    />
                    <Button
                      variant="outlined" size="small"
                      endIcon={<LuChevronDown size={13} />}
                      onClick={(e) => { insertTargetRef.current = 'subject'; setVariableAnchorEl(e.currentTarget); }}
                      disabled={!selectedTemplate}
                      sx={{ whiteSpace: 'nowrap', borderRadius: 1.5, fontSize: 12, flexShrink: 0 }}
                    >
                      Insert Variable
                    </Button>
                  </Box>
                </Box>
              </Box>

              {/* ── Section toggles ───────────────────────────────────────── */}
              <Box
                sx={{
                  mb: 1.5, p: 1.5, borderRadius: 1.5,
                  border: '1px solid', borderColor: 'divider',
                  bgcolor: isDark ? 'rgba(255,255,255,0.03)' : '#fafbfc',
                }}
              >
                <Typography variant="caption" fontWeight={700} color="text.secondary" display="block" mb={1}>
                  Template Sections &nbsp;
                  <Typography component="span" variant="caption" color="text.disabled">
                    (toggle to show / hide in the email)
                  </Typography>
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
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
                    sx={{ m: 0, mr: 2, alignItems: 'flex-start' }}
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
                    sx={{ m: 0, alignItems: 'flex-start' }}
                  />
                </Box>
              </Box>

              {/* ── Email Body Card (sticky so it stays in view while fields scroll) ── */}
              <Box
                sx={{
                  position: 'sticky', top: 0, zIndex: 1,
                  border: '1px solid', borderColor: 'divider',
                  borderRadius: 2, overflow: 'hidden', mb: 1,
                  bgcolor: 'background.paper',
                }}
              >
                {/* Email header chrome */}
                <Box
                  sx={{
                    background: 'linear-gradient(135deg, #1a2b5a 0%, #284394 100%)',
                    px: 3, py: 2, display: 'flex', alignItems: 'center', gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 40, height: 40, bgcolor: '#3e60d5', borderRadius: 1.5,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 18, flexShrink: 0, overflow: 'hidden',
                    }}
                  >
                    {selectedTemplate?.agencyLogo
                      ? <img src={selectedTemplate.agencyLogo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 6, display: 'block' }}
                          onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                      : '🛡️'}
                  </Box>
                  <Box>
                    <Typography variant="body2" fontWeight={700} sx={{ color: 'white', lineHeight: 1.3 }}>
                      {'{{carrier_name}}'}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                      Carrier Portal
                    </Typography>
                  </Box>
                </Box>

                {/* Quill body editor */}
                <Box sx={{ bgcolor: 'background.paper', p: 1 }}>
                  {/* Body Insert Variable toolbar */}
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 0.5 }}>
                    <Button
                      variant="text" size="small"
                      endIcon={<LuChevronDown size={12} />}
                      disabled={!selectedTemplate}
                      onClick={(e) => {
                        insertTargetRef.current = 'body';
                        setVariableAnchorEl(e.currentTarget);
                      }}
                      sx={{ fontSize: 11, color: 'text.secondary', textTransform: 'none', px: 1, py: 0.25, borderRadius: 1 }}
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
                        // Quill fired due to programmatic value update or HTML normalisation.
                        // Store the normalised value so the next render doesn't see a mismatch
                        // and fire onChange again, but do NOT mark the form as dirty.
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
                  <Box sx={{ bgcolor: 'background.paper', px: 2, pb: 2 }}>
                    <Box
                      sx={{
                        bgcolor: isDark ? alpha('#22c55e', 0.07) : '#f0fdf4',
                        border: '1px solid', borderColor: isDark ? alpha('#22c55e', 0.3) : '#86efac',
                        borderRadius: 1.5, p: 1.5,
                      }}
                    >
                      {/* Editable title */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                        <Typography variant="caption" sx={{ color: '#15803d', flexShrink: 0 }}>🔒</Typography>
                        <TextField
                          size="small" variant="standard" value={accessDetailsTitle}
                          onChange={(e) => { setAccessDetailsTitle(e.target.value); setHasChanges(true); }}
                          disabled={!selectedTemplate}
                          inputProps={{ style: { fontSize: 12, fontWeight: 700, color: '#15803d', padding: '2px 0' } }}
                          sx={{ flex: 1, '& .MuiInput-underline:before': { borderColor: 'transparent' }, '& .MuiInput-underline:hover:before': { borderColor: '#86efac' } }}
                          placeholder="Section title…"
                        />
                      </Box>

                      {/* Editable rows */}
                      {accessDetailsRows.map((row, idx) => (
                        <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.5 }}>
                          <TextField
                            size="small" variant="standard" value={row.label}
                            onChange={(e) => {
                              const next = accessDetailsRows.map((r, i) => i === idx ? { ...r, label: e.target.value } : r);
                              setAccessDetailsRows(next); setHasChanges(true);
                            }}
                            disabled={!selectedTemplate}
                            inputProps={{ style: { fontSize: 12, color: isDark ? '#94a3b8' : '#6b7280', padding: '2px 0', width: 110 } }}
                            sx={{ width: 110, '& .MuiInput-underline:before': { borderColor: 'transparent' }, '& .MuiInput-underline:hover:before': { borderColor: '#86efac' } }}
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
                            inputProps={{ style: { fontSize: 12, color: '#3e60d5', fontFamily: 'monospace', padding: '2px 0' } }}
                            sx={{ flex: 1, '& .MuiInput-underline:before': { borderColor: 'transparent' }, '& .MuiInput-underline:hover:before': { borderColor: '#86efac' } }}
                            placeholder="{{variable}}"
                          />
                          <Tooltip title="Remove row">
                            <span>
                              <IconButton
                                size="small" disabled={!selectedTemplate || accessDetailsRows.length <= 1}
                                onClick={() => { setAccessDetailsRows(accessDetailsRows.filter((_, i) => i !== idx)); setHasChanges(true); }}
                                sx={{ p: 0.25, opacity: 0.5, '&:hover': { opacity: 1 } }}
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
                        sx={{ mt: 0.5, fontSize: 11, color: '#15803d', textTransform: 'none', p: '2px 6px', minWidth: 0 }}
                      >
                        Add row
                      </Button>
                    </Box>
                  </Box>
                )}

                {/* ── Important Note (editable) ───────────────────────────── */}
                {showImportantNote && (
                  <Box sx={{ bgcolor: 'background.paper', px: 2, pb: 2 }}>
                    <Box
                      sx={{
                        bgcolor: isDark ? alpha('#3e60d5', 0.07) : '#eff6ff',
                        border: '1px solid', borderColor: isDark ? alpha('#3e60d5', 0.3) : '#93c5fd',
                        borderRadius: 1.5, p: 1.5,
                      }}
                    >
                      <Typography variant="caption" sx={{ color: '#1d4ed8', fontWeight: 700, display: 'block', mb: 0.5 }}>
                        ℹ️ Important
                      </Typography>
                      <TextField
                        size="small" variant="standard" multiline fullWidth value={importantNoteText}
                        onChange={(e) => { setImportantNoteText(e.target.value); setHasChanges(true); }}
                        disabled={!selectedTemplate}
                        inputProps={{ style: { fontSize: 12, color: '#1d4ed8', lineHeight: 1.5 } }}
                        sx={{ '& .MuiInput-underline:before': { borderColor: 'transparent' }, '& .MuiInput-underline:hover:before': { borderColor: '#93c5fd' } }}
                        placeholder="Important note text…"
                      />
                    </Box>
                  </Box>
                )}

                {/* ── Sign-off (editable) ─────────────────────────────────── */}
                <Box sx={{ bgcolor: 'background.paper', px: 2, pb: 2 }}>
                  <TextField
                    size="small" variant="standard" fullWidth value={signoffNote}
                    onChange={(e) => { setSignoffNote(e.target.value); setHasChanges(true); }}
                    disabled={!selectedTemplate}
                    inputProps={{ style: { fontSize: 12, color: isDark ? '#94a3b8' : '#6b7280' } }}
                    sx={{ mb: 0.75, '& .MuiInput-underline:before': { borderColor: 'transparent' }, '& .MuiInput-underline:hover:before': { borderColor: isDark ? '#334155' : '#d1d5db' } }}
                    placeholder="Add a note to recipients…"
                  />
                  <Typography variant="caption" color="text.primary">
                    Best Regards,<br /><strong>{'{{company_name}}'} Team</strong>
                  </Typography>
                </Box>

                {/* Footer chrome */}
                <Box
                  sx={{
                    bgcolor: isDark ? 'rgba(255,255,255,0.03)' : '#f8f9fa',
                    borderTop: '1px solid', borderColor: 'divider',
                    px: 2, py: 1.5, textAlign: 'center',
                  }}
                >
                  <Typography variant="caption" color="text.disabled" display="block">
                    © {'{{current_year}}'} {'{{company_name}}'}. All rights reserved.
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 0.25 }}>
                    {['Privacy Policy', 'Terms of Service', 'Contact Us'].map((link) => (
                      <Typography key={link} variant="caption" color="primary.main" sx={{ cursor: 'pointer' }}>{link}</Typography>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Box>
        </Box>

        {/* Action Bar */}
        <Box
          sx={{
            px: 3, py: 1.5, borderTop: '1px solid', borderColor: 'divider',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0,
          }}
        >
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="Preview email">
              <IconButton size="small"><LuEye size={16} /></IconButton>
            </Tooltip>
            <Tooltip title="Duplicate template">
              <IconButton size="small"><LuCopy size={16} /></IconButton>
            </Tooltip>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined" size="small"
              startIcon={isSaving ? <CircularProgress size={13} color="inherit" /> : null}
              onClick={() => handleSave(2)}
              disabled={!hasChanges || isSaving || !selectedTemplate}
              sx={{ borderRadius: 1.5, fontSize: 13 }}
            >
              Save as Draft
            </Button>
            <Button
              variant="contained" size="small"
              startIcon={isSaving ? <CircularProgress size={13} color="inherit" /> : null}
              onClick={() => handleSave(1)}
              disabled={!hasChanges || isSaving || !selectedTemplate}
              sx={{ borderRadius: 1.5, fontSize: 13 }}
            >
              {isSaving ? 'Saving…' : savedTick ? 'Saved!' : 'Save Template'}
            </Button>
          </Box>
        </Box>
      </Box>}

      {/* ══════════════════════════════════════════════════════════════════
          DRAG HANDLE – between Editor and Preview (only when template selected)
          ══════════════════════════════════════════════════════════════════ */}
      {selectedTemplate && 
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
          {[0,1,2,3].map((i) => (
            <Box key={i} sx={{ width: 3, height: 3, borderRadius: '50%', bgcolor: 'background.paper' }} />
          ))}
        </Box>
      </Box>}

      {/* ══════════════════════════════════════════════════════════════════
          RIGHT PANEL – Live Preview  (only when a template is selected)
          ══════════════════════════════════════════════════════════════════ */}
      {selectedTemplate && <Box sx={{ width: previewWidth, flexShrink: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Preview Header */}
        <Box
          sx={{
            px: 2, pt: 2, pb: 1.5, borderBottom: '1px solid', borderColor: 'divider',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Typography variant="subtitle2" fontWeight={700}>Live Preview</Typography>
            <Tooltip title="Drag the ◀▶ handle on the left edge to resize this panel">
              <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.disabled', cursor: 'default' }}>
                <LuGripVertical size={13} />
              </Box>
            </Tooltip>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <ToggleButtonGroup
              value={previewDevice} exclusive
              onChange={(_, v) => v && setPreviewDevice(v)}
              size="small"
              sx={{ '& .MuiToggleButton-root': { py: 0.25, px: 0.75, border: '1px solid', borderColor: 'divider' } }}
            >
              <ToggleButton value="desktop"><LuMonitor size={14} /></ToggleButton>
              <ToggleButton value="mobile"><LuSmartphone size={14} /></ToggleButton>
            </ToggleButtonGroup>
            <Tooltip title={isDarkPreview ? 'Switch to light preview' : 'Switch to dark preview'}>
              <IconButton
                size="small"
                onClick={() => setIsDarkPreview((p) => !p)}
                sx={{
                  bgcolor: isDarkPreview ? '#1a2b5a' : alpha(theme.palette.grey[500], 0.1),
                  '&:hover': { bgcolor: isDarkPreview ? '#1e3370' : alpha(theme.palette.grey[500], 0.18) },
                }}
              >
                {isDarkPreview ? <LuMoon size={14} color="white" /> : <LuSun size={14} />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Expand full preview">
              <IconButton
                size="small" disabled={!selectedTemplate}
                onClick={() => setFullPreviewOpen(true)}
                sx={{ bgcolor: alpha(theme.palette.grey[500], 0.1), '&:hover': { bgcolor: alpha(theme.palette.grey[500], 0.2) } }}
              >
                <LuMaximize2 size={14} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Preview Email To */}
        <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider', flexShrink: 0 }}>
          <TextField
            size="small" fullWidth label="Preview Email To"
            value={previewEmail} onChange={(e) => setPreviewEmail(e.target.value)}
            InputProps={{ sx: { fontSize: 13, borderRadius: 1.5 } }}
          />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
            This is how your email will appear to recipients.
          </Typography>
        </Box>

        {/* Rendered Preview */}
        <Box
          sx={{
            flex: 1, overflowY: 'auto', p: 1.5,
            bgcolor: isDarkPreview ? '#0f1117' : '#eef0f5',
          }}
        >
          {selectedTemplate ? (
            <Box
              sx={{
                maxWidth: previewDevice === 'mobile' ? 320 : '100%',
                mx: 'auto', borderRadius: 1.5, overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
              }}
            >
              <Box
                dangerouslySetInnerHTML={{ __html: previewHtml }}
                sx={{ '& *': { maxWidth: '100%' } }}
              />
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <Typography variant="caption" color="text.disabled">
                Select a template to see the preview
              </Typography>
            </Box>
          )}
        </Box>

        {/* Available Variables */}
        <Box sx={{ flexShrink: 0, borderTop: '1px solid', borderColor: 'divider', px: 2, py: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="caption" fontWeight={700} color="text.primary">
              ℹ️ Available Variables
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Click to insert into template
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
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
                sx={{
                  height: 22, fontSize: '11px', fontFamily: 'monospace',
                  bgcolor: isDark ? alpha('#3e60d5', 0.15) : '#eff6ff',
                  color: isDark ? '#93c5fd' : '#1d4ed8',
                  border: '1px solid',
                  borderColor: isDark ? alpha('#3e60d5', 0.3) : '#bfdbfe',
                  '&:hover': { bgcolor: isDark ? alpha('#3e60d5', 0.25) : '#dbeafe' },
                }}
              />
            ))}
            <Chip label="… and more" size="small" sx={{ height: 22, fontSize: '11px', color: 'text.secondary' }} />
          </Box>
        </Box>
      </Box>}

      {/* ══════════════════════════════════════════════════════════════════
          FULL PREVIEW DIALOG
          ══════════════════════════════════════════════════════════════════ */}
      <Dialog
        open={fullPreviewOpen}
        onClose={() => setFullPreviewOpen(false)}
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
            <IconButton size="small" onClick={() => setFullPreviewOpen(false)}
              sx={{ bgcolor: alpha(theme.palette.grey[500], 0.1) }}>
              <LuX size={15} />
            </IconButton>
          </Box>
        </Box>
        <Box
          sx={{
            flex: 1, overflowY: 'auto', p: 3,
            bgcolor: isDarkPreview ? '#0f1117' : '#eef0f5',
          }}
        >
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

      {/* ══════════════════════════════════════════════════════════════════
          Dialogs & Overlays
          ══════════════════════════════════════════════════════════════════ */}
      <CreateTemplateDialog
        open={createDialogOpen}
        onClose={() => !isCreating && setCreateDialogOpen(false)}
        onCreate={handleCreateTemplate}
        isCreating={isCreating}
      />

      {/* Variable Popover */}
      <Popover
        open={Boolean(variableAnchorEl)}
        anchorEl={variableAnchorEl}
        onClose={() => setVariableAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{ sx: { p: 1.5, width: 280, borderRadius: 2 } }}
      >
        <Typography variant="caption" fontWeight={700} color="text.secondary" display="block" mb={0.5}>
          Insert variable into <strong>{insertTargetRef.current === 'body' ? 'Body' : 'Subject'}</strong>
        </Typography>
        <Typography variant="caption" color="text.disabled" display="block" mb={1}>
          {insertTargetRef.current === 'body' ? 'Inserted at cursor position in the body editor' : 'Inserted at cursor position in the subject line'}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {AVAILABLE_VARIABLES.map(({ key, description }) => (
            <Tooltip key={key} title={description} placement="top">
              <Chip
                label={key} size="small" clickable
                onClick={() => handleInsertVariable(key)}
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

      {/* Snackbar */}
      <CommonSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar((p) => ({ ...p, open: false }))}
      />

      {/* Spin animation for refresh icon */}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </Box>
  );
}
