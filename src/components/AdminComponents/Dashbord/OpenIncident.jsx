import AlertCenterScreen from "./AlertCeneter/AlertCenterScreen";
import { ALERT_CENTRE_MODULES } from "./AdminConstant";

const OpenIncidents = () => {
    return (
        <AlertCenterScreen
            title="Open Incidents"
            hideCards={true}
            defaultCategory={ALERT_CENTRE_MODULES.INCIDENT_MANAGEMENT}
        />
    );
}
export default OpenIncidents;