import React, { useState, useEffect, useCallback } from "react";
import CommonDataGrid from "../../../common/CommonDataGrid";
import { PageContainer } from "../../../common/PageContainer";
import CommonLoading from "../../../common/CommonLoading";
import RequestDeviceHeader from "./RequestDeviceHeader";
import { columns, statusOptions } from "./Constants";
import { useRequestDevices } from "../../../hooks/useRequestDevices";

const RequestDevice = () => {
  const { setLoading, LoadingContainer } = CommonLoading();
  const { allRows, total, isLoading, fetchRequestedDevices } =
    useRequestDevices();

  const [data, setData] = useState({
    total: 0,
    page: 1,
    pageSize: 25,
    search: "",
    status: "",
    fromDate: null,
    toDate: null,
  });

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  useEffect(() => {
    fetchRequestedDevices({
      page: data.page,
      pageSize: data.pageSize,
      search: data.search,
      status: data.status,
      fromDate: data.fromDate,
      toDate: data.toDate,
    });
  }, [
    data.page,
    data.pageSize,
    data.status,
    data.fromDate,
    data.toDate,
    data.search,
  ]);

  const handleDataChange = useCallback((updateOrFn) => {
    if (typeof updateOrFn === "function") {
      setData(updateOrFn);
    } else {
      setData((prev) => ({
        ...prev,
        page: updateOrFn.page ?? prev.page,
        pageSize: updateOrFn.pageSize ?? prev.pageSize,
        search: updateOrFn.search ?? prev.search,
        status: updateOrFn.status ?? prev.status,
        fromDate: updateOrFn.fromDate ?? prev.fromDate,
        toDate: updateOrFn.toDate ?? prev.toDate,
      }));
    }
  }, []);

  const getRowHeight = useCallback(() => "auto", []);

  const gridData = {
    ...data,
    total,
  };

  return (
    <>
      <LoadingContainer />
      <PageContainer>
        <RequestDeviceHeader
          data={gridData}
          setData={handleDataChange}
          searchKey={data.search}
          statusOptions={statusOptions}
        />
        <CommonDataGrid
          columnsData={columns}
          rowData={allRows}
          data={gridData}
          setData={handleDataChange}
          paginationMode="server"
          getRowHeight={getRowHeight}
        />
      </PageContainer>
    </>
  );
};

export default RequestDevice;
