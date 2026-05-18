import CommonPageHeader from "@src/common/CommonPageHeader";
import { AddButton, HeaderContainer } from "./DeviceModelManagement.styled.jsx";
import CommonFilters from "@src/common/CommonFilters";

const DeviceModelManagementHeader = ({
  data,
  setData,
  searchKey,
  handleClick,
  assetTypeOptions,
  modelOptions,
  statusOptions,
}) => {
  return (
    <HeaderContainer>
      <CommonPageHeader
        title="Device Model Management"
        subtitle="Manage device models and specifications"
        rightContent={
          <AddButton
            variant="contained"
            onClick={handleClick}
          >
            Add Asset
          </AddButton>
        }
      />

      <CommonFilters
        data={data}
        setData={setData}
        searchKey={searchKey}
        filters={[
          {
            label: "Asset Type",
            dataKey: "assetType",
            options: assetTypeOptions,
          },
          {
            label: "All Model",
            dataKey: "model",
            options: modelOptions,
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

export default DeviceModelManagementHeader;