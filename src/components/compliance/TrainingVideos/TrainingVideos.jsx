import { useState, useEffect, useMemo } from "react";
import { Box, styled, Button } from "@mui/material";
import { PageContainer } from "../../../common/PageContainer";
import CommonDataGrid from "../../../common/CommonDataGrid";
import CommonLoading from "../../../common/CommonLoading";
import CommonSnackbar from "../../../common/CommonSnackbar";
import CommonConfirmDialog from "../../../common/CommonConfirmDialog";
import TrainingVideosHeader from "./TrainingVideosHeader";
import UploadVideoDialog from "./UploadVideoDialog";
import { buildSummaryCards } from "../../../common/CommonUtils";
import { defaultPageSize, TRAINING_VIDEOS_SUMMARY_CARDS, MOCK_TRAINING_VIDEOS } from "./Constants";
import { TrainingVideosColumnsData, TrainingVideosRowData } from "./CommonRowColumnUtils";

const GridContainer = styled(Box)(() => ({
  flex: 1,
  minHeight: 0,
}));

const TrainingVideos = () => {
  const { setLoading, LoadingContainer } = CommonLoading();
  const [searchKey, setSearchKey] = useState(0);
  const [summaryCards, setSummaryCards] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteRow, setDeleteRow] = useState(null);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const getDefaultFilters = () => {
    return {
      isLoading: false,
      rows: [],
      total: 0,
      page: 1,
      pageSize: defaultPageSize,
      search: "",
      sortModel: [],
      module: "",
      status: "",
    };
  };

  const [data, setData] = useState(getDefaultFilters());

  const { rows, total, page, pageSize, search, sortModel, module, status, isLoading } = data;

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  useEffect(() => {
    fetchVideos();
  }, [page, pageSize, search, sortModel, module, status]);

  const fetchVideos = async () => {
    setData((prev) => ({ ...prev, isLoading: true }));

    try {
      // Simulate API call with mock data
      await new Promise((resolve) => setTimeout(resolve, 500));

      let filteredVideos = [...MOCK_TRAINING_VIDEOS];

      // Apply search filter
      if (search) {
        const searchLower = search.toLowerCase();
        filteredVideos = filteredVideos.filter(
          (video) =>
            video.title.toLowerCase().includes(searchLower) ||
            video.description.toLowerCase().includes(searchLower) ||
            video.module.toLowerCase().includes(searchLower) ||
            video.uploadedBy.toLowerCase().includes(searchLower)
        );
      }

      // Apply module filter
      if (module) {
        filteredVideos = filteredVideos.filter((video) => video.module === module);
      }

      // Apply status filter
      if (status) {
        filteredVideos = filteredVideos.filter((video) => video.status === status);
      }

      // Calculate summary cards
      const summaryData = {
        totalVideos: filteredVideos.length,
        published: filteredVideos.filter((v) => v.status === "Published").length,
        drafts: filteredVideos.filter((v) => v.status === "Draft").length,
        totalModules: [...new Set(filteredVideos.map((v) => v.module))].length,
      };

      setSummaryCards(buildSummaryCards(summaryData, TRAINING_VIDEOS_SUMMARY_CARDS));

      // Apply pagination
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedVideos = filteredVideos.slice(startIndex, endIndex);

      const { TrainingVideosColumnData, TrainingVideosRowData } = TrainingVideosTableData(
        paginatedVideos,
        handleEditClick,
        handleDeleteClick
      );

      setData((prev) => ({
        ...prev,
        isLoading: false,
        rows: TrainingVideosRowData,
        columns: TrainingVideosColumnData,
        total: filteredVideos.length,
      }));
    } catch (err) {
      setData((prev) => ({ ...prev, isLoading: false }));
      showSnackbar("Failed to fetch training videos", "error");
    }
  };

  const TrainingVideosTableData = (videos, onEdit, onDelete) => {
    const rowData = TrainingVideosRowData(videos);
    const columnData = TrainingVideosColumnsData(onEdit, onDelete, true, true);
    return { TrainingVideosColumnData: columnData, TrainingVideosRowData: rowData };
  };

  const handleEditClick = (row) => {
    setSelectedVideo(row);
    setIsEditing(false);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (row) => {
    setDeleteRow(row);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteRow?.id) return;
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      showSnackbar("Video deleted successfully", "success");
      fetchVideos();
    } catch (error) {
      showSnackbar("Error deleting video", "error");
    } finally {
      setLoading(false);
      setConfirmOpen(false);
      setDeleteRow(null);
    }
  };

  const handleCancelConfirm = () => {
    setConfirmOpen(false);
    setDeleteRow(null);
  };

  const handleUploadClick = () => {
    setIsUploadDialogOpen(true);
  };

  const handleCloseUploadDialog = () => {
    setIsUploadDialogOpen(false);
    setSelectedVideo(null);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setSelectedVideo(null);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleEditButtonClick = () => {
    setIsEditing(true);
  };

  const editHeaderActions = (
    <Button
      variant="contained"
      onClick={handleEditButtonClick}
      disabled={isEditing}
    >
      Edit
    </Button>
  );

  const handleUploadSubmit = async (videoData) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Video data to upload:", videoData);
      showSnackbar("Video uploaded successfully", "success");
      setIsUploadDialogOpen(false);
      fetchVideos();
    } catch (error) {
      showSnackbar("Error uploading video", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = async (videoData) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Video data to update:", videoData);
      showSnackbar("Video updated successfully", "success");
      setIsEditDialogOpen(false);
      setSelectedVideo(null);
      fetchVideos();
    } catch (error) {
      showSnackbar("Error updating video", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const gridData = {
    ...data,
    rows,
    columns: data.columns,
    total,
    isLoading: false,
  };

  return (
    <>
      <LoadingContainer />
      <PageContainer hideFooter>
          <TrainingVideosHeader
            data={data}
            setData={setData}
            searchKey={searchKey}
            summaryCards={summaryCards}
            handleClick={handleUploadClick}
            canCreate={true}
          />

          <GridContainer>
            <CommonDataGrid
              rowData={rows}
              columnsData={data.columns || []}
              data={gridData}
              setData={setData}
              disableRowSelectionOnClick
              getRowHeight={() => "auto"}
              paginationMode="server"
              showMuiLoading={false}
              disableStickyColumns={true}
            />
          </GridContainer>

          <CommonConfirmDialog
            open={confirmOpen}
            title="Delete Video"
            message={`Are you sure you want to delete "${deleteRow?.title || "this video"}"?`}
            confirmText="Delete"
            cancelText="Cancel"
            onConfirm={confirmDelete}
            onCancel={handleCancelConfirm}
          />

          <CommonSnackbar
            open={snackbar.open}
            message={snackbar.message}
            severity={snackbar.severity}
            onClose={handleSnackbarClose}
          />

          <UploadVideoDialog
            open={isUploadDialogOpen}
            onClose={handleCloseUploadDialog}
            onSubmit={handleUploadSubmit}
            loading={false}
            mode="add"
          />

          <UploadVideoDialog
            open={isEditDialogOpen}
            onClose={handleCloseEditDialog}
            onSubmit={handleEditSubmit}
            loading={false}
            mode="edit"
            isEditing={isEditing}
            initialData={selectedVideo}
            onCancelEdit={handleCancelEdit}
            headerActions={editHeaderActions}
          />
        </PageContainer>
    </>
  );
};

export default TrainingVideos;