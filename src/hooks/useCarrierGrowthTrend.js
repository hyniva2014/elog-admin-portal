import { useState, useEffect } from "react";
import { useServices } from "../services/services";
import CommonLoading from "../common/CommonLoading";

export default function useCarrierGrowthTrend(selectedYear) {
  const { fetchApi } = useServices();
  const [carrierGrowthTrend, setCarrierGrowthTrend] = useState(null);
  const { loading, setLoading, LoadingContainer } = CommonLoading();


  useEffect(() => {
    let active = true;

    const fetchTrend = async () => {
      setLoading(true);
      try {
        const endURL = `/masteradmin/dashboard-metrics?year=${selectedYear}`;
        const response = await fetchApi(endURL);

        if (!active) return;

        const trend = response?.body?.carrier_growth_trend;
        setCarrierGrowthTrend(trend || null);
      } catch (error) {
        console.error("Error fetching carrier growth trend:", error);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchTrend();

    return () => {
      active = false;
    };
  }, [selectedYear]);

  return { carrierGrowthTrend, loading };
}
