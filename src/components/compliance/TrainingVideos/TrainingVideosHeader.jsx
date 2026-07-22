import { Box, Button, styled } from "@mui/material";
import CommonPageHeader from "../../../common/CommonPageHeader";
import CommonFilters from "../../../common/CommonFilters";
import { MODULE_OPTIONS, VIDEO_STATUS_OPTIONS, VIDEO_TITLE_OPTIONS } from "./Constants";
import CommonSummaryCardGroup from "../../../common/CommonSummaryCardGroup";

const UploadVideoButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: theme.palette.brand.main,
  textTransform: "none",
  fontWeight: 600,
  minWidth: 120,
  height: 36,
  "&:hover": {
    backgroundColor: theme.palette.brand.dark,
  },
}));

const HeaderContainer = styled(Box)(() => ({
  marginBottom: 16,
}));

const TrainingVideosHeader = ({
  data = [],
  setData,
  searchKey = {},
  summaryCards,
  handleClick,
  canCreate = true,
}) => {
  const isButtonDisabled = !canCreate || !handleClick;

  return (
    <HeaderContainer>
      <CommonPageHeader
        title="Training Videos"
        subtitle="Upload, manage and organize training videos for Drivers."
        rightContent={
          <UploadVideoButton
            variant="contained"
            onClick={handleClick}
            disabled={isButtonDisabled}
          >
            Upload Video
          </UploadVideoButton>
        }
      />

      <Box mt={2}>
        <CommonSummaryCardGroup
          cards={summaryCards}
          showAccentBar={true}
          layout="default"
        />
      </Box>

      <CommonFilters
        data={data}
        setData={setData}
        searchKey={searchKey}
        searchPlaceholder="Search by all"
        showDateRange={false}
        filters={[
          {
            label: "All Videos",
            dataKey: "videoTitle",
            options: VIDEO_TITLE_OPTIONS,
          },
          {
            label: "All Modules",
            dataKey: "module",
            options: MODULE_OPTIONS,
          },
          {
            label: "All Status",
            dataKey: "status",
            options: VIDEO_STATUS_OPTIONS,
          },
        ]}
      />
    </HeaderContainer>
  );
};

export default TrainingVideosHeader;
