import { useCallback } from "react";
import { AccountManagementRowData } from "./CommonRowColumnUtils";

export const useAccountManagement = (
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
) => {
  const buildFetchUrl = useCallback(() => {
    const params = new URLSearchParams({
      company_id: companyId,
      primaryContactName: primaryContactName || "",
      secondaryContactName: secondaryContactName || "",
      startDate: fromDate ? fromDate.format("YYYY-MM-DD") : "",
      endDate: toDate ? toDate.format("YYYY-MM-DD") : "",
      search: encodeURIComponent(search),
      status_id: status || "",
      page,
      limit: pageSize,
    });
    return `/masteradmin/get-companies?${params.toString()}`;
  }, [companyId, primaryContactName, secondaryContactName, fromDate, toDate, search, status, page, pageSize]);

  const fetchData = useCallback(async () => {
    setData((prev) => ({ ...prev, isLoading: true }));

    try {
      const endUrl = buildFetchUrl();
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
  }, [companyId, primaryContactName, secondaryContactName, fromDate, toDate, search, status, page, pageSize, setData, buildFetchUrl]);

  const handleCreateAccount = useCallback(
    async (account) => {
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
        setLoading(false);
      }
    },
    [dialogMode, setLoading, handleSnackbar, setIsAddAccountOpen, setDialogMode, setSelectedCompany, fetchData]
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
    [companyId, setLoading, setSelectedCompany, setDialogMode, setIsAddAccountOpen, handleSnackbar]
  );

  return {
    buildFetchUrl,
    fetchData,
    handleCreateAccount,
    handleViewAccount,
  };
};
