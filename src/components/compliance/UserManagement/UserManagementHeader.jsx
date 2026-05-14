import CommonFilters from "../../../common/CommonFilters";
import CommonPageHeader from "../../../common/CommonPageHeader";
import CommonSummaryCardGroup from "../../../common/CommonSummaryCardGroup";
import { Box, Button } from "@mui/material";

const UserManagementHeader = (props) => {
  const {
    data = [],
    setData,
    searchKey = {},
    summaryCards = [],
    handleClick,
  } = props;

  return (
    <Box sx={{ mb: 2 }}>
      <CommonPageHeader
        title="User Management"
        subtitle="Manage user accounts and permissions"
        rightContent={
          <Button
            sx={{ color: "#FFFFFF", backgroundColor: "#284495" }}
            variant="contained"
            onClick={handleClick}
          >
            Add User
          </Button>
        }
      />
      <Box mt={1}>
        <CommonSummaryCardGroup
          cards={summaryCards}
          showAccentBar={true}
          layout="default"
        />
      </Box>

      <CommonFilters
        data={data}
        setData={setData}
        searchKey={searchKey}
        allowDateClear={true}
        filters={[
          {
            label: "AssetType",
            name: "assetType",
            type: "select",
            options: [
              { label: "Truck", value: "truck" },
              { label: "Trailer", value: "trailer" },
            ],
          },
          {
            label: "All Truck",
          },
          {
            label: "All Carrier",
            name: "carrier",
            type: "select",
            options: [
              { label: "Carrier 1", value: "1" },
              { label: "Carrier 2", value: "2" },
            ],
          },
          {
            label: "All Status",
            name: "status",
            type: "select",
            options: [
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" },
            ],
          },
        ]}
      />
    </Box>
  );
};

export default UserManagementHeader;
