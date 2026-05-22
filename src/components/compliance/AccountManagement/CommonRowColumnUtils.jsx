import { IconButton, Tooltip } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import dayjs from "dayjs";
import {
  StatusText,
  AddressCellText,
  actionIconSx,
} from "./AccountManagement.styled";

const formatDate = (value) => {
  if (!value || value === "-") return "-";
  return dayjs(value).format("MMM DD, YYYY");
};

export const AccountManagementColumnsData = (onViewAccount) => [
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
    headerName: "Updated on",
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
        <IconButton size="small" onClick={onViewAccount} data-row={params.row}>
          <VisibilityOutlinedIcon sx={actionIconSx} />
        </IconButton>
      </Tooltip>
    ),
  },
];

export const AccountManagementRowData = (response = []) => {
  const companiesArray = Array.isArray(response) ? response : (response ? [response] : []);
  
  return companiesArray.map((company) => {
    const address = company.address || {};
    const contact = company.contact || {};
    const secondaryContact = company.secondaryContact || {};
    
    return {
      id: company.company_id,
      carrierName: company.companyName || "-",
      taxId: company.ein || "-",
      usdot: company.dotNumber || "-",
      mcNumber: company.mcNumber || "-",
      carrierAddress: address.street || "-",
      primaryContactName: contact.name || "-",
      primaryContactNumber: contact.phone || "-",
      primaryContactEmail: contact.email || "-",
      secondaryContactName: secondaryContact.name || "-",
      secondaryContactNumber: secondaryContact.phone || "-",
      secondaryContactEmail: secondaryContact.email || "-",
      website: company.website || "-",
      tollFree: company.tollFree || "-",
      fax: company.fax || "-",
      maxDevices: company.maxDevices || "-",
      createdOn: formatDate(company.createdAt),
      lastSync: formatDate(company.updatedAt),
      status: company.statusName || "-",
    };
  });
};
