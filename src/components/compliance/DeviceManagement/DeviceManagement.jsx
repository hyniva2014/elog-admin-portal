import React, { useState } from "react";

import CommonDataGrid from "@src/common/CommonDataGrid";
import { PageContainer } from "../../../common/PageContainer";
import {
  mockData,columns,summaryCards
} from "./Constants";
import CommonLoading from "../../../common/CommonLoading";
import DeviceManagementHeader from "./DeviceManagementHeader";

const DeviceManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { setLoading, LoadingContainer } = CommonLoading();
  const [data, setData] = useState({
    isLoading: false,
  });
  const [mode, setMode] = useState("");

  const handleClick = () => {
  
    console.log("Add device asset clicked");
  };
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
    </>
  );
};

export default DeviceManagement;
