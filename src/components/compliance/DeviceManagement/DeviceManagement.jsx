import React from "react";
import CommonDataGrid from "@src/common/CommonDataGrid";
import { PageContainer } from "../../../common/PageContainer";
import { mockData, columns, summaryCards } from "./Constants";
import CommonLoading from "../../../common/CommonLoading";
import DeviceManagementHeader from "./DeviceManagementHeader";
import AddDeviceDialog from "./AddDeviceDialog";
import useDeviceManagement from "../../../hooks/useDeviceManagement";

const DeviceManagement = () => {
  const {
    searchQuery,
    data,
    setData,
    mode,
    setMode,
    handleClick,
    isAddDeviceOpen,
    handleCloseAddDevice,
    handleAddDevice,
  } = useDeviceManagement();

  const { LoadingContainer } = CommonLoading();

  return (
    <>
      <LoadingContainer />
      <PageContainer>
        <DeviceManagementHeader
          data={data}
          setData={setData}
          searchKey={searchQuery}
          summaryCards={summaryCards}
          mode={mode}
          setMode={setMode}
          handleClick={handleClick}
        />
        <CommonDataGrid
          columnsData={columns}
          rowData={mockData}
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
