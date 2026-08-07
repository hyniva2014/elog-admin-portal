import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import axios from 'axios';
import { useServices } from '@src/services/services';
import { ELOG_API_GATEWAY_URL } from '@src/services/serviceUtils';
import CommonSnackbar from '@src/common/CommonSnackbar';
import useUnsavedChangesDialog from '../compliance/useUnsavedChangesDialog';
import {
  AppContainer,
  DragHandle,
  DragHandleDotsContainer,
  DragHandleDot,
} from './SmsTemplates.styles';
import SmsTemplatesSidebar from './SmsTemplatesSidebar';
import SmsTemplateEditor from './SmsTemplateEditor';
import SmsTemplatePreview from './SmsTemplatePreview';
import { CreateTemplateDialog } from './CreateTemplateDialog';
import {
  DEFAULT_SMS_TEMPLATES,
  DEFAULT_SMS_PREVIEW_VALUES,
  normalizeSmsTemplate,
} from './emailTemplateData';

function buildSmsPayload(
  mode,
  templateId,
  {
    name,
    category,
    body,
    description,
    subject,
    iconType,
    showAccessDetails,
    showImportantNote,
  },
  status
) {
  const parsedVariables = body ? body.match(/\{\{[a-zA-Z0-9_]+\}\}/g) || [] : [];
  const cleanVariables = [...new Set(parsedVariables)].map((v) => v.replace(/[{}]/g, ''));

  const payload = {
    template_name: name,
    subject: subject ?? name,
    body_html: body ?? '',
    category: category ?? 'general',
    description: description ?? '',
    icon_type: iconType ?? 'message-square',
    show_access_details: showAccessDetails === 1 || showAccessDetails === true ? 1 : 0,
    show_important_note: showImportantNote === 1 || showImportantNote === true ? 1 : 0,
    variables: cleanVariables,
    status: status ?? 1,
    sort_order: 0,
    created_by: localStorage.getItem('user_id') || 1,
  };
  if (templateId) {
    payload.template_id = isNaN(templateId) ? templateId : Number(templateId);
  }
  return payload;
}

export default function SmsTemplates({ setLoading }) {
  const { fetchApi, createApi } = useServices();

  /* ── Data state ── */
  const [templates, setTemplates] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  /* ── Editor state ── */
  const [templateName, setTemplateName] = useState('');
  const [templateSubject, setTemplateSubject] = useState('');
  const [body, setBody] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  /* ── Dialog & UI state ── */
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const bodyInputRef = useRef(null);
  const subjectInputRef = useRef(null);
  const focusFieldRef = useRef(null);

  /* ── Preview states ── */
  const [previewDevice, setPreviewDevice] = useState('mobile');
  const [isDarkPreview, setIsDarkPreview] = useState(false);
  const [previewPhone, setPreviewPhone] = useState('+1 (555) 019-2834');
  const [previewWidth, setPreviewWidth] = useState(320);

  /* ── Drag-resize handle ── */
  const dragRef = useRef({ active: false, startX: 0, startWidth: 0 });
  const previewWidthRef = useRef(previewWidth);
  useEffect(() => {
    previewWidthRef.current = previewWidth;
  }, [previewWidth]);

  const handleResizeMouseDown = useCallback((e) => {
    dragRef.current = {
      active: true,
      startX: e.clientX,
      startWidth: previewWidthRef.current,
    };
    e.preventDefault();
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      if (!dragRef.current.active) return;
      const delta = dragRef.current.startX - e.clientX;
      setPreviewWidth(
        Math.max(260, Math.min(760, dragRef.current.startWidth + delta))
      );
    };
    const onUp = () => {
      dragRef.current.active = false;
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
  }, []);

  const pendingTemplateRef = useRef(null);
  const { handleCancel: triggerUnsavedChanges, UnsavedChangesDialog } =
    useUnsavedChangesDialog(
      () => {
        if (pendingTemplateRef.current === 'CREATE') {
          setCreateDialogOpen(true);
        } else if (pendingTemplateRef.current) {
          setSelectedTemplate(pendingTemplateRef.current);
        }
        pendingTemplateRef.current = null;
      },
      () => {
        pendingTemplateRef.current = null;
      }
    );

  const showSnackbar = (message, severity = 'success') =>
    setSnackbar({ open: true, message, severity });

  useEffect(() => {
    if (setLoading) {
      setLoading(isFetching || isSaving || isCreating || isSendingTest);
    }
  }, [isFetching, isSaving, isCreating, isSendingTest, setLoading]);

  /* ── API helpers ── */
  const fetchTemplates = useCallback(
    async (keepSelection = false) => {
      setIsFetching(true);
      try {
        const response = await fetchApi('/masteradmin/sms-templates', false);
        const raw = response?.body?.data ?? response?.body ?? [];
        const list = Array.isArray(raw) ? raw.map(normalizeSmsTemplate) : [];

        setTemplates(list);

        if (!keepSelection) {
          const first =
            list.find((t) => t.status === 'Active') ?? list[0] ?? null;
          setSelectedTemplate(first);
        }
      } catch (err) {
        console.warn(
          '[SmsTemplates] API unavailable – using seed data.',
          err?.message
        );
        setTemplates(DEFAULT_SMS_TEMPLATES);
        if (!keepSelection) setSelectedTemplate(DEFAULT_SMS_TEMPLATES[0] ?? null);
      } finally {
        setIsFetching(false);
      }
    },
    [fetchApi]
  );

  const handleSave = async (statusValue = 1) => {
    if (!selectedTemplate || isSaving) return;
    setIsSaving(true);
    try {
      const payload = buildSmsPayload(
        'update',
        selectedTemplate.id,
        {
          ...selectedTemplate,
          name: templateName,
          subject: templateSubject,
          body,
        },
        statusValue
      );

      const response = await createApi(
        payload,
        '/masteradmin/sms-templates/update',
        false
      );

      const extractedVars = body
        ? body.match(/\{\{[a-zA-Z0-9_]+\}\}/g) || []
        : [];
      const uniqueVars = [...new Set(extractedVars)].map((v) => v.replace(/[{}]/g, ''));

      const updated = response?.body?.data
        ? normalizeSmsTemplate(response.body.data)
        : {
            ...selectedTemplate,
            name: templateName,
            subject: templateSubject,
            body,
            variables: uniqueVars,
            status: statusValue === 2 ? 'Draft' : 'Active',
            updatedAt: 'Just now',
          };

      setTemplates((prev) =>
        prev.map((t) => (t.id === selectedTemplate.id ? updated : t))
      );
      setSelectedTemplate(updated);
      setHasChanges(false);
      showSnackbar(statusValue === 2 ? 'Saved as draft' : 'Template saved successfully');
    } catch (err) {
      console.error('[SmsTemplates] Save failed', err);
      showSnackbar(
        err?.response?.data?.message ??
          err?.message ??
          'Failed to save template',
        'error'
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleCreateTemplate = async ({
    name,
    category,
    description,
  }) => {
    setIsCreating(true);
    try {
      const payload = buildSmsPayload(
        'create',
        null,
        {
          name,
          category,
          description,
          body: '',
          variables: [],
          subject: name,
          iconType: 'message-square',
          showAccessDetails: 0,
          showImportantNote: 1,
        },
        2 // Draft status
      );

      const response = await createApi(payload, '/masteradmin/sms-templates', false);

      const created = response?.body?.data
        ? normalizeSmsTemplate(response.body.data)
        : {
            id: Date.now().toString(),
            name,
            description,
            category,
            status: 'Draft',
            subject: name,
            body: '',
            variables: [],
            iconType: 'message-square',
            updatedAt: 'Just now',
          };

      setTemplates((prev) => [created, ...prev]);
      setSelectedTemplate(created);
      setCreateDialogOpen(false);
      showSnackbar('Template created successfully');
    } catch (err) {
      console.error('[SmsTemplates] Create failed', err);
      showSnackbar(
        err?.response?.data?.message ??
          err?.message ??
          'Failed to create template',
        'error'
      );
    } finally {
      setIsCreating(false);
    }
  };

  // Initial Load
  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  // Sync state with selected template
  useEffect(() => {
    if (selectedTemplate) {
      setTemplateName(selectedTemplate.name);
      setTemplateSubject(selectedTemplate.subject || selectedTemplate.name || '');
      setBody(selectedTemplate.body || '');
      setHasChanges(false);
      focusFieldRef.current = null;
    }
  }, [selectedTemplate]);

  const handleSelectTemplate = useCallback(
    (tpl) => {
      if (selectedTemplate?.id === tpl.id) return;
      if (hasChanges) {
        pendingTemplateRef.current = tpl;
        triggerUnsavedChanges(true);
      } else {
        setSelectedTemplate(tpl);
      }
    },
    [selectedTemplate, hasChanges, triggerUnsavedChanges]
  );

  const previewBody = useMemo(() => {
    let result = body || '';
    Object.entries(DEFAULT_SMS_PREVIEW_VALUES).forEach(([k, v]) => {
      result = result.replace(new RegExp(`\\{\\{${k}\\}\\}`, 'g'), v);
    });
    return result;
  }, [body]);

  /** Test send without Authorization header */
  const handleSendTestSms = async () => {
    if (!selectedTemplate) return;
    const rawPhone = (previewPhone || '').trim();
    if (!rawPhone) {
      showSnackbar('Please enter a recipient phone number in "Preview SMS To"', 'warning');
      return;
    }

    const digitsWithPlus = rawPhone.replace(/[^\d+]/g, '');
    const mobileNumber = digitsWithPlus.startsWith('+') ? digitsWithPlus : `+1${digitsWithPlus}`;

    setIsSendingTest(true);
    try {
      const extractedVars = (body || '').match(/\{\{([a-zA-Z0-9_-]+)\}\}/g) || [];
      const varKeys = Array.from(new Set(
        extractedVars.map((v) => v.replace(/[{}]/g, '').trim())
      ));

      const variablesPayload = {};
      varKeys.forEach((key) => {
        variablesPayload[key] = DEFAULT_SMS_PREVIEW_VALUES[key] || 'test';
      });

      const payload = {
        mobile_number: mobileNumber,
        template_code: selectedTemplate.name,
        variables: variablesPayload,
      };

      const res = await axios.post(
        `${ELOG_API_GATEWAY_URL}/master/sms-templates/test-send`,
        payload,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );

      if (res?.data?.statusCode >= 400 || res?.data?.status === 'error') {
        throw new Error(res?.data?.body?.message || res?.data?.message || 'Failed to send test SMS');
      }

      showSnackbar('Test SMS sent successfully');
    } catch (err) {
      console.error('[SmsTemplates] Send test SMS failed', err);
      showSnackbar(
        err?.response?.data?.message ??
          err?.message ??
          'Failed to send test SMS',
        'error'
      );
    } finally {
      setIsSendingTest(false);
    }
  };

  return (
    <>
      <AppContainer>
        {/* Left Panel: Sidebar */}
        <SmsTemplatesSidebar
          templates={templates}
          isFetching={isFetching}
          selectedTemplate={selectedTemplate}
          onSelectTemplate={handleSelectTemplate}
          onRefresh={() => fetchTemplates(true)}
          onCreateClick={() => {
            if (hasChanges) {
              pendingTemplateRef.current = 'CREATE';
              triggerUnsavedChanges(true);
            } else {
              setCreateDialogOpen(true);
            }
          }}
        />

        {/* Middle Panel: Editor */}
        <SmsTemplateEditor
          selectedTemplate={selectedTemplate}
          templateName={templateName}
          setTemplateName={setTemplateName}
          templateSubject={templateSubject}
          setTemplateSubject={setTemplateSubject}
          body={body}
          setBody={setBody}
          hasChanges={hasChanges}
          setHasChanges={setHasChanges}
          isSaving={isSaving}
          handleSave={handleSave}
          onCreateClick={() => {
            if (hasChanges) {
              pendingTemplateRef.current = 'CREATE';
              triggerUnsavedChanges(true);
            } else {
              setCreateDialogOpen(true);
            }
          }}
          bodyInputRef={bodyInputRef}
          subjectInputRef={subjectInputRef}
          focusFieldRef={focusFieldRef}
        />

        {/* Drag resize handle */}
        <DragHandle onMouseDown={handleResizeMouseDown}>
          <DragHandleDotsContainer className="grip-dots">
            <DragHandleDot />
            <DragHandleDot />
            <DragHandleDot />
          </DragHandleDotsContainer>
        </DragHandle>

        {/* Right Panel: Preview */}
        <SmsTemplatePreview
          previewPhone={previewPhone}
          setPreviewPhone={setPreviewPhone}
          previewBody={previewBody}
          isDarkPreview={isDarkPreview}
          setIsDarkPreview={setIsDarkPreview}
          previewDevice={previewDevice}
          previewWidth={previewWidth}
          onSendTestSms={handleSendTestSms}
          isSendingTest={isSendingTest}
          selectedTemplate={selectedTemplate}
        />
      </AppContainer>

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
        onCreate={handleCreateTemplate}
        isCreating={isCreating}
        type="sms"
      />
    </>
  );
}
