import { useEffect, useState } from "react";
import { PageContainer } from "../../component.styled";
import AlertCenterScreenHeader from "./AlertCenterScreenHeader";
import AlertCenterScreenCards from "./AlertCenterScreenCards";
import {
  alertCenterAlerts,
  alertCategoryOptions,
  alertSeverityOptions,
} from "../AdminConstant";
import { useServices } from "../../../../services/services";

const AlertCenterScreen = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { fetchApi } = useServices();
  const [data, setData] = useState({
    search: "",
    fromDate: null,
    toDate: null,
    category: "",
    severity: "",
    page: 1,
    pageSize: 10,
  });

  const formatDate = (date) => {
    if (!date) return "";

    const d = new Date(date);

    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0",
    )}-${String(d.getDate()).padStart(2, "0")}`;
  };

  const fetchAlerts = async () => {
    setLoading(true);

    const endUrl =
      `/masteradmin/alert-center/notifications` +
      `?search=${data.search || ""}` +
      `&from_date=${formatDate(data.fromDate)}` +
      `&to_date=${formatDate(data.toDate)}` 

    const response = await fetchApi(endUrl);

    if (response?.statusCode === 200) {
      setAlerts(response?.body?.data || []);
    }

    setLoading(false);
  };
  useEffect(() => {
    fetchAlerts();
  }, [data.search, data.fromDate, data.toDate, data.category, data.severity]);

  return (
    <PageContainer>
      <AlertCenterScreenHeader
        data={data}
        setData={setData}
        searchKey={0}
        categoryOptions={alertCategoryOptions}
        severityOptions={alertSeverityOptions}
      />
      <AlertCenterScreenCards alerts={alerts} />
    </PageContainer>
  );
};

export default AlertCenterScreen;
