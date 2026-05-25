import React, { useMemo, useEffect } from "react";
import CommonDataGrid from "@src/common/CommonDataGrid";
import { PageContainer } from "@src/common/PageContainer";
import CommonLoading from "@src/common/CommonLoading";
import CommonDialogForm from "@src/common/CommonDialogForm";
import CommonSnackbar from "@src/common/CommonSnackbar";
import DeviceModelManagementHeader from "./DeviceModelManagementHeader";
import DeviceModelManagementForm from "./DeviceModelManagementForm";
import { GridContainer } from "./DeviceModelManagement.styled";
import { HeaderEditButton, HeaderCancelEditButton } from "./DeviceModelManagementButtons";
import { DEVICE_MODEL_STATUS_FILTER_OPTIONS, ASSET_TYPE_FILTER_OPTIONS } from "./Constants";
import { getColumns, getRowHeight } from "./DeviceModelManagementTable.utils";
import useDeviceModelManagement from "@src/hooks/useDeviceModelManagement";

const getDialogTitle = (isEditMode, isEditing) => {
  if (!isEditMode) return "Add Device Model";
  return isEditing ? "Edit Device Model" : "View Device Model";
};

const getSubmitButtonLabel = (isEditMode, isEditing) => {
  if (!isEditMode) return "Add Device";
  return isEditing ? "Update" : "Save";
};

const getFormKey = (deviceModelId) => {
  return deviceModelId || "new";
};

const DeviceModelManagement = () => {
  const { setLoading, LoadingContainer } = CommonLoading();

  const {
    allRows,
    modelOptions,
    isLoading,
    data,
    setData,
    snackbar,
    isAddModalOpen,
    formDefaultValues,
    isEditMode,
    isEditing,
    handleSnackbarClose,
    handleClick,
    handleViewClick,
    handleEditClick,
    handleCancelEdit,
    handleAddSubmit,
    handleAddCancel,
  } = useDeviceModelManagement();

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  const columns = useMemo(() => getColumns(handleViewClick), [handleViewClick]);

  const gridData = {
    ...data,
    rows: allRows,
    columns,
    total: data.total,
  };

  let headerActionsElement = null;
  if (isEditMode && !isEditing) {
    headerActionsElement = <HeaderEditButton onClick={handleEditClick} />;
  } else if (isEditMode && isEditing) {
    headerActionsElement = <HeaderCancelEditButton onClick={handleCancelEdit} />;
  }

  const dialogMode = isEditMode ? "edit" : "add";
  const dialogTitle = getDialogTitle(isEditMode, isEditing);
  const submitButtonLabel = getSubmitButtonLabel(isEditMode, isEditing);
  const formKey = getFormKey(formDefaultValues.deviceModelId);

  return (
    <>
      <LoadingContainer />
      <PageContainer>
        <DeviceModelManagementHeader
          data={gridData}
          setData={setData}
          searchKey={0}
          summaryCards={[]}
          handleClick={handleClick}
          modelOptions={modelOptions}
          statusOptions={DEVICE_MODEL_STATUS_FILTER_OPTIONS}
          assetTypeOptions={ASSET_TYPE_FILTER_OPTIONS}
        />
        <GridContainer>
          <CommonDataGrid
            columnsData={columns}
            rowData={allRows}
            data={gridData}
            setData={setData}
            paginationMode="server"
            getRowHeight={getRowHeight}
          />
        </GridContainer>
      </PageContainer>

      <CommonSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleSnackbarClose}
      />

      <CommonDialogForm
        open={isAddModalOpen}
        onCancel={handleAddCancel}
        mode={dialogMode}
        title={dialogTitle}
        formId="addDeviceModelForm"
        loading={isLoading}
        isEditing={isEditing}
        headerActions={headerActionsElement}
        submitButtonText={submitButtonLabel}
        content={
          <DeviceModelManagementForm
            key={formKey}
            formId="addDeviceModelForm"
            defaultValues={formDefaultValues}
            isEditing={isEditing}
            isEditMode={isEditMode}
            onSubmit={handleAddSubmit}
          />
        }
      />
    </>
  );
};

export default DeviceModelManagement;
