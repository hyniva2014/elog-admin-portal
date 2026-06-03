import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import CommonDataGrid from "../../../common/CommonDataGrid";
import CommonSnackbar from "../../../common/CommonSnackbar";
import { PageContainer } from "../../../common/PageContainer";
import CommonLoading from "../../../common/CommonLoading";
import CommonDialogForm from "../../../common/CommonDialogForm";
import RequestDeviceHeader from "./RequestDeviceHeader";
import RequestDeviceForm from "./RequestDeviceForm";
// import AssignAssetForm from "./AssignAssetForm";
import { columns, statusOptions } from "./Constants";
import { useRequestDevices } from "../../../hooks/useRequestDevices";
import { useServices } from "../../../services/services";
import AssignAssetForm from "./AssignAssetForm";

const RequestDevice = () => {
  const { setLoading, LoadingContainer } = CommonLoading();
  const { allRows, total, isLoading, fetchRequestedDevices } =
    useRequestDevices();

  const [data, setData] = useState({
    total: 0,
    page: 1,
    pageSize: 25,
    search: "",
    status: "",
    fromDate: null,
    toDate: null,
  });

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  useEffect(() => {
    fetchRequestedDevices({
      page: data.page,
      pageSize: data.pageSize,
      search: data.search,
      status: data.status,
      fromDate: data.fromDate,
      toDate: data.toDate,
    });
  }, [
    data.page,
    data.pageSize,
    data.status,
    data.fromDate,
    data.toDate,
    data.search,
  ]);

  const handleDataChange = (updateOrFn) => {
    if (typeof updateOrFn === "function") {
      setData(updateOrFn);
    } else {
      setData((prev) => ({
        ...prev,
        page: updateOrFn.page ?? prev.page,
        pageSize: updateOrFn.pageSize ?? prev.pageSize,
        search: updateOrFn.search ?? prev.search,
        status: updateOrFn.status ?? prev.status,
        fromDate: updateOrFn.fromDate ?? prev.fromDate,
        toDate: updateOrFn.toDate ?? prev.toDate,
      }));
    }
  };

  const getRowHeight = () => "auto";
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [isAssignViewMode, setIsAssignViewMode] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isStockAvailable, setIsStockAvailable] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const submitRef = useRef(null);
  const assignSubmitRef = useRef(null);
  const { createApi, fetchApi } = useServices();
  const userDetails = useSelector(
    (state) => state.loginSlice.loginDetails?.body?.data?.userdetails,
  );

  const handleOpenRequestDialog = () => {
    setIsRequestDialogOpen(true);
  };

  const handleCloseRequestDialog = () => {
    setIsRequestDialogOpen(false);
  };

  const handleOpenAssignDialog = async (row) => {
    try {
      setLoading(true);
      const response = await fetchApi(`/masteradmin/requested-devices?id=${row.id}`);
      if (response?.statusCode === 200) {
        const fullData = response?.body?.data || {};
        const viewMode = row.status === "Approved";
        setSelectedRequest({
          ...row,
          ...fullData,
          status: row.status,
          requestedDevices: fullData.requested_devices_count || row.requestedDevices,
          company_id: fullData.company_id || row.company_id,
        });
        setIsAssignViewMode(viewMode);
        setIsAssignDialogOpen(true);
      } else {
        showSnackbar("Failed to fetch request details", "error");
      }
    } catch (error) {
      console.error("Error fetching request details:", error);
      showSnackbar("Failed to fetch request details", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAssignDialog = () => {
    setSelectedRequest(null);
    setIsAssignDialogOpen(false);
    setIsStockAvailable(true);
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const submitRequestDevice = async (values) => {
    try {
      setLoading(true);
      const endUrl = "/admin/requested-device/create";
      const payload = {
        company_id: userDetails?.company_id,
        requested_devices_count: Number(values.numberOfDevices),
        description: values.description?.trim(),
        requested_by: userDetails?.user_id,
      };

      const response = await createApi(payload, endUrl);
      if (response?.statusCode === 200) {
        showSnackbar(
          response?.body?.data?.message ||
            "Device request submitted successfully",
          "success",
        );
        setIsRequestDialogOpen(false);
        return;
      }

      showSnackbar(
        response?.body?.message ||
          response?.body?.data?.message ||
          "Failed to submit request",
        "error",
      );
    } catch (error) {
      console.error("Request Device submit error:", error);
      showSnackbar("Failed to submit request", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDialogSubmit = () => {
    submitRef.current?.();
  };

  const handleAssignDialogSubmit = () => {
    assignSubmitRef.current?.();
  };

  const submitAssignAsset = async (values) => {
    try {
      setLoading(true);
      const companyId = selectedRequest?.company_id || userDetails?.company_id;
      const payload = {
        company_id: companyId,
        device_ids: values.deviceIds || [],
      };
      const response = await createApi(payload, "/masteradmin/assign-devices");
      if (response?.statusCode === 200) {
        showSnackbar(
          response?.body?.data?.message || "Devices assigned successfully",
          "success",
        );
        setIsAssignDialogOpen(false);
        return;
      }
      showSnackbar(
        response?.body?.message ||
          response?.body?.data?.message ||
          "Failed to assign devices",
        "error",
      );
    } catch (error) {
      console.error("Assign asset submit error:", error);
      showSnackbar("Failed to assign asset", "error");
    } finally {
      setLoading(false);
    }
  };

  const columnsWithAssign = columns.map((col) =>
    col.field === "action"
      ? {
          ...col,
          onView: handleOpenAssignDialog,
        }
      : col,
  );

  const gridData = {
    ...data,
    total,
  };

  const dialogTitle = isAssignViewMode ? "View Asset" : "Assign Asset";
  const assignDialogSubmitHandler = isAssignViewMode
    ? handleCloseAssignDialog
    : handleAssignDialogSubmit;

  return (
    <>
      <LoadingContainer />
      <PageContainer>
        <RequestDeviceHeader
          data={gridData}
          setData={handleDataChange}
          searchKey={data.search}
          statusOptions={statusOptions}
          handleRequestDeviceClick={handleOpenRequestDialog}
        />
        <CommonDataGrid
          columnsData={columnsWithAssign}
          rowData={allRows}
          data={gridData}
          setData={handleDataChange}
          paginationMode="server"
          getRowHeight={getRowHeight}
        />
      </PageContainer>

      <CommonDialogForm
        open={isRequestDialogOpen}
        title="Request Devices"
        submitButtonText="Request Devices"
        onSubmit={handleDialogSubmit}
        onCancel={handleCloseRequestDialog}
        onClose={handleCloseRequestDialog}
        formId="request-device-form"
        content={
          <RequestDeviceForm
            formData={{}}
            onSubmit={submitRequestDevice}
            setSubmitRef={submitRef}
          />
        }
      />
      <CommonDialogForm
        open={isAssignDialogOpen}
        title={dialogTitle}
        submitButtonText={"Assign Asset"}
        onSubmit={assignDialogSubmitHandler}
        disableSubmit={isAssignViewMode || !isStockAvailable}
        onCancel={handleCloseAssignDialog}
        onClose={handleCloseAssignDialog}
        formId="assign-asset-form"
        content={
          <AssignAssetForm
            formData={{
              modelName: selectedRequest?.modelName || "",
              numberOfDevices: selectedRequest?.requestedDevices || selectedRequest?.requested_devices_count || "",
            }}
            onSubmit={submitAssignAsset}
            setSubmitRef={assignSubmitRef}
            isDisabled={isAssignViewMode}
            onStockStatusChange={setIsStockAvailable}
          />
        }
      />
      <CommonSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleSnackbarClose}
      />
    </>
  );
};

export default RequestDevice;
