import CommonFilters from "../../../common/CommonFilters";
import CommonPageHeader from "../../../common/CommonPageHeader";
import CommonSummaryCardGroup from "../../../common/CommonSummaryCardGroup";
import {
  AddUserButton,
  HeaderContainer,
  SummaryCardWrapper,
} from "./UserManagementHeader.styled";
import { getUserManagementFilters } from "./userManagementFilters";

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
        title="Carrier Users"
        subtitle="Manage career users, view details and activity history"
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
