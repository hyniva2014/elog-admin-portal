import { Box, Button, Typography } from "@mui/material";
import CommonPageHeader from "../../../common/CommonPageHeader";
import CommonFilters from "../../../common/CommonFilters";
import {
  DEVICE_CARRIER_ID_FILTER_OPTIONS,
  DEVICE_STATUS_FILTER_OPTIONS,
  DEVICE_TRUCK_FILTER_OPTIONS,
} from "./Constants";
import CommonSummaryCardGroup from "../../../common/CommonSummaryCardGroup";
import { HeaderContainer, AddButton,SummaryCardBox } from "./DeviceManagement.styles";

const DeviceManagementHeader = (props) => {
  const {
    data = [],
    setData,
    searchKey = {},
    summaryCards = [],
    handleClick,
  } = props;
  return (
    <HeaderContainer>
      <CommonPageHeader
        title="Device  Management"
        handleClick={handleClick}
        addButton={true}
        rightContent={
          <AddButton variant="contained" onClick={handleClick}>
            Add Device
          </AddButton>
        }
      />
      <Typography variant="h6" fontWeight="300">
        Assign unassigned devices to carriers
      </Typography>
      <SummaryCardBox>
        <CommonSummaryCardGroup cards={summaryCards} showAccentBar={true} />
      </SummaryCardBox>

      <CommonFilters
        data={data}
        setData={setData}
        searchKey={searchKey}
        allowDateClear={true}
        filters={[
          {
            label: "All Truck",
            dataKey: "status",
            options: DEVICE_TRUCK_FILTER_OPTIONS,
          },
          {
            label: "All Carrier",
            dataKey: "status",
            options: DEVICE_CARRIER_ID_FILTER_OPTIONS,
          },
          {
            label: "All Status",
            dataKey: "status",
            options: DEVICE_STATUS_FILTER_OPTIONS,
          },
        ]}
      />
    </HeaderContainer>
  );
};

export default DeviceManagementHeader;
