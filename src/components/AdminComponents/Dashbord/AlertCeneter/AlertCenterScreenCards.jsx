import { useEffect, useState } from "react";

import AlertListPanel from "./AlertListPanel";
import AlertDetailsPanel from "./AlertDetailsPanel";
import {
  AlertsContainer,
  AlertGridContainer,
  AlertGridColumn,
} from "./AlertCenterScreenCard.styles.jsx";
import { useServices } from "../../../../services/services.js";
import CommonLoading from "../../../../common/CommonLoading.jsx";

const AlertCenterScreenCards = ({ alerts = [] }) => {
  const [selectedAlert, setSelectedAlert] = useState(null);
  const { fetchApi } = useServices();
  const { LoadingContainer, setLoading } = CommonLoading();
  const [selectedNotificationId, setSelectedNotificationId] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (alerts.length > 0 && !selectedNotificationId) {
      handleAlertSelect(alerts[0]);
    }
  }, [alerts]);

  const fetchNotificationDetails = async (
    notificationId,
    fromDate,
    toDate,
    search,
  ) => {
    const endUrl =
      `/masteradmin/alert-center/notifications` +
      `?notification_id=${notificationId}` +
      `&from_date=${fromDate}` +
      `&to_date=${toDate}` +
      `&search=${search}`;

    return await fetchApi(endUrl);
  };

  const handleAlertSelect = async (alert) => {
    try {
      setLoading(true);
      setSelectedNotificationId(alert.notification_id);

      const alertDate = alert.created_at?.split(" ")[0];

      const response = await fetchNotificationDetails(
        alert.notification_id,
        alertDate,
        alertDate,
        alert.truck_number,
      );

      if (response?.statusCode === 200) {
        const notificationData = response?.body?.data?.[0];

        if (notificationData) {
          setSelectedAlert(notificationData);
        } else {
          setSelectedAlert(alert);
        }
      } else {
        setSelectedAlert(alert);
      }
    } catch (error) {
      console.error("Notification Details Error:", error);

      setSelectedAlert(alert);
    } finally {
      setLoading(false);
    }
  };

  return (
  <>
    <LoadingContainer />
    <AlertsContainer>
      <AlertGridContainer container alignItems="stretch">
        <AlertGridColumn item xs={12} md={4.5}>
          <AlertListPanel
            alerts={alerts}
            selectedAlert={selectedNotificationId}
            handleAlertSelect={handleAlertSelect}
            page={page}
            setPage={setPage}
          />
        </AlertGridColumn>

        <AlertGridColumn item xs={12} md={7.5}>
          <AlertDetailsPanel selectedAlert={selectedAlert} />
        </AlertGridColumn>
      </AlertGridContainer>
    </AlertsContainer>
  </>
  );
};

export default AlertCenterScreenCards;

