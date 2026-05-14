import { Box, Button, Typography } from "@mui/material";
import CommonPageHeader from "../../../common/CommonPageHeader";
import CommonFilters from "../../../common/CommonFilters";
import {
  DEVICE_CARRIER_ID_FILTER_OPTIONS,
  DEVICE_STATUS_FILTER_OPTIONS,
  DEVICE_TRUCK_FILTER_OPTIONS,
} from "./Constants";
import CommonSummaryCardGroup from "../../../common/CommonSummaryCardGroup";

const DeviceManagementHeader = (props) => {
  const {
    data = [],
    setData,
    searchKey = {},
    summaryCards = [],
    handleClick,
  } = props;
  return (
    <Box sx={{ mb: 2 }}>
      <CommonPageHeader
        title="Device  Management"
        handleClick={handleClick}
        addButton={true}
        rightContent={
          <Button
            sx={{ color: "#FFFFFF", backgroundColor: "#284495" }}
            variant="contained"
            onClick={handleClick}
          >
            Add Device
          </Button>
        }
      />
      <Typography variant="h6" fontWeight="300">
        Assign unassigned devices to carriers
      </Typography>
      <Box mt={2}>
        <CommonSummaryCardGroup cards={summaryCards} showAccentBar={true} />
      </Box>

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
    </Box>
  );
};

export default DeviceManagementHeader;
