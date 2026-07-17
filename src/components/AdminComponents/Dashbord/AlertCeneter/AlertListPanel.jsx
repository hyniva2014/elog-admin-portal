import { useCallback } from "react";
import { Box, Typography } from "@mui/material";
import {
  AlertList,
  AlertCardContainer,
  PaginationContainer,
  PaginationText,
  StyledPagination,
} from "./AlertCenterScreenCard.styles.jsx";
import AlertCardItem from "./AlertCardItem.jsx";

const AlertListPanel = ({
  alerts,
  selectedAlert,
  handleAlertSelect,
  page,
  setPage,
  totalPages = 1,
  totalRecords = 0,
}) => {
  const renderAlertCard = useCallback(
    (item, index) => {
      const isSelected = selectedAlert === item.notification_id;
      const cardKey = item.notification_id ?? index;
      return (
        <AlertCardItem
          key={cardKey}
          item={item}
          isSelected={isSelected}
          onSelect={handleAlertSelect}
        />
      );
    },
    [selectedAlert, handleAlertSelect],
  );

  const PAGE_SIZE = 10;
  const paginationText =
    totalRecords === 0
      ? "0-0 of 0"
      : `${(page - 1) * PAGE_SIZE + 1}-${Math.min(page * PAGE_SIZE, totalRecords)} of ${totalRecords}`;

  const handlePageChange = (_, value) => {
    setPage(value);
  };
  const alertCards = alerts.map(renderAlertCard);

  return (
    <AlertCardContainer>
      {alerts.length === 0 ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="200px"
        >
          <Typography variant="body1" color="textSecondary">
            No records to display
          </Typography>
        </Box>
      ) : (
        <>
          <AlertList>{alertCards}</AlertList>

          <PaginationContainer>
            <PaginationText>{paginationText}</PaginationText>

            <StyledPagination
              page={page}
              count={totalPages}
              onChange={handlePageChange}
              color="primary"
              size="small"
            />
          </PaginationContainer>
        </>
      )}
    </AlertCardContainer>
  );
};

export default AlertListPanel;
