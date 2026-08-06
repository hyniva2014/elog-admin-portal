import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Box, Grid, Paper, Typography, TextField, Button, Chip,
  Avatar, InputAdornment, Divider, useTheme, alpha,
  FormControl, Select, MenuItem, IconButton, Tooltip, CircularProgress,
} from '@mui/material';
import { LuSearch, LuPlus, LuSmartphone, LuSend, LuSave, LuFilter, LuMessageSquare, LuRefreshCw } from 'react-icons/lu';
import { useServices } from '@src/services/services';
import CommonSnackbar from '@src/common/CommonSnackbar';
import useUnsavedChangesDialog from '../compliance/useUnsavedChangesDialog';
import { ListItemSkeleton } from './TemplateListItem';
import { CreateTemplateDialog } from './CreateTemplateDialog';
import * as styles from './SmsTemplatesStyles';

const SMS_TEMPLATES = [
  {
    id: 's1',
    name: 'Welcome SMS',
    description: 'Sent after agency/user creation',
    status: 'Active',
    body: 'Welcome to {{carrier_name}}! Your account for {{carrier_name}} is ready. Login at {{portal_url}} using {{username}}. Temp password: {{temp_password}}',
    variables: ['{{carrier_name}}', '{{portal_url}}', '{{username}}', '{{temp_password}}'],
  },
  {
    id: 's2',
    name: 'OTP Verification',
    description: 'One-time password for login',
    status: 'Active',
    body: 'Your {{company_name}} OTP is {{otp_code}}. Valid for 10 minutes. Do not share this with anyone.',
    variables: ['{{company_name}}', '{{otp_code}}'],
  },
  {
    id: 's3',
    name: 'Password Reset',
    description: 'Password reset link via SMS',
    status: 'Active',
    body: 'Reset your {{company_name}} password: {{reset_link}} — Link expires in 1 hour.',
    variables: ['{{company_name}}', '{{reset_link}}'],
  },
  {
    id: 's4',
    name: 'Claim Assigned',
    description: 'Notify adjuster of new claim',
    status: 'Active',
    body: 'Hi {{adjuster_name}}, claim {{claim_number}} has been assigned to you. Login to {{portal_url}} to view details.',
    variables: ['{{adjuster_name}}', '{{claim_number}}', '{{portal_url}}'],
  },
  {
    id: 's5',
    name: 'Policy Renewal Reminder',
    description: 'SMS reminder before renewal date',
    status: 'Draft',
    body: 'Hi {{first_name}}, your policy {{policy_number}} renews on {{renewal_date}}. Premium: {{premium_amount}}. Login to renew: {{portal_url}}',
    variables: ['{{first_name}}', '{{policy_number}}', '{{renewal_date}}', '{{premium_amount}}', '{{portal_url}}'],
  },
];

const SMS_VARIABLES = [
  '{{first_name}}', '{{carrier_name}}',
  '{{portal_url}}', '{{username}}', '{{temp_password}}',
  '{{otp_code}}', '{{reset_link}}', '{{claim_number}}',
  '{{adjuster_name}}', '{{policy_number}}', '{{renewal_date}}',
  '{{premium_amount}}',
];

const STATUS_COLORS = {
  Active: { bg: '#dcfce7', text: '#15803d' },
  Draft: { bg: '#fef9c3', text: '#854d0e' },
  Inactive: { bg: '#fee2e2', text: '#991b1b' },
};

const MAX_SMS_CHARS = 160;

function normalizeSmsTemplate(row) {
  let variables = [];
  try {
    variables = row.variables
      ? (typeof row.variables === 'string' ? JSON.parse(row.variables) : row.variables)
      : [];
  } catch { variables = []; }

  const statusMap = { 1: 'Active', 2: 'Draft', 0: 'Inactive' };
  const status = statusMap[row.status] ?? (row.status_label ?? 'Active');

  return {
    id: String(row.template_id || row.id || ''),
    name: row.template_name ?? row.name ?? '',
    description: row.description ?? '',
    status,
    body: row.body ?? row.content ?? '',
    variables,
  };
}

export default function SmsTemplates({ setLoading }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { fetchApi, createApi } = useServices();

  const [templates, setTemplates] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const [templateName, setTemplateName] = useState('');
  const [body, setBody] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const showSnackbar = (message, severity = 'success') =>
    setSnackbar({ open: true, message, severity });

  useEffect(() => {
    if (setLoading) {
      setLoading(isFetching || isSaving || isCreating);
    }
  }, [isFetching, isSaving, isCreating, setLoading]);

  const hasFetched = useRef(false);

  const fetchTemplates = useCallback(async (keepSelection = false) => {
    setIsFetching(true);
    try {
      const response = await fetchApi('/masteradmin/sms-templates', false);
      
      if (response?.statusCode >= 400 || response?.message) {
        throw new Error(response?.body?.message || response?.message || 'Failed to fetch');
      }

      const raw = response?.body?.data ?? response?.body ?? [];
      const list = Array.isArray(raw) ? raw.map(normalizeSmsTemplate) : [];

      setTemplates(list);

      if (!keepSelection) {
        const first = list.find((t) => t.status === 'Active') ?? list[0] ?? null;
        setSelected(first);
      }
    } catch (err) {
      console.warn('[SmsTemplates] API unavailable – using seed data.', err?.message);
      setTemplates(SMS_TEMPLATES);
      if (!keepSelection) setSelected(SMS_TEMPLATES[0] ?? null);
    } finally {
      setIsFetching(false);
    }
  }, [fetchApi]);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchTemplates();
  }, [fetchTemplates]);



  useEffect(() => {
    if (selected) {
      setTemplateName(selected.name);
      setBody(selected.body);
      setHasChanges(false);
    } else {
      setTemplateName('');
      setBody('');
      setHasChanges(false);
    }
  }, [selected]);

  const [pendingAction, setPendingAction] = useState(null);

  const { handleCancel, UnsavedChangesDialog } = useUnsavedChangesDialog(
    () => {
      if (pendingAction === 'CREATE') {
        setCreateDialogOpen(true);
      } else if (pendingAction) {
        executeSelect(pendingAction);
      }
      setPendingAction(null);
    },
    () => setPendingAction(null)
  );

  const executeSelect = (tpl) => {
    setSelected(tpl);
    setTemplateName(tpl.name);
    setBody(tpl.body);
    setHasChanges(false);
  };

  const handleSelect = (tpl) => {
    if (hasChanges && selected?.id !== tpl.id) {
      setPendingAction(tpl);
      handleCancel(true);
    } else {
      executeSelect(tpl);
    }
  };

  const handleCreateTemplate = () => {
    if (hasChanges) {
      setPendingAction('CREATE');
      handleCancel(true);
    } else {
      setCreateDialogOpen(true);
    }
  };

  const executeCreateTemplate = async ({ name, description }) => {
    setIsCreating(true);
    try {
      const payload = {
        template_name: name,
        body: '',
        description: description || 'Custom SMS template',
        variables: [],
        status: 2, // Draft
      };

      const response = await createApi(payload, '/masteradmin/sms-templates', false);

      if (response?.statusCode >= 400 || response?.message || !response?.body?.data) {
        throw new Error(response?.body?.message || response?.message || 'Failed to create template');
      }

      setCreateDialogOpen(false);
      showSnackbar('Template created successfully');
      await fetchTemplates();
    } catch (err) {
      console.warn('[SmsTemplates] Create API failed, using fallback.', err);
      showSnackbar('API unavailable: using local fallback data', 'warning');
      const fallback = { id: Date.now().toString(), name: name, description: description || 'Custom SMS template', status: 'Draft', body: '', variables: [] };
      setTemplates((prev) => [fallback, ...prev]);
      setSelected(fallback);
      setCreateDialogOpen(false);
    } finally {
      setIsCreating(false);
    }
  };

  const handleSave = async () => {
    if (!selected || isSaving) return;
    setIsSaving(true);
    try {
      // Extract unique variables (e.g., {{carrier_name}}) from the body text
      const extractedVars = body.match(/\{\{[^}]+\}\}/g) || [];
      const uniqueVars = Array.from(new Set(extractedVars));

      const payload = {
        template_id: Number(selected.id),
        template_name: templateName,
        body: body,
        description: selected.description,
        variables: uniqueVars,
        status: selected.status === 'Draft' ? 2 : (selected.status === 'Inactive' ? 0 : 1),
      };

      const response = await createApi(payload, '/masteradmin/sms-templates/update', false);

      if (response?.statusCode >= 400 || response?.message || !response?.body?.data) {
        throw new Error(response?.body?.message || response?.message || 'Failed to save template');
      }

      setHasChanges(false);
      showSnackbar('Template saved successfully');
      await fetchTemplates(true);
    } catch (err) {
      console.warn('[SmsTemplates] Save API failed, using fallback.', err);
      showSnackbar('API unavailable: using local fallback data', 'warning');
      const fallback = { ...selected, name: templateName, body };
      setTemplates((prev) => prev.map((t) => (t.id === selected.id ? fallback : t)));
      setSelected(fallback);
      setHasChanges(false);
    } finally {
      setIsSaving(false);
    }
  };

  const filtered = templates.filter(
    (t) => !search || t.name.toLowerCase().includes(search.toLowerCase()),
  );

  const charCount = body.length;
  const smsCount = Math.ceil(charCount / MAX_SMS_CHARS) || 1;

  const previewBody = () => {
    const preview = {
      '{{first_name}}': 'John',
      '{{carrier_name}}': 'Carrier',
      '{{portal_url}}': 'https://portal.acme.com',
      '{{username}}': 'john.doe',
      '{{temp_password}}': 'Abc@1234',
      '{{otp_code}}': '847291',
      '{{reset_link}}': 'https://portal.acme.com/reset',
      '{{adjuster_name}}': 'Sarah Wilson',
      '{{claim_number}}': 'CLM-2024-001234',
      '{{policy_number}}': 'POL-005678',
      '{{renewal_date}}': 'Jan 15, 2025',
      '{{premium_amount}}': '$840.00',
    };
    let result = body;
    Object.entries(preview).forEach(([k, v]) => {
      result = result.replace(new RegExp(k.replace(/[{{}]/g, '\\$&'), 'g'), v);
    });
    return result;
  };

  return (
    <Box sx={styles.mainContainerStyle}>
      {/* Left Panel */}
      <Box sx={styles.getLeftPanelStyle(isDark)}>
        <Box sx={styles.leftPanelHeaderStyle}>
          <Box sx={styles.headerTitleRowStyle}>
            <Typography variant="subtitle2" fontWeight={700}>
              SMS Templates
              {!isFetching && (
                <Typography component="span" variant="caption" color="text.disabled" sx={styles.headerTitleBadgeStyle}>
                  ({filtered.length})
                </Typography>
              )}
            </Typography>
            <Box sx={styles.headerActionsStyle}>
              <Tooltip title="Refresh list">
                <IconButton size="small" onClick={() => fetchTemplates()} disabled={isFetching}>
                  <LuRefreshCw size={13} style={{ animation: isFetching ? 'spin 1s linear infinite' : 'none' }} />
                </IconButton>
              </Tooltip>
              <IconButton size="small"><LuFilter size={14} /></IconButton>
            </Box>
          </Box>
          <TextField
            size="small" fullWidth placeholder="Search templates..."
            value={search} onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start"><LuSearch size={14} /></InputAdornment>,
              sx: styles.searchInputPropsStyle,
            }}
          />
        </Box>
        <Divider />
        <Box sx={styles.listContainerStyle}>
          {isFetching ? (
            Array.from(new Array(5)).map((_, i) => <ListItemSkeleton key={i} />)
          ) : filtered.length === 0 ? (
            <Box sx={styles.emptyStateContainerStyle}>
              <LuMessageSquare size={32} color={theme.palette.text.disabled} />
              <Typography variant="caption" color="text.disabled" display="block" mt={1}>
                No templates found
              </Typography>
            </Box>
          ) : (
            filtered.map((tpl) => (
              <Box
                key={tpl.id}
                onClick={() => handleSelect(tpl)}
                sx={styles.getListItemStyle(selected?.id === tpl.id, theme, alpha)}
              >
                <Box sx={styles.listItemContentStyle}>
                  <Avatar sx={styles.getListItemAvatarStyle(selected?.id === tpl.id, theme, alpha)}>
                    <LuMessageSquare size={14} />
                  </Avatar>
                  <Box sx={styles.listItemTextContainerStyle}>
                    <Box sx={styles.listItemHeaderStyle}>
                      <Typography variant="body2" fontWeight={600} noWrap sx={styles.getListItemTitleStyle(selected?.id === tpl.id)}>
                        {tpl.name}
                      </Typography>
                      <Chip label={tpl.status} size="small" sx={styles.getStatusChipStyle(STATUS_COLORS[tpl.status])} />
                    </Box>
                    <Typography variant="caption" color="text.secondary" noWrap>{tpl.description}</Typography>
                  </Box>
                </Box>
              </Box>
            ))
          )}
        </Box>
        <Divider />
        <Box sx={styles.createButtonContainerStyle}>
          <Button variant="outlined" fullWidth startIcon={<LuPlus size={15} />} size="small" onClick={handleCreateTemplate} sx={styles.createButtonStyle}>
            Create New Template
          </Button>
        </Box>
      </Box>

      {/* Middle Panel: Editor */}
      {!selected && !isFetching ? (
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1.5, px: 4, textAlign: 'center', borderRight: '1px solid', borderColor: 'divider' }}>
          <Box sx={{ width: 64, height: 64, borderRadius: 3, bgcolor: isDark ? 'rgba(255,255,255,0.05)' : alpha(theme.palette.primary.main, 0.08), display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 0.5 }}>
            <LuSmartphone size={32} color={theme.palette.primary.main} />
          </Box>
          <Typography variant="subtitle1" fontWeight={700} color="text.primary">
            No template selected
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300, lineHeight: 1.6 }}>
            Select a template from the list on the left, or create a new one to start editing.
          </Typography>
          <Button variant="outlined" size="small" startIcon={<LuPlus size={14} />} onClick={handleCreateTemplate} sx={{ mt: 0.5, borderRadius: 1.5, fontWeight: 600 }}>
            Create New Template
          </Button>
        </Box>
      ) : (
        <Box sx={styles.middlePanelStyle}>
          <Box sx={styles.middlePanelHeaderStyle}>
            <Typography variant="subtitle1" fontWeight={700}>Edit SMS Template</Typography>
            <Typography variant="caption" color="text.secondary">Customize your SMS message content</Typography>
          </Box>
          <Box sx={styles.middlePanelContentStyle}>
            <Typography variant="caption" fontWeight={600} color="text.secondary" display="block" mb={0.5}>
              Template Name
            </Typography>
            <TextField size="small" fullWidth value={templateName} onChange={(e) => { setTemplateName(e.target.value); setHasChanges(true); }} sx={{ mb: 2 }} InputProps={{ sx: styles.editorInputPropsStyle }} />

            <Box sx={styles.charCountContainerStyle}>
              <Typography variant="caption" fontWeight={600} color="text.secondary">SMS Body</Typography>
              <Typography variant="caption" color={charCount > MAX_SMS_CHARS ? 'error.main' : 'text.secondary'}>
                {charCount} chars · {smsCount} SMS
              </Typography>
            </Box>
            <TextField
              multiline minRows={5} fullWidth
              value={body}
              onChange={(e) => { setBody(e.target.value); setHasChanges(true); }}
              placeholder="Write your SMS content here..."
              InputProps={{ sx: styles.editorInputPropsStyle }}
            />

            <Typography variant="caption" fontWeight={600} color="text.secondary" display="block" mt={2} mb={1}>
              Insert Variable
            </Typography>
            <Box sx={styles.variableContainerStyle}>
              {SMS_VARIABLES.map((v) => (
                <Chip
                  key={v} label={v} size="small" clickable
                  onClick={() => { setBody((p) => p + v); setHasChanges(true); }}
                  sx={styles.getVariableChipStyle(isDark, alpha)}
                />
              ))}
            </Box>
          </Box>
          <Box sx={styles.editorFooterStyle}>
            <Button variant="outlined" size="small" startIcon={<LuSend size={14} />} sx={styles.editorFooterButtonStyle}>Send Test SMS</Button>
            <Button
              variant="contained"
              size="small"
              startIcon={isSaving ? <CircularProgress size={14} color="inherit" /> : <LuSave size={14} />}
              disabled={!hasChanges || isSaving || !selected}
              onClick={handleSave}
              sx={styles.editorFooterButtonStyle}
            >
              {isSaving ? 'Saving...' : 'Save Template'}
            </Button>
          </Box>
        </Box>
      )}

      {/* Right Panel: Phone Preview */}
      <Box sx={styles.rightPanelStyle}>
        <Box sx={styles.rightPanelHeaderStyle}>
          <Typography variant="subtitle2" fontWeight={700}>SMS Preview</Typography>
        </Box>
        <Box sx={styles.getPhoneContainerStyle(isDark)}>
          {/* Phone Frame */}
          <Box sx={styles.phoneFrameStyle}>
            {/* Status bar */}
            <Box sx={styles.phoneStatusBarStyle}>
              <Typography sx={styles.phoneStatusBarTextStyle}>9:41 AM</Typography>
              <Typography sx={styles.phoneStatusBarTextStyle}>📶 🔋</Typography>
            </Box>
            {/* Message thread */}
            <Box sx={styles.phoneMessageThreadStyle}>
              <Typography sx={styles.phoneSenderTextStyle}>Acme Insurance</Typography>
              <Box sx={styles.phoneMessageBubbleStyle}>
                <Typography sx={styles.phoneMessageTextStyle}>
                  {previewBody()}
                </Typography>
              </Box>
              <Typography sx={styles.phoneDeliveredTextStyle}>Delivered</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Spin animation for refresh icon */}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>

      {UnsavedChangesDialog}

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
        onCreate={executeCreateTemplate}
        isCreating={isCreating}
        type="sms"
      />
    </Box>
  );
}
