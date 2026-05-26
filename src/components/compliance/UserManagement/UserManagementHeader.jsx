import CommonFilters from "../../../common/CommonFilters";
import CommonPageHeader from "../../../common/CommonPageHeader";
import CommonSummaryCardGroup from "../../../common/CommonSummaryCardGroup";
import {
  AddUserButton,
  HeaderContainer,
  SummaryCardWrapper,
} from "./UserManagementHeader.styled";
import { getUserManagementFilters } from "./Constants";

const UserManagementHeader = (props) => {
  const {
    data = [],
    setData,
    searchKey = {},
    summaryCards = [],
    handleClick,
    companyOptions = [],
  } = props;
 const filters = getUserManagementFilters(companyOptions);
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
          layout="default"
        />
      </SummaryCardWrapper>

      <CommonFilters
        data={data}
        setData={setData}
        searchKey={searchKey}
        allowDateClear={true}
        filters={filters}
      />
    </HeaderContainer>
  );
};

export default UserManagementHeader;
