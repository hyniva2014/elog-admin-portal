import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import dayjs from "dayjs";
import { defaultColumnProps, getStickyColumnProps } from "./Constants";
import {
  StatusText,
  AddressCellText,
  actionIconSx,
} from "./AccountManagement.styled";

const formatDate = (value) => {
  if (!value || value === "-") return "-";
  return dayjs(value).format("MMM DD, YYYY");
};

const renderAddressCell = (params) => (
  <AddressCellText>{params.value}</AddressCellText>
);

const renderDateCell = (params) => formatDate(params.value);

const renderStatusCell = (params) => (
  <StatusText accountStatus={params.value}>{params.value}</StatusText>
);

const renderActionCell = (onViewAccount, onDeleteAccount) => (params) => {
  const isViewDisabled = params.row.status === "Inactive";
  const isDeleteDisabled = params.row.status === "Inactive";

  return (
    <Box display="flex" gap={1}>
      <Tooltip title="View">
        <IconButton size="small" onClick={() => onViewAccount(params.row)}>
          <VisibilityOutlinedIcon sx={actionIconSx} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <span>
          <IconButton
            size="small"
            onClick={() => onDeleteAccount(params.row)}
            disabled={isDeleteDisabled}
          >
            <DeleteOutlineIcon
              sx={{
                ...actionIconSx,
                color: isDeleteDisabled ? "text.disabled" : "#D32F2F",
              }}
            />
          </IconButton>
        </span>
      </Tooltip>
    </Box>
  );
};

export const AccountManagementColumnsData = (
  onViewAccount,
  onDeleteAccount,
) => [
  {
    field: "carrierId",
    headerName: "Carrier ID",
    ...getStickyColumnProps("sticky-col-left-1"),
  },
  {
    field: "carrierName",
    headerName: "Carrier Name",
    ...getStickyColumnProps("sticky-col-left-2"),
  },
  {
    field: "taxId",
    headerName: "Tax ID(EIN)",
    ...defaultColumnProps,
  },
  {
    field: "usdot",
    headerName: "USDOT#",
    ...defaultColumnProps,
  },
  {
    field: "mcNumber",
    headerName: "MC Number",
    ...defaultColumnProps,
  },
  {
    field: "carrierAddress",
    headerName: "Carrier Address",
    ...defaultColumnProps,
    renderCell: renderAddressCell,
  },
  {
    field: "primaryContactName",
    headerName: "Primary Contact Name",
    ...defaultColumnProps,
  },
  {
    field: "primaryContactNumber",
    headerName: "Primary Contact Number",
    ...defaultColumnProps,
  },
  {
    field: "primaryContactEmail",
    headerName: "Primary Contact Email",
    ...defaultColumnProps,
  },
  {
    field: "secondaryContactName",
    headerName: "Secondary Contact Name",
    ...defaultColumnProps,
  },
  {
    field: "secondaryContactNumber",
    headerName: "Secondary Contact Number",
    ...defaultColumnProps,
  },
  {
    field: "secondaryContactEmail",
    headerName: "Secondary Contact Email",
    ...defaultColumnProps,
  },
  // {
  //   field: "website",
  //   headerName: "Website",
  //    ...defaultColumnProps,
  // },
  {
    field: "tollFree",
    headerName: "Toll Free",
    ...defaultColumnProps,
  },
  // {
  //   field: "fax",
  //   headerName: "Fax",
  //   ...defaultColumnProps,
  // },
  {
    field: "maxDevices",
    headerName: "Max Devices",
    ...defaultColumnProps,
  },
  {
    field: "createdOn",
    headerName: "Created On",
    ...defaultColumnProps,
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
    field: "lastSync",
    headerName: "Updated on",
    ...defaultColumnProps,
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
    field: "status",
    headerName: "Status",
    ...defaultColumnProps,
    renderCell: renderStatusCell,
  },
  {
    field: "action",
    headerName: "Action",
    ...defaultColumnProps,
    sortable: false,
    renderCell: renderActionCell(onViewAccount, onDeleteAccount),
  },
];

export const AccountManagementRowData = (response = []) => {
  const companiesArray = Array.isArray(response)
    ? response
    : response
      ? [response]
      : [];

  return companiesArray.map((company) => {
    const {
      company_id,
      companyName,
      ein,
      dotNumber,
      mcNumber,
      website,
      tollFree,
      fax,
      maxDevices,
      createdAt,
      updatedAt,
      statusName,
      address = {},
      contact = {},
      secondaryContact = {},
    } = company;

    const { street } = address;
    const {
      name: primaryContactName,
      phone: primaryContactNumber,
      email: primaryContactEmail,
    } = contact;
    const {
      name: secondaryContactName,
      phone: secondaryContactNumber,
      email: secondaryContactEmail,
    } = secondaryContact || {};

    return {
      id: company_id,
      carrierId: company_id ?? "-",
      carrierName: companyName || "-",
      taxId: ein || "-",
      usdot: dotNumber || "-",
      mcNumber: mcNumber || "-",
      carrierAddress: street || "-",
      primaryContactName: primaryContactName || "-",
      primaryContactNumber: primaryContactNumber || "-",
      primaryContactEmail: primaryContactEmail || "-",
      secondaryContactName: secondaryContactName || "-",
      secondaryContactNumber: secondaryContactNumber || "-",
      secondaryContactEmail: secondaryContactEmail || "-",
      website: website || "-",
      tollFree: tollFree || "-",
      fax: fax || "-",
      maxDevices: maxDevices || "-",
      createdDate: createdAt ? dayjs(createdAt).format("MMM DD, YYYY") : "-",
      createdTime: createdAt ? dayjs(createdAt).format("hh:mm A") : "-",
      updatedDate: updatedAt ? dayjs(updatedAt).format("MMM DD, YYYY") : "-",
      updatedTime: updatedAt ? dayjs(updatedAt).format("hh:mm A") : "-",
      status: statusName || "-",
    };
  });
};
