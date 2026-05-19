import CommonFilters from "../../../common/CommonFilters";
import CommonPageHeader from "../../../common/CommonPageHeader";
import CommonSummaryCardGroup from "../../../common/CommonSummaryCardGroup";
import { Box } from "@mui/material";
import { AddUserButton, HeaderContainer } from "./UserManagementHeader.styled";

const UserManagementHeader = (props) => {
  const {
    data = [],
    setData,
    searchKey = {},
    summaryCards = [],
    handleClick,
  } = props;

  return (
    <HeaderContainer>
      <CommonPageHeader
        title="User Management"
        subtitle="Manage user accounts and permissions"
        rightContent={
          <AddUserButton variant="contained" onClick={handleClick}>
            Add User
          </AddUserButton>
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
            label: "User Profile",
            name: "userProfile",
            type: "select",
            options: [
              { label: "Admin", value: "1" },
              { label: "Super Admin", value: "2" },
            ],
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
    </HeaderContainer>
  );
};

export default UserManagementHeader;
