import { useEffect, useState, useMemo, useCallback } from "react";
import CommonDialogForm from "../../../common/CommonDialogForm";
import CommonDataGrid from "../../../common/CommonDataGrid";
import { useServices } from "../../../services/services";
import { getFormattedDateTime } from "../../../common/CommonUtils";
import {
  DataGridWrapper,
  ActionBox,
  BackButton,
  CreatedOnWrapper,
  CreatedDateText,
  CreatedTimeText,
} from "./DeviceModelAuditDialog.styled";

const PAGE_SIZE = 10;

const getAuditColumns = () => [
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
      <CreatedOnWrapper>
        <CreatedDateText>{row.createdDate}</CreatedDateText>
        <CreatedTimeText>{row.createdTime}</CreatedTimeText>
      </CreatedOnWrapper>
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

const AUDIT_COLUMNS = getAuditColumns();

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

const AuditDialogContent = ({ deviceModelId, onClose }) => {
  const { fetchApi } = useServices();
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchAuditLogs = useCallback(
    async (currentPage) => {
      if (!deviceModelId) return;
      setIsLoading(true);
      try {
        const endUrl = `/masteradmin/deviceModel/audit-logs?page=${currentPage}&limit=${PAGE_SIZE}&device_model_id=${deviceModelId}`;
        const response = await fetchApi(endUrl);
        if (response?.statusCode === 200 && response?.body?.audit_logs) {
          setRows(transformAuditLogs(response.body.audit_logs));
          setTotal(response.body.pagination?.total_records ?? 0);
        } else {
          setRows([]);
          setTotal(0);
        }
      } catch (error) {
        console.error("Error fetching device model audit logs:", error);
        setRows([]);
      } finally {
        setIsLoading(false);
      }
    },
    [fetchApi, deviceModelId],
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
    <DataGridWrapper>
      <CommonDataGrid
        columnsData={AUDIT_COLUMNS}
        rowData={rows}
        data={data}
        setData={handleSetData}
        useAutoHeight
        showMuiLoading={isLoading}
        showColumnSeparator={false}
        disableStickyColumns
        getRowHeight={() => "auto"}
      />
      <ActionBox>
        <BackButton variant="contained" onClick={onClose}>
          Back
        </BackButton>
      </ActionBox>
    </DataGridWrapper>
  );
};

const DeviceModelAuditDialog = ({ open, onClose, deviceModelId }) => (
  <CommonDialogForm
    open={open}
    title="Device Model Audit History"
    content={
      open ? (
        <AuditDialogContent deviceModelId={deviceModelId} onClose={onClose} />
      ) : null
    }
    onCancel={onClose}
    onClose={onClose}
    mode="view"
    maxWidth="md"
  />
);

export default DeviceModelAuditDialog;
