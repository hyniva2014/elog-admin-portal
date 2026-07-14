import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Box, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useServices } from "../../../services/services";
import { PageContainer } from "../../../common/PageContainer";
import CommonSnackbar from "../../../common/CommonSnackbar";
import CommonPageHeader from "../../../common/CommonPageHeader";
import CommonSearch from "../../../common/CommonSearch";
import CommonDataGrid from "../../../common/CommonDataGrid";
import CommonLoading from "../../../common/CommonLoading";
import { getUsersByRoleApi } from "./useRoleUserManagement";
import { StatusText, SearchWrapper } from "./RoleUserManagement.styles";

const DEFAULT_PAGE_SIZE = 10;

const matchesSearch = (user, query) => {
  if (!query) return true;
  const lower = query.toLowerCase();
  return (
    String(user.userName || "").toLowerCase().includes(lower) ||
    String(user.userId || "").toLowerCase().includes(lower) ||
    String(user.email || "").toLowerCase().includes(lower) ||
    String(user.phone || "").toLowerCase().includes(lower) ||
    String(user.status || "").toLowerCase().includes(lower)
  );
};

const STATUS_COLOR_MAP = {
  Active: "success",
  Inactive: "error",
};

const renderStatusCell = (params) => {
  const status = params.row.status;
  const colorKey = STATUS_COLOR_MAP[status] || "";
  return <StatusText statuscolor={colorKey}>{status || "-"}</StatusText>;
};

const ViewIconButton = ({ userId }) => {
  return (
    <IconButton
      size="small"
      component={Link}
      to={`/platform-users/edit/${userId}`}
    >
      <VisibilityIcon fontSize="small" />
    </IconButton>
  );
};

const RoleUserManagement = () => {
  const [searchParams] = useSearchParams();
  const roleId = searchParams.get("roleId");
  const roleName = searchParams.get("roleName") || "Role";
  const roleIds = searchParams.get("roleIds") || roleId;

  const { fetchApi } = useServices();
  const { setLoading, LoadingContainer } = CommonLoading();

  const [allUsers, setAllUsers] = useState([]);
  const [gridData, setGridData] = useState({
    rows: [],
    total: 0,
    page: 1,
    pageSize: DEFAULT_PAGE_SIZE,
    search: "",
    isLoading: false,
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const handleSnackbarClose = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  const renderActionCell = useCallback((params) => (
    <ViewIconButton userId={params.row.userId} />
  ), []);

  const COLUMNS = useMemo(() => [
    { field: "userId", headerName: "User ID", sortable: true, flex: 1 },
    { field: "userName", headerName: "User Name", sortable: true, flex: 1 },
    { field: "email", headerName: "Email ID", sortable: true, flex: 1 },
    { field: "phone", headerName: "Phone No", sortable: false, flex: 1 },
    { field: "onboardDate", headerName: "Onboard Date", sortable: true, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      sortable: true,
      flex: 1,
      renderCell: renderStatusCell,
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      flex: 1,
      renderCell: renderActionCell,
    },
  ], [renderActionCell]);

  const fetchUsers = useCallback(async () => {
    if (!roleId) return;
    setLoading(true);
    setGridData((prev) => ({ ...prev, isLoading: true }));
    try {
      const result = await getUsersByRoleApi(fetchApi, roleIds);
      setAllUsers(result.users);
      setGridData((prev) => ({
        ...prev,
        rows: result.users,
        total: result.users.length,
        isLoading: false,
      }));
    } catch {
      setSnackbar({
        open: true,
        message: "Failed to fetch users. Please try again.",
        severity: "error",
      });
      setGridData((prev) => ({ ...prev, isLoading: false }));
    } finally {
      setLoading(false);
    }
  }, [fetchApi, roleId, roleIds, setLoading]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredRows = useMemo(
    () => allUsers.filter((u) => matchesSearch(u, gridData.search)),
    [allUsers, gridData.search],
  );

  useEffect(() => {
    setGridData((prev) => ({
      ...prev,
      rows: filteredRows,
      total: filteredRows.length,
      page: 1,
    }));
  }, [filteredRows]);

  return (
    <PageContainer hideFooter>
      <LoadingContainer />
        <CommonPageHeader
          title={roleName}
          subtitle="User details"
          showExport={false}
          rightContent={<Box />}
        />

        <SearchWrapper>
          <CommonSearch
            value={gridData.search}
            setData={setGridData}
            placeholder="Search users..."
            debounceMs={300}
          />
        </SearchWrapper>

        <CommonDataGrid
          columnsData={COLUMNS}
          rowData={gridData.rows}
          data={gridData}
          setData={setGridData}
          getRowHeight={() => "auto"}
          showMuiLoading={false}
        />

      <CommonSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleSnackbarClose}
      />
    </PageContainer>
  );
};

export default RoleUserManagement;