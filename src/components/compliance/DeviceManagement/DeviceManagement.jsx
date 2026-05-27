import React, { useCallback, useState, useEffect } from "react";
import dayjs from "dayjs";
import CommonDataGrid from "@src/common/CommonDataGrid";
import { PageContainer } from "../../../common/PageContainer";
import CommonLoading from "../../../common/CommonLoading";
import DeviceManagementHeader from "./DeviceManagementHeader";
import { useServices } from "../../../services/services";
import {
  columns,
  transformDeviceData,
  DEVICE_SUMMARY_CARDS,
} from "./Constants";
import {
  buildSummaryCards,
  getSelectedDevices,
} from "../../../common/CommonUtils";
import AssignDevicesToCarriers from "./AssignDevicesToCarriers";

const isDeviceSelectable = (params) => {
  return params.row.status?.toLowerCase() === "unassigned";
};

const DeviceManagement = () => {
  const { fetchApi } = useServices();
  const { setLoading, LoadingContainer } = CommonLoading();

  const [allRows, setAllRows] = useState([]);
  const [dynamicSummaryCards, setDynamicSummaryCards] = useState([]);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [data, setData] = useState({
    total: 0,
    page: 1,
    pageSize: 25,
    search: "",
    status: "",
    truckNumber: "",
    carrierId: "",
    fromDate: null,
    toDate: null,
    isLoading: false,
  });

  useEffect(() => {
    fetchDeviceList();
  }, [
    data.page,
    data.pageSize,
    data.status,
    data.fromDate,
    data.toDate,
    data.truckNumber,
    data.carrierId,
    data.search,
  ]);

  const fetchDeviceList = async () => {
    try {
      setLoading(true);

      const queryParams = new URLSearchParams({
        page: data.page,
        limit: data.pageSize,
        company_id: data.carrierId,
        search: data.search,
        truck_number: data.truckNumber,
        status: data.status,
      });

      if (data.fromDate) {
        queryParams.append(
          "created_at",
          dayjs(data.fromDate).format("YYYY-MM-DD"),
        );
      }

      const endUrl = `/masteradmin/get-devices-list?${queryParams.toString()}`;

      const response = await fetchApi(endUrl);
      const apiData = response?.body?.data || [];
      const counts = response?.body?.counts || {};

      setAllRows(transformDeviceData(apiData));
      setDynamicSummaryCards(buildSummaryCards(counts, DEVICE_SUMMARY_CARDS));

      setData((prev) => ({
        ...prev,
        total: response?.body?.pagination?.total_records || 0,
      }));
      setLoading(false);
    } catch (error) {
      console.error("Fetch Device List Error:", error);
      setLoading(false);
    }
  };

  const handleClick = useCallback(() => {
    setIsAssignDialogOpen(true);
  }, []);

  const handleAssignCancel = () => {
    setIsAssignDialogOpen(false);
  };

  const handleAssignSubmit = (selectedCarrier) => {
    const selectedDevices = allRows
      .filter((row) => selectedRows.includes(row.id))
      .map((row) => ({
        device_id: row.id,
      }));

    const payload = {
      carrier_id: selectedCarrier,
      devices: selectedDevices,
    };

    console.log("Assign Payload:", payload);

    setIsAssignDialogOpen(false);
  };

  const handleRowSelectionChange = (newSelection) => {
    setSelectedRows(newSelection);
    const selectedDeviceIds = getSelectedDevices(newSelection);
    console.log("Selected Devices:", selectedDeviceIds);
  };

  return (
    <>
      <LoadingContainer />
      <PageContainer>
        <DeviceManagementHeader
          data={data}
          setData={setData}
          searchKey={data.search}
          summaryCards={dynamicSummaryCards}
          handleClick={handleClick}
          isAssignDeviceEnabled={selectedRows.length > 0}
        />
        <CommonDataGrid
          columnsData={columns}
          rowData={allRows}
          data={{
            ...data,
            total: data.total,
            isLoading: data.isLoading,
          }}
          setData={setData}
          paginationMode="server"
          getRowHeight={() => "auto"}
          checkboxSelection
          isRowSelectable={isDeviceSelectable}
          rowSelectionModel={selectedRows}
          onRowSelectionModelChange={handleRowSelectionChange}
        />
      </PageContainer>

      {/* <AddDeviceDialog
        open={isAddDeviceOpen}
        onClose={handleCloseAddDevice}
        onSubmit={handleAddDevice}
      /> */}
      <AssignDevicesToCarriers
        open={isAssignDialogOpen}
        handleCancel={handleAssignCancel}
        handleSubmit={handleAssignSubmit}
        loading={false}
      />
    </>
  );
};

export default DeviceManagement;
