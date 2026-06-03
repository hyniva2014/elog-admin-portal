import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useServices } from "../services/services";
import CommonLoading from "../common/CommonLoading";

/**
 * Mapping of incident types from API to display names
 */
const INCIDENT_TYPE_MAPPING = {
  HOS: "HOS",
  LOGS: "Mobile - Driver Log",
  DVIR: "DVIR",
  DOT: "DOT",
  ACCIDENT: "ACCIDENT",
  TEAM_DRIVER: "TEAM_DRIVER",
  PROFILE: "PROFILE",
  COMPLIANCE_DASHBOARD: "Web - Compliance Management",
  VIOLATIONS: "VIOLATIONS",
  DOCUMENT_CENTER: "DOCUMENT_CENTER",
  OPERATION_CENTER: "OPERATION_CENTER",
  HOS_SETTINGS: "HOS_SETTINGS",
  ROLES: "ROLES",
  USERS: "USERS",
  REPORT_INCIDENT: "REPORT_INCIDENT",
  REPORTS: "REPORTS",
};

/**
 * Color mapping for each incident type
 */
const INCIDENT_COLORS = {
  "Mobile - Driver Log": "#E20021",
  "Web - Compliance Management": "#2563EB",
  "HOS": "#FE5429",
  "DVIR": "#30C151",
  "DOT": "#FF9800",
  "ACCIDENT": "#9C27B0",
  "TEAM_DRIVER": "#00BCD4",
  "VIOLATIONS": "#F44336",
};

/**
 * Get color for an incident type, with fallback
 */
const getIncidentColor = (displayName) => {
  return INCIDENT_COLORS[displayName] || "#757575";
};

/**
 * Transform API data for 7-day period
 * API returns data with individual dates as keys OR date ranges
 * This function handles both formats
 */
const transform7DayData = (apiData) => {
  if (!apiData) {
    return { categories: [], series: [], dateRange: null };
  }

  const distribution = apiData;
  const keys = Object.keys(distribution).sort();

  if (keys.length === 0) {
    return { categories: [], series: [], dateRange: null };
  }

  // Check if data is in date range format (e.g., "2026-05-01 - 2026-05-07")
  const isRangeFormat = keys[0].includes(" - ");

  if (isRangeFormat) {
    // If API returns ranges even for 7 days, use the 30-day transformation
    return transform30DayData(apiData);
  }

  // Original logic for individual dates
  const dates = keys;

  // Generate categories (display labels) - Format: "Mar 28"
  const categories = dates.map((date) => dayjs(date).format("MMM D"));

  // Calculate date range for subtitle
  const startDate = dayjs(dates[0]).format("MMM D, YYYY");
  const endDate = dayjs(dates[dates.length - 1]).format("MMM D, YYYY");
  const dateRange = `${startDate} – ${endDate}`;

  // Get all unique incident types
  const incidentTypesSet = new Set();
  dates.forEach((date) => {
    Object.keys(distribution[date]).forEach((key) => {
      if (key !== "total") {
        incidentTypesSet.add(key);
      }
    });
  });

  // Transform to series format
  const series = Array.from(incidentTypesSet)
    .filter((type) => {
      // Check if this incident type has any non-zero values
      return dates.some((date) => distribution[date][type] > 0);
    })
    .map((type) => {
      const displayName = INCIDENT_TYPE_MAPPING[type] || type;
      return {
        name: displayName,
        data: dates.map((date) => distribution[date][type] || 0),
        color: getIncidentColor(displayName),
      };
    });

  return { categories, series, dateRange };
};

/**
 * Transform API data for 30-day period
 * API returns data with date ranges as keys (e.g., "2026-05-01 - 2026-05-07")
 */
const transform30DayData = (apiData) => {
  if (!apiData) {
    return { categories: [], series: [], dateRange: null };
  }

  const distribution = apiData;
  const dateRanges = Object.keys(distribution).sort((a, b) => {
    const dateA = a.split(" - ")[0];
    const dateB = b.split(" - ")[0];
    return dateA.localeCompare(dateB);
  });

  if (dateRanges.length === 0) {
    return { categories: [], series: [], dateRange: null };
  }

  // Generate categories (display labels) - Format: "May 1 - May 7"
  const categories = dateRanges.map((range) => {
    const [start, end] = range.split(" - ");
    const startFormatted = dayjs(start).format("MMM D");
    const endFormatted = dayjs(end).format("MMM D");
    return `${startFormatted} - ${endFormatted}`;
  });

  // Calculate overall date range for subtitle
  const firstRange = dateRanges[0].split(" - ")[0];
  const lastRange = dateRanges[dateRanges.length - 1].split(" - ")[1];
  const startDate = dayjs(firstRange).format("MMM D, YYYY");
  const endDate = dayjs(lastRange).format("MMM D, YYYY");
  const dateRange = `${startDate} – ${endDate}`;

  // Get all unique incident types
  const incidentTypesSet = new Set();
  dateRanges.forEach((range) => {
    Object.keys(distribution[range]).forEach((key) => {
      if (key !== "total") {
        incidentTypesSet.add(key);
      }
    });
  });

  // Transform to series format
  const series = Array.from(incidentTypesSet)
    .filter((type) => {
      // Check if this incident type has any non-zero values
      return dateRanges.some((range) => distribution[range][type] > 0);
    })
    .map((type) => {
      const displayName = INCIDENT_TYPE_MAPPING[type] || type;
      return {
        name: displayName,
        data: dateRanges.map((range) => distribution[range][type] || 0),
        color: getIncidentColor(displayName),
      };
    });

  return { categories, series, dateRange };
};

/**
 * Custom hook for fetching and managing incident distribution data
 * Follows the same pattern as useCarrierGrowthTrend
 */
export default function useIncidentDistribution(period, incidentScope) {
  const { fetchApi } = useServices();
  const [incidentDistribution, setIncidentDistribution] = useState(null);
  const { loading, setLoading, LoadingContainer } = CommonLoading();

  useEffect(() => {
    let active = true;

    const fetchIncidentDistribution = async () => {
      setLoading(true);
      try {
        // Calculate date range based on period
        const today = dayjs();
        let fromDate, toDate;

        switch (period) {
          case "7d":
            fromDate = today.subtract(6, "day").format("YYYY-MM-DD");
            toDate = today.format("YYYY-MM-DD");
            break;
          case "30d":
            fromDate = today.subtract(29, "day").format("YYYY-MM-DD");
            toDate = today.format("YYYY-MM-DD");
            break;
          case "90d":
            fromDate = today.subtract(89, "day").format("YYYY-MM-DD");
            toDate = today.format("YYYY-MM-DD");
            break;
          default:
            fromDate = today.subtract(6, "day").format("YYYY-MM-DD");
            toDate = today.format("YYYY-MM-DD");
        }

        // Map incident scope to status
        // All Incident: 2, Open only: 0, Resolved: 1
        const statusMap = {
          all: "2", // Default status=2 for "All Incident"
          open: "0",
          resolved: "1",
        };

        // Build query parameters - always include status
        const statusParam = statusMap[incidentScope] || "2";
        const queryParams = [
          `from_date=${fromDate}`,
          `to_date=${toDate}`,
          `status=${statusParam}`,
        ].join("&");

        const endURL = `/masteradmin/incident-distribution?${queryParams}`;
        
        console.log("Fetching incident distribution:", endURL); // Debug log
        
        const response = await fetchApi(endURL);

        if (!active) return;

        console.log("Incident distribution response:", response); // Debug log

        const distribution = response?.body?.incident_distribution;
        
        // Transform data based on period
        // For 7 days, API returns individual dates
        // For 30+ days, API returns date ranges
        const transformedData =
          period === "7d"
            ? transform7DayData(distribution)
            : transform30DayData(distribution);

        setIncidentDistribution(transformedData);
      } catch (error) {
        console.error("Error fetching incident distribution:", error);
        if (active) {
          setIncidentDistribution({ categories: [], series: [], dateRange: null });
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchIncidentDistribution();

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period, incidentScope]);

  return { incidentDistribution, loading, LoadingContainer };
}
