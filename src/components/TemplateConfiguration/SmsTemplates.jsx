import { useState } from 'react';
import {
  Box, Grid, Paper, Typography, TextField, Button, Chip,
  Avatar, InputAdornment, Divider, useTheme, alpha,
  FormControl, Select, MenuItem, IconButton, Tooltip,
} from '@mui/material';
import { LuSearch, LuPlus, LuSmartphone, LuSend, LuSave, LuFilter, LuMessageSquare } from 'react-icons/lu';

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
};

const MAX_SMS_CHARS = 160;

export default function SmsTemplates() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const [templates] = useState(SMS_TEMPLATES);
  const [selected, setSelected] = useState(SMS_TEMPLATES[0]);
  const [search, setSearch] = useState('');
  const [templateName, setTemplateName] = useState(SMS_TEMPLATES[0].name);
  const [body, setBody] = useState(SMS_TEMPLATES[0].body);
  const [hasChanges, setHasChanges] = useState(false);

  const filtered = templates.filter(
    (t) => !search || t.name.toLowerCase().includes(search.toLowerCase()),
  );

  const charCount = body.length;
  const smsCount = Math.ceil(charCount / MAX_SMS_CHARS) || 1;

  const handleSelect = (tpl) => {
    setSelected(tpl);
    setTemplateName(tpl.name);
    setBody(tpl.body);
    setHasChanges(false);
  };

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
    <Box sx={{ display: 'flex', flex: 1, minHeight: 0, overflow: 'hidden' }}>
      {/* Left Panel */}
      <Box
        sx={{
          width: 268,
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          borderRight: '1px solid',
          borderColor: 'divider',
          bgcolor: isDark ? 'background.paper' : '#fafbfc',
        }}
      >
        <Box sx={{ px: 2, pt: 2, pb: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
            <Typography variant="subtitle2" fontWeight={700}>SMS Templates</Typography>
            <IconButton size="small"><LuFilter size={14} /></IconButton>
          </Box>
          <TextField
            size="small" fullWidth placeholder="Search templates..."
            value={search} onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start"><LuSearch size={14} /></InputAdornment>,
              sx: { fontSize: 13, borderRadius: 1.5 },
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
                '&:hover': { bgcolor: alpha(theme.palette.grey[500], 0.06) },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: selected?.id === tpl.id ? 'primary.main' : alpha(theme.palette.grey[500], 0.12), color: selected?.id === tpl.id ? 'white' : 'text.secondary' }}>
                  <LuMessageSquare size={14} />
                </Avatar>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
                    <Typography variant="body2" fontWeight={600} noWrap sx={{ color: selected?.id === tpl.id ? 'primary.main' : 'text.primary' }}>
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
          <Button variant="outlined" fullWidth startIcon={<LuPlus size={15} />} size="small" sx={{ borderRadius: 1.5, fontSize: 13, fontWeight: 600 }}>
            Create New Template
          </Button>
        </Box>
      </Box>

      {/* Middle Panel: Editor */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRight: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ px: 3, pt: 2.5, pb: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography variant="subtitle1" fontWeight={700}>Edit SMS Template</Typography>
          <Typography variant="caption" color="text.secondary">Customize your SMS message content</Typography>
        </Box>
        <Box sx={{ px: 3, py: 2, flex: 1, overflow: 'auto' }}>
          <Typography variant="caption" fontWeight={600} color="text.secondary" display="block" mb={0.5}>
            Template Name
          </Typography>
          <TextField size="small" fullWidth value={templateName} onChange={(e) => { setTemplateName(e.target.value); setHasChanges(true); }} sx={{ mb: 2 }} InputProps={{ sx: { fontSize: 13, borderRadius: 1.5 } }} />

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
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
            InputProps={{ sx: { fontSize: 13, borderRadius: 1.5 } }}
          />

          <Typography variant="caption" fontWeight={600} color="text.secondary" display="block" mt={2} mb={1}>
            Insert Variable
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {SMS_VARIABLES.map((v) => (
              <Chip
                key={v} label={v} size="small" clickable
                onClick={() => { setBody((p) => p + v); setHasChanges(true); }}
                sx={{ height: 22, fontSize: '11px', fontFamily: 'monospace', bgcolor: isDark ? alpha('#3e60d5', 0.15) : '#eff6ff', color: isDark ? '#93c5fd' : '#1d4ed8', border: '1px solid', borderColor: isDark ? alpha('#3e60d5', 0.3) : '#bfdbfe' }}
              />
            ))}
          </Box>
        </Box>
        <Box sx={{ px: 3, py: 1.5, borderTop: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button variant="outlined" size="small" startIcon={<LuSend size={14} />} sx={{ borderRadius: 1.5, fontSize: 13 }}>Send Test SMS</Button>
          <Button variant="contained" size="small" startIcon={<LuSave size={14} />} disabled={!hasChanges} sx={{ borderRadius: 1.5, fontSize: 13 }}>Save Template</Button>
        </Box>
      </Box>

      {/* Right Panel: Phone Preview */}
      <Box sx={{ width: 320, flexShrink: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Box sx={{ px: 2, pt: 2, pb: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography variant="subtitle2" fontWeight={700}>SMS Preview</Typography>
        </Box>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 3, bgcolor: isDark ? 'rgba(255,255,255,0.02)' : '#f8f9fa' }}>
          {/* Phone Frame */}
          <Box sx={{ width: 240, bgcolor: '#1a1a2e', borderRadius: 4, p: 1.5, boxShadow: '0 8px 32px rgba(0,0,0,0.25)' }}>
            {/* Status bar */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 1, pb: 1 }}>
              <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 10 }}>9:41 AM</Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 10 }}>📶 🔋</Typography>
            </Box>
            {/* Message thread */}
            <Box sx={{ bgcolor: '#f2f2f7', borderRadius: 2.5, p: 1.5, minHeight: 200 }}>
              <Typography sx={{ fontSize: 11, color: '#8e8e93', textAlign: 'center', mb: 1 }}>Acme Insurance</Typography>
              <Box sx={{ bgcolor: '#e9e9eb', borderRadius: '16px 16px 16px 4px', px: 1.5, py: 1, maxWidth: '90%' }}>
                <Typography sx={{ fontSize: 12, color: '#000', lineHeight: 1.5 }}>
                  {previewBody()}
                </Typography>
              </Box>
              <Typography sx={{ fontSize: 10, color: '#8e8e93', mt: 0.5 }}>Delivered</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
