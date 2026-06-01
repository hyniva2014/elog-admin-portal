import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import CommonDataGrid from "../../../common/CommonDataGrid";
import { PageContainer } from "../../../common/PageContainer";
import CommonLoading from "../../../common/CommonLoading";
import RequestDeviceHeader from "./RequestDeviceHeader";
import { useServices } from "../../../services/services";
import { columns, transformRequestedDevicesData, statusOptions } from "./Constants";

const RequestDevice = () => {
  const { fetchApi } = useServices();
  const { setLoading, LoadingContainer } = CommonLoading();

  const [allRows, setAllRows] = useState([]);
  const [data, setData] = useState({
    total: 0,
    page: 1,
    pageSize: 25,
    search: "",
    status: "",
    fromDate: null,
    toDate: null,
    isLoading: false,
  });

  useEffect(() => {
    fetchRequestedDevices();
  }, [
    data.page,
    data.pageSize,
    data.status,
    data.fromDate,
    data.toDate,
    data.search,
  ]);

  const fetchRequestedDevices = async () => {
    try {
      setLoading(true);

      const queryParams = new URLSearchParams({
        page: data.page,
        limit: data.pageSize,
        ...(data.search && { search: data.search }),
      });

      if (data.status) {
        queryParams.append("status", data.status);
      }

      if (data.fromDate) {
        queryParams.append(
          "from_date",
          dayjs(data.fromDate).format("YYYY-MM-DD")
        );
      }

      if (data.toDate) {
        queryParams.append("to_date", dayjs(data.toDate).format("YYYY-MM-DD"));
      }

      const endUrl = `/masteradmin/requested-devices?${queryParams.toString()}`;
      const response = await fetchApi(endUrl);
      const apiData = response?.body?.data || [];

      setAllRows(transformRequestedDevicesData(apiData));
      setData((prev) => ({
        ...prev,
        total: response?.body?.pagination?.total_records || apiData.length || 0,
      }));
      setLoading(false);
    } catch (error) {
      console.error("Fetch Requested Devices Error:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <LoadingContainer />
      <PageContainer>
        <RequestDeviceHeader
          data={data}
          setData={setData}
          searchKey={data.search}
          statusOptions={statusOptions}
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
    </>
  );
};

export default RequestDevice;
