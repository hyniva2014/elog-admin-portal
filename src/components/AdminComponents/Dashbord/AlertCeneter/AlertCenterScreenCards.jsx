import { useState } from "react";

import AlertListPanel from "./AlertListPanel";
import AlertDetailsPanel from "./AlertDetailsPanel";
import {
  AlertsContainer,
  AlertGridContainer,
  AlertGridColumn,
} from "./AlertCenterScreenCard.styles.jsx";

const AlertCenterScreenCards = ({ alerts = [] }) => {
  const [selectedAlert, setSelectedAlert] = useState(alerts[0]);

  return (
    <AlertsContainer>
      <AlertGridContainer container alignItems="stretch">
        <AlertGridColumn item xs={12} md={4.5}>
          <AlertListPanel
            alerts={alerts}
            selectedAlert={selectedAlert}
            handleAlertSelect={setSelectedAlert}
          />
        </AlertGridColumn>

        <AlertGridColumn item xs={12} md={7.5}>
          <AlertDetailsPanel selectedAlert={selectedAlert} />
        </AlertGridColumn>
      </AlertGridContainer>
    </AlertsContainer>
  );
};

export default AlertCenterScreenCards;

