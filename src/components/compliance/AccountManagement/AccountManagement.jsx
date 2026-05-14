import { useCallback, useMemo, useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import dayjs from "dayjs";
import CommonDataGrid from "@src/common/CommonDataGrid";
import { PageContainer } from "../../../common/PageContainer";
import AccountManagementHeader from "./AccountMangementHeader";
import CommonSnackbar from "../../../common/CommonSnackbar";
import {
  StatusText,
  GridContainer,
  AddressCellText,
  actionIconSx,
} from "./AccountMangemement.styled";
import AddAccountDialog from "./AddAccountDialog";

const accountSeedData = [
  {
    carrierName: "Swift Transportation",
    taxId: "12-3456789",
    usdot: "DOT-12345",
    mcNumber: "MC-67890",
    carrierAddress: "2200 S 75th Ave, Phoenix, AZ 85043",
    primaryContactName: "John Smith",
    primaryContactNumber: "+1 (602) 555-0100",
    primaryContactEmail: "john.smith@swift.com",
    secondaryContactName: "Sarah Johnson",
    secondaryContactNumber: "+1 (602) 555-0100",
    secondaryContactEmail: "sarah@swift.com",
    website: "www.swift.com",
    tollFree: "1-800-SWIFT-1",
    fax: "+1 (602) 555-0101",
    maxDevices: 250,
    createdOn: "2026-05-05",
    lastSync: "2026-05-05",
    status: "Active",
    assetType: "Truck",
    truck: "Truck 101",
  },
];

const buildAccountRows = () =>
  accountSeedData.map((seed, index) => ({
    ...seed,
    id: index + 1,
  }));

const formatDate = (value) => dayjs(value).format("MM DD YYYY");

const getOptions = (rows, key) =>
  Array.from(new Set(rows.map((row) => row[key]).filter(Boolean))).map(
    (value) => ({
      value,
      label: value,
    }),
  );

const getAccountColumns = (onViewAccount) => [
  {
    field: "carrierName",
    headerName: "Carrier Name",
    width: 180,
    minWidth: 120,
    maxWidth: 180,
    headerTooltip: true,
    cellClassName: "sticky-col-left-1",
    headerClassName: "sticky-col-left-1",
  },
  {
    field: "taxId",
    headerName: "Tax ID(EIN)",
    width: 180,
    minWidth: 150,
    maxWidth: 220,
    headerTooltip: true,
    cellClassName: "sticky-col-left-2",
    headerClassName: "sticky-col-left-2",
  },
  {
    field: "usdot",
    headerName: "USDOT#",
    minWidth: 180,
    maxWidth: 250,
    headerTooltip: true,
  },
  {
    field: "mcNumber",
    headerName: "MC Number",
    minWidth: 180,
    maxWidth: 250,
    headerTooltip: true,
  },
  {
    field: "carrierAddress",
    headerName: "Carrier Address",
    minWidth: 180,
    maxWidth: 250,
    headerTooltip: true,
    renderCell: (params) => <AddressCellText>{params.value}</AddressCellText>,
  },
  {
    field: "primaryContactName",
    headerName: "Primary Contact Name",
    minWidth: 180,
    maxWidth: 250,
    headerTooltip: true,
  },
  {
    field: "primaryContactNumber",
    headerName: "Primary Contact Number",
    minWidth: 180,
    maxWidth: 250,
    headerTooltip: true,
  },
  {
    field: "primaryContactEmail",
    headerName: "Primary Contact Email",
    minWidth: 180,
    maxWidth: 250,
    headerTooltip: true,
  },
  {
    field: "secondaryContactName",
    headerName: "Secondary Contact Name",
    minWidth: 180,
    maxWidth: 250,
    headerTooltip: true,
  },
  {
    field: "secondaryContactNumber",
    headerName: "Secondary Contact Number",
    minWidth: 180,
    maxWidth: 250,
    headerTooltip: true,
  },
  {
    field: "secondaryContactEmail",
    headerName: "Secondary Contact Email",
    minWidth: 180,
    maxWidth: 250,
    headerTooltip: true,
  },
  {
    field: "website",
    headerName: "Website",
    minWidth: 180,
    maxWidth: 250,
    headerTooltip: true,
  },
  {
    field: "tollFree",
    headerName: "Toll Free",
    minWidth: 180,
    maxWidth: 250,
    headerTooltip: true,
  },
  {
    field: "fax",
    headerName: "Fax",
    minWidth: 180,
    maxWidth: 250,
    headerTooltip: true,
  },
  {
    field: "maxDevices",
    headerName: "Max Devices",
    minWidth: 180,
    maxWidth: 250,
    headerTooltip: true,
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
    field: "lastSync",
    headerName: "Last Sync",
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
      <StatusText accountStatus={params.value}>{params.value}</StatusText>
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
        <IconButton size="small" onClick={() => onViewAccount(params.row)}>
          <VisibilityOutlinedIcon sx={actionIconSx} />
        </IconButton>
      </Tooltip>
    ),
  },
];

const AccountManagement = () => {
  const [data, setData] = useState({
    isLoading: false,
    rows: [],
    columns: [],
    total: 0,
    page: 1,
    pageSize: 10,
    search: "",
    sortModel: [],
    fromDate: null,
    toDate: null,
    assetType: "",
    truck: "",
    carrier: "",
    status: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [isAddAccountOpen, setIsAddAccountOpen] = useState(false);

  const [allAccounts, setAllAccounts] = useState(() => buildAccountRows());

  const handleSnackbar = useCallback((message, severity = "info") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  }, []);

  const handleAddAccount = useCallback(() => {
    setIsAddAccountOpen(true);
  }, []);

  const handleCloseAddAccount = useCallback(() => {
    setIsAddAccountOpen(false);
  }, []);

  const handleCreateAccount = useCallback(
    (account) => {
      const today = dayjs().format("YYYY-MM-DD");

      setAllAccounts((prev) => {
        const nextId = Math.max(...prev.map((row) => row.id)) + 1;

        return [
          {
            ...account,
            id: nextId,
            carrierAddress: "-",
            createdOn: today,
            lastSync: today,
            status: "Active",
            assetType: "Truck",
            truck: `Truck ${nextId}`,
          },
          ...prev,
        ];
      });

      setData((prev) => ({
        ...prev,
        page: 1,
      }));
      setIsAddAccountOpen(false);
      handleSnackbar(`${account.carrierName} account added.`, "success");
    },
    [handleSnackbar],
  );

  const handleViewAccount = useCallback(
    (row) => {
      handleSnackbar(`${row.carrierName} account selected.`);
    },
    [handleSnackbar],
  );

  const columns = useMemo(
    () => getAccountColumns(handleViewAccount),
    [handleViewAccount],
  );

  const filteredRows = useMemo(() => {
    const searchValue = data.search.trim().toLowerCase();

    return allAccounts.filter((account) => {
      const matchesSearch =
        !searchValue ||
        [
          account.carrierName,
          account.usdot,
          account.carrierAddress,
          account.primaryContactName,
          account.primaryContactNumber,
          account.primaryContactEmail,
          account.secondaryContactName,
          account.secondaryContactNumber,
          account.secondaryContactEmail,
          account.status,
        ]
          .join(" ")
          .toLowerCase()
          .includes(searchValue);

      const accountDate = dayjs(account.createdOn);
      const matchesDate =
        (!data.fromDate ||
          accountDate.isSame(data.fromDate, "day") ||
          accountDate.isAfter(data.fromDate, "day")) &&
        (!data.toDate ||
          accountDate.isSame(data.toDate, "day") ||
          accountDate.isBefore(data.toDate, "day"));

      return (
        matchesSearch &&
        matchesDate &&
        (!data.assetType || account.assetType === data.assetType) &&
        (!data.truck || account.truck === data.truck) &&
        (!data.carrier || account.carrierName === data.carrier) &&
        (!data.status || account.status === data.status)
      );
    });
  }, [allAccounts, data]);

  const paginatedRows = useMemo(() => {
    const startIndex = (data.page - 1) * data.pageSize;
    return filteredRows.slice(startIndex, startIndex + data.pageSize);
  }, [filteredRows, data.page, data.pageSize]);

  const gridData = {
    ...data,
    rows: paginatedRows,
    columns,
    total: filteredRows.length,
  };

  return (
    <PageContainer>
      <AccountManagementHeader
        data={gridData}
        setData={setData}
        searchKey={0}
        handleClick={handleAddAccount}
        assetTypeOptions={getOptions(allAccounts, "assetType")}
        truckOptions={getOptions(allAccounts, "truck")}
        carrierOptions={getOptions(allAccounts, "carrierName")}
        statusOptions={getOptions(allAccounts, "status")}
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

      <CommonSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      />

      <AddAccountDialog
        open={isAddAccountOpen}
        onClose={handleCloseAddAccount}
        onSubmit={handleCreateAccount}
      />
    </PageContainer>
  );
};

export default AccountManagement;
