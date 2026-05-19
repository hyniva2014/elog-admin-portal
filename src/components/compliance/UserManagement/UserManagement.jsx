import CommonDataGrid from "@src/common/CommonDataGrid";
import UserManagementHeader from "./UserManagementHeader";
import { PageContainer } from "../../../common/PageContainer";
import CommonLoading from "../../../common/CommonLoading";
import {
  UserManagementColumnData,
  UserManagementRowData,
} from "./CommonRowColumnUtils";
import { useState } from "react";
import UserManagementForm from "./UserManagementForm";
import { summaryCards as summaryCardsData } from "./Constants";

const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [modelType, setModelType] = useState("");
  const [status, setStatus] = useState("");
  const { setLoading, LoadingContainer } = CommonLoading();
  const [data, setData] = useState({
    isLoading: false,
  });
  const [mode, setMode] = useState("");
  const [summaryCards, setSummaryCards] = useState(summaryCardsData);
  const [openForm, setOpenForm] = useState(false);
  const handleClick = () => {
    setOpenForm(true);
  };

  const handleClose = () => {
    setOpenForm(false);
  };

  const handleGetRowHeight = () => "auto";

  return (
    <>
      <LoadingContainer />
      <PageContainer>
        <UserManagementHeader
          data={data}
          setData={setData}
          searchKey={searchQuery}
          summaryCards={summaryCards}
          mode={mode}
          setMode={setMode}
          handleClick={handleClick}
        />
        <CommonDataGrid
          columnsData={UserManagementColumnData}
          rowData={UserManagementRowData}
          data={{
            rows: UserManagementRowData,
            total: UserManagementRowData.length,
            isLoading: false,
          }}
          setData={setData}
          paginationMode="server"
          getRowHeight={handleGetRowHeight}
        />
      </PageContainer>
      <UserManagementForm open={openForm} onClose={handleClose} mode="add" />
    </>
  );
};

export default UserManagement;
