import CommonPageHeader from "../../../common/CommonPageHeader";
import { AddAccountButton, HeaderContainer } from "./AccountManagement.styled";
import CommonFilters from "../../../common/CommonFilters";

const AccountManagementHeader = ({
  data,
  setData,
  searchKey,
  handleClick,
  canCreate = false,
  primaryContactOptions = [],
  secondaryContactOptions = [],
  carrierOptions,
  statusOptions,
}) => {
  const isButtonDisabled = !canCreate || !handleClick;
  return (
    <HeaderContainer>
      <CommonPageHeader
        title="Account Management"
        subtitle="Manage carrier accounts and subscriptions"
        rightContent={
          <AddAccountButton 
            variant="contained" 
            onClick={handleClick}
            disabled={isButtonDisabled}
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
          // {
          //   label: "Primary Name",
          //   dataKey: "primaryContactName",
          //   options: primaryContactOptions,
          // },
          // {
          //   label: "Secondary Name",
          //   dataKey: "secondaryContactName",
          //   options: secondaryContactOptions,
          // },
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
