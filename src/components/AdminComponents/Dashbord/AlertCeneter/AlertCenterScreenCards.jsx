import { useState } from "react";
import { Grid } from "@mui/material";

import AlertListPanel from "./AlertListPanel";
import AlertDetailsPanel from "./AlertDetailsPanel";
import { AlertsContainer } from "./AlertCenterScreenCard.styles.jsx";

const AlertCenterScreenCards = ({ alerts = [] }) => {
  const [selectedAlert, setSelectedAlert] = useState(alerts[0]);

  return (
    <AlertsContainer>
      <Grid container>
        <Grid item xs={12} md={6}>
          <AlertListPanel
            alerts={alerts}
            selectedAlert={selectedAlert}
            handleAlertSelect={setSelectedAlert}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <AlertDetailsPanel selectedAlert={selectedAlert} />
        </Grid>
      </Grid>
    </AlertsContainer>
  );
};

export default AlertCenterScreenCards;
