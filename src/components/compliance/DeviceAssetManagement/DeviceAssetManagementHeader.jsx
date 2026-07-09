import { Box } from "@mui/material";
import CommonPageHeader from "../../../common/CommonPageHeader";
import CommonFilters from "../../../common/CommonFilters";
import { DEVICE_ASSET_STATUS_FILTER_OPTIONS } from "./Constants";
import CommonSummaryCardGroup from "../../../common/CommonSummaryCardGroup";
import { useSelector } from "react-redux";
import {
  HeaderContainer,
  AddButton,
  SummaryCardBox,
} from "./DeviceAssetManagement.styles";
import { useServices } from "../../../services/services";
import { useEffect, useState } from "react";

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
    handleAssignDevices,
    isAssignDeviceEnabled,
    modelOptions = [],
    statusOptions = [],
    canCreate = false,
    canAssignDevices = false,
    canAddBulkAsset = false,
  } = props;
  const { fetchApi } = useServices();
  const [deviceModelOptions, setDeviceModelOptions] = useState([]);

  // const resolvedModelOptions =
  //   modelOptions.length > 0 ? modelOptions : DEVICE_ASSET_MODEL_FILTER_OPTIONS;

  const resolvedStatusOptions =
    statusOptions.length > 0
      ? statusOptions
      : DEVICE_ASSET_STATUS_FILTER_OPTIONS;

  useEffect(() => {
    fetchDeviceModelDropdown();
  }, []);

  const fetchDeviceModelDropdown = async () => {
    try {
      const response = await fetchApi("/masteradmin/get-device-model-dropdown");
      const dropdownData = response?.body?.data || [];
      const formattedOptions = dropdownData.map((item) => ({
        value: item.device_model_id,
        label: item.model_name,
      }));

      setDeviceModelOptions(formattedOptions);
    } catch (error) {
      console.error("Device Model Dropdown Error:", error);
    }
  };

  const filters = [
    {
      label: "Model Type",
      dataKey: "deviceModel",
      options: deviceModelOptions,
    },
    { label: "All Status", dataKey: "status", options: resolvedStatusOptions },
  ];

  const isAssignDeviceDisabled =
  !isAssignDeviceEnabled || !canAssignDevices;

  return (
    <HeaderContainer>
      <CommonPageHeader
        title="Device Asset Management"
        subtitle="Assign unassigned devices to carriers"
        handleClick={handleClick}
        addButton={true}
        rightContent={
          <Box display="flex" gap={2}>
            <AddButton
              variant="contained"
              onClick={handleAssignDevices}
              disabled={isAssignDeviceDisabled}
            >
              Assign Devices
            </AddButton>
            <AddButton 
              variant="contained" 
              onClick={handleAddAsset}
              disabled={!canAddBulkAsset}
            >
              Add Bulk Asset
            </AddButton>
            <AddButton 
              variant="contained" 
              onClick={handleClick}
              disabled={!canCreate}
            >
              Add Asset
            </AddButton>
          </Box>
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

export default DeviceAssetManagementHeader;
