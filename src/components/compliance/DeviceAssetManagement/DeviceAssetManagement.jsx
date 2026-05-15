import React, { useCallback, useMemo, useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import dayjs from "dayjs";
import CommonDataGrid from "@src/common/CommonDataGrid";
import { PageContainer } from "../../../common/PageContainer";
import CommonLoading from "../../../common/CommonLoading";
import CommonDialogForm from "../../../common/CommonDialogForm";
import CommonSnackbar from "../../../common/CommonSnackbar";
import DeviceAssetManagementHeader from "./DeviceAssetManagementHeader";
import DeviceAssetManagementForm from "./DeviceAssetManagementForm";
import {
  StatusTypography,
  EditButton,
  CancelEditButton,
} from "./DeviceAssetManagement.styles";
import { actionIconSx, GridContainer } from "../AccountManagement/AccountManagement.styled";

const deviceAssetSeedData = [
  { serialNumber: "SN-ABC12345", deviceModel: "Geotab GO9",     createdOn: "2026-05-05", updatedOn: null,         status: "Active",  },
  { serialNumber: "SN-ABC12346", deviceModel: "Samsara VG34",   createdOn: "2026-05-05", updatedOn: "2026-05-05", status: "Active" },
  { serialNumber: "HSN-ABC12347",deviceModel: "KeepTruckin K5", createdOn: "2026-05-05", updatedOn: "2026-05-05", status: "Active" },
  { serialNumber: "SN-ABC12348", deviceModel: "Omnitracs IVG",  createdOn: "2026-05-05", updatedOn: "2026-05-05", status: "Active" },
  { serialNumber: "SN-ABC12350", deviceModel: "KeepTruckin K5", createdOn: "2026-05-05", updatedOn: "2026-05-05", status: "Active" },
  { serialNumber: "8SN-ABC12351",deviceModel: "VG34",           createdOn: "2026-05-05", updatedOn: "2026-05-05", status: "Active" },
  { serialNumber: "SN-ABC12354", deviceModel: "Samsara VG34",   createdOn: "2026-05-05", updatedOn: "2026-05-05", status: "Active" },
  { serialNumber: "SN-ABC12356", deviceModel: "Geotab GO9",     createdOn: "2026-05-05", updatedOn: "2026-05-05", status: "Active" },
  { serialNumber: "SN-ABC12359", deviceModel: "Omnitracs IVG",  createdOn: "2026-05-05", updatedOn: "2026-05-05", status: "Active" },
  { serialNumber: "SN-ABC12357", deviceModel: "VG34",           createdOn: "2026-05-05", updatedOn: "2026-05-05", status: "Active" },
];

const buildRows = () =>
  deviceAssetSeedData.map((seed, index) => ({ ...seed, id: index + 1 }));

const formatDate = (value) =>
  value ? dayjs(value).format("MM DD YYYY") : "-";

const getOptions = (rows, key) =>
  Array.from(new Set(rows.map((r) => r[key]).filter(Boolean))).map((v) => ({
    value: v,
    label: v,
  }));

const getColumns = (onView) => [
  {
    field: "serialNumber",
    headerName: "Serial Number",
    width: 250,
    minWidth: 200,
    maxWidth: 280,
    headerTooltip: true,
    cellClassName: "sticky-col-left-1",
    headerClassName: "sticky-col-left-1",
  },
  {
    field: "deviceModel",
    headerName: "Device Model",
    width: 180,
    minWidth: 150,
    maxWidth: 220,
    headerTooltip: true,
    cellClassName: "sticky-col-left-2",
    headerClassName: "sticky-col-left-2",
  },
  {
    field: "createdOn",
    headerName: "Created On",
    minWidth: 180,
    maxWidth: 250,
    headerTooltip: true,
    renderCell: (params) => formatDate(params.value),
  },
  {
    field: "updatedOn",
    headerName: "Updated On",
    minWidth: 180,
    maxWidth: 250,
    headerTooltip: true,
    renderCell: (params) => formatDate(params.value),
  },
  {
    field: "status",
    headerName: "Status",
    minWidth: 180,
    maxWidth: 250,
    headerTooltip: true,
    renderCell: (params) => (
      <StatusTypography variant="body2" value={params.value}>
        {params.value}
      </StatusTypography>
    ),
  },
  {
    field: "action",
    headerName: "Action",
    minWidth: 180,
    maxWidth: 250,
    sortable: false,
    headerTooltip: true,
    renderCell: (params) => (
      <Tooltip title="View">
        <IconButton size="small" onClick={() => onView(params.row)}>
          <VisibilityOutlinedIcon sx={actionIconSx} />
        </IconButton>
      </Tooltip>
    ),
  },
];

const DeviceAssetManagement = () => {
  const { LoadingContainer } = CommonLoading();

  const [allRows, setAllRows] = useState(() => buildRows());
  const [data, setData] = useState({
    isLoading: false,
    total: 0,
    page: 1,
    pageSize: 10,
    search: "",
    sortModel: [],
    fromDate: null,
    toDate: null,
    deviceModel: "",
    status: "",
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [defaultValues, setDefaultValues] = useState({ modelName: "", imeiNumber: "" });
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleSnackbar = useCallback((message, severity = "info") => {
    setSnackbar({ open: true, message, severity });
  }, []);

  const handleSnackbarClose = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  const handleClick = useCallback(() => {
    setIsEditMode(false);
    setDefaultValues({ modelName: "", imeiNumber: "" });
    setIsAddModalOpen(true);
  }, []);

  const handleViewClick = useCallback((row) => {
    setIsEditMode(true);
    setIsEditing(false);
    setDefaultValues({ modelName: row.deviceModel, imeiNumber: row.serialNumber });
    setIsAddModalOpen(true);
  }, []);

  const handleEditClick = useCallback(() => setIsEditing(true), []);
  const handleCancelEdit = useCallback(() => setIsEditing(false), []);

  const handleAddSubmit = useCallback(
    (formData) => {
      if (!isEditMode) {
        const today = dayjs().format("YYYY-MM-DD");
        setAllRows((prev) => {
          const nextId = Math.max(...prev.map((r) => r.id)) + 1;
          return [
            {
              id: nextId,
              serialNumber: `SN-NEW${nextId}`,
              deviceModel: formData.modelName || "-",
              createdOn: today,
              updatedOn: null,
              status: "Active",
            },
            ...prev,
          ];
        });
        setData((prev) => ({ ...prev, page: 1 }));
        handleSnackbar("Asset added successfully.", "success");
      }
      setIsAddModalOpen(false);
      setDefaultValues({ modelName: "", imeiNumber: "" });
      setIsEditMode(false);
      setIsEditing(false);
    },
    [isEditMode, handleSnackbar],
  );

  const handleAddCancel = useCallback(() => {
    setIsAddModalOpen(false);
    setDefaultValues({ modelName: "", imeiNumber: "" });
    setIsEditMode(false);
    setIsEditing(false);
  }, []);

  const columns = useMemo(() => getColumns(handleViewClick), [handleViewClick]);

  const filteredRows = useMemo(() => {
    const searchValue = data.search.trim().toLowerCase();
    return allRows.filter((row) => {
      const matchesSearch =
        !searchValue ||
        [row.serialNumber, row.deviceModel, row.status]
          .join(" ")
          .toLowerCase()
          .includes(searchValue);

      const rowDate = dayjs(row.createdOn);
      const matchesDate =
        (!data.fromDate ||
          rowDate.isSame(data.fromDate, "day") ||
          rowDate.isAfter(data.fromDate, "day")) &&
        (!data.toDate ||
          rowDate.isSame(data.toDate, "day") ||
          rowDate.isBefore(data.toDate, "day"));

      return (
        matchesSearch &&
        matchesDate &&
        (!data.deviceModel || row.deviceModel === data.deviceModel) &&
        (!data.status || row.status === data.status)
      );
    });
  }, [allRows, data]);

  const paginatedRows = useMemo(() => {
    const start = (data.page - 1) * data.pageSize;
    return filteredRows.slice(start, start + data.pageSize);
  }, [filteredRows, data.page, data.pageSize]);

  const gridData = {
    ...data,
    rows: paginatedRows,
    columns,
    total: filteredRows.length,
  };

  return (
    <>
      <LoadingContainer />
      <PageContainer>
        <DeviceAssetManagementHeader
          data={gridData}
          setData={setData}
          searchKey={0}
          summaryCards={[]}
          mode=""
          setMode={() => {}}
          handleClick={handleClick}
          modelOptions={getOptions(allRows, "deviceModel")}
          statusOptions={getOptions(allRows, "status")}
        />
        <GridContainer>
          <CommonDataGrid
            columnsData={columns}
            rowData={paginatedRows}
            data={gridData}
            setData={setData}
            paginationMode="server"
            getRowHeight={() => "auto"}
          />
        </GridContainer>
      </PageContainer>

      <CommonSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleSnackbarClose}
      />

      <CommonDialogForm
        open={isAddModalOpen}
        title={isEditMode ? "View Asset" : "Add Asset"}
        mode={isEditMode ? "edit" : "add"}
        formId="addAssetForm"
        onSubmit={handleAddSubmit}
        onCancel={handleAddCancel}
        submitButtonText={isEditMode ? (isEditing ? "Update" : "Save") : "Add Asset"}
        headerActions={
          isEditMode && !isEditing ? (
            <EditButton variant="contained" onClick={handleEditClick}>
              Edit
            </EditButton>
          ) : isEditMode && isEditing ? (
            <CancelEditButton variant="outlined" onClick={handleCancelEdit}>
              Cancel Edit
            </CancelEditButton>
          ) : null
        }
        content={
          <DeviceAssetManagementForm
            formId="addAssetForm"
            defaultValues={defaultValues}
            isEditing={isEditing}
            isEditMode={isEditMode}
            onSubmit={handleAddSubmit}
          />
        }
      />
    </>
  );
};

export default DeviceAssetManagement;
