import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import CommonDataGrid from "../../../common/CommonDataGrid";
import CommonSnackbar from "../../../common/CommonSnackbar";
import { PageContainer } from "../../../common/PageContainer";
import CommonLoading from "../../../common/CommonLoading";
import CommonDialogForm from "../../../common/CommonDialogForm";
import RequestDeviceHeader from "./RequestDeviceHeader";
import RequestDeviceForm from "./RequestDeviceForm";
import AssignAssetForm from "./AssignAssetForm";
import { columns, statusOptions, DIALOG_CONFIG } from "./Constants";
import { useRequestDevices } from "../../../hooks/useRequestDevices";
import { useRequestDeviceManager } from "../../../hooks/useRequestDeviceManager";

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

  const userDetails = useSelector(
    (state) => state.loginSlice.loginDetails?.body?.data?.userdetails,
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
  } = useRequestDeviceManager(userDetails, setLoading, fetchRequestedDevices);

  // useEffect(() => {
  //   setLoading(isLoading);
  // }, [isLoading, setLoading]);

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
            onSubmit={submitRequestDevice}
            setSubmitRef={submitRef}
          />
        }
      />
      <CommonDialogForm
        open={isAssignDialogOpen}
        title={DIALOG_CONFIG.ASSIGN_ASSET.TITLE}
        submitButtonText={DIALOG_CONFIG.ASSIGN_ASSET.SUBMIT_TEXT}
        onSubmit={handleAssignDialogSubmit}
        disableSubmit={!isStockAvailable}
        onCancel={handleCloseAssignDialog}
        onClose={handleCloseAssignDialog}
        formId={DIALOG_CONFIG.ASSIGN_ASSET.FORM_ID}
        content={
          <AssignAssetForm
            formData={{
              modelName: selectedRequest?.modelName || "",
              numberOfDevices: selectedRequest?.requestedDevices || selectedRequest?.requested_devices_count || "",
            }}
            onSubmit={submitAssignAsset}
            setSubmitRef={assignSubmitRef}
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
