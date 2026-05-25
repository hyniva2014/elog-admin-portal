import { Typography } from "@mui/material";
import CommonPageHeader from "@src/common/CommonPageHeader";
import CommonFilters from "@src/common/CommonFilters";
import {
  DEVICE_MODEL_STATUS_FILTER_OPTIONS,
  ASSET_TYPE_FILTER_OPTIONS,
} from "./Constants";
import CommonSummaryCardGroup from "@src/common/CommonSummaryCardGroup";
import { HeaderContainer, AddButton, SummaryCardBox } from "./DeviceModelManagement.styled";

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

  const resolvedStatusOptions =
    statusOptions.length > 0 ? statusOptions : DEVICE_MODEL_STATUS_FILTER_OPTIONS;

  const resolvedAssetTypeOptions =
    assetTypeOptions.length > 0 ? assetTypeOptions : ASSET_TYPE_FILTER_OPTIONS;

  const resolvedModelOptions =
    modelOptions.length > 0 ? modelOptions : [];

  const filters = [
    { label: "Asset Type", dataKey: "assetType", options: resolvedAssetTypeOptions },
    { label: "All Model", dataKey: "model", options: resolvedModelOptions },
    { label: "All Status", dataKey: "status", options: resolvedStatusOptions },
  ];

  return (
    <HeaderContainer>
      <CommonPageHeader
        title="Device Model Management"
        handleClick={handleClick}
        addButton={true}
        rightContent={
          <AddButton variant="contained" onClick={handleClick}>
            Add Asset
          </AddButton>
        }
      />
      <Typography variant="h6" fontWeight="300">
        Manage device models and specifications
      </Typography>
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
