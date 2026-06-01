import { useEffect, useState } from "react";
// import { hasPermission } from "./Constants";
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
import dayjs from "dayjs";
import { useSearchParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CommonNoAccess from "../../../common/CommonNoAccess";

const CareerManagement = () => {
  const { setLoading, LoadingContainer } = CommonLoading();
  const { getCareerUsers } = useCareerUsers();
  const navigate = useNavigate();
  const location = useLocation();
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

  const companyId = useSelector(
    (state) =>
      state.loginSlice.loginDetails?.body?.data?.userdetails?.company_id,
  );

  const roleId = useSelector(
    (state) => state.loginSlice.loginDetails?.body?.data?.userdetails?.role_id,
  );

  const userId = useSelector(
    (state) => state.loginSlice.loginDetails?.body?.data?.userdetails?.user_id,
  );

  //   const permissions = useSelector((state) => state.rolePermissions.permissions);
  // const permissions = useSelector(
  //   (state) => state.rolePermissions?.permissions || {},
  // );

  //   const canCreate = hasPermission(
  //     permissions,
  //     "CAREER_USER_MANAGEMENT",
  //     "USER_CREATE",
  //   );

  // const canView = hasPermission(permissions, "CAREER_USER_MANAGEMENT", "USER_VIEW");

  //   const canUpdate = hasPermission(
  //     permissions,
  //     "CAREER_USER_MANAGEMENT",
  //     "USER_UPDATE",
  //   );

  //   const canDelete = hasPermission(
  //     permissions,
  //     "CAREER_USER_MANAGEMENT",
  //     "USER_DELETE",
  //   );

  const canCreate = true;
  const canView = true;
  const canUpdate = true;
  const canDelete = true;

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

  useEffect(() => {
    fetchUsers();
  }, []);

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
    navigate(`/career-users/edit/${row.user_id}`);
  };

  const handleDeleteClick = (row) => {
    setDeleteRow(row);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    // if (!deleteRow?.user_id) return;
    // setLoading(true);
    // try {
    //   const endUrl = `/user/delete-user?user_id=${deleteRow.user_id}`;
    //   const response = await createApi({}, endUrl);
    //   if (response?.statusCode === 200) {
    //     showSnackbar("User deleted successfully", "success");
    //     fetchUsers();
    //   } else {
    //     showSnackbar("Failed to delete user", "error");
    //   }
    // } catch (error) {
    //   console.error("Delete error", error);
    //   showSnackbar("Error deleting user", "error");
    // } finally {
    //   setLoading(false);
    //   setConfirmOpen(false);
    //   setDeleteRow(null);
    // }
  };

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/career-users/add");
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
      <PageContainer>
        {!canView ? (
          <CommonNoAccess />
        ) : (
          <>
            <CareerManagementHeader
              data={data}
              setData={setData}
              searchKey={searchKey}
              summaryCards={summaryCards}
              addData={canCreate ? handleClick : undefined}
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
          </>
        )}

        <CommonConfirmDialog
          open={confirmOpen}
          title="Delete User"
          message={`Are you sure you want to delete ${deleteRow?.username || "this user"}?`}
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={confirmDelete}
          onCancel={() => {
            setConfirmOpen(false);
            setDeleteRow(null);
          }}
        />

        <CommonSnackbar
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        />
      </PageContainer>
    </>
  );
};

export default CareerManagement;
