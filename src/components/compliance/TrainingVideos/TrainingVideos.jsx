import { useState, useEffect, useMemo } from "react";
import { Box, styled, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { PageContainer } from "../../../common/PageContainer";
import CommonDataGrid from "../../../common/CommonDataGrid";
import CommonLoading from "../../../common/CommonLoading";
import CommonSnackbar from "../../../common/CommonSnackbar";
import CommonConfirmDialog from "../../../common/CommonConfirmDialog";
import TrainingVideosHeader from "./TrainingVideosHeader";
import UploadVideoDialog from "./UploadVideoDialog";
import { buildSummaryCards } from "../../../common/CommonUtils";
import { defaultPageSize, TRAINING_VIDEOS_SUMMARY_CARDS } from "./Constants";
import { TrainingVideosColumnsData, TrainingVideosRowData } from "./CommonRowColumnUtils";
import { useServices } from "../../../services/services";

const GridContainer = styled(Box)(() => ({
  flex: 1,
  minHeight: 0,
}));

const TrainingVideos = () => {
  const { setLoading, LoadingContainer } = CommonLoading();
  const { fetchApi, createApi } = useServices();

  const userId = useSelector(
    (state) => state.loginSlice.loginDetails?.body?.data?.userdetails?.user_id,
  );
  const companyId = useSelector(
    (state) => state.loginSlice.loginDetails?.body?.data?.userdetails?.company_id ?? 1,
  );

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
      const queryParams = {
        company_id: 1,
        page,
        limit: pageSize,
        ...(search && { search: encodeURIComponent(search) }),
        ...(module && { module_id: module }),
        ...(status && { status: status === "Published" ? 1 : status === "Draft" ? 0 : status }),
      };

      const params = new URLSearchParams(queryParams);
      const endUrl = `/masteradmin/training-videos?${params.toString()}`;

      const response = await fetchApi(endUrl);

      if (response?.statusCode === 200) {
        const responseData = response?.body;
        const videos = responseData?.data || [];
        const stats = responseData?.stats || {};
        const pagination = responseData?.pagination || {};

        const summaryData = {
          totalVideos: stats.total_videos || 0,
          published: stats.published_videos || 0,
          drafts: stats.draft_videos || 0,
          totalModules: stats.total_modules || 0,
        };

        setSummaryCards(buildSummaryCards(summaryData, TRAINING_VIDEOS_SUMMARY_CARDS));

        const { TrainingVideosColumnData, TrainingVideosRowData } = TrainingVideosTableData(
          videos,
          handleEditClick,
          handleDeleteClick
        );

        setData((prev) => ({
          ...prev,
          isLoading: false,
          rows: TrainingVideosRowData,
          columns: TrainingVideosColumnData,
          total: pagination.total_records || videos.length,
        }));
      } else {
        throw new Error(response?.body?.message || "Failed to fetch training videos");
      }
    } catch (err) {
      console.error(err);
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
    // Map row data into the shape that UploadVideoDialog form expects
    setSelectedVideo({
      id: row.id,
      title: row.title !== "-" ? row.title : "",
      module: row.module_id ?? null,  // numeric ID to match MODULE_OPTIONS values
      description: row.description !== "-" ? row.description : "",
      videoFile: null,
      videoUrl: row.videoUrl || "",
    });
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

  const buildVideoFormData = (videoData, videoId = null) => {
    const formData = new FormData();
    formData.append("title", videoData.title || "");
    formData.append("module_id", videoData.module || "");
    formData.append("description", videoData.description || "");
    formData.append("status", 1);
    formData.append("user_id", userId || "");
    formData.append("company_id", companyId || 1);
    if (videoData.videoFile) {
      formData.append("video", videoData.videoFile);
    }
    if (videoId) {
      formData.append("id", videoId);
    }
    return formData;
  };

  const handleUploadSubmit = async (videoData) => {
    setLoading(true);
    try {
      const formData = buildVideoFormData(videoData);
      const response = await createApi(formData, "/masteradmin/training-videos/create-or-update");

      if (response?.statusCode === 200 || response?.statusCode === 201) {
        showSnackbar(response?.body?.message || "Video uploaded successfully", "success");
        setIsUploadDialogOpen(false);
        fetchVideos();
      } else {
        showSnackbar(response?.body?.message || "Error uploading video", "error");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
      showSnackbar("Error uploading video", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = async (videoData) => {
    setLoading(true);
    try {
      const formData = buildVideoFormData(videoData, selectedVideo?.id);
      const response = await createApi(formData, "/masteradmin/training-videos/create-or-update");

      if (response?.statusCode === 200 || response?.statusCode === 201) {
        showSnackbar(response?.body?.message || "Video updated successfully", "success");
        setIsEditDialogOpen(false);
        setSelectedVideo(null);
        fetchVideos();
      } else {
        showSnackbar(response?.body?.message || "Error updating video", "error");
      }
    } catch (error) {
      console.error("Error updating video:", error);
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