import eyeIcon from "../../src/assets/images/svg/eyeicon.png";
import { IconButton } from "@mui/material";
export const UserManagementColumnData = [
  {
    field: "carrierId",
    headerName: "Carrier ID",
    width: 180,
    minWidth: 150,
    maxWidth: 220,
    headerTooltip: true,
    cellClassName: "sticky-col-left-1",
    headerClassName: "sticky-col-left-1",
  },
  {
    field: "carrierName",
    headerName: "Carrier Name",
    width: 180,
    minWidth: 150,
    maxWidth: 220,
    headerTooltip: true,
    cellClassName: "sticky-col-left-2",
    headerClassName: "sticky-col-left-2",
  },
  {
    field: "userProfile",
    headerName: "User Profile",
    flex: 1,
    minWidth: 150,
    maxWidth: 220,
    headerTooltip: true,
  },
  {
    field: "firstName",
    headerName: "First Name",
    flex: 1,
    minWidth: 180,
    maxWidth: 250,
    headerTooltip: true,
  },
  {
    field: "lastName",
    headerName: "Last Name",
    flex: 1,
    minWidth: 180,
    maxWidth: 250,
    headerTooltip: true,
  },
  {
    field: "primaryContactEmail",
    headerName: "Primary Contact Email",
    minWidth: 180,
    maxWidth: 250,
    flex: 1,
    headerTooltip: true,
    // align: "center",
    // headerAlign: "center",
  },

  {
    field: "status",
    headerName: "Status",
    minWidth: 180,
    maxWidth: 250,
    flex: 1,
    headerTooltip: true,
    renderCell: (params) => (
      <span
        style={{
          color: params.row.statusColor,
          fontWeight: 400,
        }}
      >
        {params.value}
      </span>
    ),
  },
  {
    field: "action",
    headerName: "Action",
    flex: 1,
    minWidth: 100,
    renderCell: () => (
      <IconButton size="small" color="primary">
        <img src={eyeIcon} alt="view" width={16} height={16} />
      </IconButton>
    ),
  },
];
export const UserManagementRowData = [
  {
    id: 1,
    carrierId: 1,
    carrierName: "Swift Transportation",
    userProfile: "Admin",
    firstName: "John",
    lastName: "Doe",
    primaryContactEmail: "john.doe@swift.com",
    status: "Active",
  },
  {
    id: 2,
    carrierId: 2,
    carrierName: "J.B. Hunt",
    userProfile: "Super Admin",
    firstName: "Sarah",
    lastName: "Smith",
    primaryContactEmail: "sarah.smith@jbhunt.com",
    status: "Inactive",
  },
  {
    id: 3,
    carrierId: 3,
    carrierName: "Knight Transportation",
    userProfile: "User",
    firstName: "Michael",
    lastName: "Johnson",
    primaryContactEmail: "michael.johnson@knight.com",
    status: "Active",
  },
  {
    id: 4,
    carrierId: 4,
    carrierName: "Werner Enterprises",
    userProfile: "Admin",
    firstName: "Emily",
    lastName: "Williams",
    primaryContactEmail: "emily.williams@werner.com",
    status: "Active",
  },
  {
    id: 5,
    carrierId: 5,
    carrierName: "Schneider National",
    userProfile: "User",
    firstName: "David",
    lastName: "Brown",
    primaryContactEmail: "david.brown@schneider.com",
    status: "Inactive",
  },
  {
    id: 6,
    carrierId: 6,
    carrierName: "XPO Logistics",
    userProfile: "Super Admin",
    firstName: "Olivia",
    lastName: "Taylor",
    primaryContactEmail: "olivia.taylor@xpo.com",
    status: "Active",
  },
  {
    id: 7,
    carrierId: 7,
    carrierName: "FedEx Freight",
    userProfile: "Admin",
    firstName: "Daniel",
    lastName: "Anderson",
    primaryContactEmail: "daniel.anderson@fedex.com",
    status: "Active",
  },
  {
    id: 8,
    carrierId: 8,
    carrierName: "Old Dominion",
    userProfile: "User",
    firstName: "Sophia",
    lastName: "Thomas",
    primaryContactEmail: "sophia.thomas@odfl.com",
    status: "Inactive",
  },
];
