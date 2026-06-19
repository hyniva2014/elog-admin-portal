import { useEffect, useState, useMemo, useCallback } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CommonDialogForm from "../../../common/CommonDialogForm";
import CommonDataGrid from "../../../common/CommonDataGrid";
import { useServices } from "../../../services/services";
import { getFormattedDateTime } from "../../../common/CommonUtils";
import {
  auditCreatedDateSx,
  auditCreatedTimeSx,
  tableContainerSx,
  backButtonWrapperSx,
  backButtonSx,
} from "./PlatformUserAuditDialog.styled";

const PAGE_SIZE = 10;

const getAuditColumns = (theme) => [
  {
    field: "createdBy",
    headerName: "Created By",
    sortable: false,
    flex: 1,
    minWidth: 150,
  },
  {
    field: "createdDate",
    headerName: "Created On",
    sortable: false,
    flex: 1,
    minWidth: 150,
    renderCell: ({ row }) => (
      <Box>
        <Typography sx={auditCreatedDateSx(theme)}>{row.createdDate}</Typography>
        <Typography sx={auditCreatedTimeSx(theme)}>{row.createdTime}</Typography>
      </Box>
    ),
  },
  {
    field: "notes",
    headerName: "Notes",
    sortable: false,
    flex: 2,
    minWidth: 200,
  },
];

const transformAuditLogs = (logs = []) =>
  logs.map((entry) => {
    const { date, time } = getFormattedDateTime(entry.created_at);
    return {
      id: entry.id,
      createdBy: entry.created_by || "-",
      createdDate: date,
      createdTime: time,
      notes: entry.description || "-",
    };
  });

const GroupDialogContent = ({ userId, onClose }) => {
  const theme = useTheme();
  const { fetchApi } = useServices();
  const columns = getAuditColumns(theme);

  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchAuditLogs = useCallback(
    async (currentPage) => {
      if (!userId) return;
      setIsLoading(true);
      try {
        const endUrl = `/masteradmin/platformUser/audit-logs?page=${currentPage}&limit=${PAGE_SIZE}&platform_user_id=${userId}`;
        const response = await fetchApi(endUrl);
        if (response?.statusCode === 200 && response?.body?.audit_logs) {
          setRows(transformAuditLogs(response.body.audit_logs));
          setTotal(response.body.pagination?.total_records ?? 0);
        } else {
          setRows([]);
          setTotal(0);
        }
      } catch (error) {
        console.error("Error fetching platform user audit logs:", error);
        setRows([]);
      } finally {
        setIsLoading(false);
      }
    },
    [fetchApi, userId],
  );

  useEffect(() => {
    fetchAuditLogs(page);
  }, [fetchAuditLogs, page]);

  const data = useMemo(
    () => ({
      page,
      pageSize: PAGE_SIZE,
      total,
      isLoading,
    }),
    [page, total, isLoading],
  );

  const handleSetData = useCallback((updater) => {
    const next =
      typeof updater === "function"
        ? updater({ page, pageSize: PAGE_SIZE, total, isLoading })
        : updater;
    if (next.page !== undefined && next.page !== page) {
      setPage(next.page);
    }
  }, [page, total, isLoading]);

  return (
    <Box sx={tableContainerSx}>
      <CommonDataGrid
        columnsData={columns}
        rowData={rows}
        data={data}
        setData={handleSetData}
        useAutoHeight
        showMuiLoading={isLoading}
        showColumnSeparator={false}
        disableStickyColumns
        getRowHeight={() => "auto"}
      />
      <Box sx={backButtonWrapperSx}>
        <Button variant="contained" onClick={onClose} sx={backButtonSx}>
          Back
        </Button>
      </Box>
    </Box>
  );
};

const PlatformUserAuditDialog = ({ open, onClose, userId }) => (
  <CommonDialogForm
    open={open}
    title="Platform User Audit History"
    content={
      open ? (
        <GroupDialogContent userId={userId} onClose={onClose} />
      ) : null
    }
    onCancel={onClose}
    onClose={onClose}
    mode="view"
    maxWidth="md"
  />
);

export default PlatformUserAuditDialog;
