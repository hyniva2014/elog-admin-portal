import { useTheme } from '@mui/material/styles';
import {
  Box,
  Typography,
  InputAdornment,
  Tooltip,
  IconButton,
  Button,
  CircularProgress,
} from '@mui/material';
import {
  LuSmartphone,
  LuSun,
  LuMoon,
  LuPhone,
  LuSend,
  LuInfo,
} from 'react-icons/lu';
import {
  PreviewPanel,
  PreviewHeaderWrapper,
  PreviewHeaderTitleRow,
  PreviewHeaderActionsRow,
  PreviewThemeIconButton,
  PreviewSmsToWrapper,
  PreviewSmsField,
  PreviewContentArea,
  PhoneFrame,
  PhoneStatusBar,
  PhoneStatusBarText,
  PhoneMessageThread,
  PhoneMessageSender,
  PhoneBubble,
  PhoneBubbleText,
  PhoneDeliveredText,
} from './SmsTemplates.styles';

export default function SmsTemplatePreview({
  previewPhone,
  setPreviewPhone,
  previewBody,
  isDarkPreview,
  setIsDarkPreview,
  previewDevice = 'mobile',
  previewWidth = 320,
  onSendTestSms,
  isSendingTest = false,
  selectedTemplate,
}) {
  const theme = useTheme();

  return (
    <PreviewPanel sx={{ width: previewWidth }}>
      {/* Header */}
      <PreviewHeaderWrapper>
        <PreviewHeaderTitleRow>
          <LuSmartphone size={16} />
          <Typography variant="subtitle2" fontWeight={700}>
            Live Preview
          </Typography>
          <Tooltip title="This is how your SMS will appear on a mobile device.">
            <IconButton size="small" sx={{ p: 0.25, color: 'text.secondary' }}>
              <LuInfo size={14} />
            </IconButton>
          </Tooltip>
        </PreviewHeaderTitleRow>

        <PreviewHeaderActionsRow>
          <Tooltip title={isDarkPreview ? 'Light preview mode' : 'Dark preview mode'}>
            <PreviewThemeIconButton
              size="small"
              isDarkPreview={isDarkPreview}
              onClick={() => setIsDarkPreview((prev) => !prev)}
            >
              {isDarkPreview ? <LuSun size={13} color="#fff" /> : <LuMoon size={13} />}
            </PreviewThemeIconButton>
          </Tooltip>
        </PreviewHeaderActionsRow>
      </PreviewHeaderWrapper>

      {/* Recipient Phone Input */}
      <PreviewSmsToWrapper>
        <PreviewSmsField
          size="small"
          label="Preview SMS To"
          placeholder="+1 (555) 019-2834"
          value={previewPhone}
          onChange={(e) => setPreviewPhone(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LuPhone size={14} color={theme.palette.text.secondary} />
              </InputAdornment>
            ),
          }}
        />
        {onSendTestSms && (
          <Button
            variant="outlined"
            fullWidth
            size="small"
            startIcon={isSendingTest ? <CircularProgress size={13} color="inherit" /> : <LuSend size={13} />}
            onClick={onSendTestSms}
            disabled={isSendingTest || !selectedTemplate}
            sx={{ mt: 1, borderRadius: 1.5, fontSize: 12, fontWeight: 600 }}
          >
            {isSendingTest ? 'Sending...' : 'Send Test SMS'}
          </Button>
        )}
      </PreviewSmsToWrapper>

      {/* Phone Simulator Canvas */}
      <PreviewContentArea isDarkPreview={isDarkPreview}>
        <PhoneFrame previewDevice={previewDevice}>
          {/* Status Bar */}
          <PhoneStatusBar>
            <PhoneStatusBarText>9:41 AM</PhoneStatusBarText>
            <PhoneStatusBarText>📶 🔋</PhoneStatusBarText>
          </PhoneStatusBar>

          {/* Message Thread */}
          <PhoneMessageThread isDarkPreview={isDarkPreview}>
            <PhoneMessageSender isDarkPreview={isDarkPreview}>
              {previewPhone || 'Acme Insurance'}
            </PhoneMessageSender>
            <PhoneBubble isDarkPreview={isDarkPreview}>
              <PhoneBubbleText isDarkPreview={isDarkPreview}>
                {previewBody || 'Your message preview will appear here.'}
              </PhoneBubbleText>
            </PhoneBubble>
            <PhoneDeliveredText isDarkPreview={isDarkPreview}>
              Delivered
            </PhoneDeliveredText>
          </PhoneMessageThread>
        </PhoneFrame>
      </PreviewContentArea>
    </PreviewPanel>
  );
}
