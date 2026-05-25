import dayjs from "dayjs";
import { StatusTypography, ELogsTypography } from "./DeviceModelManagement.styled";
import DeviceModelManagementActionButton from "./DeviceModelManagementActionButton";

export const formatDate = (value) =>
  value ? dayjs(value).format("MMM DD, YYYY") : "-";

export const getRowHeight = () => "auto";

const StatusCell = (params) => {
  const displayValue = params.row.statusLabel || (params.value === 1 ? "Active" : "Inactive");
  return (
    <StatusTypography variant="body2" value={displayValue}>
      {displayValue}
    </StatusTypography>
  );
};

const ELogsCell = (params) => {
  const displayValue = params.value === 1 || params.value === "Yes" ? "Yes" : "No";
  return (
    <ELogsTypography variant="body2" value={displayValue}>
      {displayValue}
    </ELogsTypography>
  );
};

const ActionCell = (onView) => {
  return (params) => (
    <DeviceModelManagementActionButton row={params.row} onView={onView} />
  );
};

const renderDateCell = (params) => formatDate(params.value);

export const getColumns = (onView) => [
  {
    field: "model",
    headerName: "Model",
    width: 200,
    minWidth: 180,
    maxWidth: 250,
    headerTooltip: true,
    cellClassName: "sticky-col-left-1",
    headerClassName: "sticky-col-left-1",
  },
  {
    field: "assetType",
    headerName: "Asset Type",
    width: 150,
    minWidth: 120,
    maxWidth: 200,
    headerTooltip: true,
    cellClassName: "sticky-col-left-2",
    headerClassName: "sticky-col-left-2",
  },
  {
    field: "description",
    headerName: "Description",
    width: 150,
    minWidth: 120,
    maxWidth: 200,
    headerTooltip: true,
  },
  {
    field: "supportsElogs",
    headerName: "E-Logs",
    width: 100,
    minWidth: 80,
    maxWidth: 150,
    headerTooltip: true,
    renderCell: ELogsCell,
  },
  {
    field: "createdOn",
    headerName: "Created On",
    minWidth: 140,
    maxWidth: 200,
    headerTooltip: true,
    renderCell: renderDateCell,
  },
  {
    field: "updatedOn",
    headerName: "Updated On",
    minWidth: 140,
    maxWidth: 200,
    headerTooltip: true,
    renderCell: renderDateCell,
  },
  {
    field: "statusLabel",
    headerName: "Status",
    minWidth: 120,
    maxWidth: 180,
    headerTooltip: true,
    renderCell: StatusCell,
  },
  {
    field: "action",
    headerName: "Action",
    minWidth: 100,
    maxWidth: 150,
    sortable: false,
    headerTooltip: true,
    renderCell: ActionCell(onView),
  },
];
