import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import CommonDataGrid from "@src/common/CommonDataGrid";
import { PageContainer } from "../../../common/PageContainer";
import CommonLoading from "../../../common/CommonLoading";
import AccessControl from "../../../common/AccessControl";
import DeviceManagementHeader from "./DeviceManagementHeader";
import { useServices } from "../../../services/services";
import CommonSnackbar from "../../../common/CommonSnackbar";
import { usePermissionRefresh } from "@src/hooks/usePermissionRefresh";
import {
  columns,
  transformDeviceData,
  DEVICE_SUMMARY_CARDS,
} from "./Constants";
import {
  buildSummaryCards,
  getSelectedDevices,
} from "../../../common/CommonUtils";
import AssignDevicesToCarriers from "./AssignDevicesToCarriers";
import { useLocation } from "react-router-dom";
import usePermissions from "../../../hooks/usePermissions";

const isDeviceSelectable = (params) => {
  return params.row.status?.toLowerCase() === "unassigned";
};

const DeviceManagement = () => {
  const location = useLocation();
  const defaultStatus = location.state?.status;
  const { fetchApi, createApi } = useServices();
  const { setLoading, LoadingContainer } = CommonLoading();
  const { refreshPermissions } = usePermissionRefresh();
  const { checkPermission } = usePermissions();
  const dispatch = useDispatch();
  const loginDetails = useSelector((state) => state.loginSlice.loginDetails || {});

  const canViewAll = checkPermission("Device Management", "DEVICE_VIEW_ALL");

  useEffect(() => {
    refreshPermissions(fetchApi);
  }, [refreshPermissions, fetchApi]);

  const [allRows, setAllRows] = useState([]);
  const [dynamicSummaryCards, setDynamicSummaryCards] = useState([]);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [data, setData] = useState({
    total: 0,
    page: 1,
    pageSize: 25,
    search: "",
    // status: "",
    status: defaultStatus || "",
    truckNumber: "",
    carrierId: "",
    fromDate: null,
    toDate: null,
    isLoading: false,
  });

  useEffect(() => {
    fetchDeviceList();
  }, [
    data.page,
    data.pageSize,
    data.status,
    data.fromDate,
    data.toDate,
    data.truckNumber,
    data.carrierId,
    data.search,
  ]);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const fetchDeviceList = async () => {
    try {
      setLoading(true);

      const queryParams = new URLSearchParams({
        page: data.page,
        limit: data.pageSize,
        company_id: data.carrierId,
        search: data.search,
        truck_number: data.truckNumber,
        status: data.status,
      });

      if (data.fromDate) {
        queryParams.append(
          "from_date",
          dayjs(data.fromDate).format("YYYY-MM-DD"),
        );
      }

      if (data.toDate) {
        queryParams.append("to_date", dayjs(data.toDate).format("YYYY-MM-DD"));
      }

      const endUrl = `/masteradmin/get-devices-list?${queryParams.toString()}`;

      const response = await fetchApi(endUrl);
      const apiData = response?.body?.data || [];
      const counts = response?.body?.counts || {};

      setAllRows(transformDeviceData(apiData));
      setDynamicSummaryCards(buildSummaryCards(counts, DEVICE_SUMMARY_CARDS));

      setData((prev) => ({
        ...prev,
        total: response?.body?.pagination?.total_records || 0,
      }));
      setLoading(false);
    } catch (error) {
      console.error("Fetch Device List Error:", error);
      setLoading(false);
    }
  };

  const handleClick = useCallback(() => {
    setIsAssignDialogOpen(true);
  }, []);

  const handleRowSelectionChange = (newSelection) => {
    setSelectedRows(newSelection);
    const selectedDeviceIds = getSelectedDevices(newSelection);
  };

  return (
    <>
      <LoadingContainer />
    <AccessControl hasAccess={canViewAll}>
      <PageContainer>
        <DeviceManagementHeader
          data={data}
          setData={setData}
          searchKey={data.search}
          summaryCards={dynamicSummaryCards}
          handleClick={handleClick}
        />
        <CommonDataGrid
          columnsData={columns}
          rowData={allRows}
          data={{
            ...data,
            total: data.total,
            isLoading: data.isLoading,
          }}
          setData={setData}
          paginationMode="server"
          getRowHeight={() => "auto"}
        />
      </PageContainer>
    </AccessControl>
      <CommonSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleSnackbarClose}
      />
    </>
  );
};

export default DeviceManagement;
