import { useCallback } from "react";
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
    alerts.length === 0
      ? "0-0 of 0"
      : `${(page - 1) * PAGE_SIZE + 1}-${(page - 1) * PAGE_SIZE + alerts.length} of ${totalPages * PAGE_SIZE}`;

  const handlePageChange = (_, value) => {
    setPage(value);
  };
  const alertCards = alerts.map(renderAlertCard);

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
