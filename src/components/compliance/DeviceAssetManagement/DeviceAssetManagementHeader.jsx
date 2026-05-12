import { Box, Button, Typography } from "@mui/material";
import CommonPageHeader from "../../../common/CommonPageHeader";
import CommonFilters from "../../../common/CommonFilters";
import {
  DEVICE_ASSET_STATUS_FILTER_OPTIONS,
  DEVICE_ASSET_IGNITION_FILTER_OPTIONS,
  DEVICE_ASSET_MODEL_FILTER_OPTIONS,
} from "./Constants";
import CommonSummaryCardGroup from "../../../common/CommonSummaryCardGroup";
import { useEffect, useState } from "react";
import { useServices } from "../../../services/services";
import { useSelector } from "react-redux";
// import { hasPermission } from "../../CommonRowColumnUtils";

const DeviceAssetManagementHeader = (props) => {
  const {
    data = [],
    setData,
    searchKey = {},
    summaryCards = [],
    mode,
    setMode,
    handleClick,
  } = props;

  const { fetchApi } = useServices();
  const [deviceModelOptions, setDeviceModelOptions] = useState([]);
  const [ignitionOptions, setIgnitionOptions] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);

  const companyId = useSelector(
    (state) =>
      state.loginSlice.loginDetails?.body?.data?.userdetails?.company_id,
  );

  const roleId = useSelector(
    (state) => state.loginSlice.loginDetails?.body?.data?.userdetails?.role_id,
  );

  // const permissions = useSelector((state) => state.rolePermissions.permissions);

  // const canCreate = hasPermission(
  //   permissions,
  //   "DEVICE_ASSET_MANAGEMENT",
  //   "CREATE_DEVICE_ASSET",
  // );

  // useEffect(() => {
  //   loadDeviceAssets();
  // }, []);

  // const loadDeviceAssets = async () => {
  //   try {
  //     const response = await fetchApi(
  //       `/device-asset/get-device-assets?company_id=${companyId}&role_id=${roleId}&page=1&limit=1000`
  //     );

  //     const deviceAssets = response?.body?.deviceAssets || [];

  //     setDeviceModelOptions(
  //       deviceAssets.map((asset) => ({
  //         value: asset.deviceModel,
  //         label: asset.deviceModel || `Model ${asset.deviceModel}`,
  //       })),
  //     );

  //     setIgnitionOptions(DEVICE_ASSET_IGNITION_FILTER_OPTIONS);
  //     setStatusOptions(DEVICE_ASSET_STATUS_FILTER_OPTIONS);
  //   } catch (err) {
  //     console.error("Device Assets API error", err);
  //     setIgnitionOptions(DEVICE_ASSET_IGNITION_FILTER_OPTIONS);
  //     setStatusOptions(DEVICE_ASSET_STATUS_FILTER_OPTIONS);
  //   }
  // };

  return (
    <Box sx={{ mb: 2 }}>
      <CommonPageHeader
        title="Device Asset Management"
        handleClick={handleClick}
        addButton={true}
        rightContent={
          <Button
            sx={{ color: "#FFFFFF", backgroundColor: "#284495" }}
            variant="contained"
            onClick={handleClick}
          >
            Add Asset
          </Button>
        }
      />
      <Typography variant="h6" fontWeight="300">Assign unassigned devices to carriers</Typography>
      <Box mt={2}>
        <CommonSummaryCardGroup cards={summaryCards} />
      </Box>

      <CommonFilters
        data={data}
        setData={setData}
        searchKey={searchKey}
        allowDateClear={true}
        filters={[
          {
            label: "Model Type",
            dataKey: "deviceModel",
            options: deviceModelOptions.length > 0 ? deviceModelOptions : DEVICE_ASSET_MODEL_FILTER_OPTIONS,
          },
          {
            label: "All Status",
            dataKey: "status",
            options: DEVICE_ASSET_STATUS_FILTER_OPTIONS,
          },
        ]}
      />
    </Box>
  );
};

export default DeviceAssetManagementHeader;
