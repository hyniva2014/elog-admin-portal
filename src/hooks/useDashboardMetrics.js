import { useState, useEffect } from "react";
import { useServices } from "../services/services";

export default function useDashboardMetrics(selectedRange) {
  const { fetchApi } = useServices();
  const [dashboardMetrics, setDashboardMetrics] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;

    const loadMetrics = async () => {
      setLoading(true);
      try {
        const endURL = `/masteradmin/dashboard-metrics`;
        const response = await fetchApi(endURL);

        if (!active) return;

        const metrics = response?.body?.dashboard_metrics;
        setDashboardMetrics(metrics || null);
      } catch (error) {
        console.error("Error fetching dashboard metrics:", error);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadMetrics();

    return () => {
      active = false;
    };
  }, [selectedRange, fetchApi]);

  return { dashboardMetrics, loading };
}
