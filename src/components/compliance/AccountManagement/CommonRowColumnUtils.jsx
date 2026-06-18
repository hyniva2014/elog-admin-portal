import {
  Box,
  IconButton,
  styled,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import groupIcon from "../../../assets/images/svg/Group.png";
import dayjs from "dayjs";

import {
  defaultColumnProps,
  getStickyColumnProps,
  getStatusNameFromId,
  AUDIT_LOG_TITLE,
} from "./Constants";
import { getFormattedDateTime } from "../../../common/CommonUtils";
import { handleOpenStatusChange } from "./utils";
import {
  StatusText,
  AddressCellText,
  actionIconSx,
  TriSwitchTrack,
  TriSwitchThumb,
  TriSwitchZone,
} from "./AccountManagement.styled";
import { ActionIcon, Datefieldstext, Timefieldstext } from "./CommomRowColumnUtils.styled";

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

const renderDateTimeCell = (dateField, timeField) => (params) => {
  const theme = useTheme();
  return (
    <Box>
      <Datefieldstext theme={theme}>{params.row[dateField]}</Datefieldstext>
      <Timefieldstext theme={theme}>{params.row[timeField]}</Timefieldstext>
    </Box>
  );
};

const renderActionCell = (onViewAccount, onToggleClick, onOpenAuditLog, canUpdate, canView) => (params) => {
  const { row } = params;
  const currentStatus = row.status || "Active";
  const theme = useTheme();

  const handleViewClick = () => {
    if (canView) {
      onViewAccount(row);
    }
  };

  const handleStatusClick = () => {
    if (canUpdate) {
      handleOpenStatusChange(row, currentStatus, onToggleClick);
    }
  };

  const handleAuditLogClick = () => {
    onOpenAuditLog(row);
  };

  const tooltipTitle = canUpdate
  ? `${currentStatus} — click to change status`
  : `${currentStatus} — Permission denied`;

  return (
    <Box display="flex" gap={1} alignItems="center">
      <Tooltip title={canView ? "View" : "View - Permission denied"}>
        <IconButton 
          size="small" 
          onClick={handleViewClick}
          disabled={!canView}
          sx={{
            ...actionIconSx,
            color: !canView ? theme.palette.error.main : "inherit",
            opacity: !canView ? 0.5 : 1,
          }}
        >
          <VisibilityOutlinedIcon sx={actionIconSx} />
        </IconButton>
      </Tooltip>
      <Tooltip title={AUDIT_LOG_TITLE}>
        <IconButton 
          size="small" 
          onClick={handleAuditLogClick}
          sx={actionIconSx}
        >
          <ActionIcon
            component="img"
            src={groupIcon}
            alt="Audit Log"
          />
        </IconButton>
      </Tooltip>
      <Tooltip title={tooltipTitle}>
        <TriSwitchTrack 
          status={currentStatus} 
          onClick={handleStatusClick}
          disabled={!canUpdate}
          sx={{
            opacity: !canUpdate ? 0.5 : 1,
          }}
        >
          <TriSwitchThumb 
            status={currentStatus}
            sx={{
              color: !canUpdate ? theme.palette.error.main : "inherit",
            }}
          />
        </TriSwitchTrack>
      </Tooltip>
    </Box>
  );
};

export const AccountManagementColumnsData = (
  onViewAccount,
  onToggleClick,
  onOpenAuditLog,
  canUpdate = true,
  canView = true,
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
    field: "companyCode",
    headerName: "Company Code",
    ...defaultColumnProps,
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
  {
    field: "tollFree",
    headerName: "Toll Free",
    ...defaultColumnProps,
  },
  {
    field: "maxDevices",
    headerName: "Max Devices",
    ...defaultColumnProps,
  },
  {
    field: "createdOn",
    headerName: "Created On",
    ...defaultColumnProps,
    renderCell: renderDateTimeCell("createdDate", "createdTime"),
  },
  {
    field: "lastSync",
    headerName: "Updated on",
    ...defaultColumnProps,
    renderCell: renderDateTimeCell("updatedDate", "updatedTime"),
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
    renderCell: renderActionCell(onViewAccount, onToggleClick, onOpenAuditLog, canUpdate, canView),
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
      company_code,
      dotNumber,
      mcNumber,
      website,
      tollFree,
      fax,
      maxDevices,
      createdAt,
      updatedAt,
      statusName,
      status_id,
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

    const createdInfo = getFormattedDateTime(createdAt);
    const updatedInfo = getFormattedDateTime(updatedAt);

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
      createdDate: createdInfo.date,
      createdTime: createdInfo.time,
      updatedDate: updatedInfo.date,
      updatedTime: updatedInfo.time,
      status: getStatusNameFromId(status_id, statusName),
      statusId: status_id || "1",
      companyCode: company_code || "-",
    };
  });
};
