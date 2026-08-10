export const TEMPLATE_CATEGORIES = [
  { value: 'all', label: 'All Categories' },
  { value: 'onboarding', label: 'Onboarding' },
  { value: 'authentication', label: 'Authentication' },
  { value: 'billing', label: 'Billing' },
  { value: 'claims', label: 'Claims' },
  { value: 'policy', label: 'Policy' },
];

export const AVAILABLE_VARIABLES = [
  { key: '{{first_name}}', description: 'Recipient first name' },
  { key: '{{last_name}}', description: 'Recipient last name' },
  { key: '{{email}}', description: 'Recipient email address' },
  { key: '{{username}}', description: 'Login username' },
  { key: '{{carrier_name}}', description: 'Carrier name' },
  { key: '{{portal_url}}', description: 'Portal access URL' },
  { key: '{{temp_password}}', description: 'Temporary password' },
  { key: '{{current_year}}', description: 'Current year' },
  { key: '{{support_email}}', description: 'Support email address' },
  { key: '{{reset_link}}', description: 'Password reset URL' },
  { key: '{{support_phone}}', description: 'Support number' },
  { key: '{{carrier_logo}}', description: 'Carrier logo' },
  { key: '{{role}}', description: 'User role' },
  { key: '{{otp}}', description: 'OTP Code' },
  { key: '{{code}}', description: 'Code' },

];

export const DEFAULT_PREVIEW_VALUES = {
  '{{first_name}}': 'Jose',
  '{{last_name}}': 'Zamora',
  '{{email}}': 'jose@allwaystrack.com',
  '{{username}}': 'jose@allwaystrack.com',
  '{{carrier_name}}': 'Allways Track',
  '{{portal_url}}': 'https://allwaystrack.com',
  '{{temp_password}}': 'Abc@1234',
  '{{current_year}}': new Date().getFullYear().toString(),
  '{{support_email}}': 'support@allwaystrack.com',
  '{{reset_link}}': 'https://allwaystrack.com/reset-password?token=abc123',
  '{{support_phone}}': '+1 (555) 123-4567',
  '{{role}}': 'Admin',
  '{{carrier_logo}}': 'https://allwaystrack.com/logo.png',
  '{{otp}}': '123456',
  '{{code}}': '123456',
};

export const DEFAULT_SMS_PREVIEW_VALUES = {
  first_name: 'John',
  last_name: 'Doe',
  company_name: 'Acme Insurance',
  carrier_name: 'Acme Insurance',
  agency_name: 'Acme Agency',
  portal_url: 'https://portal.acme.com/reset',
  username: 'john.doe',
  temp_password: 'Temp@1234',
  otp: '847291',
  otp_code: '847291',
  code: '847291',
  expiry_minutes: '10',
  reset_link: 'https://portal.acme.com/reset',
  policy_number: 'POL-005678',
  claim_number: 'CLM-1001',
  claim_type: 'Auto',
  adjuster_name: 'Sarah Wilson',
  renewal_date: 'Jan 15, 2025',
  premium_amount: '$840.00',
  amount: '$1,250.00',
  due_date: 'Dec 31, 2024',
};

/** Format ISO timestamp to relative time string (e.g. "10 hours ago", "3 hours ago", "Just now", "Yesterday") */
export const formatRelativeTime = (isoString) => {
  try {
    if (!isoString) return '–';
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return String(isoString);
    const diffMs = Date.now() - date.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 2) return 'Just now';
    if (diffMin < 60) return `${diffMin} minutes ago`;
    const diffH = Math.floor(diffMin / 60);
    if (diffH < 24) return `${diffH} hour${diffH > 1 ? 's' : ''} ago`;
    const diffD = Math.floor(diffH / 24);
    if (diffD < 14) return '1 week ago';
    if (diffD < 30) return `${Math.floor(diffD / 7)} weeks ago`;
    if (diffD < 60) return '1 month ago';
    return date.toLocaleDateString();
  } catch {
    return '–';
  }
};

export const DEFAULT_SMS_VARIABLES = [
  '{{first_name}}', '{{company_name}}', '{{agency_name}}', '{{portal_url}}',
  '{{username}}', '{{temp_password}}', '{{otp_code}}', '{{reset_link}}',
  '{{claim_number}}', '{{adjuster_name}}', '{{policy_number}}', '{{renewal_date}}',
  '{{premium_amount}}',
];

export const DEFAULT_SMS_TEMPLATES = [
  {
    id: '1',
    name: 'OTP Verification',
    description: 'One-time password sent during login or verification',
    category: 'authentication',
    status: 'Active',
    subject: 'OTP Verification',
    body: 'Your {{company_name}} verification code is {{otp}}. It expires in {{expiry_minutes}} minutes. Do not share this code',
    variables: ['company_name', 'otp', 'expiry_minutes'],
    icon_type: 'lock',
    iconType: 'lock',
    show_access_details: 0,
    show_important_note: 1,
    sort_order: 1,
    updatedAt: '3 hours ago',
  },
  {
    id: '2',
    name: 'Password Reset',
    description: 'SMS with password reset instructions',
    category: 'authentication',
    status: 'Active',
    subject: 'Password Reset',
    body: 'Hi {{first_name}}, use this link to reset your password: {{reset_link}}. Link expires in 24 hours.',
    variables: ['first_name', 'reset_link'],
    icon_type: 'lock',
    iconType: 'lock',
    show_access_details: 0,
    show_important_note: 0,
    sort_order: 2,
    updatedAt: '10 hours ago',
  },
  {
    id: '3',
    name: 'Policy Number',
    description: 'Policy document and summary link notification',
    category: 'policy',
    status: 'Active',
    subject: 'Policy Number',
    body: 'Hi {{first_name}}, your policy {{policy_number}} has been issued. View your documents at {{portal_url}}',
    variables: ['first_name', 'policy_number', 'portal_url'],
    icon_type: 'policy',
    iconType: 'policy',
    show_access_details: 0,
    show_important_note: 0,
    sort_order: 3,
    updatedAt: '4 hours ago',
  },
  {
    id: '4',
    name: 'Premium amount',
    description: 'SMS reminder before premium due payments',
    category: 'billing',
    status: 'Active',
    subject: 'Premium amount',
    body: 'Hi {{first_name}}, your premium payment of {{premium_amount}} is due on {{due_date}}. Login to pay: {{portal_url}}',
    variables: ['first_name', 'premium_amount', 'due_date', 'portal_url'],
    icon_type: 'billing',
    iconType: 'billing',
    show_access_details: 0,
    show_important_note: 0,
    sort_order: 4,
    updatedAt: '10 hours ago',
  },
  {
    id: '5',
    name: 'Account management',
    description: 'Welcome SMS when a new agency is onboarded',
    category: 'onboarding',
    status: 'Active',
    subject: 'Welcome – {{agency_name}}',
    body: 'Welcome to {{company_name}}! Your agency {{agency_name}} is ready. Log in at {{portal_url}} with username {{username}}.',
    variables: ['company_name', 'agency_name', 'portal_url', 'username'],
    icon_type: 'agency',
    iconType: 'agency',
    show_access_details: 1,
    show_important_note: 0,
    sort_order: 5,
    updatedAt: '10 hours ago',
  },
  {
    id: '6',
    name: 'Agency User Created',
    description: 'Welcome SMS for new agency users',
    category: 'onboarding',
    status: 'Active',
    subject: 'Account Created – {{agency_name}}',
    body: 'Welcome to {{company_name}}! Your account for {{agency_name}} is ready. Login at {{portal_url}} using {{username}}. Temp password: {{temp_password}}',
    variables: ['company_name', 'agency_name', 'portal_url', 'username', 'temp_password'],
    icon_type: 'user',
    iconType: 'user',
    show_access_details: 1,
    show_important_note: 1,
    sort_order: 6,
    updatedAt: '10 hours ago',
  },
];

export const resolveTemplateIconType = (row) => {
  if (row?.icon_type && row.icon_type !== 'message-square' && row.icon_type !== 'message_square') {
    return row.icon_type;
  }
  const name = (row?.template_name || row?.name || '').toLowerCase();
  const cat = (row?.category || '').toLowerCase();

  if (name.includes('user') || cat.includes('user')) return 'user';
  if (name.includes('agency') || name.includes('carrier') || cat.includes('onboard') || cat.includes('agency')) return 'agency';
  if (name.includes('otp') || name.includes('password') || name.includes('lock') || cat.includes('auth')) return 'lock';
  if (name.includes('billing') || name.includes('premium') || name.includes('invoice') || cat.includes('billing')) return 'billing';
  if (name.includes('receipt') || name.includes('payment')) return 'receipt';
  if (name.includes('policy') || cat.includes('policy')) return 'policy';
  if (name.includes('claim') || name.includes('adjuster') || cat.includes('claim')) return 'claim';
  if (name.includes('alert') || cat.includes('alert')) return 'alert';

  return row?.icon_type || 'user';
};

export const normalizeSmsTemplate = (row) => {
  let variables = [];
  try {
    variables = row.variables
      ? (typeof row.variables === 'string' ? JSON.parse(row.variables) : row.variables)
      : [];
  } catch {
    variables = [];
  }

  const statusMap = { 1: 'Active', 2: 'Draft', 0: 'Inactive' };
  const status = statusMap[row.status] ?? (row.status_label ?? 'Active');
  const updatedAt = row.updated_at
    ? formatRelativeTime(row.updated_at)
    : (row.created_at ? formatRelativeTime(row.created_at) : '–');

  const resolvedIcon = resolveTemplateIconType(row);

  return {
    id: String(row.template_id || row.id || ''),
    name: row.template_name ?? row.name ?? '',
    description: row.description ?? '',
    category: row.category ?? 'general',
    status,
    subject: row.subject ?? row.template_name ?? row.name ?? '',
    body: row.body_html ?? row.body ?? row.content ?? '',
    variables,
    icon_type: resolvedIcon,
    iconType: resolvedIcon,
    show_access_details: row.show_access_details ?? 0,
    show_important_note: row.show_important_note ?? 1,
    sort_order: row.sort_order ?? 0,
    created_by: row.created_by ?? 1,
    created_at: row.created_at,
    updated_at: row.updated_at,
    updatedAt,
  };
};

export const DEFAULT_TEMPLATES = [
  {
    id: '1',
    name: 'Carrier Onboarding',
    description: 'Welcome email for new carriers',
    category: 'onboarding',
    status: 'Active',
    updatedAt: 'Today, 10:30 AM',
    iconType: 'carrier',
    subject: 'Welcome to {{carrier_name}} Portal',
    bodyHtml: `<p>Your carrier <strong>{{carrier_name}}</strong> has been successfully onboarded to our platform. You can now log in to the portal and start managing your operations efficiently.</p><p>If you have any questions, feel free to contact our support team at <a href="mailto:{{support_email}}">{{support_email}}</a>.</p>`,
    showAccessDetails: true,
    showImportantNote: true,
    variables: ['{{first_name}}', '{{carrier_name}}', '{{portal_url}}', '{{username}}', '{{temp_password}}', '{{support_email}}', '{{current_year}}', '{{code}}', '{{otp}}', '{{role}}', '{{carrier_logo}}', '{{support_phone}}', '{{reset_link}}'],
  },
  {
    id: '2',
    name: 'Carrier User Created',
    description: 'Welcome email for new carrier users',
    category: 'onboarding',
    status: 'Active',
    updatedAt: '2 days ago',
    iconType: 'user',
    subject: 'Your Account Has Been Created – {{carrier_name}}',
    bodyHtml: `<p>Welcome! Your account has been successfully created under <strong>{{carrier_name}}</strong>. You can now access the portal and collaborate with your team.</p><p>Please log in using the credentials below and change your temporary password immediately.</p>`,
    showAccessDetails: true,
    showImportantNote: true,
    variables: ['{{first_name}}', '{{carrier_name}}', '{{portal_url}}', '{{username}}', '{{temp_password}}', '{{current_year}}'],
  },
  {
    id: '3',
    name: 'Password Reset',
    description: 'Password reset instructions',
    category: 'authentication',
    status: 'Active',
    updatedAt: '5 days ago',
    iconType: 'lock',
    subject: 'Reset Your Password – Action Required',
    bodyHtml: `<p>We received a request to reset the password for your account. Click the button below to create a new password.</p><p style="text-align: center; margin: 24px 0;"><a href="{{reset_link}}" style="background: #3e60d5; color: white; padding: 12px 28px; border-radius: 6px; text-decoration: none; font-weight: 600; display: inline-block;">Reset My Password</a></p><p>If you did not request a password reset, please ignore this email. This link will expire in <strong>24 hours</strong> for security reasons.</p>`,
    showAccessDetails: false,
    showImportantNote: false,
    variables: ['{{first_name}}', '{{reset_link}}', '{{carrier_name}}', '{{current_year}}'],
  },
];

export const DEFAULT_ACCESS_ROWS = [
  { label: 'Portal URL', variable: '{{portal_url}}' },
  { label: 'Username', variable: '{{username}}' },
  { label: 'Temporary Password', variable: '{{temp_password}}' },
  { label: 'Code', variable: '{{code}}' },
];

export function generateEmailPreviewHtml(template, previewValues, isDark) {
  const replaceVars = (text) => {
    if (!text) return '';
    let result = text;
    Object.entries(previewValues).forEach(([key, val]) => {
      result = result.replace(new RegExp(key.replace(/[{{}]/g, '\\$&'), 'g'), val);
    });
    return result;
  };

  const bodyHtml = replaceVars(template.bodyHtml);
  const carrierName = replaceVars('{{carrier_name}}');
  const currentYear = replaceVars('{{current_year}}');

  // Custom section config (editable by user)
  const accessTitle = template.accessDetailsTitle || 'Your Portal Access Details';
  const accessRows = template.accessDetailsRows || DEFAULT_ACCESS_ROWS;
  const importantText = template.importantNoteText || 'For security reasons, please change your password after your first login.';
  const signoffNote = template.signoffNote || 'If you have any questions, feel free to contact our support team.';

  const bgColor = isDark ? '#1a1f27' : '#f1f4f8';
  const cardBg = isDark ? '#252b36' : '#ffffff';
  const textColor = isDark ? '#e2e8f0' : '#111827';
  const mutedColor = isDark ? '#94a3b8' : '#6b7280';

  const accessRowsHtml = accessRows.map((row) => `
    <tr>
      <td style="padding:5px 0;color:${mutedColor};width:40%;">${row.label}</td>
      <td style="padding:5px 0;color:${mutedColor};">:</td>
      <td style="padding:5px 0 5px 8px;color:${textColor};">${replaceVars(row.variable)}</td>
    </tr>`).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"/></head>
    <body style="margin:0;padding:0;background:${bgColor};font-family:Roboto,Arial,sans-serif;">
      <div style="max-width:560px;margin:0 auto;">
        <!-- Header -->
        <div style="background:#1a2b5a;padding:20px 24px;display:flex;align-items:center;gap:14px;border-radius:8px 8px 0 0;">
          <div style="width:42px;height:42px;background:#3e60d5;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;overflow:hidden;">
            ${template.carrierLogo ? `<img src="${replaceVars(template.carrierLogo)}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:8px;display:block;"/>` : '🛡️'}
          </div>
          <div>
            <div style="color:#ffffff;font-size:15px;font-weight:600;line-height:1.3;">${carrierName}</div>
            <div style="color:rgba(255,255,255,0.55);font-size:11px;margin-top:2px;">Carrier Portal</div>
          </div>
        </div>
        <!-- Body -->
        <div style="background:${cardBg};padding:28px 24px;color:${textColor};">
          <div style="font-size:13px;line-height:1.65;color:${isDark ? '#cbd5e1' : '#374151'};">${bodyHtml}</div>
          ${template.showAccessDetails ? `
          <div style="background:${isDark ? '#0f2a1a' : '#f0fdf4'};border:1px solid ${isDark ? '#166534' : '#86efac'};border-radius:8px;padding:16px;margin:20px 0;">
            <div style="font-size:13px;font-weight:600;color:${isDark ? '#4ade80' : '#15803d'};margin-bottom:10px;">🔒 ${accessTitle}</div>
            <table style="width:100%;border-collapse:collapse;font-size:12px;">${accessRowsHtml}</table>
          </div>` : ''}
          ${template.showImportantNote ? `
          <div style="background:${isDark ? '#0c1a35' : '#eff6ff'};border:1px solid ${isDark ? '#1e40af' : '#93c5fd'};border-radius:8px;padding:14px 16px;margin:12px 0;">
            <div style="font-size:12px;color:${isDark ? '#93c5fd' : '#1d4ed8'};line-height:1.5;">
              ℹ️ <strong>Important</strong><br>${importantText}
            </div>
          </div>` : ''}
          <p style="font-size:13px;color:${mutedColor};margin-top:18px;">${signoffNote}</p>
          <p style="font-size:13px;color:${textColor};margin:14px 0 0;">Best Regards,<br><strong>TruckPlus Support Team</strong></p>
        </div>
        <!-- Footer -->
        <div style="background:${isDark ? '#1a1f27' : '#f8f9fa'};padding:14px 24px;text-align:center;border-top:1px solid ${isDark ? '#2d3748' : '#e5e7eb'};border-radius:0 0 8px 8px;">
          <p style="margin:0 0 6px;font-size:11px;color:${mutedColor};">© ${currentYear} TruckPlus. All rights reserved.</p>
          <div style="font-size:11px;">
            <a href="#" style="color:#3e60d5;text-decoration:none;">Privacy Policy</a>
            <span style="color:${mutedColor};margin:0 5px;">|</span>
            <a href="#" style="color:#3e60d5;text-decoration:none;">Terms of Service</a>
            <span style="color:${mutedColor};margin:0 5px;">|</span>
            <a href="#" style="color:#3e60d5;text-decoration:none;">Contact Us</a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}
