import CommonPageHeader from "@src/common/CommonPageHeader";
import CommonFilters from "@src/common/CommonFilters";
import CommonSummaryCardGroup from "@src/common/CommonSummaryCardGroup";
import { HeaderContainer, SummaryCardBox } from "./DeviceModelManagement.styled";
import { HeaderAddButton } from "./DeviceModelManagementButtons";

const DeviceModelManagementHeader = (props) => {
  const {
    data = [],
    setData,
    searchKey = {},
    summaryCards = [],
    handleClick,
    modelOptions = [],
    statusOptions = [],
    assetTypeOptions = [],
    canCreate = false,
  } = props;

  const filters = [
    { label: "Asset Type", dataKey: "assetType", options: assetTypeOptions },
    { label: "All Model", dataKey: "model", options: modelOptions },
    { label: "All Status", dataKey: "status", options: statusOptions },
  ];

  const isCreateDisabled = !canCreate || !handleClick;

  return (
    <HeaderContainer>
      <CommonPageHeader
        title="Device Model Management"
        subtitle="Manage device models and specifications"
        handleClick={handleClick}
        addButton={true}
        rightContent={
          <HeaderAddButton 
            onClick={handleClick} 
            disabled={isCreateDisabled}
          />
        }
      />
      <SummaryCardBox>
        <CommonSummaryCardGroup cards={summaryCards} />
      </SummaryCardBox>

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

export default DeviceModelManagementHeader;
