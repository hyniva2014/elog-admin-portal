import { Box, Button, Typography, TextField, MenuItem, Grid } from "@mui/material";
import CommonPageHeader from "../../../common/CommonPageHeader";
import CommonSearch from "../../../common/CommonSearch";
import CommonDateRangeSelector from "../../../common/CommonDateRangeSelector";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { 
  DEVICE_MODEL_ASSET_TYPE_FILTER_OPTIONS,
  DEVICE_MODEL_MODEL_FILTER_OPTIONS,
  DEVICE_MODEL_STATUS_FILTER_OPTIONS
} from "./Constants";

const DeviceModelManagementHeader = (props) => {
  const {
    data = [],
    setData,
    searchKey = {},
    handleClick,
  } = props;

  return (
    <Box sx={{ mb: 2 }}>
      <CommonPageHeader
        title="Device Model Management"
        handleClick={handleClick}
        addButton={false}
        rightContent={
          <Button
            sx={{ color: "#FFFFFF", backgroundColor: "#284495" }}
            variant="contained"
            onClick={handleClick}
          >
            Add Asset
          </Button>
        }
      />
      <Typography variant="h6" fontWeight="300" sx={{ mb: 2 }}>
        Manage device models and specifications
      </Typography>

      {/* Custom Filters without autofill */}
      <Grid container spacing={2} mt={2} alignItems="center" wrap="wrap">
        <Grid item xs={12} md flexGrow={1}>
          <CommonSearch
            key={searchKey}
            value={data.search}
            setData={setData}
            placeholder="Search by All"
          />
        </Grid>

        <Grid item xs={12} md="auto">
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent={{ xs: "flex-start", md: "flex-end" }}
            wrap="wrap"
          >
            <Grid item xs={12} sm={6} md="auto">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <CommonDateRangeSelector
                  value={{
                    start: data.fromDate,
                    end: data.toDate,
                  }}
                  allowClear={true}
                  onChange={(range) =>
                    setData((prev) => ({
                      ...prev,
                      page: 1,
                      fromDate: range?.start || null,
                      toDate: range?.end || null,
                    }))
                  }
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={6} md="auto">
              <TextField
                select
                size="small"
                label="Asset Type"
                value={data.assetType || ""}
                onChange={(e) => setData((prev) => ({ ...prev, assetType: e.target.value, page: 1 }))}
                sx={{ minWidth: 150 }}
              >
                {DEVICE_MODEL_ASSET_TYPE_FILTER_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6} md="auto">
              <TextField
                select
                size="small"
                label="All Model"
                value={data.model || ""}
                onChange={(e) => setData((prev) => ({ ...prev, model: e.target.value, page: 1 }))}
                sx={{ minWidth: 150 }}
              >
                {DEVICE_MODEL_MODEL_FILTER_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6} md="auto">
              <TextField
                select
                size="small"
                label="All Status"
                value={data.status || ""}
                onChange={(e) => setData((prev) => ({ ...prev, status: e.target.value, page: 1 }))}
                sx={{ minWidth: 150 }}
              >
                {DEVICE_MODEL_STATUS_FILTER_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DeviceModelManagementHeader;
