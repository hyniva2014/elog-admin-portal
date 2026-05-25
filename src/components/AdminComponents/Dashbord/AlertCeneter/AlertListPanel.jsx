import {
  AlertList,
  AlertCardContainer,
} from "./AlertCenterScreenCard.styles.jsx";
import AlertCardItem from "./AlertCardItem.jsx";


const AlertListPanel = ({ alerts, selectedAlert, handleAlertSelect }) => {
  return (
    <AlertCardContainer>
      <AlertList>
        {alerts.map((item, index) => (
          <AlertCardItem
            key={item.id ?? index}
            item={item}
            isSelected={selectedAlert === item}
            onSelect={handleAlertSelect}
          />
        ))}
      </AlertList>
    </AlertCardContainer>
  );
};

export default AlertListPanel;
