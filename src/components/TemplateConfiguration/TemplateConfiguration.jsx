import { useState } from 'react';
import { Box, Tabs, Tab, Typography, useTheme, alpha } from '@mui/material';
import { LuMail, LuMessageSquare, LuBell } from 'react-icons/lu';
import { PageContainer } from '@src/common/PageContainer';
import EmailTemplates from './EmailTemplates';
import SmsTemplates from './SmsTemplates';
import PushNotificationTemplates from './PushNotificationTemplates';

const TAB_CONFIG = [
  {
    label: 'Email Templates',
    icon: LuMail,
    component: EmailTemplates,
    description: 'Design and manage HTML email templates for all notifications',
  },
  {
    label: 'SMS Templates',
    icon: LuMessageSquare,
    component: SmsTemplates,
    description: 'Configure short message templates for mobile notifications',
  },
  {
    label: 'Push Notification Templates',
    icon: LuBell,
    component: PushNotificationTemplates,
    description: 'Set up push notification templates for in-app and mobile alerts',
  },
];

export default function TemplateConfiguration() {
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const ActiveComponent = TAB_CONFIG[activeTab].component;

  return (
    <PageContainer hideFooter sx={{ p: 0, overflow: 'hidden' }}>
      {/* Page Header */}
      <Box
        sx={{
          px: 3,
          pt: 2,
          pb: 0,
          borderBottom: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
          flexShrink: 0,
        }}
      >
        <Box sx={{ mb: 1.5 }}>
          <Typography variant="h6" fontWeight={700} color="text.primary" lineHeight={1.3}>
            Template Configuration
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Manage email, SMS, and push notification templates for your platform communications
          </Typography>
        </Box>

        <Tabs
          value={activeTab}
          onChange={(_, v) => setActiveTab(v)}
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 500,
              fontSize: 13,
              minHeight: 44,
              py: 0,
              gap: 0.75,
            },
            '& .Mui-selected': {
              fontWeight: 700,
            },
            '& .MuiTabs-indicator': {
              height: 2.5,
              borderRadius: '2px 2px 0 0',
            },
          }}
        >
          {TAB_CONFIG.map(({ label, icon: Icon }, i) => (
            <Tab
              key={label}
              label={label}
              icon={<Icon size={15} />}
              iconPosition="start"
            />
          ))}
        </Tabs>
      </Box>

      {/* Tab Content */}
      <Box sx={{ flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <ActiveComponent />
      </Box>
    </PageContainer>
  );
}
