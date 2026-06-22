import React, { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import CommonDataGrid from "../../../common/CommonDataGrid";
import {
  HistoryContentWrapper,
  HistoryTimeText,
  HistoryBackButtonWrapper,
  HistoryBackButton,
} from "./DeviceAssetManagement.styles";

const CreatedOnCell = ({ params }) => (
  <Box>
    <Typography fontSize={14}>{params.row.createdDate || "-"}</Typography>
    <HistoryTimeText>{params.row.createdTime || ""}</HistoryTimeText>
  </Box>
);

const getHistoryRowHeight = () => "auto";

const DeviceAssetHistoryModalContent = ({
  auditData = {},
  setAuditData = () => {},
  onClose,
}) => {
  const columns = useMemo(
    () => [
      {
        field: "createdBy",
        headerName: "Created By",
        flex: 2,
        minWidth: 150,
        headerTooltip: "Created By",
      },
      {
        field: "createdDate",
        headerName: "Created On",
        flex: 2,
        minWidth: 150,
        headerTooltip: "Created On",
        renderCell: (params) => <CreatedOnCell params={params} />,
      },
      {
        field: "notes",
        headerName: "Notes",
        flex: 3,
        minWidth: 200,
        headerTooltip: "Notes",
      },
    ],
    [],
  );

  const rows = useMemo(
    () =>
      auditData.rows?.map((entry, index) => ({
        id: entry.id ?? index,
        createdBy: entry.createdBy,
        createdDate: entry.createdDate,
        createdTime: entry.createdTime,
        notes: entry.notes,
      })) || [],
    [auditData.rows],
  );

  const gridData = useMemo(
    () => ({
      rows,
      columns,
      total: auditData.total || 0,
      page: auditData.page || 1,
      pageSize: auditData.pageSize || 20,
      isLoading: auditData.isLoading || false,
    }),
    [rows, columns, auditData],
  );

  return (
    <HistoryContentWrapper>
      <CommonDataGrid
        columnsData={columns}
        rowData={rows}
        data={gridData}
        setData={setAuditData}
        hideFooter={false}
        useAutoHeight={true}
        disableStickyColumns={true}
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
