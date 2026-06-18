import dayjs from "dayjs";
import {
  StatusTypography,
  ELogsTypography,
} from "./DeviceModelManagement.styled";
import DeviceModelManagementActionButton from "./DeviceModelManagementActionButton";
import { Box, Typography } from "@mui/material";

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

const ActionCell = ({ row, onView, canView }) => (
  <DeviceModelManagementActionButton row={row} onView={onView} canView={canView} />
);

const createActionCellRenderer = (onView, canView) => (params) => (
  <ActionCell row={params.row} onView={onView} canView={canView} />
);

const renderDateCell = (params) => formatDate(params.value);

export const getColumns = (onView, canView = true) => [
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
    // align: "flexstart",
    // headerAlign: "flexstart",
    // gap :2,
    minWidth: 150,
    headerTooltip: true,
  },
  {
    field: "supportsElogs",
    headerName: "E-Logs",
    flex: 1,
    align: "center",
    headerAlign: "center",
    minWidth: 100,
    headerTooltip: true,
    renderCell: ELogsCell,
  },
  {
    field: "createdOn",
    headerName: "Created On",
    flex: 1,
    align: "center",
    headerAlign: "center",
    minWidth: 140,
    headerTooltip: true,
    renderCell: (params) => (
      <Box>
        <Typography fontSize={14} fontWeight={400}>
          {params.row.createdDate}
        </Typography>
        <Typography fontSize={14} fontWeight={400} color="#6E7079">
          {params.row.createdTime}
        </Typography>
      </Box>
    ),
  },
  {
    field: "updatedOn",
    headerName: "Updated On",
    flex: 1,
    align: "center",
    headerAlign: "center",
    minWidth: 140,
    headerTooltip: true,
    renderCell: (params) => (
      <Box>
        <Typography fontSize={14} fontWeight={400}>
          {params.row.updatedDate}
        </Typography>
        <Typography fontSize={14} fontWeight={400} color="#6E7079">
          {params.row.updatedTime}
        </Typography>
      </Box>
    ),
  },
  {
    field: "statusLabel",
    headerName: "Status",
    flex: 1,
    align: "center",
    headerAlign: "center",
    minWidth: 120,
    headerTooltip: true,
    renderCell: StatusCell,
  },
  {
    field: "action",
    headerName: "Action",
    flex: 1,
    align: "center",
    headerAlign: "center",
    minWidth: 100,
    sortable: false,
    headerTooltip: true,
    renderCell: createActionCellRenderer(onView, canView),
  },
];
