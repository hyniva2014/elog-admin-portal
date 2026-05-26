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
import { buildSummaryCards } from "../../../common/CommonUtils";
import AssignDevicesToCarriers from "./AssignDevicesToCarriers";

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

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
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
      let endUrl = `/masteradmin/get-devices-list?page=${data.page}&limit=${data.pageSize}&company_id=${data.carrierId}&search=${data.search}&truck_number=${data.truckNumber}&status=${data.status}`;

      if (data.fromDate) {
        endUrl += `&created_at=${dayjs(data.fromDate).format("YYYY-MM-DD")}`;
      }

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
          isRowSelectable={(params) =>
            params.row.status?.toLowerCase() === "unassigned"
          }
          rowSelectionModel={selectedRows}
          onRowSelectionModelChange={(newSelection) => {
            setSelectedRows(newSelection);

            const selectedDeviceIds = allRows
              .filter((row) => newSelection.includes(row.id))
              .map((row) => ({
                device_id: row.id,
              }));

            console.log("Selected Devices:", selectedDeviceIds);
          }}
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
