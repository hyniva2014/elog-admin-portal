import { Box, IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { VIDEO_STATUS_CONFIG } from "./Constants";
import dayjs from "dayjs";

const VideoTitleCell = ({ row }) => {
  const theme = useTheme();

  const handleTitleClick = () => {
    if (row.videoUrl) {
      window.open(row.videoUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
      <Box
        sx={{
          width: 72,
          height: 48,
          bgcolor: "primary.main",
          borderRadius: 1.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          position: "relative",
          cursor: row.videoUrl ? "pointer" : "default",
          transition: "opacity 0.2s",
          "&:hover": row.videoUrl ? { opacity: 0.85 } : {},
        }}
        onClick={handleTitleClick}
      >
        <PlayArrowIcon sx={{ fontSize: 24, color: "white" }} />
        <Typography
          variant="caption"
          sx={{
            color: "white",
            fontWeight: 600,
            fontSize: "11px",
            position: "absolute",
            bottom: 4,
            right: 6,
          }}
        >
          {row.duration}
        </Typography>
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="body2"
          onClick={handleTitleClick}
          sx={{
            fontWeight: 600,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontSize: "15px",
            mb: 0.5,
            cursor: row.videoUrl ? "pointer" : "default",
            "&:hover": row.videoUrl
              ? {
                  textDecoration: "underline",
                  color: "primary.main",
                }
              : {},
          }}
        >
          {row.title}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: "text.secondary",
            whiteSpace: "normal",
            wordBreak: "break-word",
            display: "block",
            fontSize: "13px",
          }}
        >
          {row.description}
        </Typography>
      </Box>
    </Box>
  );
};

const StatusCell = ({ value }) => {
  const config = VIDEO_STATUS_CONFIG[value] || VIDEO_STATUS_CONFIG.Published;
  return (
    <Typography
      variant="body2"
      sx={{
        color: config.colorKey,
        fontWeight: 500,
        fontSize: "14px",
      }}
    >
      {value}
    </Typography>
  );
};

const ActionsCell = ({ row, onEdit, onDelete, canUpdate, canDelete }) => {
  const theme = useTheme();

  const handleEditClick = () => {
    if (canUpdate && onEdit) {
      onEdit(row);
    }
  };

  const handleDeleteClick = () => {
    if (canDelete && onDelete) {
      onDelete(row);
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 0.5 }}>
      <Tooltip title={canUpdate ? "Edit" : "No permission"}>
        <span>
          <IconButton
            size="small"
            onClick={handleEditClick}
            disabled={!canUpdate}
            sx={{
              color: canUpdate ? "text.primary" : "text.disabled",
              "&:hover": {
                bgcolor: canUpdate ? "action.hover" : "transparent",
              },
            }}
          >
            <EditOutlinedIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title={canDelete ? "Delete" : "No permission"}>
        <span>
          <IconButton
            size="small"
            onClick={handleDeleteClick}
            disabled={!canDelete}
            sx={{
              color: canDelete ? "error.main" : "text.disabled",
              "&:hover": {
                bgcolor: canDelete ? "error.light" : "transparent",
                color: canDelete ? "error.dark" : "text.disabled",
              },
            }}
          >
            <DeleteOutlineIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </span>
      </Tooltip>
    </Box>
  );
};

export const TrainingVideosColumnsData = (
  onEdit,
  onDelete,
  canUpdate = true,
  canDelete = true,
) => [
  {
    field: "title",
    headerName: "VIDEO TITLE",
    minWidth: 450,
    cellClassName: "sticky-col-left-1",
    headerClassName: "sticky-col-left-1",
    renderCell: ({ row }) => <VideoTitleCell row={row} />,
  },
  {
    field: "module",
    headerName: "MODULE",
    flex: 1,
    minWidth: 180,
  },
  {
    field: "duration",
    headerName: "DURATION",
    flex: 1,
    minWidth: 180,
  },
  {
    field: "status",
    headerName: "STATUS",
    flex: 1,
    minWidth: 180,
    renderCell: ({ value }) => <StatusCell value={value} />,
  },
  {
    field: "uploadedBy",
    headerName: "UPLOADED BY",
    flex: 1,
    minWidth: 180,
  },
  {
    field: "uploadDate",
    headerName: "UPLOAD DATE",
    flex: 1,
    minWidth: 180,
    valueFormatter: (params) => {
      if (!params.value) return "-";
      return dayjs(params.value).format("MMM DD, YYYY");
    },
  },
  {
    field: "actions",
    headerName: "ACTIONS",
    flex: 1,
    minWidth: 180,
    sortable: false,
    renderCell: ({ row }) => (
      <ActionsCell
        row={row}
        onEdit={onEdit}
        onDelete={onDelete}
        canUpdate={canUpdate}
        canDelete={canDelete}
      />
    ),
  },
];

export const TrainingVideosRowData = (videos = []) => {
  const videosArray = Array.isArray(videos) ? videos : [videos];
  
  return videosArray.map((video) => ({
    id: video.id,
    title: video.title || "-",
    description: video.description || "-",
    module_id: video.module_id ?? null,
    module: video.module || (video.module_id != null ? String(video.module_id) : "-"),
    duration: video.duration || "-",
    status: video.status === 1 ? "Published" : video.status === 0 ? "Draft" : video.status || "Draft",
    uploadedBy: video.uploadedBy || video.uploaded_by_name || "-",
    uploadDate: video.uploadDate || video.created_at || "-",
    videoUrl: video.video_url || video.videoUrl || "",
  }));
};
