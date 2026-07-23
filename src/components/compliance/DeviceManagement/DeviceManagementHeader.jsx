
import CommonPageHeader from "../../../common/CommonPageHeader";
import CommonFilters from "../../../common/CommonFilters";
import { DEVICE_STATUS_FILTER_OPTIONS } from "./Constants";
import CommonSummaryCardGroup from "../../../common/CommonSummaryCardGroup";
import {
  HeaderContainer,
  AddButton,
  SummaryCardBox,
} from "./DeviceManagement.styles";
import { useServices } from "../../../services/services";
import { useEffect, useState } from "react";

const DeviceManagementHeader = (props) => {
  const {
    data = [],
    setData,
    searchKey = {},
    summaryCards = [],
    handleClick,
  } = props;
  const { fetchApi } = useServices();
  const [truckOptions, setTruckOptions] = useState([]);
  const [carrierOptions, setCarrierOptions] = useState([]);

  useEffect(() => {
    fetchTrucks();
    fetchCarriers();
  }, []);

  const fetchTrucks = async () => {
    try {
      const response = await fetchApi("/masteradmin/dropdown/trucks");
      const dropdownData = response?.body?.data || [];
      const formattedOptions = dropdownData.map((item) => ({
        value: item.truck_id,
        label: item.plate_number,
      }));

      setTruckOptions(formattedOptions);
    } catch (error) {
      console.error("Device Model Dropdown Error:", error);
    }
  };

  const fetchCarriers = async () => {
    try {
      const response = await fetchApi("/masteradmin/dropdown/companies");
      const dropdownData = response?.body?.data || [];
      const formattedOptions = dropdownData.map((item) => ({
        value: item.company_id,
        label: item.company_name,
      }));

      setCarrierOptions(formattedOptions);
    } catch (error) {
      console.error("Device Model Dropdown Error:", error);
    }
  };

  return (
    <HeaderContainer>
      <CommonPageHeader
        title="Device Management"
        subtitle="Assign unassigned devices to carriers"
        handleClick={handleClick}
        addButton={true}
        rightContent={null}
      />
      <SummaryCardBox>
        <CommonSummaryCardGroup
          cards={summaryCards}
          showAccentBar={true}
          layout="default"
          compact
        />
      </SummaryCardBox>
      <CommonFilters
        data={data}
        setData={setData}
        searchKey={searchKey}
        allowDateClear={true}
        filters={[
          {
            label: "All Truck",
            dataKey: "truckNumber",
            options: truckOptions,
          },
          {
            label: "All Carrier",
            dataKey: "carrierId",
            options: carrierOptions,
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
