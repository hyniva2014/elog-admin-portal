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
    variables: ['{{first_name}}', '{{carrier_name}}', '{{portal_url}}', '{{username}}', '{{temp_password}}', '{{support_email}}', '{{current_year}}'],
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
  { label: 'Portal URL',         variable: '{{portal_url}}' },
  { label: 'Username',           variable: '{{username}}' },
  { label: 'Temporary Password', variable: '{{temp_password}}' },
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

  const bodyHtml       = replaceVars(template.bodyHtml);
  const carrierName     = replaceVars('{{carrier_name}}');
  const currentYear    = replaceVars('{{current_year}}');

  // Custom section config (editable by user)
  const accessTitle    = template.accessDetailsTitle || 'Your Portal Access Details';
  const accessRows     = template.accessDetailsRows  || DEFAULT_ACCESS_ROWS;
  const importantText  = template.importantNoteText  || 'For security reasons, please change your password after your first login.';
  const signoffNote    = template.signoffNote        || 'If you have any questions, feel free to contact our support team.';

  const bgColor    = isDark ? '#1a1f27' : '#f1f4f8';
  const cardBg     = isDark ? '#252b36' : '#ffffff';
  const textColor  = isDark ? '#e2e8f0' : '#111827';
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
