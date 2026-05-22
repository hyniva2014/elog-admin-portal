import { useState, useEffect } from "react";
import { useServices } from "../services/services";

export default function useDeviceLifecycle(year) {
  const { fetchApi } = useServices();
  const [deviceLifecycle, setDeviceLifecycle] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;

    const fetchLifecycle = async () => {
      setLoading(true);
      try {
        const response = await fetchApi(
          `/masteradmin/dashboard-metrics?year=${year}`,
        );

        if (!active) return;

        const lifecycle = response?.body?.device_life_cycle;
        setDeviceLifecycle(lifecycle || null);
      } catch (error) {
        console.error("Error fetching device lifecycle status:", error);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchLifecycle();

    return () => {
      active = false;
    };
  }, [year]);

  return { deviceLifecycle, loading };
}
