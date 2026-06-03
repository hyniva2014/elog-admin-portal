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
            country: "US",
          },
          contact: {
            name: account.primaryContactName,
            email: account.primaryContactEmail,
            phone: account.primaryContactNumber,
            alternatePhone: "",
          },
          secondaryContact: {
            name: account.secondaryContactName,
            email: account.secondaryContactEmail,
            phone: account.secondaryContactNumber,
            alternatePhone: "",
          },
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
            const payload = {
              company_id: company.company_id,
              companyName: company.companyName,
              dotNumber: company.dotNumber,
              mcNumber: company.mcNumber || null,
              ein: company.ein || null,
              company_code: company.companyName.substring(0, 4).toUpperCase(),
              maxDevices: company.maxDevices,
              website: company.website || null,
              tollFree: company.tollFree || null,
              fax: company.fax || null,
              status_id: "2",
              address: company.address,
              contact: company.contact,
              secondaryContact: company.secondaryContact,
            };

            const updateUrl = `/masteradmin/onboard-company`;
            const updateResponse = await createApi(payload, updateUrl);

            if (
              updateResponse?.statusCode === 200 ||
              updateResponse?.statusCode === 201
            ) {
              handleSnackbar(
                `${company.companyName} account deactivated successfully.`,
                "success",
              );
              fetchData();
            } else {
              handleSnackbar(
                updateResponse?.body?.message ||
                  "Failed to deactivate account.",
                "error",
              );
            }
          }
        } else {
          handleSnackbar(
            "Failed to fetch company details for deactivation.",
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
    [setLoading, fetchApi, createApi, fetchData, handleSnackbar],
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
    handleDeleteAccount,
    fetchContactsDropdown,
    fetchCompaniesDropdown,
    fetchCarrierOptions,
  };
};
