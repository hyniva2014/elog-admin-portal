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
    onSummaryCardClick,
    handleClick,
    companyOptions = [],
    canCreate = false,
  } = props;
  const filters = getUserManagementFilters(companyOptions);

  const isCreateButtonDisabled = !canCreate || !handleClick;

  return (
    <HeaderContainer>
      <CommonPageHeader
        title="Carrier Users"
        subtitle="Manage career users, view details and activity history"
        rightContent={
          <AddUserButton 
            variant="contained" 
            onClick={handleClick}
            disabled={isCreateButtonDisabled}
          >
            Add User
          </AddUserButton>
        }
      />
      <SummaryCardWrapper>
        <CommonSummaryCardGroup
          cards={summaryCards.map((card) => ({
            ...card,
            onClick: () => onSummaryCardClick?.(card.id),
          }))}
          showAccentBar={true}
          layout="default"
          compact
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
