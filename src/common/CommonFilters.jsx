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
    <Box
      sx={{
        mt: 2,
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        flexWrap: "wrap",
      }}
    >
      {showSearch && (
        <Box
          sx={{
            width: { xs: "100%", md: "35%" },
            minWidth: { md: 220 },
            flexShrink: 0,
          }}
        >
          <CommonSearch
            key={searchKey}
            value={data.search}
            setData={setData}
            placeholder="Search by All"
          />
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          flexWrap: "wrap",
          flex: 1,
          justifyContent: { xs: "flex-start", md: "flex-end" },
        }}
      >
        {showDateRange && (
          <Box
            sx={{
              width: { xs: "100%", sm: "calc(50% - 6px)", md: "auto" },
              minWidth: 180,
            }}
          >
            <CommonDateRangeSelector
              value={{ start: data.fromDate, end: data.toDate }}
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
          </Box>
        )}

        {filters.map((filter) => (
          <Box
            key={filter.dataKey || filter.name}
            sx={{
              width: { xs: "100%", sm: "calc(50% - 6px)", md: "auto" },
              minWidth: 140,
              maxWidth: { md: 180 },
            }}
          >
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
                value={data[filter.dataKey] || data[filter.name]}
                options={filter.options}
                setData={setData}
                dataKey={filter.dataKey || filter.name}
              />
            )}
          </Box>
        ))}

        {actionButton && (
          <Box sx={{ width: { xs: "100%", sm: "auto" } }}>{actionButton}</Box>
        )}
      </Box>
    </Box>
  );
};

export default CommonFilters;
