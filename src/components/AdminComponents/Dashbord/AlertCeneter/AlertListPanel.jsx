import { useCallback } from "react";
import {
  AlertList,
  AlertCardContainer,
} from "./AlertCenterScreenCard.styles.jsx";
import AlertCardItem from "./AlertCardItem.jsx";


const AlertListPanel = ({ alerts, selectedAlert, handleAlertSelect }) => {
  const renderAlertCard = useCallback(
    (item, index) => {
      const isSelected = selectedAlert === item;
      return (
        <AlertCardItem
          key={item.id ?? index}
          item={item}
          isSelected={isSelected}
          onSelect={handleAlertSelect}
        />
      );
    },
    [selectedAlert, handleAlertSelect]
  );

  return (
    <AlertCardContainer>
      <AlertList>
        {alerts.map(renderAlertCard)}
      </AlertList>
    </AlertCardContainer>
  );
};

export default AlertListPanel;
