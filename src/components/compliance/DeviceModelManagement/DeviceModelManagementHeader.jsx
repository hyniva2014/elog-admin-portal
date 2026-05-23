import { Typography } from "@mui/material";
import CommonPageHeader from "@src/common/CommonPageHeader";
import CommonFilters from "@src/common/CommonFilters";
import CommonSummaryCardGroup from "@src/common/CommonSummaryCardGroup";
import {
  DEVICE_MODEL_ASSET_OPTIONS,
  DEVICE_MODEL_STATUS_OPTIONS,
} from "./Constants";
import { HeaderContainer, AddButton, SummaryCardBox } from "./DeviceModelManagement.styled.jsx";

const DeviceModelManagementHeader = (props) => {
  const {
    data = [],
    setData,
    searchKey = 0,
    summaryCards = [],
    mode,
    setMode,
    handleClick,
    assetTypeOptions = [],
    modelOptions = [],
    statusOptions = [],
  } = props;

  const resolvedAssetTypeOptions =
    assetTypeOptions.length > 0 ? assetTypeOptions : DEVICE_MODEL_ASSET_OPTIONS;

  const resolvedStatusOptions =
    statusOptions.length > 0 ? statusOptions : DEVICE_MODEL_STATUS_OPTIONS;

  const filters = [
    { label: "Asset Type", dataKey: "assetType", options: resolvedAssetTypeOptions },
    { label: "All Model", dataKey: "model", options: modelOptions },
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
            Add Device
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