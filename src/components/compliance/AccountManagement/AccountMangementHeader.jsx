import CommonPageHeader from "../../../common/CommonPageHeader";
import { AddAccountButton, HeaderContainer } from "./AccountManagement.styled";
import CommonFilters from "../../../common/CommonFilters";

const AccountManagementHeader = ({
  data,
  setData,
  searchKey,
  handleClick,
  primaryContactOptions = [],
  secondaryContactOptions = [],
  carrierOptions,
  statusOptions,
}) => {
  return (
    <HeaderContainer>
      <CommonPageHeader
        title="Account Management"
        subtitle="Manage carrier accounts and subscriptions"
        rightContent={
          <AddAccountButton
            variant="contained"
            onClick={handleClick}
          >
            Add Account
          </AddAccountButton>
        }
      />

      <CommonFilters
        data={data}
        setData={setData}
        searchKey={searchKey}
        allowDateClear={true}
        filters={[
          {
            label: "Primary Contact Name",
            dataKey: "primaryContactName",
            options: primaryContactOptions,
          },
          {
            label: "Secondary Contact Name",
            dataKey: "secondaryContactName",
            options: secondaryContactOptions,
          },
          {
            label: "All Carrier",
            dataKey: "companyId",
            options: carrierOptions,
          },
          {
            label: "All Status",
            dataKey: "status",
            options: statusOptions,
          },
        ]}
      />
    </HeaderContainer>
  );
};

export default AccountManagementHeader;
