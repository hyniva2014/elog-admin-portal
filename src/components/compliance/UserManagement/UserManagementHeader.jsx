import CommonFilters from "../../../common/CommonFilters";
import CommonPageHeader from "../../../common/CommonPageHeader";
import CommonSummaryCardGroup from "../../../common/CommonSummaryCardGroup";
import { AddUserButton, HeaderContainer, SummaryCardWrapper } from "./UserManagementHeader.styled";
import { USER_MANAGEMENT_FILTERS } from "./Constants";

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
      <SummaryCardWrapper>
        <CommonSummaryCardGroup
          cards={summaryCards}
          showAccentBar={true}
        />
      </SummaryCardWrapper>

      <CommonFilters
        data={data}
        setData={setData}
        searchKey={searchKey}
        allowDateClear={true}
        filters={USER_MANAGEMENT_FILTERS}
      />
    </HeaderContainer>
  );
};

export default UserManagementHeader;
