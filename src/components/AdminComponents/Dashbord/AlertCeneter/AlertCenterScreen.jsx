import { useState } from "react";
import { PageContainer } from "../../component.styled";
import AlertCenterScreenHeader from "./AlertCenterScreenHeader";
import AlertCenterScreenCards from "./AlertCenterScreenCards";
import {
  alertCenterAlerts,
  alertCategoryOptions,
  alertSeverityOptions,
} from "../AdminConstant";

const AlertCenterScreen = () => {
  const [data, setData] = useState({
    search: "",
    fromDate: null,
    toDate: null,
    category: "",
    severity: "",
    page: 1,
    pageSize: 10,
  });

  return (
    <PageContainer>
      <AlertCenterScreenHeader
        data={data}
        setData={setData}
        searchKey={0}
        categoryOptions={alertCategoryOptions}
        severityOptions={alertSeverityOptions}
      />
      <AlertCenterScreenCards alerts={alertCenterAlerts} />
    </PageContainer>
  );
};

export default AlertCenterScreen;
