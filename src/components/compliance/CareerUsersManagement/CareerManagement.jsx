import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserManagementTableData } from "./CommonRowColumnUtils";
import CommonLoading from "../../../common/CommonLoading";
import { PageContainer } from "../../../common/PageContainer";
import { buildSummaryCards } from "../../../common/CommonUtils";
import { defaultPageSize, USER_SUMMARY_CARDS } from "./Constants";
import CommonDataGrid from "../../../common/CommonDataGrid";
import CareerManagementHeader from "./CareerManagementHeader";
import CommonSnackbar from "../../../common/CommonSnackbar";
import CommonConfirmDialog from "../../../common/CommonConfirmDialog";
import { useCareerUsers } from "../../../hooks";
import { usePermissionRefresh } from "../../../hooks/usePermissionRefresh";
import dayjs from "dayjs";
import { useSearchParams, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AccessControl from "../../../common/AccessControl";
import usePermissions from "../../../hooks/usePermissions";
import { useServices } from "../../../services/services";

const CareerManagement = () => {
  const { setLoading, LoadingContainer } = CommonLoading();
  const { getCareerUsers } = useCareerUsers();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const {fetchApi,createApi } = useServices();
  const { refreshPermissions } = usePermissionRefresh();
  const { checkPermission } = usePermissions();
  const loginDetails = useSelector((state) => state.loginSlice.loginDetails || {});
  const companyId = useSelector(
    (state) =>
      state.loginSlice.loginDetails?.body?.data?.userdetails?.company_id,
  );
  const [searchKey, setSearchKey] = useState(0);
  const [searchParams] = useSearchParams();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [summaryCards, setSummaryCards] = useState([]);
  const [deleteRow, setDeleteRow] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const canCreate = checkPermission("Platform Users", "PLATFORM_USER_CREATE");
  const canView = checkPermission("Platform Users", "PLATFORM_USER_VIEW");
  const canViewAll = checkPermission("Platform Users", "PLATFORM_USER_VIEW_ALL");
  const canUpdate = checkPermission("Platform Users", "PLATFORM_USER_UPDATE");
  const canDelete = checkPermission("Platform Users", "PLATFORM_USER_DELETE");

  useEffect(() => {
    refreshPermissions(fetchApi);
  }, [refreshPermissions, fetchApi]);

  const queryFromDate = searchParams.get("fromDate");
  const queryToDate = searchParams.get("endDate");

  const getDefaultFilters = () => {
    const from = queryFromDate ? dayjs(queryFromDate).startOf("day") : null;

    const to = queryToDate ? dayjs(queryToDate).endOf("day") : null;

    return {
      isLoading: false,
      rows: [],
      total: 0,
      page: 1,
      pageSize: defaultPageSize,
      search: "",
      sortModel: [],
      fromDate: from,
      toDate: to,
      user: "",
      status: "",
      vehicle: "",
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
    firstName,
    lastName,
    fromDate,
    toDate,
    user,
    vehicle,
    status,
    isLoading,
  } = data;

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  useEffect(() => {
    fetchUsers();
  }, [
    page,
    pageSize,
    search,
    sortModel,
    user,
    firstName,
    lastName,
    vehicle,
    status,
    fromDate,
    toDate,
  ]);

  useEffect(() => {
    if (location.state?.snackbar) {
      showSnackbar(
        location.state.snackbar.message,
        location.state.snackbar.severity,
      );
      window.history.replaceState({}, "");
    }
  }, [location.state]);

  const fetchUsers = async () => {
    setData((prev) => ({ ...prev, isLoading: true }));

    try {
      const fromDateStr = fromDate ? fromDate.format("YYYY-MM-DD") : "";
      const toDateStr = toDate ? toDate.format("YYYY-MM-DD") : "";
      const response = await getCareerUsers({
        companyId,
        user,
        status,
        fromDate,
        toDate,
        page,
        limit: pageSize,
        search,
      });
      const records = response?.body?.users || [];
      const { UserManagementColumnData, UserManagementRowData } =
        UserManagementTableData(
          records,
          handleOpenEdit,
          handleDeleteClick,
          undefined,
          {
            canUpdate,
            canView,
            canDelete,
          },
        );
      setSummaryCards(buildSummaryCards(response?.body, USER_SUMMARY_CARDS));
      setData((prev) => ({
        ...prev,
        isLoading: false,
        rows: UserManagementRowData,
        columns: UserManagementColumnData,
        total: response?.body?.total_records || UserManagementRowData.length,
      }));
    } catch (err) {
      setData((prev) => ({ ...prev, isLoading: false }));
      showSnackbar("Failed to fetch users", "error");
    }
  };

  const handleOpenEdit = async (row) => {
    navigate(`/platform-users/edit/${row.user_id}`);
  };

  const handleDeleteClick = (row) => {
    setDeleteRow(row);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteRow?.user_id) return;
    setLoading(true);
    try {
      const endUrl = `/masteradmin/user/delete-user?user_id=${deleteRow.user_id}`;
      const response = await createApi({}, endUrl);
      if (response?.statusCode === 200) {
        showSnackbar("User deleted successfully", "success");
        fetchUsers();
      } else {
        showSnackbar("Failed to delete user", "error");
      }
    } catch (error) {
      console.error("Delete error", error);
      showSnackbar("Error deleting user", "error");
    } finally {
      setLoading(false);
      setConfirmOpen(false);
      setDeleteRow(null);
    }
  };

  const handleCancelConfirm = () => {
    setConfirmOpen(false);
    setDeleteRow(null);
  };

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/platform-users/add");
    }, 300);
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const mockcards = { TotalUser: 800, Active: 700, InActive: 100 };

  return (
    <>
      <LoadingContainer />
      <AccessControl hasAccess={canViewAll}>
        <PageContainer>
            <CareerManagementHeader
              data={data}
              setData={setData}
              searchKey={searchKey}
              summaryCards={summaryCards}
              addData={canCreate ? handleClick : undefined}
              canCreate={canCreate}
            />

            <CommonDataGrid
              rowData={rows}
              columnsData={data.columns}
              data={{ ...data, total, isLoading }}
              setData={setData}
              disableRowSelectionOnClick
              getRowHeight={() => "auto"}
              paginationMode="server"
              showMuiLoading={false}
            />

        <CommonConfirmDialog
          open={confirmOpen}
          title="Delete User"
          message={`Are you sure you want to delete ${deleteRow?.username || "this user"}?`}
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={confirmDelete}
          onCancel={handleCancelConfirm}
        />

        <CommonSnackbar
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          onClose={handleSnackbarClose}
        />
      </PageContainer>
    </AccessControl>
    </>
  );
};

export default CareerManagement;
