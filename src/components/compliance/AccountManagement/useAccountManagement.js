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
  createApi,
) => {
  const buildFetchUrl = useCallback(() => {
    const queryParams = {
      page,
      limit: pageSize,
      ...(companyId && { company_id: companyId }),
      ...(primaryContactName && { primaryContactName }),
      ...(secondaryContactName && { secondaryContactName }),
      ...(fromDate && { startDate: fromDate.format("YYYY-MM-DD") }),
      ...(toDate && { endDate: toDate.format("YYYY-MM-DD") }),
      ...(search && { search: encodeURIComponent(search) }),
      ...(status && { status_id: status }),
    };

    const params = new URLSearchParams(queryParams);
    return `/masteradmin/get-companies?${params.toString()}`;
  }, [
    companyId,
    primaryContactName,
    secondaryContactName,
    fromDate,
    toDate,
    search,
    status,
    page,
    pageSize,
  ]);

  const fetchData = useCallback(async () => {
    setData((prev) => ({ ...prev, isLoading: true }));

    try {
      const endUrl = buildFetchUrl();
      const response = await fetchApi(endUrl);

      const responseData = response?.body?.data;
      const records = responseData?.data
        ? Array.isArray(responseData.data)
          ? responseData.data
          : [responseData.data]
        : responseData
          ? Array.isArray(responseData)
            ? responseData
            : [responseData]
          : [];
      const total = responseData?.pagination?.total_records ?? records.length;

      const rowData = AccountManagementRowData(records);

      setData((prev) => ({
        ...prev,
        isLoading: false,
        rows: rowData,
        total,
      }));
    } catch (err) {
      console.error("Error fetching companies:", err);
      setData((prev) => ({ ...prev, isLoading: false }));
    }
  }, [
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
    buildFetchUrl,
  ]);

  const handleCreateAccount = useCallback(
    async (account) => {
      setLoading(true);

      try {
        const isUpdate = dialogMode === "edit";

        const address = {
          street: account.carrierAddress || "",
          city: "",
          state: "",
          zip: "",
          country: "US",
        };

        const contact = {
          name: account.primaryContactName || "",
          email: account.primaryContactEmail || "",
          phone: account.primaryContactNumber || "",
          alternatePhone: "",
        };

        const secondary_contact = {
          name: account.secondaryContactName || "",
          email: account.secondaryContactEmail || "",
          phone: account.secondaryContactNumber || "",
          alternatePhone: "",
        };

        const formData = new FormData();
        formData.append("companyName", account.carrierName || "");
        formData.append("dotNumber", account.usdot || "");
        formData.append("mcNumber", account.mcNumber || "");
        formData.append("ein", account.taxId || "");
        formData.append("company_code", (account.carrierName || "").substring(0, 4).toUpperCase());
        formData.append("status_id", account.status || "1");
        formData.append("maxDevices", account.maxDevices || "");
        formData.append("website", account.website || "");
        formData.append("tollFree", account.tollFree || "");
        formData.append("fax", account.fax || "");
        formData.append("is_superadmin", "0");
        formData.append("address", JSON.stringify(address));
        formData.append("contact", JSON.stringify(contact));
        formData.append("secondaryContact", JSON.stringify(secondary_contact));

        if (isUpdate) {
          formData.append("company_id", account.companyId);
        }

        const endUrl = `/masteradmin/onboard-company`;
        const response = await createApi(formData, endUrl);

        if (response?.statusCode === 200 || response?.statusCode === 201) {
          setIsAddAccountOpen(false);
          setDialogMode("add");
          setSelectedCompany(null);
          handleSnackbar(
            response?.body?.message ||
              `${account.carrierName} account ${isUpdate ? "updated" : "added"} successfully.`,
            "success",
          );
          fetchData();
        } else {
          handleSnackbar(
            response?.body?.message ||
              `Failed to ${isUpdate ? "update" : "add"} account.`,
            "error",
          );
        }
      } catch (err) {
        console.error("Error creating/updating account:", err);
        handleSnackbar(
          `Failed to ${dialogMode === "edit" ? "update" : "add"} account. Please try again.`,
          "error",
        );
      } finally {
        setLoading(false);
      }
    },
    [
      dialogMode,
      setLoading,
      handleSnackbar,
      setIsAddAccountOpen,
      setDialogMode,
      setSelectedCompany,
      fetchData,
    ],
  );

  const handleViewAccount = useCallback(
    async (row) => {
      setLoading(true);

      try {
        const endUrl = `/masteradmin/get-companies?company_id=${row.id}`;
        const response = await fetchApi(endUrl);

        if (response?.statusCode === 200 && response?.body?.data) {
          const responseData = response?.body?.data;
          const records = responseData?.data
            ? Array.isArray(responseData.data)
              ? responseData.data
              : [responseData.data]
            : responseData
              ? Array.isArray(responseData)
                ? responseData
                : [responseData]
              : [];
          const company = records[0];

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
        handleSnackbar(
          "Failed to fetch company details. Please try again.",
          "error",
        );
      } finally {
        setLoading(false);
      }
    },
    [
      setLoading,
      setSelectedCompany,
      setDialogMode,
      setIsAddAccountOpen,
      handleSnackbar,
      fetchApi,
    ],
  );

  const handleDeleteAccount = useCallback(
    async (row, reason) => {
      setLoading(true);

      try {
        const payload = {
          company_id: row.id,
          deactivation_reason: reason,
        };

        const response = await createApi(
          payload,
          "/masteradmin/delete-company",
        );

        if (response?.statusCode === 200 || response?.statusCode === 201) {
          handleSnackbar(
            response?.body?.message || "Account deactivated successfully.",
            "success",
          );

          fetchData();
        } else {
          handleSnackbar(
            response?.body?.message || "Failed to deactivate account.",
            "error",
          );
        }
      } catch (err) {
        console.error("Error deactivating account:", err);
        handleSnackbar(
          "Failed to deactivate account. Please try again.",
          "error",
        );
      } finally {
        setLoading(false);
      }
    },
    [setLoading, createApi, fetchData, handleSnackbar],
  );

  const handleToggleStatus = useCallback(
    async ({ row, newStatus, newStatusId, reason }) => {
      setLoading(true);

      try {
        const payload = {
          company_id: row.id,
          company_status: newStatusId,
          reason,
        };

        const response = await createApi(
          payload,
          "/masteradmin/delete-company",
        );

        if (response?.statusCode === 200 || response?.statusCode === 201) {
          handleSnackbar(
            response?.body?.message || `Account ${newStatus.toLowerCase()} successfully.`,
            "success",
          );

          fetchData();
        } else {
          handleSnackbar(
            response?.body?.message || "Failed to update account status.",
            "error",
          );
        }
      } catch (err) {
        console.error("Error updating account status:", err);
        handleSnackbar(
          "Failed to update account status. Please try again.",
          "error",
        );
      } finally {
        setLoading(false);
      }
    },
    [setLoading, createApi, fetchData, handleSnackbar],
  );

  const fetchCompaniesDropdown = useCallback(async () => {
    try {
      const response = await fetchApi("/masteradmin/dropdown/companies");
      const data = response?.body?.data ?? [];

      return data.map(({ company_id, company_name }) => ({
        value: company_id,
        label: company_name,
      }));
    } catch (err) {
      console.error("Error fetching companies dropdown:", err);
      return [];
    }
  }, []);

  const fetchContactsDropdown = useCallback(async () => {
    try {
      const response = await fetchApi("/masteradmin/dropdown/contacts");
      const data = response?.body?.data ?? {};

      const toOption = ({ id, name }) => ({ value: name, label: name });

      return {
        primaryContactOptions: (data.primary_contact ?? []).map(toOption),
        secondaryContactOptions: (data.secondary_contact ?? []).map(toOption),
      };
    } catch (err) {
      console.error("Error fetching contacts dropdown:", err);
      return { primaryContactOptions: [], secondaryContactOptions: [] };
    }
  }, []);

  const fetchCarrierOptions = useCallback(
    async ({ carrier_name, carrier_id } = {}) => {
      const shouldShowLoader = Boolean(carrier_id);

      if (shouldShowLoader) {
        setLoading(true);
      }
      try {
        const params = {
          ...(carrier_name && { carrier_name }),
          ...(carrier_id && { carrier_id }),
        };
        const query = new URLSearchParams(params).toString();
        const response = await fetchApi(
          `/masteradmin/external-fleet/carriers?${query}`,
        );
        const result = response?.body?.carriers ?? null;
        if (carrier_id) return result && !Array.isArray(result) ? result : null;
        return Array.isArray(result) ? result : [];
      } catch (err) {
        console.error("Error fetching carriers:", err);
        return carrier_id ? null : [];
      } finally {
        if (shouldShowLoader) {
          setLoading(false);
        }
      }
    },
    [fetchApi],
  );

  return {
    buildFetchUrl,
    fetchData,
    handleCreateAccount,
    handleViewAccount,
    handleToggleStatus,
    fetchContactsDropdown,
    fetchCompaniesDropdown,
    fetchCarrierOptions,
  };
};
