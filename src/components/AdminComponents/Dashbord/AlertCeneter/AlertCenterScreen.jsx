import { useCallback, useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { PageContainer } from "../../component.styled";
import AlertCenterScreenHeader from "./AlertCenterScreenHeader";
import AlertCenterScreenCards from "./AlertCenterScreenCards";
import {
  alertCenterAlerts,
  alertCategoryOptions,
  alertSeverityOptions,
  ALERT_CENTRE_MODULES,
  ALERT_CENTRE_SEVERITY,
} from "../AdminConstant";
import { useServices } from "../../../../services/services";
import { AlertCenterRowData } from "../AlertCenterUtils";
import {
  TotalCarrierIcon,
  ActiveDevicesCardIcon,
  OpenIncidentsIcon,
  FMCSAIcon,
} from "../AdminDashboard.icons";
import { getCompaniesDropdown } from "../../../compliance/UserManagement/userManagementService";
import dayjs from "dayjs";

const AlertCenterScreen = ({ title = "Alert Center", hideCards = false, defaultCategory = null }) => {
  const location = useLocation();
  const initialNotificationId = location.state?.notificationId ?? null;
  const viewAll = location.state?.viewAll ?? false;
  const hasFetchedRef = useRef(false);
  const lastFetchKeyRef = useRef(null);

  // Set current date as default for date filter
  const today = dayjs().startOf("day");
  const todayEnd = dayjs().endOf("day");
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [limit, setLimit] = useState(10);
  const [summaryCards, setSummaryCards] = useState([]);
  const { fetchApi } = useServices();
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState(todayEnd);
  const [category, setCategory] = useState(defaultCategory);
  const [severity, setSeverity] = useState(null);
  const [company, setCompany] = useState(null);
  const [companyOptions, setCompanyOptions] = useState([]);

  const formatDate = (date) => {
    if (!date) return "";

    const d = dayjs(date);

    return `${d.format("YYYY-MM-DD")}`;
  };

  const buildSummaryCards = (summaryData) => {
    const moduleLabels = {
      [ALERT_CENTRE_MODULES.MOBILE_MODULE]: "Mobile Module",
      [ALERT_CENTRE_MODULES.CARRIER_REQUESTS]: "Carrier Requests",
      [ALERT_CENTRE_MODULES.ASSET_MANAGEMENT]: "Asset Management",
      [ALERT_CENTRE_MODULES.ELD_DEVICE_MONITORING]: "ELD Device Monitoring",
      [ALERT_CENTRE_MODULES.INCIDENT_MANAGEMENT]: "Incident Management",
      [ALERT_CENTRE_MODULES.SYSTEM_MONITORING]: "System Monitoring",
      [ALERT_CENTRE_MODULES.APPLICATION_ERRORS]: "Application Errors",
      [ALERT_CENTRE_MODULES.SECURITY]: "Security",
      [ALERT_CENTRE_MODULES.INTEGRATION]: "Integration",
      [ALERT_CENTRE_MODULES.TRACKPULSE_PLATFORM]: "TrackPulse Platform",
    };

    const moduleIcons = {
      [ALERT_CENTRE_MODULES.MOBILE_MODULE]: ActiveDevicesCardIcon,
      [ALERT_CENTRE_MODULES.CARRIER_REQUESTS]: TotalCarrierIcon,
      [ALERT_CENTRE_MODULES.ASSET_MANAGEMENT]: ActiveDevicesCardIcon,
      [ALERT_CENTRE_MODULES.ELD_DEVICE_MONITORING]: ActiveDevicesCardIcon,
      [ALERT_CENTRE_MODULES.INCIDENT_MANAGEMENT]: OpenIncidentsIcon,
      [ALERT_CENTRE_MODULES.SYSTEM_MONITORING]: FMCSAIcon,
      [ALERT_CENTRE_MODULES.APPLICATION_ERRORS]: FMCSAIcon,
      [ALERT_CENTRE_MODULES.SECURITY]: FMCSAIcon,
      [ALERT_CENTRE_MODULES.INTEGRATION]: ActiveDevicesCardIcon,
      [ALERT_CENTRE_MODULES.TRACKPULSE_PLATFORM]: TotalCarrierIcon,
    };

    // Create cards for all 10 modules, using count from API or 0 if not present
    return Object.keys(ALERT_CENTRE_MODULES).map((key) => {
      const moduleValue = ALERT_CENTRE_MODULES[key];
      const summaryItem = summaryData.find((item) => item.alert_module === moduleValue);
      const count = summaryItem ? summaryItem.count : 0;

      return {
        id: key.toLowerCase(),
        title: moduleLabels[moduleValue],
        value: String(count),
        icon: moduleIcons[moduleValue],
      };
    });
  };

  const fetchApiRef = useRef(fetchApi);
  fetchApiRef.current = fetchApi;

  const fetchAlerts = useCallback(async () => {
    setLoading(true);

    try {
      const endUrl =
        `/masteradmin/alert-center-notifications` +
        `?search=${search || ""}` +
        `&from_date=${formatDate(fromDate)}` +
        `&to_date=${formatDate(toDate)}` +
        `&alert_module=${category || ""}` +
        `&alert_severity=${severity || ""}` +
        `&company_id=${company || ""}` +
        `&page=${page}` +
        `&limit=${limit}`;

      const response = await fetchApiRef.current(endUrl);

      if (response?.statusCode === 200) {
        const records = response?.body?.data || [];
        const mappedAlerts = AlertCenterRowData(records);
        setAlerts(mappedAlerts);
        setTotalPages(response?.body?.pagination?.total_pages || 1);
        setTotalRecords(response?.body?.pagination?.total_records || 0);
        console.log("Set totalRecords to:", response?.body?.pagination?.total_records || 0);

        // Process summary data for cards
        const summaryData = response?.body?.summary || [];
        const cards = buildSummaryCards(summaryData);
        setSummaryCards(cards);
      } else {
        setAlerts([]);
        setTotalPages(1);
        setTotalRecords(0);
        setSummaryCards([]);
      }
    } catch (error) {
      console.error("Error fetching alerts:", error);
      setAlerts([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [search, fromDate, toDate, category, severity, company, page, limit]);

  useEffect(() => {
    const fetchKey = JSON.stringify({ search, fromDate, toDate, category, severity, company, page, limit });

    if (!hasFetchedRef.current) {
      hasFetchedRef.current = true;
    }

    if (lastFetchKeyRef.current === fetchKey) {
      console.log("Skipping duplicate fetch with same key");
      return;
    }

    lastFetchKeyRef.current = fetchKey;
    fetchAlerts();
  }, [fetchAlerts]);

  // Fetch company options on mount
  useEffect(() => {
    const fetchCompanyOptions = async () => {
      try {
        const response = await getCompaniesDropdown(fetchApi);
        console.log("Company dropdown response:", response);
        if (response?.statusCode === 200 && response?.body?.data) {
          const options = response.body.data.map((company) => ({
            value: company.company_id,
            label: company.company_name,
          }));
          console.log("Company options:", options);
          setCompanyOptions(options);
        }
      } catch (error) {
        console.error("Error fetching company options:", error);
      }
    };

    fetchCompanyOptions();
  }, [fetchApi]);

  return (
    <PageContainer>
      <AlertCenterScreenHeader
        title={title}
        hideCards={hideCards}
        search={search}
        setSearch={setSearch}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
        category={category}
        setCategory={setCategory}
        severity={severity}
        setSeverity={setSeverity}
        company={company}
        setCompany={setCompany}
        page={page}
        setPage={setPage}
        searchKey={0}
        categoryOptions={defaultCategory ? alertCategoryOptions.filter(opt => opt.value === defaultCategory) : alertCategoryOptions}
        severityOptions={alertSeverityOptions}
        companyOptions={companyOptions}
        summaryCards={summaryCards}
        defaultCategory={defaultCategory}
      />
      <AlertCenterScreenCards
        alerts={alerts}
        initialNotificationId={initialNotificationId}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        totalRecords={totalRecords}
        isLoading={loading}
      />
    </PageContainer>
  );
};

export default AlertCenterScreen;
