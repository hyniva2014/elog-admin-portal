import { useCallback, useMemo, useState, useEffect } from "react";
import CommonDataGrid from "@src/common/CommonDataGrid";
import { PageContainer } from "../../../common/PageContainer";
import AccountManagementHeader from "./AccountMangementHeader";
import CommonSnackbar from "../../../common/CommonSnackbar";
import CommonLoading from "../../../common/CommonLoading";
import { GridContainer } from "./AccountManagement.styled";
import AddAccountDialog from "./AddAccountDialog";
import { useServices } from "../../../services/services";
// import { useFilters } from "../../../common/FilterContext";
import { useSelector } from "react-redux";
import { defaultPageSize } from "../DeviceManagement/Constants";
import {
  AccountManagementColumnsData,
  AccountManagementRowData,
} from "./CommonRowColumnUtils";
import { STATUS_OPTIONS } from "./Constants";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialogMode, setDialogMode] = useState("add");
  const [selectedCompany, setSelectedCompany] = useState(null);

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
    isLoading,
  } = data;

  const companyId = useSelector(
    (state) =>
      state.loginSlice.loginDetails?.body?.data?.userdetails?.company_id,
  );

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

  const fetchData = useCallback(async () => {
    setData((prev) => ({ ...prev, isLoading: true }));

    try {
      const endUrl = `/masteradmin/get-companies?company_id=${companyId}&primaryContactName=${primaryContactName || ""}&secondaryContactName=${secondaryContactName || ""}&startDate=${fromDate ? fromDate.format("YYYY-MM-DD") : ""}&endDate=${toDate ? toDate.format("YYYY-MM-DD") : ""}&search=${encodeURIComponent(search)}&status_id=${status || ""}&page=${page}&limit=${pageSize}`;
      const response = await fetchApi(endUrl);
      
      const rowData = AccountManagementRowData(response?.body?.data || []);

      setData((prev) => ({
        ...prev,
        isLoading: false,
        rows: rowData,
        total: response?.body?.total_records || 0,
      }));
    } catch (err) {
      console.error("Error fetching companies:", err);
      setData((prev) => ({ ...prev, isLoading: false }));
    }
  }, [companyId, primaryContactName, secondaryContactName, fromDate, toDate, search, status, page, pageSize, setData]);

  const handleCreateAccount = useCallback(
    async (account) => {
      setIsSubmitting(true);
      setLoading(true);

      try {
        const isUpdate = dialogMode === "edit";
        const payload = {
          companyName: account.carrierName,
          dotNumber: account.usdot,
          mcNumber: account.mcNumber || null,
          ein: account.taxId || null,
          company_code: account.carrierName.substring(0, 4).toUpperCase(),
          maxDevices: account.maxDevices,
          website: account.website || null,
          tollFree: account.tollFree || null,
          fax: account.fax || null,
          status_id: account.status,
          address: {
            street: account.carrierAddress,
            city: "",
            state: "",
            zip: "",
            country: "US"
          },
          contact: {
            name: account.primaryContactName,
            email: account.primaryContactEmail,
            phone: account.primaryContactNumber,
            alternatePhone: ""
          },
          secondaryContact: {
            name: account.secondaryContactName,
            email: account.secondaryContactEmail,
            phone: account.secondaryContactNumber,
            alternatePhone: ""
          }
        };

        if (isUpdate) {
          payload.company_id = account.companyId;
        }

        const endUrl = `/masteradmin/onboard-company`;
        const response = await createApi(payload, endUrl);

        if (response?.statusCode === 200 || response?.statusCode === 201) {
          setIsAddAccountOpen(false);
          setDialogMode("add");
          setSelectedCompany(null);
          handleSnackbar(response?.body?.message || `${account.carrierName} account ${isUpdate ? "updated" : "added"} successfully.`, "success");
          fetchData();
        } else {
          handleSnackbar(response?.body?.message || `Failed to ${isUpdate ? "update" : "add"} account.`, "error");
        }
      } catch (err) {
        console.error("Error creating/updating account:", err);
        handleSnackbar(`Failed to ${dialogMode === "edit" ? "update" : "add"} account. Please try again.`, "error");
      } finally {
        setIsSubmitting(false);
        setLoading(false);
      }
    },
    [handleSnackbar, fetchData, setLoading, dialogMode],
  );

  const handleViewAccount = useCallback(
    async (event) => {
      const row = event.currentTarget.dataset.row;
      setLoading(true);

      try {
        const endUrl = `/masteradmin/get-companies?company_id=${companyId}`;
        const response = await fetchApi(endUrl);
        
        if (response?.statusCode === 200 && response?.body?.data) {
          const companyData = response?.body?.data;
          const companyArray = Array.isArray(companyData) ? companyData : (companyData ? [companyData] : []);
          const company = companyArray[0];

          if (company) {
            setSelectedCompany(company);
            setDialogMode("view");
            setIsAddAccountOpen(true);
          }
        } else {
          handleSnackbar("Failed to fetch company details.", "error");
        }
      } catch (err) {
        console.error("Error fetching company details:", err);
        handleSnackbar("Failed to fetch company details. Please try again.", "error");
      } finally {
        setLoading(false);
      }
    },
    [companyId, fetchApi, handleSnackbar],
  );

  const handleEditClick = useCallback(() => {
    setDialogMode("edit");
  }, []);

  const handleCancelEdit = useCallback(() => {
    setDialogMode("view");
  }, []);

  const transformCompanyToFormData = useCallback((company) => {
    const address = company.address || {};
    const contact = company.contact || {};
    const secondaryContact = company.secondaryContact || {};

    return {
      carrierName: company.companyName || "",
      usdot: company.dotNumber || "",
      taxId: company.ein || "",
      mcNumber: company.mcNumber || "",
      maxDevices: company.maxDevices || "",
      website: company.website || "",
      tollFree: company.tollFree || "",
      fax: company.fax || "",
      carrierAddress: address.street || "",
      primaryContactName: contact.name || "",
      primaryContactNumber: contact.phone || "",
      primaryContactEmail: contact.email || "",
      secondaryContactName: secondaryContact.name || "",
      secondaryContactNumber: secondaryContact.phone || "",
      secondaryContactEmail: secondaryContact.email || "",
      status: company.status_id || 1,
      companyId: company.company_id,
    };
  }, []);

  const columns = useMemo(
    () => AccountManagementColumnsData(handleViewAccount),
    [handleViewAccount],
  );

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

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
        carrierOptions={[]}
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
          loading={false}
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
        loading={isSubmitting}
        mode={dialogMode}
        initialData={selectedCompany ? transformCompanyToFormData(selectedCompany) : null}
        onEditClick={handleEditClick}
        onCancelEdit={handleCancelEdit}
      />
    </PageContainer>
  );
};

export default AccountManagement;
