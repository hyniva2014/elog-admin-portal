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
    flex: 1,
    headerTooltip: true,
  },
  {
    field: "created_date",
    headerName: "Created On",
    flex: 1,
    headerTooltip: true,
    renderCell: CreatedOnCell,
  },
  {
    field: "notes",
    headerName: "Notes",
    flex: 1,
    headerTooltip: true,
  },
];

const DeviceAssetHistoryModalContent = ({ historyData, onClose }) => (
  <HistoryContentWrapper>
    <CommonDataGrid
      columnsData={HISTORY_COLUMNS}
      rowData={historyData}
      data={{ total: historyData.length }}
      hideFooter
      useAutoHeight
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

export default DeviceAssetHistoryModalContent;
