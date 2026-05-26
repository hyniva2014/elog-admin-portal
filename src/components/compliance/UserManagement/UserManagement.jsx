import { useState, useMemo, useEffect, useCallback } from "react";
import CommonDataGrid from "@src/common/CommonDataGrid";
import UserManagementHeader from "./UserManagementHeader";
import { PageContainer } from "../../../common/PageContainer";
import CommonLoading from "../../../common/CommonLoading";
import { UserManagementColumnData, mapUserToRow } from "./CommonRowColumnUtils";
import UserManagementForm from "./UserManagementForm";
import { USER_SUMMARY_CARDS } from "./Constants";
import { buildSummaryCards } from "../../../common/CommonUtils";
import { useServices } from "../../../services/services";
import CommonSnackbar from "../../../common/CommonSnackbar";
import dayjs from "dayjs";
import { getUsers, getUserDetails, onboardUser } from "./userManagementService";

/** Format ISO date string to DD-MM-YYYY */
const formatDate = (iso) => (iso ? dayjs(iso).format("DD-MM-YYYY") : "-");

const UserManagement = () => {
  const { setLoading, LoadingContainer } = CommonLoading();

  const [data, setData] = useState({
    rows: [],
    total: 0,
    page: 1,
    pageSize: 20,
    search: "",
    company_id: "",
    role_id: "",
    status_id: "",
    fromDate: null,
    toDate: null,
    isLoading: false,
  });
  const {
    page,
    pageSize,
    search,
    company_id,
    role_id,
    status_id,
    fromDate,
    toDate,
    isLoading,
  } = data;

  const [summaryCards, setSummaryCards] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [mode, setMode] = useState("add");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const { fetchApi, createApi } = useServices();

  const handleSnackbarClose = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  const fetchUsers = useCallback(async () => {
    setData((prev) => ({ ...prev, isLoading: true }));
    try {
      const params = {
        page,
        limit: pageSize,
        company_id: company_id || "",
        from_date: fromDate ? dayjs(fromDate).format("YYYY-MM-DD") : "",
        to_date: toDate ? dayjs(toDate).format("YYYY-MM-DD") : "",
        role_id: role_id || "",
        status_id: status_id || "",
        search: search || "",
      };

      const response = await getUsers(fetchApi, params);

      const users = response?.body?.data ?? [];
      const pagination = response?.body?.pagination ?? {};

      setData((prev) => ({
        ...prev,
        rows: users.map(mapUserToRow),
        total: pagination.total_records ?? users.length,
        isLoading: false,
      }));

      // Update summary cards with live counts from the API
      const built = buildSummaryCards(response?.body, USER_SUMMARY_CARDS).map(
        (c) => ({
          ...c,
          icon: c.iconPath ? (
            <img src={c.iconPath} alt={c.title} width={36} height={36} />
          ) : null,
        }),
      );
      setSummaryCards(built);
    } catch {
      setData((prev) => ({ ...prev, isLoading: false }));
      setSnackbar({
        open: true,
        message: "Failed to fetch users.",
        severity: "error",
      });
    }
  }, [
    page,
    pageSize,
    search,
    company_id,
    role_id,
    status_id,
    fromDate,
    toDate,
  ]);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleViewRow = useCallback(
    async (row) => {
      try {
        setFormLoading(true);
        setLoading(true);
        const response = await getUserDetails(fetchApi, row.user_id);

        let user = response?.body?.data;

        if (Array.isArray(user)) {
          user = user.find((item) => item.user_id === row.user_id);
        }

        if (!user) {
          throw new Error("User details not found");
        }

        setSelectedUser(mapUserToRow(user));
        setMode("view");
        setOpenForm(true);
      } catch (error) {
        setSnackbar({
          open: true,
          message: error?.message || "Failed to fetch user details",
          severity: "error",
        });
      } finally {
        setFormLoading(false);
        setLoading(false);
      }
    },
    [fetchApi, setLoading],
  );

  const columnsWithActions = useMemo(
    () =>
      UserManagementColumnData.map((col) =>
        col.field === "action" ? { ...col, onView: handleViewRow } : col,
      ),
    [handleViewRow],
  );

  const handleAddClick = () => {
    setSelectedUser(null);
    setMode("add");
    setOpenForm(true);
  };

  const handleClose = () => {
    setOpenForm(false);
    setSelectedUser(null);
  };

  const handleGetRowHeight = () => "auto";

  const buildFormData = (formValues, isEdit = false) => {
    const formData = new FormData();

    formData.append("user_name", formValues.email || "");
    formData.append("company_id", formValues.company_id || "");
    formData.append("role_id", formValues.role_id || "");
    formData.append("first_name", formValues.firstName || "");
    formData.append("last_name", formValues.lastName || "");
    formData.append("email", formValues.email || "");
    formData.append("status_id", formValues.status_id || "1");

    formData.append("middle_name", "NA");

    formData.append("is_superadmin", "1");

    return formData;
  };

  const handleCreateUser = async (formValues) => {
    try {
      setFormLoading(true);
      setLoading(true);
      const payload = buildFormData(formValues);

      const response = await onboardUser(createApi, payload);

      setSnackbar({
        open: true,
        message:
          response?.body?.message ||
          response?.message ||
          "User created successfully",
        severity: "success",
      });

      await fetchUsers();

      setOpenForm(false);
    } catch (error) {
      setSnackbar({
        open: true,
        message:
          error?.response?.data?.message ||
          error?.message ||
          "Failed to create user",
        severity: "error",
      });
    } finally {
      setFormLoading(false);
      setLoading(false);
    }
  };
  const handleSubmitForm = async (formValues, submitMode = mode) => {
    if (submitMode === "edit" || mode === "view") {
      return handleUpdateUser(formValues);
    }

    return handleCreateUser(formValues);
  };

  const handleUpdateUser = async (formValues) => {
    try {
      setFormLoading(true);
      setLoading(true);

      const payload = buildFormData(formValues, true);

      payload.append("user_id", String(selectedUser?.user_id || ""));

      const response = await onboardUser(createApi, payload);

      setSnackbar({
        open: true,
        message:
          response?.body?.message ||
          response?.message ||
          "User updated successfully",
        severity: "success",
      });

      await fetchUsers();

      setOpenForm(false);
    } catch (error) {
      setSnackbar({
        open: true,
        message:
          error?.response?.data?.message ||
          error?.message ||
          "Failed to update user",
        severity: "error",
      });
    } finally {
      setFormLoading(false);
      setLoading(false);
    }
  };

  return (
    <>
      <LoadingContainer />
      <PageContainer>
        <UserManagementHeader
          data={data}
          setData={setData}
          summaryCards={summaryCards}
          mode={mode}
          setMode={setMode}
          handleClick={handleAddClick}
        />
        <CommonDataGrid
          columnsData={columnsWithActions}
          rowData={data.rows}
          data={data}
          setData={setData}
          paginationMode="server"
          getRowHeight={handleGetRowHeight}
        />
      </PageContainer>

      <UserManagementForm
        open={openForm}
        onClose={handleClose}
        onSubmitForm={handleSubmitForm}
        loading={formLoading}
        mode={mode}
        initialData={selectedUser}
      />

      <CommonSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      />
    </>
  );
};

export default UserManagement;
