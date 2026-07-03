import React, { useMemo, useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonDataGrid from "@src/common/CommonDataGrid";
import { PageContainer } from "@src/common/PageContainer";
import CommonLoading from "@src/common/CommonLoading";
import AccessControl from "@src/common/AccessControl";
import CommonDialogForm from "@src/common/CommonDialogForm";
import CommonSnackbar from "@src/common/CommonSnackbar";
import DeviceModelManagementHeader from "./DeviceModelManagementHeader";
import DeviceModelManagementForm from "./DeviceModelManagementForm";
import { GridContainer } from "./DeviceModelManagement.styled";
import {
  HeaderEditButton,
  HeaderCancelEditButton,
} from "./DeviceModelManagementButtons";
import {
  DEVICE_MODEL_STATUS_FILTER_OPTIONS,
  ASSET_TYPE_FILTER_OPTIONS,
} from "./Constants";
import { getColumns, getRowHeight } from "./DeviceModelManagementTable.utils";
import useDeviceModelManagement from "@src/hooks/useDeviceModelManagement";
import { usePermissions } from "@src/hooks/usePermissions";
import { useServices } from "@src/services/services";
import { usePermissionRefresh } from "@src/hooks/usePermissionRefresh";
import useUnsavedChangesDialog from "../useUnsavedChangesDialog";

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

const getHeaderActionsElement = (
  isEditMode,
  isEditing,
  handleEditClick,
  canUpdate,
) => {
  if (!isEditMode || isEditing) {
    return null;
  }

  return <HeaderEditButton onClick={handleEditClick} disabled={!canUpdate} />;
};

const DeviceModelManagement = () => {
  const { setLoading, LoadingContainer } = CommonLoading();
  const { checkPermission, permissions } = usePermissions();
  const dispatch = useDispatch();
  const [hasChanges, setHasChanges] = useState(false);
  const loginDetails = useSelector(
    (state) => state.loginSlice.loginDetails || {},
  );
  const { fetchApi } = useServices();

  const canCreate = checkPermission(
    "Device Model Management",
    "DEVICE_MODEL_CREATE",
  );

  const canUpdate = checkPermission(
    "Device Model Management",
    "DEVICE_MODEL_UPDATE",
  );

  const canView = checkPermission(
    "Device Model Management",
    "DEVICE_MODEL_VIEW",
  );

  const canViewAll = checkPermission(
    "Device Model Management",
    "DEVICE_MODEL_VIEW_ALL",
  );

  const { refreshPermissions } = usePermissionRefresh();
  useEffect(() => {
    refreshPermissions(fetchApi);
  }, [refreshPermissions, fetchApi]);

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
    handleClick: hookHandleClick,
    handleViewClick: hookHandleViewClick,
    handleEditClick: hookHandleEditClick,
    handleCancelEdit,
    handleAddSubmit: hookHandleAddSubmit,
    handleAddCancel,
  } = useDeviceModelManagement();

  const handleClick = useCallback(() => {
    hookHandleClick();
  }, [hookHandleClick]);

  const handleViewClick = useCallback(
    (row) => {
      hookHandleViewClick(row);
    },
    [hookHandleViewClick],
  );

  const handleEditClick = useCallback(() => {
    hookHandleEditClick();
  }, [hookHandleEditClick]);

  const handleAddSubmit = useCallback(
    async (formValues) => {
      await hookHandleAddSubmit(formValues);
    },
    [hookHandleAddSubmit],
  );

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  const columns = useMemo(
    () => getColumns(handleViewClick, canView),
    [handleViewClick, canView],
  );

  const gridData = {
    ...data,
    rows: allRows,
    columns,
    total: data.total,
  };

  const headerActionsElement = getHeaderActionsElement(
    isEditMode,
    isEditing,
    handleEditClick,
    canUpdate,
  );

  const dialogMode = isEditMode ? "edit" : "add";
  const dialogTitle = getDialogTitle(isEditMode, isEditing);
  const submitButtonLabel = getSubmitButtonLabel(isEditMode, isEditing);
  const formKey = `${getFormKey(formDefaultValues.deviceModelId)}-${isEditing}`;

  const { handleCancel: handleUnsavedCancel, UnsavedChangesDialog } =
    useUnsavedChangesDialog(() => {
      setHasChanges(false);
      handleCancelEdit();
    });

  const handleCancel = useCallback(() => {
    if (isEditMode && isEditing) {
      handleUnsavedCancel(hasChanges);
      return;
    }

    handleAddCancel();
  }, [isEditMode, isEditing, hasChanges, handleUnsavedCancel, handleAddCancel]);

  return (
    <>
      <LoadingContainer />
      <AccessControl hasAccess={canViewAll}>
        <PageContainer hideFooter>
          <DeviceModelManagementHeader
            data={gridData}
            setData={setData}
            searchKey={0}
            summaryCards={[]}
            handleClick={handleClick}
            modelOptions={modelOptions}
            statusOptions={DEVICE_MODEL_STATUS_FILTER_OPTIONS}
            assetTypeOptions={ASSET_TYPE_FILTER_OPTIONS}
            canCreate={canCreate}
          />
          <GridContainer>
            <CommonDataGrid
              columnsData={columns}
              rowData={allRows}
              data={gridData}
              setData={setData}
              getRowHeight={getRowHeight}
            />
          </GridContainer>
        </PageContainer>
      </AccessControl>

      <CommonSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleSnackbarClose}
      />

      <CommonDialogForm
        open={isAddModalOpen}
        onCancel={handleCancel}
        mode={dialogMode}
        title={dialogTitle}
        formId="addDeviceModelForm"
        isEditing={isEditing}
        headerActions={headerActionsElement}
        submitButtonText={submitButtonLabel}
        disableSubmit={isEditMode && isEditing && !hasChanges}
        content={
          <DeviceModelManagementForm
            key={formKey}
            formId="addDeviceModelForm"
            defaultValues={formDefaultValues}
            isEditing={isEditing}
            isEditMode={isEditMode}
            onSubmit={handleAddSubmit}
            onDirtyChange={setHasChanges}
          />
        }
      />
      {UnsavedChangesDialog}
    </>
  );
};

export default DeviceModelManagement;
