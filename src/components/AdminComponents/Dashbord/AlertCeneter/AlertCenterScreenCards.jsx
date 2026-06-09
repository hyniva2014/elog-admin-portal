import { useState } from "react";
import { Grid } from "@mui/material";

import AlertListPanel from "./AlertListPanel";
import AlertDetailsPanel from "./AlertDetailsPanel";
import { AlertsContainer } from "./AlertCenterScreenCard.styles.jsx";

const AlertCenterScreenCards = ({ alerts = [] }) => {
  const [selectedAlert, setSelectedAlert] = useState(alerts[0]);

  return (
    <AlertsContainer>
      <Grid container alignItems="stretch" sx={{ width: "100%" }}>
        <Grid item xs={12} md={4.5} sx={{ display: "flex", flexDirection: "column" }}>
          <AlertListPanel
            alerts={alerts}
            selectedAlert={selectedAlert}
            handleAlertSelect={setSelectedAlert}
          />
        </Grid>

        <Grid item xs={12} md={7.5} sx={{ display: "flex", flexDirection: "column" }}>
          <AlertDetailsPanel selectedAlert={selectedAlert} />
        </Grid>
      </Grid>
    </AlertsContainer>
  );
};

export default AlertCenterScreenCards;
