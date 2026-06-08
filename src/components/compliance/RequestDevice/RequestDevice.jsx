import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import CommonDataGrid from "../../../common/CommonDataGrid";
import CommonSnackbar from "../../../common/CommonSnackbar";
import { PageContainer } from "../../../common/PageContainer";
import CommonLoading from "../../../common/CommonLoading";
import CommonDialogForm from "../../../common/CommonDialogForm";
import RequestDeviceHeader from "./RequestDeviceHeader";
import RequestDeviceForm from "./RequestDeviceForm";
import AssignAssetForm from "./AssignAssetForm";
import {
  columns,
  statusOptions,
  DIALOG_CONFIG,
  CONFIRMATION_DIALOG_TITLE,
} from "./Constants";
import { useRequestDevices } from "../../../hooks/useRequestDevices";
import { useRequestDeviceManager } from "../../../hooks/useRequestDeviceManager";
import { getColumnsWithAssign } from "./requestDevice.utils";
import RequestDevicePopupMessage from "./RequestDevicePopupMessage";

const RequestDevice = () => {
  const { setLoading, LoadingContainer } = CommonLoading();
  const { allRows, total, isLoading, fetchRequestedDevices } =
    useRequestDevices();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedRequestData, setSelectedRequestData] = useState(null);
  const [stockInfo, setStockInfo] = useState(null);
  const [companyOptions, setCompanyOptions] = useState([]);
  const [data, setData] = useState({
    total: 0,
    page: 1,
    pageSize: 25,
    search: "",
    status: "",
    fromDate: null,
    toDate: null,
  });

  const userDetails = useSelector(
    (state) => state.loginSlice.loginDetails?.body?.data?.userdetails,
  );
  const companyId = useSelector(
    (state) =>
      state.loginSlice.loginDetails?.body?.data?.userdetails?.company_id,
  );
  const {
    isRequestDialogOpen,
    isAssignDialogOpen,
    selectedRequest,
    isStockAvailable,
    setIsStockAvailable,
    submitRef,
    assignSubmitRef,
    handleOpenRequestDialog,
    handleCloseRequestDialog,
    handleOpenAssignDialog,
    handleCloseAssignDialog,
    submitRequestDevice,
    submitAssignAsset,
    handleDialogSubmit,
    handleAssignDialogSubmit,
    snackbar,
    handleSnackbarClose,
    checkDeviceStock,
    approveDeviceAllocation,
    getCompanyOptions,
  } = useRequestDeviceManager(userDetails, setLoading, fetchRequestedDevices);

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

  const loadCompanies = useCallback(async () => {
    const options = await getCompanyOptions();
    setCompanyOptions(options);
  }, [getCompanyOptions]);

  useEffect(() => {
    loadCompanies();
  }, []);

  const handleDataChange = useCallback((updateOrFn) => {
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
  }, []);

  const getRowHeight = useCallback(() => "auto", []);

  const handleCloseConfirmDialog = useCallback(() => {
    setConfirmDialogOpen(false);
  }, []);

  const handleAttachmentClick = useCallback(
    async (row) => {
      setSelectedRequestData(row);

      const count = row.requestedDevices;

      const response = await checkDeviceStock(count);

      if (!response?.body) {
        return;
      }

      setStockInfo(response.body);
      setConfirmDialogOpen(true);
    },
    [checkDeviceStock],
  );

  const isApproveDisabled = useMemo(() => {
    const available = stockInfo?.available_count || 0;
    const requested = selectedRequestData?.requestedDevices || 0;

    return available < requested;
  }, [stockInfo, selectedRequestData]);

  const handleApproveAllocation = useCallback(async () => {
    const payload = {
      company_id: selectedRequestData.company_id || companyId,
      request_id: selectedRequestData.id,
      requested_devices_count: selectedRequestData.requestedDevices,
      device_ids: stockInfo.device_id || [],
    };

    const response = await approveDeviceAllocation(payload);

    if (response?.statusCode === 200) {
      setConfirmDialogOpen(false);

      fetchRequestedDevices({
        page: data.page,
        pageSize: data.pageSize,
      });
    }
  }, [
    selectedRequestData,
    stockInfo,
    companyId,
    approveDeviceAllocation,
    fetchRequestedDevices,
    data.page,
    data.pageSize,
  ]);

  const columnsWithAssign = useMemo(
    () => getColumnsWithAssign(columns, handleAttachmentClick),
    [handleAttachmentClick],
  );

  const gridData = {
    ...data,
    total,
  };

  const assignFormData = useMemo(
    () => ({
      modelName: selectedRequest?.modelName || "",
      numberOfDevices:
        selectedRequest?.requestedDevices ||
        selectedRequest?.requested_devices_count ||
        "",
    }),
    [
      selectedRequest?.modelName,
      selectedRequest?.requestedDevices,
      selectedRequest?.requested_devices_count,
    ],
  );

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
        title={DIALOG_CONFIG.REQUEST_DEVICE.TITLE}
        submitButtonText={DIALOG_CONFIG.REQUEST_DEVICE.SUBMIT_TEXT}
        onSubmit={handleDialogSubmit}
        onCancel={handleCloseRequestDialog}
        onClose={handleCloseRequestDialog}
        formId={DIALOG_CONFIG.REQUEST_DEVICE.FORM_ID}
        content={
          <RequestDeviceForm
            formData={{}}
            companyOptions={companyOptions}
            onSubmit={submitRequestDevice}
            setSubmitRef={submitRef}
          />
        }
      />
      <CommonDialogForm
        open={confirmDialogOpen}
        title={CONFIRMATION_DIALOG_TITLE}
        submitButtonText="Approve"
        disableSubmit={isApproveDisabled}
        onSubmit={handleApproveAllocation}
        onCancel={handleCloseConfirmDialog}
        onClose={handleCloseConfirmDialog}
        content={
          <RequestDevicePopupMessage
            available={stockInfo?.available_count ?? 0}
            requested={selectedRequestData?.requestedDevices ?? 0}
            carrierName={selectedRequestData?.carrierName ?? ""}
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
