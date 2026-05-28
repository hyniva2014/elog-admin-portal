import dayjs from "dayjs";
import {
  StatusTypography,
  ELogsTypography,
} from "./DeviceModelManagement.styled";
import DeviceModelManagementActionButton from "./DeviceModelManagementActionButton";

export const formatDate = (value) =>
  value ? dayjs(value).format("MMM DD, YYYY") : "-";

export const getRowHeight = () => "auto";

const StatusCellComponent = ({ value, row }) => {
  const displayValue = row.statusLabel || (value === 1 ? "Active" : "Inactive");
  return (
    <StatusTypography variant="body2" value={displayValue}>
      {displayValue}
    </StatusTypography>
  );
};

const ELogsCellComponent = ({ value }) => {
  const displayValue = value === 1 || value === "Yes" ? "Yes" : "No";
  return (
    <ELogsTypography variant="body2" value={displayValue}>
      {displayValue}
    </ELogsTypography>
  );
};

const StatusCell = (params) => (
  <StatusCellComponent value={params.value} row={params.row} />
);
const ELogsCell = (params) => <ELogsCellComponent value={params.value} />;

const ActionCell = ({ row, onView }) => (
  <DeviceModelManagementActionButton row={row} onView={onView} />
);

const createActionCellRenderer = (onView) => (params) => (
  <ActionCell row={params.row} onView={onView} />
);

const renderDateCell = (params) => formatDate(params.value);

export const getColumns = (onView) => [
  {
    field: "model",
    headerName: "Model",
    flex: 1,
    minWidth: 180,
    headerTooltip: true,
    cellClassName: "sticky-col-left-1",
    headerClassName: "sticky-col-left-1",
  },
  {
    field: "modelCode",
    headerName: "Model Code",
    flex: 1,
    minWidth: 180,
    headerTooltip: true,
    cellClassName: "sticky-col-left-2",
    headerClassName: "sticky-col-left-2",
  },
  {
    field: "assetType",
    headerName: "Asset Type",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "description",
    headerName: "Description",
    flex: 1,
    minWidth: 150,
    headerTooltip: true,
  },
  {
    field: "supportsElogs",
    headerName: "E-Logs",
    flex: 1,
    minWidth: 100,
    headerTooltip: true,
    renderCell: ELogsCell,
  },
  {
    field: "createdOn",
    headerName: "Created On",
    flex: 1,
    minWidth: 140,
    headerTooltip: true,
    renderCell: renderDateCell,
  },
  {
    field: "updatedOn",
    headerName: "Updated On",
    flex: 1,
    minWidth: 140,
    headerTooltip: true,
    renderCell: renderDateCell,
  },
  {
    field: "statusLabel",
    headerName: "Status",
    flex: 1,
    minWidth: 120,
    headerTooltip: true,
    renderCell: StatusCell,
  },
  {
    field: "action",
    headerName: "Action",
    minWidth: 100,
    sortable: false,
    headerTooltip: true,
    renderCell: createActionCellRenderer(onView),
  },
];
