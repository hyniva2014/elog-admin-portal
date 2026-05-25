import React, { useCallback, useState, useEffect } from "react";
import dayjs from "dayjs";
import CommonDataGrid from "@src/common/CommonDataGrid";
import { PageContainer } from "../../../common/PageContainer";
import CommonLoading from "../../../common/CommonLoading";
import CommonSnackbar from "../../../common/CommonSnackbar";
import DeviceManagementHeader from "./DeviceManagementHeader";
import AddDeviceDialog from "./AddDeviceDialog";
import { useServices } from "../../../services/services";
import { columns, transformDeviceData, buildSummaryCards } from "./Constants";

const DeviceManagement = () => {
  const { fetchApi } = useServices();
  const { setLoading, LoadingContainer } = CommonLoading();

  const [allRows, setAllRows] = useState([]);
  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false);
  const [dynamicSummaryCards, setDynamicSummaryCards] = useState([]);
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
      let endUrl = `/masteradmin/get-devices-list?page=${data.page}&limit=${data.pageSize}`;

      if (
        data.status !== null &&
        data.status !== undefined &&
        data.status !== ""
      ) {
        endUrl += `&status=${String(data.status)}`;
      }
      if (data.fromDate) {
        endUrl += `&created_at=${dayjs(data.fromDate).format("YYYY-MM-DD")}`;
      }

      const response = await fetchApi(endUrl);
      const apiData = response?.body?.data || [];
      const counts = response?.body?.counts || {};

      setAllRows(transformDeviceData(apiData));
      setDynamicSummaryCards(buildSummaryCards(counts));
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
    setIsAddDeviceOpen(true);
  }, []);

  const handleCloseAddDevice = useCallback(() => {
    setIsAddDeviceOpen(false);
  }, []);

  const handleAddDevice = useCallback(() => {
    setIsAddDeviceOpen(false);
    fetchDeviceList();
  }, []);

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
        />
      </PageContainer>

      <AddDeviceDialog
        open={isAddDeviceOpen}
        onClose={handleCloseAddDevice}
        onSubmit={handleAddDevice}
      />
    </>
  );
};

export default DeviceManagement;
