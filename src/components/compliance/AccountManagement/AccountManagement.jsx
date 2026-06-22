import { useCallback, useMemo, useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CommonDataGrid from "@src/common/CommonDataGrid";
import { PageContainer } from "../../../common/PageContainer";
import AccountManagementHeader from "./AccountMangementHeader";
import CommonSnackbar from "../../../common/CommonSnackbar";
import CommonLoading from "../../../common/CommonLoading";
import CommonConfirmDialog from "../../../common/CommonConfirmDialog";
import AccessControl from "../../../common/AccessControl";
import { GridContainer } from "./AccountManagement.styled";
import AddAccountDialog from "./AddAccountDialog";
import StatusSelectDropdown from "./StatusSelectDropdown";
import AuditLogModal from "./AuditLogModal";
import { getStatusChangeMessage } from "./utils";
import { useServices } from "../../../services/services";
import {
  defaultPageSize,
  STATUS_OPTIONS,
  STATUS_TRANSITION_OPTIONS,
  getDefaultTargetStatus,
} from "./Constants";
import { AccountManagementColumnsData } from "./CommonRowColumnUtils";
import { useAccountManagement } from "./useAccountManagement";
import { useLocation } from "react-router-dom";
import { usePermissions } from "../../../hooks/usePermissions";
import { usePermissionRefresh } from "../../../hooks/usePermissionRefresh";

const AccountManagement = () => {
  const location = useLocation();
  const statusId = location.state?.statusId;
  const { fetchApi, createApi } = useServices();
  const { setLoading, LoadingContainer } = CommonLoading();
  const { checkPermission, permissions } = usePermissions();
  const dispatch = useDispatch();
  const loginDetails = useSelector(
    (state) => state.loginSlice.loginDetails || {},
  );

  const canCreate = useMemo(
    () => checkPermission("Account Management", "ACCOUNT_CREATE"),
    [permissions],
  );
  const canUpdate = useMemo(
    () => checkPermission("Account Management", "ACCOUNT_UPDATE"),
    [permissions],
  );
  const canDelete = useMemo(
    () => checkPermission("Account Management", "ACCOUNT_DELETE"),
    [permissions],
  );
  const canView = useMemo(
    () => checkPermission("Account Management", "ACCOUNT_VIEW"),
    [permissions],
  );
  const canViewAll = useMemo(
    () => checkPermission("Account Management", "ACCOUNT_VIEW_ALL"),
    [permissions],
  );

  const { refreshPermissions } = usePermissionRefresh();
  useEffect(() => {
    refreshPermissions(fetchApi);
  }, [refreshPermissions, fetchApi]);

  const [searchKey, setSearchKey] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [isAddAccountOpen, setIsAddAccountOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState("add");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [contactOptions, setContactOptions] = useState({
    primaryContactOptions: [],
    secondaryContactOptions: [],
  });
  const [carrierOptions, setCarrierOptions] = useState([]);
  const [isStatusChangeOpen, setIsStatusChangeOpen] = useState(false);
  const [statusChangeData, setStatusChangeData] = useState(null);
  const [selectedTargetStatus, setSelectedTargetStatus] = useState("");
  const [isAuditLogOpen, setIsAuditLogOpen] = useState(false);
  const [auditLogData, setAuditLogData] = useState({
    rows: [],
    total: 0,
    page: 1,
    pageSize: 20,
    isLoading: false,
  });
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);

  const getDefaultFilters = () => {
    return {
      isLoading: false,
      rows: [],
      total: 0,
      page: 1,
      pageSize: defaultPageSize,
      search: "",
      sortModel: [],
      fromDate: null,
      toDate: null,
      primaryContactName: "",
      secondaryContactName: "",
      // status: "",
      status: statusId || "",
      companyId: "",
    };
  };

  const [data, setData] = useState(getDefaultFilters());

  const {
    rows,
    total,
    page,
    pageSize,
    search,
    sortModel,
    fromDate,
    toDate,
    primaryContactName,
    secondaryContactName,
    status,
    companyId,
    isLoading,
  } = data;

  const handleSnackbar = useCallback((message, severity = "info") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  }, []);

  const handleAddAccount = useCallback(() => {
    setDialogMode("add");
    setSelectedCompany(null);
    setIsAddAccountOpen(true);
  }, []);

  const handleCloseAddAccount = useCallback(() => {
    setIsAddAccountOpen(false);
    setDialogMode("add");
    setSelectedCompany(null);
  }, []);

  const handleSnackbarClose = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  const handleCancelEdit = useCallback(() => {
    setDialogMode("view");
  }, []);

  const handleOpenStatusChange = useCallback((data) => {
    const defaultTarget =
      data.targetStatus || getDefaultTargetStatus(data.currentStatus);
    setStatusChangeData(data);
    setSelectedTargetStatus(defaultTarget);
    setIsStatusChangeOpen(true);
  }, []);

  const handleCloseStatusChange = useCallback(() => {
    setIsStatusChangeOpen(false);
    setStatusChangeData(null);
    setSelectedTargetStatus("");
  }, []);

  const handleTargetStatusChange = useCallback((event) => {
    setSelectedTargetStatus(event.target.value);
  }, []);

  const handleCloseAuditLog = useCallback(() => {
    setIsAuditLogOpen(false);
    setAuditLogData({
      rows: [],
      total: 0,
      page: 1,
      pageSize: 20,
      isLoading: false,
    });
    setSelectedCompanyId(null);
  }, []);

  const {
    buildFetchUrl,
    fetchData,
    handleCreateAccount,
    handleViewAccount,
    handleToggleStatus,
    fetchContactsDropdown,
    fetchCompaniesDropdown,
    fetchCarrierOptions,
    fetchAuditLog,
  } = useAccountManagement(
    companyId,
    primaryContactName,
    secondaryContactName,
    fromDate,
    toDate,
    search,
    status,
    page,
    pageSize,
    setData,
    setLoading,
    handleSnackbar,
    dialogMode,
    setIsAddAccountOpen,
    setDialogMode,
    setSelectedCompany,
    fetchApi,
    createApi,
  );

  const handleOpenAuditLog = useCallback(
    async (row) => {
      setLoading(true);
      setSelectedCompanyId(row.id);
      try {
        const { page, pageSize } = auditLogData;
        const auditData = await fetchAuditLog(row.id, page, pageSize);
        setAuditLogData(auditData);
        setIsAuditLogOpen(true);
      } catch (err) {
        console.error("Error opening audit log:", err);
        setAuditLogData({
          rows: [],
          total: 0,
          page: 1,
          pageSize: 20,
          isLoading: false,
        });
        setIsAuditLogOpen(true);
      } finally {
        setLoading(false);
      }
    },
    [fetchAuditLog, setLoading, auditLogData.page, auditLogData.pageSize],
  );

  useEffect(() => {
    if (isAuditLogOpen && selectedCompanyId) {
      handleOpenAuditLog({ id: selectedCompanyId });
    }
  }, [
    auditLogData.page,
    auditLogData.pageSize,
    isAuditLogOpen,
    selectedCompanyId,
    handleOpenAuditLog,
  ]);

  const handleConfirmStatusChange = useCallback(
    async (dialogReason) => {
      if (!statusChangeData || !selectedTargetStatus) return;

      const statusOptions =
        STATUS_TRANSITION_OPTIONS[statusChangeData.currentStatus] ||
        STATUS_TRANSITION_OPTIONS.Active;
      const selectedOption = statusOptions.find(
        (opt) => opt.value === selectedTargetStatus,
      );
      if (!selectedOption) return;

      if (!dialogReason?.trim()) {
        handleSnackbar("Reason for status change is required.", "error");
        return;
      }

      await handleToggleStatus({
        row: statusChangeData.row,
        newStatus: selectedOption.value,
        newStatusId: selectedOption.statusId,
        reason: dialogReason.trim(),
      });

      handleCloseStatusChange();
    },
    [
      statusChangeData,
      selectedTargetStatus,
      handleToggleStatus,
      handleCloseStatusChange,
      handleSnackbar,
    ],
  );

  const transformCompanyToFormData = useCallback((company) => {
    if (!company) return null;

    const {
      companyName,
      dotNumber,
      ein,
      mcNumber,
      maxDevices,
      website,
      tollFree,
      fax,
      status_id,
      company_id,
      address,
      contact,
      secondaryContact,
    } = company;

    const { street } = address || {};
    const {
      name: primaryContactName,
      phone: primaryContactNumber,
      email: primaryContactEmail,
    } = contact || {};
    const {
      name: secondaryContactName,
      phone: secondaryContactNumber,
      email: secondaryContactEmail,
    } = secondaryContact || {};

    return {
      carrierName: companyName || "",
      usdot: dotNumber || "",
      taxId: ein || "",
      mcNumber: mcNumber || "",
      maxDevices: maxDevices || "",
      website: website || "",
      tollFree: tollFree || "",
      fax: fax || "",
      carrierAddress: street || "",
      primaryContactName: primaryContactName || "",
      primaryContactNumber: primaryContactNumber || "",
      primaryContactEmail: primaryContactEmail || "",
      secondaryContactName: secondaryContactName || "",
      secondaryContactNumber: secondaryContactNumber || "",
      secondaryContactEmail: secondaryContactEmail || "",
      status: String(status_id || 1),
      companyId: company_id,
    };
  }, []);

  const columns = useMemo(
    () =>
      AccountManagementColumnsData(
        handleViewAccount,
        handleOpenStatusChange,
        handleOpenAuditLog,
        canUpdate,
        canView,
      ),
    [
      handleViewAccount,
      handleOpenStatusChange,
      handleOpenAuditLog,
      canUpdate,
      canView,
    ],
  );

  const initialFormData = selectedCompany
    ? transformCompanyToFormData(selectedCompany)
    : null;

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  useEffect(() => {
    fetchContactsDropdown().then(setContactOptions);
  }, [fetchContactsDropdown]);

  useEffect(() => {
    fetchCompaniesDropdown().then(setCarrierOptions);
  }, [fetchCompaniesDropdown]);

  useEffect(() => {
    fetchData();
  }, [
    page,
    pageSize,
    search,
    sortModel,
    primaryContactName,
    secondaryContactName,
    fromDate,
    toDate,
    status,
    companyId,
    fetchData,
  ]);

  const gridData = {
    ...data,
    rows,
    columns,
    total,
    isLoading: false,
  };

  return (
    <PageContainer>
      <LoadingContainer />
      <AccessControl hasAccess={canViewAll}>
        <>
          <AccountManagementHeader
            data={gridData}
            setData={setData}
            searchKey={searchKey}
            handleClick={handleAddAccount}
            canCreate={canCreate}
            primaryContactOptions={contactOptions.primaryContactOptions}
            secondaryContactOptions={contactOptions.secondaryContactOptions}
            carrierOptions={carrierOptions}
            statusOptions={STATUS_OPTIONS}
          />

          <GridContainer>
            <CommonDataGrid
              columnsData={columns}
              rowData={rows}
              data={gridData}
              setData={setData}
              paginationMode="server"
              getRowHeight={() => "auto"}
            />
          </GridContainer>
        </>
      </AccessControl>

      <CommonSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleSnackbarClose}
      />

      <AddAccountDialog
        open={isAddAccountOpen}
        onClose={handleCloseAddAccount}
        onSubmit={handleCreateAccount}
        loading={false}
        mode={dialogMode}
        initialData={initialFormData}
        onCancelEdit={handleCancelEdit}
        fetchCarrierOptions={fetchCarrierOptions}
      />

      <CommonConfirmDialog
        open={isStatusChangeOpen}
        title="Account Status"
        message={
          statusChangeData ? getStatusChangeMessage(statusChangeData.row) : ""
        }
        confirmText="Update Status"
        cancelText="Cancel"
        showReasonField={true}
        reasonLabel="Reason for Status Change"
        onConfirm={handleConfirmStatusChange}
        onCancel={handleCloseStatusChange}
        customContent={
          statusChangeData && (
            <StatusSelectDropdown
              currentStatus={statusChangeData.currentStatus}
              value={selectedTargetStatus}
              onChange={handleTargetStatusChange}
            />
          )
        }
      />

      <AuditLogModal
        open={isAuditLogOpen}
        onClose={handleCloseAuditLog}
        auditData={auditLogData}
        setAuditData={setAuditLogData}
      />
    </PageContainer>
  );
};

export default AccountManagement;
