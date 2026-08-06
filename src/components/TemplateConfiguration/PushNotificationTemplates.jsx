import { useState } from 'react';
import {
  Box, Typography, TextField, Button, Chip, Avatar,
  InputAdornment, Divider, useTheme, alpha,
  IconButton, FormControl, Select, MenuItem,
} from '@mui/material';
import { LuSearch, LuPlus, LuSend, LuSave, LuFilter, LuBell, LuBellRing } from 'react-icons/lu';

const PUSH_TEMPLATES = [
  {
    id: 'p1',
    name: 'Claim Status Update',
    description: 'Push when claim status changes',
    status: 'Active',
    title: 'Claim Update – {{claim_number}}',
    body: 'Your claim {{claim_number}} status has been updated. Tap to view details.',
    actionUrl: '/claims/{{claim_number}}',
    variables: ['{{claim_number}}', '{{first_name}}'],
  },
  {
    id: 'p2',
    name: 'New Claim Assigned',
    description: 'Notify adjuster of claim assignment',
    status: 'Active',
    title: 'New Claim Assigned',
    body: 'Claim {{claim_number}} has been assigned to you. Tap to review.',
    actionUrl: '/claims/{{claim_number}}',
    variables: ['{{adjuster_name}}', '{{claim_number}}'],
  },
  {
    id: 'p3',
    name: 'Policy Expiry Alert',
    description: 'Alert before policy expires',
    status: 'Active',
    title: 'Policy Expiring Soon',
    body: 'Your policy {{policy_number}} expires on {{renewal_date}}. Renew now.',
    actionUrl: '/policies/{{policy_number}}',
    variables: ['{{first_name}}', '{{policy_number}}', '{{renewal_date}}'],
  },
  {
    id: 'p4',
    name: 'Payment Due Reminder',
    description: 'Reminder for upcoming payment',
    status: 'Draft',
    title: 'Payment Due – {{amount}}',
    body: 'Payment of {{amount}} is due on {{due_date}}. Tap to pay now.',
    actionUrl: '/billing',
    variables: ['{{first_name}}', '{{amount}}', '{{due_date}}'],
  },
  {
    id: 'p5',
    name: 'Support Ticket Update',
    description: 'Notify when support ticket is updated',
    status: 'Active',
    title: 'Support Ticket Updated',
    body: 'Your support ticket has been updated. Our team is working on your request.',
    actionUrl: '/support',
    variables: ['{{first_name}}'],
  },
];

const PUSH_VARIABLES = [
  '{{first_name}}', '{{carrier_name}}', '{{claim_number}}',
];

const PREVIEW_VALUES = {
  '{{first_name}}': 'John',
  '{{carrier_name}}': 'Carrier',
  '{{claim_number}}': 'CLM-2024-001234',
  '{{policy_number}}': 'POL-005678',
  '{{amount}}': '$1,250.00',
  '{{due_date}}': 'Dec 31, 2024',
  '{{renewal_date}}': 'Jan 15, 2025',
  '{{adjuster_name}}': 'Sarah Wilson',
};

export default function PushNotificationTemplates() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const STATUS_COLORS = {
    Active: { bg: isDark ? alpha('#2e7d32', 0.2) : '#e8f5e9', text: isDark ? '#81c784' : '#2e7d32' },
    Draft: { bg: isDark ? alpha('#ef6c00', 0.2) : '#fff3e0', text: isDark ? '#ffb74d' : '#ef6c00' },
    Inactive: { bg: isDark ? alpha('#c62828', 0.2) : '#ffebee', text: isDark ? '#e57373' : '#c62828' },
  };

  const [templates] = useState(PUSH_TEMPLATES);
  const [selected, setSelected] = useState(PUSH_TEMPLATES[0]);
  const [search, setSearch] = useState('');
  const [templateName, setTemplateName] = useState(PUSH_TEMPLATES[0].name);
  const [title, setTitle] = useState(PUSH_TEMPLATES[0].title);
  const [body, setBody] = useState(PUSH_TEMPLATES[0].body);
  const [actionUrl, setActionUrl] = useState(PUSH_TEMPLATES[0].actionUrl);
  const [hasChanges, setHasChanges] = useState(false);

  const filtered = templates.filter(
    (t) => !search || t.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSelect = (tpl) => {
    setSelected(tpl);
    setTemplateName(tpl.name);
    setTitle(tpl.title);
    setBody(tpl.body);
    setActionUrl(tpl.actionUrl);
    setHasChanges(false);
  };

  const replaceVars = (text) => {
    let result = text;
    Object.entries(PREVIEW_VALUES).forEach(([k, v]) => {
      result = result.replace(new RegExp(k.replace(/[{{}]/g, '\\$&'), 'g'), v);
    });
    return result;
  };

  return (
    <Box sx={{ display: 'flex', flex: 1, minHeight: 0, overflow: 'hidden' }}>
      {/* Left Panel */}
      <Box
        sx={{
          width: 268, flexShrink: 0, display: 'flex', flexDirection: 'column',
          borderRight: '1px solid', borderColor: 'divider',
          bgcolor: isDark ? 'background.paper' : '#fafbfc',
        }}
      >
        <Box sx={{ px: 2, pt: 2, pb: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
            <Typography variant="subtitle2" fontWeight={700}>Push Templates</Typography>
            <IconButton size="small"><LuFilter size={14} /></IconButton>
          </Box>
          <TextField
            size="small" fullWidth placeholder="Search templates..."
            value={search} onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start"><LuSearch size={14} /></InputAdornment>,
              sx: { fontSize: 14, borderRadius: 1.5 },
            }}
          />
        </Box>
        <Divider />
        <Box sx={{ flex: 1, overflowY: 'auto', py: 1 }}>
          {filtered.map((tpl) => (
            <Box
              key={tpl.id}
              onClick={() => handleSelect(tpl)}
              sx={{
                px: 2, py: 1.5, cursor: 'pointer', mx: 1, mb: 0.5, borderRadius: 1.5,
                border: '1px solid',
                borderColor: selected?.id === tpl.id ? 'primary.main' : 'transparent',
                bgcolor: selected?.id === tpl.id ? alpha(theme.palette.primary.main, 0.07) : 'transparent',
                '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.06) },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: selected?.id === tpl.id ? 'primary.main' : alpha(theme.palette.grey[500], 0.12), color: selected?.id === tpl.id ? 'white' : 'text.secondary' }}>
                  <LuBell size={14} />
                </Avatar>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
                    <Typography variant="body2" fontWeight={600} noWrap sx={{ color: selected?.id === tpl.id ? 'primary.main' : 'text.primary', fontSize: 14 }}>
                      {tpl.name}
                    </Typography>
                    <Chip label={tpl.status} size="small" sx={{ height: 18, fontSize: '10px', fontWeight: 600, bgcolor: STATUS_COLORS[tpl.status]?.bg, color: STATUS_COLORS[tpl.status]?.text, borderRadius: '4px', flexShrink: 0 }} />
                  </Box>
                  <Typography variant="caption" color="text.secondary" noWrap>{tpl.description}</Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
        <Divider />
        <Box sx={{ p: 1.5 }}>
          <Button variant="outlined" fullWidth startIcon={<LuPlus size={15} />} size="small" sx={{ borderRadius: 1.5, fontSize: 14, fontWeight: 600, '&:hover': { backgroundColor: 'primary.main', color: 'white' } }}>
            Create New Template
          </Button>
        </Box>
      </Box>

      {/* Middle Panel */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRight: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ px: 3, pt: 2.5, pb: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography variant="subtitle1" fontWeight={700}>Edit Push Notification</Typography>
          <Typography variant="caption" color="text.secondary">Configure the title, body, and action for this notification</Typography>
        </Box>
        <Box sx={{ px: 3, py: 2, flex: 1, overflow: 'auto' }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" fontWeight={600} color="text.secondary" display="block" mb={0.5}>Template Name</Typography>
            <TextField size="small" fullWidth value={templateName} onChange={(e) => { setTemplateName(e.target.value); setHasChanges(true); }} InputProps={{ sx: { fontSize: 14, borderRadius: 1.5 } }} />
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" fontWeight={600} color="text.secondary" display="block" mb={0.5}>
              Notification Title <span style={{ color: theme.palette.error.main }}>*</span>
            </Typography>
            <TextField
              size="small" fullWidth value={title}
              onChange={(e) => { setTitle(e.target.value); setHasChanges(true); }}
              placeholder="e.g., Claim Update – {{claim_number}}"
              InputProps={{ sx: { fontSize: 14, borderRadius: 1.5 } }}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" fontWeight={600} color="text.secondary" display="block" mb={0.5}>
              Notification Body <span style={{ color: theme.palette.error.main }}>*</span>
            </Typography>
            <TextField
              multiline minRows={3} fullWidth value={body}
              onChange={(e) => { setBody(e.target.value); setHasChanges(true); }}
              placeholder="Brief message shown in the notification..."
              InputProps={{ sx: { fontSize: 14, borderRadius: 1.5 } }}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" fontWeight={600} color="text.secondary" display="block" mb={0.5}>Action URL (Deep Link)</Typography>
            <TextField
              size="small" fullWidth value={actionUrl}
              onChange={(e) => { setActionUrl(e.target.value); setHasChanges(true); }}
              placeholder="/claims/{{claim_number}}"
              InputProps={{ sx: { fontSize: 14, borderRadius: 1.5 } }}
            />
          </Box>

          <Typography variant="caption" fontWeight={600} color="text.secondary" display="block" mb={1}>Insert Variable</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {PUSH_VARIABLES.map((v) => (
              <Chip
                key={v} label={v} size="small" clickable
                onClick={() => { setBody((p) => p + v); setHasChanges(true); }}
                sx={{ height: 22, fontSize: '11px', fontFamily: 'monospace', bgcolor: isDark ? alpha('#3e60d5', 0.15) : '#eff6ff', color: isDark ? '#93c5fd' : '#1d4ed8', border: '1px solid', borderColor: isDark ? alpha('#3e60d5', 0.3) : '#bfdbfe' }}
              />
            ))}
          </Box>
        </Box>
        <Box sx={{ px: 3, py: 1.5, borderTop: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button variant="outlined" size="small" startIcon={<LuSend size={14} />} sx={{ borderRadius: 1.5, fontSize: 14, '&:hover': { backgroundColor: 'primary.main', color: 'white' } }}>Send Test Push</Button>
          <Button variant="contained" size="small" startIcon={<LuSave size={14} />} disabled={!hasChanges} sx={{ borderRadius: 1.5, fontSize: 14 }}>Save Template</Button>
        </Box>
      </Box>

      {/* Right Panel: Preview */}
      <Box sx={{ width: 320, flexShrink: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Box sx={{ px: 2, pt: 2, pb: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography variant="subtitle2" fontWeight={700}>Push Preview</Typography>
        </Box>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 3, bgcolor: isDark ? 'rgba(255,255,255,0.02)' : '#f8f9fa' }}>
          {/* Phone with notification */}
          <Box sx={{ width: 260, bgcolor: '#1a1a2e', borderRadius: 4, p: 1.5, boxShadow: '0 8px 32px rgba(0,0,0,0.25)' }}>
            {/* Status bar */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 1, pb: 0.5 }}>
              <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 10 }}>9:41 AM</Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 10 }}>📶 🔋</Typography>
            </Box>
            {/* Notification Card */}
            <Box sx={{ bgcolor: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(20px)', borderRadius: 2, p: 1.5, mt: 0.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.75 }}>
                <Box sx={{ width: 20, height: 20, bgcolor: '#3e60d5', borderRadius: 0.5, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>
                  🛡️
                </Box>
                <Typography sx={{ color: 'rgba(255,255,255,0.9)', fontSize: 10, fontWeight: 600 }}>
                  Acme Insurance
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: 9, ml: 'auto' }}>now</Typography>
              </Box>
              <Typography sx={{ color: 'white', fontSize: 12, fontWeight: 600, mb: 0.25, lineHeight: 1.3 }}>
                {replaceVars(title)}
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.75)', fontSize: 11, lineHeight: 1.4 }}>
                {replaceVars(body)}
              </Typography>
            </Box>
            {/* Lock screen background */}
            <Box sx={{ height: 120, bgcolor: 'rgba(255,255,255,0.04)', borderRadius: 2, mt: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography sx={{ color: 'rgba(255,255,255,0.15)', fontSize: 11 }}>Home Screen</Typography>
            </Box>
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 2, textAlign: 'center', display: 'block' }}>
            iOS / Android lock screen preview
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
