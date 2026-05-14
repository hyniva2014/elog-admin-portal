import CommonPageHeader from "../../../common/CommonPageHeader";
import { AddAccountButton, HeaderContainer } from "./AccountManagement.styled";
import CommonFilters from "../../../common/CommonFilters";

const AccountManagementHeader = ({
  data,
  setData,
  searchKey,
  handleClick,
  assetTypeOptions,
  truckOptions,
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
            label: "Asset Type",
            dataKey: "assetType",
            options: assetTypeOptions,
          },
          {
            label: "All Truck",
            dataKey: "truck",
            options: truckOptions,
          },
          {
            label: "All Carrier",
            dataKey: "carrier",
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
