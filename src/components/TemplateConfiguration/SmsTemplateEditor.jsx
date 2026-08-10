import { useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Typography,
  CircularProgress,
  Button,
} from '@mui/material';
import {
  LuSmartphone,
  LuPlus,
  LuSave,
} from 'react-icons/lu';
import {
  EditorPanel,
  EditorHeaderWrapper,
  EditorContentContainer,
  EditorFieldWrapper,
  EditorInputField,
  EditorBodyLabelRow,
  EditorVariablesContainer,
  EditorVariableChip,
  EditorActionBarWrapper,
  EditorActionBarButton,
} from './SmsTemplates.styles';

const SMS_VARIABLES = [
  '{{first_name}}',
  '{{company_name}}',
  '{{agency_name}}',
  '{{portal_url}}',
  '{{username}}',
  '{{temp_password}}',
  '{{otp_code}}',
  '{{reset_link}}',
  '{{claim_number}}',
  '{{adjuster_name}}',
  '{{policy_number}}',
  '{{renewal_date}}',
  '{{premium_amount}}',
];

const MAX_SMS_CHARS = 160;

export default function SmsTemplateEditor({
  selectedTemplate,
  templateName,
  setTemplateName,
  templateSubject,
  setTemplateSubject,
  body,
  setBody,
  hasChanges,
  setHasChanges,
  isSaving,
  handleSave,
  onCreateClick,
  bodyInputRef,
  subjectInputRef,
  focusFieldRef,
}) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const charCount = (body || '').length;
  const smsCount = Math.ceil(charCount / MAX_SMS_CHARS) || 1;

  const handleInsertVariable = (variable) => {
    if (focusFieldRef?.current === 'subject') {
      const input = subjectInputRef?.current;
      if (input) {
        const start = input.selectionStart ?? templateSubject.length;
        const end = input.selectionEnd ?? templateSubject.length;
        const nextSubject = templateSubject.slice(0, start) + variable + templateSubject.slice(end);
        setTemplateSubject(nextSubject);
        setHasChanges(true);
        setTimeout(() => {
          input.focus();
          input.setSelectionRange(start + variable.length, start + variable.length);
        }, 0);
      } else {
        setTemplateSubject((p) => p + variable);
        setHasChanges(true);
      }
    } else {
      const input = bodyInputRef?.current;
      if (input) {
        const start = input.selectionStart ?? body.length;
        const end = input.selectionEnd ?? body.length;
        const nextBody = body.slice(0, start) + variable + body.slice(end);
        setBody(nextBody);
        setHasChanges(true);
        setTimeout(() => {
          input.focus();
          input.setSelectionRange(start + variable.length, start + variable.length);
        }, 0);
      } else {
        setBody((p) => p + variable);
        setHasChanges(true);
      }
    }
  };

  if (!selectedTemplate) {
    return (
      <EditorPanel sx={{ alignItems: 'center', justifyContent: 'center', p: 4, textAlign: 'center' }}>
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: 3,
            bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(62, 96, 213, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 1.5,
          }}
        >
          <LuSmartphone size={32} color={theme.palette.primary.main} />
        </Box>
        <Typography variant="subtitle1" fontWeight={700} color="text.primary">
          No template selected
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300, my: 1, lineHeight: 1.6 }}>
          Select a template from the list on the left, or create a new one to start editing.
        </Typography>
        <Button
          variant="outlined"
          size="small"
          startIcon={<LuPlus size={14} />}
          onClick={onCreateClick}
          sx={{ borderRadius: 1.5, fontWeight: 600, mt: 1 }}
        >
          Create New Template
        </Button>
      </EditorPanel>
    );
  }

  return (
    <EditorPanel>
      <EditorHeaderWrapper>
        <Typography variant="subtitle1" fontWeight={700} color="text.primary">
          Edit SMS Template
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Editing: {templateName || selectedTemplate.name}
        </Typography>
      </EditorHeaderWrapper>

      <EditorContentContainer>
        <EditorFieldWrapper>
          <Typography variant="caption" fontWeight={600} color="text.secondary" display="block" mb={0.5}>
            Template Name
          </Typography>
          <EditorInputField
            size="small"
            fullWidth
            value={templateName}
            onChange={(e) => {
              setTemplateName(e.target.value);
              setHasChanges(true);
            }}
          />
        </EditorFieldWrapper>

        <EditorFieldWrapper>
          <Typography variant="caption" fontWeight={600} color="text.secondary" display="block" mb={0.5}>
            Subject <span style={{ color: theme.palette.error.main }}>*</span>
          </Typography>
          <EditorInputField
            inputRef={subjectInputRef}
            onFocus={() => {
              if (focusFieldRef) focusFieldRef.current = 'subject';
            }}
            size="small"
            fullWidth
            value={templateSubject}
            onChange={(e) => {
              setTemplateSubject(e.target.value);
              setHasChanges(true);
            }}
          />
        </EditorFieldWrapper>

        <EditorFieldWrapper>
          <EditorBodyLabelRow>
            <Typography variant="caption" fontWeight={600} color="text.secondary">
              SMS Body
            </Typography>
            <Typography variant="caption" color={charCount > MAX_SMS_CHARS ? 'error.main' : 'text.secondary'}>
              {charCount} chars · {smsCount} SMS
            </Typography>
          </EditorBodyLabelRow>
          <EditorInputField
            inputRef={bodyInputRef}
            onFocus={() => {
              if (focusFieldRef) focusFieldRef.current = 'body';
            }}
            multiline
            minRows={5}
            fullWidth
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
              setHasChanges(true);
            }}
            placeholder="Write your SMS content here..."
          />
        </EditorFieldWrapper>

        <EditorFieldWrapper>
          <Typography variant="caption" fontWeight={600} color="text.secondary" display="block" mb={1}>
            Insert Variable
          </Typography>
          <EditorVariablesContainer>
            {SMS_VARIABLES.map((v) => (
              <EditorVariableChip
                key={v}
                label={v}
                size="small"
                clickable
                isDark={isDark}
                onClick={() => handleInsertVariable(v)}
              />
            ))}
          </EditorVariablesContainer>
        </EditorFieldWrapper>
      </EditorContentContainer>

      <EditorActionBarWrapper>
        <EditorActionBarButton
          variant="outlined"
          size="small"
          onClick={() => handleSave(2)}
          disabled={!hasChanges || isSaving}
        >
          Save as Draft
        </EditorActionBarButton>
        <EditorActionBarButton
          variant="contained"
          size="small"
          startIcon={isSaving ? <CircularProgress size={14} color="inherit" /> : <LuSave size={14} />}
          disabled={!hasChanges || isSaving}
          onClick={() => handleSave(1)}
        >
          {isSaving ? 'Saving...' : 'Save Template'}
        </EditorActionBarButton>
      </EditorActionBarWrapper>
    </EditorPanel>
  );
}
