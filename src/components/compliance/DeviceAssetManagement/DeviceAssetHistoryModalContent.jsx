import React from "react";
import { Box, Typography } from "@mui/material";
import CommonDataGrid from "../../../common/CommonDataGrid";
import {
  HistoryContentWrapper,
  HistoryTimeText,
  HistoryBackButtonWrapper,
  HistoryBackButton,
} from "./DeviceAssetManagement.styles";

const CreatedOnCell = (params) => (
  <Box>
    <Typography fontSize={14}>{params.row.created_date || "-"}</Typography>
    <HistoryTimeText>{params.row.created_time || ""}</HistoryTimeText>
  </Box>
);

const getHistoryRowHeight = () => "auto";

const HISTORY_COLUMNS = [
  {
    field: "created_by",
    headerName: "Created By",
    flex: 2,
    minWidth: 150,
    headerTooltip: true,
  },
  {
    field: "created_date",
    headerName: "Created On",
    flex: 2,
    minWidth: 150,
    headerTooltip: true,
    renderCell: CreatedOnCell,
  },
  {
    field: "notes",
    headerName: "Notes",
    flex: 3,
    minWidth: 200,
    headerTooltip: true,
  },
];

const DeviceAssetHistoryModalContent = ({ auditLogData, onClose, onPageChange }) => {
  const handlePaginationChange = (newData) => {
    if (onPageChange && newData.page !== auditLogData.page) {
      onPageChange(newData.page);
    }
  };

  return (
    <HistoryContentWrapper>
      <CommonDataGrid
        columnsData={HISTORY_COLUMNS}
        rowData={auditLogData.rows}
        data={{
          total: auditLogData.total,
          page: auditLogData.page,
          pageSize: auditLogData.pageSize,
          isLoading: auditLogData.isLoading,
        }}
        setData={handlePaginationChange}
        hideFooter={false}
        useAutoHeight
        disableStickyColumns
        showMuiLoading={false}
        getRowHeight={getHistoryRowHeight}
      />
      <HistoryBackButtonWrapper>
        <HistoryBackButton variant="contained" onClick={onClose}>
          Back
        </HistoryBackButton>
      </HistoryBackButtonWrapper>
    </HistoryContentWrapper>
  );
};

export default DeviceAssetHistoryModalContent;
