import { useCallback } from "react";
import {
  AlertList,
  AlertCardContainer,
  PaginationContainer,
  PaginationText,
  StyledPagination,
} from "./AlertCenterScreenCard.styles.jsx";
import AlertCardItem from "./AlertCardItem.jsx";

const PAGE_SIZE = 10;

const AlertListPanel = ({
  alerts,
  selectedAlert,
  handleAlertSelect,
  page,
  setPage,
}) => {
  const totalPages = Math.ceil(alerts.length / PAGE_SIZE);

  const paginatedAlerts = alerts.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

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

  const paginationText =
    alerts.length === 0
      ? "0-0 of 0"
      : `${(page - 1) * PAGE_SIZE + 1}-${Math.min(
          page * PAGE_SIZE,
          alerts.length,
        )} of ${alerts.length}`;

  const handlePageChange = (_, value) => {
    setPage(value);
  };
  const alertCards = paginatedAlerts.map(renderAlertCard);

  return (
    <AlertCardContainer>
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
    </AlertCardContainer>
  );
};

export default AlertListPanel;
