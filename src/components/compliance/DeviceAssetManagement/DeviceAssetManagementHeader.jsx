import { Box, Typography } from "@mui/material";
import CommonPageHeader from "../../../common/CommonPageHeader";
import CommonFilters from "../../../common/CommonFilters";
import {
  DEVICE_ASSET_STATUS_FILTER_OPTIONS,
  DEVICE_ASSET_MODEL_FILTER_OPTIONS,
} from "./Constants";
import CommonSummaryCardGroup from "../../../common/CommonSummaryCardGroup";
import { useSelector } from "react-redux";
import { HeaderContainer, AddButton, SummaryCardBox } from "./DeviceAssetManagement.styles";

const DeviceAssetManagementHeader = (props) => {
  const {
    data = [],
    setData,
    searchKey = {},
    summaryCards = [],
    mode,
    setMode,
    handleClick,
    handleAddAsset,
    modelOptions = [],
    statusOptions = [],
  } = props;

  const resolvedModelOptions =
    modelOptions.length > 0 ? modelOptions : DEVICE_ASSET_MODEL_FILTER_OPTIONS;

  const resolvedStatusOptions =
    statusOptions.length > 0 ? statusOptions : DEVICE_ASSET_STATUS_FILTER_OPTIONS;

  const filters = [
    { label: "Model Type", dataKey: "deviceModel", options: resolvedModelOptions },
    { label: "All Status", dataKey: "status",       options: resolvedStatusOptions },
  ];

  return (
    <HeaderContainer>
      <CommonPageHeader
        title="Device Asset Management"
        handleClick={handleClick}
        addButton={true}
        rightContent={
          <Box display="flex" gap={2}>
            {/* <AddButton
              variant="contained"
              onClick={handleAsset}
              disabled={!isAssetAllocationEnabled}
            >
              Asset Allocation
            </AddButton> */}
            <AddButton variant="contained" onClick={handleAddAsset}>
              Add Bulk Asset
            </AddButton>
            <AddButton variant="contained" onClick={handleClick}>
              Add Asset
            </AddButton>
          </Box>
        }
      />
      <Typography variant="h6" fontWeight="300">
        Assign unassigned devices to carriers
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

export default DeviceAssetManagementHeader;
