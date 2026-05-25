import CommonPageHeader from "@src/common/CommonPageHeader";
import CommonFilters from "@src/common/CommonFilters";
import CommonSummaryCardGroup from "@src/common/CommonSummaryCardGroup";
import { HeaderContainer, AddButton, SummaryCardBox, SubtitleTypography } from "./DeviceModelManagement.styled";

const HeaderAddButton = ({ onClick }) => (
  <AddButton variant="contained" onClick={onClick}>
    Add Asset
  </AddButton>
);

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
  } = props;

  const filters = [
    { label: "Asset Type", dataKey: "assetType", options: assetTypeOptions },
    { label: "All Model", dataKey: "model", options: modelOptions },
    { label: "All Status", dataKey: "status", options: statusOptions },
  ];

  return (
    <HeaderContainer>
      <CommonPageHeader
        title="Device Model Management"
        handleClick={handleClick}
        addButton={true}
        rightContent={<HeaderAddButton onClick={handleClick} />}
      />
      <SubtitleTypography variant="h6">
        Manage device models and specifications
      </SubtitleTypography>
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
