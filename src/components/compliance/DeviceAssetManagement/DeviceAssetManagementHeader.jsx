import { Typography } from "@mui/material";
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
    modelOptions = [],
    statusOptions = [],
  } = props;

  return (
    <HeaderContainer>
      <CommonPageHeader
        title="Device Asset Management"
        handleClick={handleClick}
        addButton={true}
        rightContent={
          <AddButton variant="contained" onClick={handleClick}>
            Add Asset
          </AddButton>
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
        filters={[
          {
            label: "Model Type",
            dataKey: "deviceModel",
            options: modelOptions.length > 0 ? modelOptions : DEVICE_ASSET_MODEL_FILTER_OPTIONS,
          },
          {
            label: "All Status",
            dataKey: "status",
            options: statusOptions.length > 0 ? statusOptions : DEVICE_ASSET_STATUS_FILTER_OPTIONS,
          },
        ]}
      />
    </HeaderContainer>
  );
};

export default DeviceAssetManagementHeader;
