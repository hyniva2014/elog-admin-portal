import { Box, Grid } from "@mui/material";
import CommonSearch from "./CommonSearch";
import CommonDateRangeSelector from "./CommonDateRangeSelector";
import CommonAutocompleteDropdown from "./CommonAutocompleteDropdown";
import ViolationTypeAutocomplete from "./ViolationTypeAutocomplete";

const CommonFilters = ({
  data,
  setData,
  searchKey,
  showSearch = true,
  showDateRange = true,
  filters = [],
  actionButton,
  allowDateClear = false,
}) => {
  return (
    <Grid container spacing={2} mt={2} alignItems="center" wrap="wrap">
      {showSearch && (
        <Grid item xs={12} md flexGrow={1}>
          <CommonSearch
            key={searchKey}
            value={data.search}
            setData={setData}
            placeholder="Search by All"
          />
        </Grid>
      )}

      <Grid item xs={12} md="auto">
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent={{ xs: "flex-start", md: "flex-end" }}
          wrap="wrap"
        >
          {showDateRange && (
            <Grid item xs={12} sm={6} md="auto">
              <CommonDateRangeSelector
                value={{
                  start: data.fromDate,
                  end: data.toDate,
                }}
                allowClear={allowDateClear}
                onChange={(range) =>
                  setData((prev) => ({
                    ...prev,
                    page: 1,
                    fromDate: range?.start || null,
                    toDate: range?.end || null,
                  }))
                }
              />
            </Grid>
          )}

          {filters.map((filter) => (
            <Grid item key={filter.dataKey} xs={12} sm={6} md="auto">
              {filter.type === "violation" ? (
                <ViolationTypeAutocomplete
                  label={filter.label}
                  value={data[filter.dataKey]}
                  options={filter.options}
                  iconMap={filter.iconMap}
                  setData={setData}
                  dataKey={filter.dataKey}
                />
              ) : (
                <CommonAutocompleteDropdown
                  label={filter.label}
                  value={data[filter.dataKey]}
                  options={filter.options}
                  setData={setData}
                  dataKey={filter.dataKey}
                />
              )}
            </Grid>
          ))}

          {actionButton && (
            <Grid item xs={12} sm="auto">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: { xs: "stretch", sm: "flex-start" },
                }}
              >
                {actionButton}
              </Box>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CommonFilters;