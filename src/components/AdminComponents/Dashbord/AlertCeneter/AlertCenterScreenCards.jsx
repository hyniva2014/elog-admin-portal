import { useCallback, useEffect, useRef, useState } from "react";
import AlertListPanel from "./AlertListPanel";
import AlertDetailsPanel from "./AlertDetailsPanel";
import {
  AlertsContainer,
  AlertGridContainer,
  AlertGridColumn,
} from "./AlertCenterScreenCard.styles.jsx";
import CommonLoading from "../../../../common/CommonLoading.jsx";
import { useServices } from "../../../../services/services.js";

const AlertCenterScreenCards = ({
  alerts = [],
  initialNotificationId = null,
  page,
  setPage,
  totalPages,
  totalRecords = 0,
  isLoading = false,
}) => {
  const [selectedAlert, setSelectedAlert] = useState(null);
  const { LoadingContainer, setLoading } = CommonLoading();
  const { fetchApi } = useServices();
  const [selectedNotificationId, setSelectedNotificationId] = useState(null);
  const initialHandledRef = useRef(false);
  const firstAlertHandledRef = useRef(false);
  const prevAlertsLengthRef = useRef(0);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  const fetchNotificationDetails = useCallback(
    async (notificationId) => {
      try {
        const endUrl = `/masteradmin/alert-center/notifications?notification_id=${notificationId}`;
        const response = await fetchApi(endUrl);
        if (response?.statusCode === 200) {
          const notificationData = response?.body?.data?.[0];
          if (notificationData) {
            return notificationData;
          }
        }
        return null;
      } catch (error) {
        console.error("Error fetching notification details:", error);
        return null;
      }
    },
    [fetchApi],
  );

  const handleAlertSelect = useCallback(
    async (alert) => {
      try {
        setLoading(true);
        setSelectedNotificationId(alert.notification_id);

        const notificationData = await fetchNotificationDetails(
          alert.notification_id,
        );
        setSelectedAlert(notificationData || alert);
      } catch (error) {
        console.error("Notification Details Error:", error);
        setSelectedAlert(alert);
      } finally {
        setLoading(false);
      }
    },
    [fetchNotificationDetails, setLoading],
  );

  useEffect(() => {
    if (alerts.length === 0) {
      setSelectedAlert(null);
      setSelectedNotificationId(null);
      firstAlertHandledRef.current = false;
      prevAlertsLengthRef.current = 0;
      return;
    }

    // If alerts went from 0 to >0, reset the first alert handler
    if (prevAlertsLengthRef.current === 0 && alerts.length > 0) {
      firstAlertHandledRef.current = false;
    }
    prevAlertsLengthRef.current = alerts.length;

    // Check if selected alert is still in the current alerts
    if (selectedNotificationId) {
      const stillExists = alerts.some(
        (a) => (a.notification_id ?? a.id) === selectedNotificationId
      );
      if (!stillExists) {
        firstAlertHandledRef.current = false;
      }
    }

    if (initialNotificationId && !initialHandledRef.current) {
      initialHandledRef.current = true;
      const target = alerts.find(
        (a) => (a.notification_id ?? a.id) === initialNotificationId,
      );
      if (target) {
        handleAlertSelect(target);
        return;
      }
    }

    if (
      !selectedNotificationId &&
      !firstAlertHandledRef.current &&
      alerts.length > 0
    ) {
      firstAlertHandledRef.current = true;
      handleAlertSelect(alerts[0]);
    }
  }, [
    alerts,
    initialNotificationId,
    selectedNotificationId,
    handleAlertSelect,
  ]);

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
              totalPages={totalPages}
              totalRecords={totalRecords}
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
