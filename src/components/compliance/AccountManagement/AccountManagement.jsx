import { useCallback, useMemo, useState, useEffect } from "react";
import CommonDataGrid from "@src/common/CommonDataGrid";
import { PageContainer } from "../../../common/PageContainer";
import AccountManagementHeader from "./AccountMangementHeader";
import CommonSnackbar from "../../../common/CommonSnackbar";
import CommonLoading from "../../../common/CommonLoading";
import CommonConfirmDialog from "../../../common/CommonConfirmDialog";
import { GridContainer } from "./AccountManagement.styled";
import AddAccountDialog from "./AddAccountDialog";
import { useServices } from "../../../services/services";
import { defaultPageSize, STATUS_OPTIONS } from "./Constants";
import { AccountManagementColumnsData } from "./CommonRowColumnUtils";
import { useAccountManagement } from "./useAccountManagement";

const AccountManagement = () => {
  const { fetchApi, createApi } = useServices();
  const { setLoading, LoadingContainer } = CommonLoading();
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
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState(null);

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
      status: "",
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

  const handleEditClick = useCallback(() => {
    setDialogMode("edit");
  }, []);

  const handleCancelEdit = useCallback(() => {
    setDialogMode("view");
  }, []);

  const handleOpenDeleteConfirm = useCallback((company) => {
    setCompanyToDelete(company);
    setIsDeleteConfirmOpen(true);
  }, []);

  const handleCloseDeleteConfirm = useCallback(() => {
    setIsDeleteConfirmOpen(false);
    setCompanyToDelete(null);
  }, []);

  const { buildFetchUrl, fetchData, handleCreateAccount, handleViewAccount, handleDeleteAccount, fetchContactsDropdown, fetchCompaniesDropdown, fetchCarrierOptions } = useAccountManagement(
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
    createApi
  );

  const handleConfirmDelete = useCallback(async () => {
    if (companyToDelete) {
      await handleDeleteAccount(companyToDelete);
      handleCloseDeleteConfirm();
    }
  }, [companyToDelete, handleDeleteAccount, handleCloseDeleteConfirm]);

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
    const { name: primaryContactName, phone: primaryContactNumber, email: primaryContactEmail } = contact || {};
    const { name: secondaryContactName, phone: secondaryContactNumber, email: secondaryContactEmail } = secondaryContact || {};

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
    () => AccountManagementColumnsData(handleViewAccount, handleOpenDeleteConfirm),
    [handleViewAccount, handleOpenDeleteConfirm],
  );

  const initialFormData = selectedCompany ? transformCompanyToFormData(selectedCompany) : null;

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
      <AccountManagementHeader
        data={gridData}
        setData={setData}
        searchKey={searchKey}
        handleClick={handleAddAccount}
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
        onEditClick={handleEditClick}
        onCancelEdit={handleCancelEdit}
        fetchCarrierOptions={fetchCarrierOptions}
      />

      <CommonConfirmDialog
        open={isDeleteConfirmOpen}
        title="Inactive Account"
        message={`Are you sure you want to Inactive ${companyToDelete?.carrierName || ""}?`}
        confirmText="Inactive"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseDeleteConfirm}
      />
    </PageContainer>
  );
};

export default AccountManagement;
