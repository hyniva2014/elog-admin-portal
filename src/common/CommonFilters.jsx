import { Box } from "@mui/material";
import CommonSearch from "./CommonSearch";
import CommonDateRangeSelector from "./CommonDateRangeSelector";
import CommonAutocompleteDropdown from "./CommonAutocompleteDropdown";
import ViolationTypeAutocomplete from "./ViolationTypeAutocomplete";
import {
  FiltersContainer,
  SearchWrapper,
  RightFiltersContainer,
  DateRangeWrapper,
  FilterWrapper,
  ActionButtonWrapper,
} from "./CommonFilters.styled";

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
  const handleDateRangeChange = (range) => {
    setData((prev) => ({
      ...prev,
      page: 1,
      fromDate: range?.start || null,
      toDate: range?.end || null,
    }));
  };

  return (
    <FiltersContainer>
      {showSearch && (
        <SearchWrapper>
          <CommonSearch
            key={searchKey}
            value={data.search}
            setData={setData}
            placeholder="Search by All"
          />
        </SearchWrapper>
      )}

      <RightFiltersContainer>
        {showDateRange && (
          <DateRangeWrapper>
            <CommonDateRangeSelector
              value={{ start: data.fromDate, end: data.toDate }}
              allowClear={allowDateClear}
              onChange={handleDateRangeChange}
            />
          </DateRangeWrapper>
        )}

        {filters.map((filter) => (
          <FilterWrapper key={filter.dataKey || filter.name}>
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
          </FilterWrapper>
        ))}

        {actionButton && (
          <ActionButtonWrapper>{actionButton}</ActionButtonWrapper>
        )}
      </RightFiltersContainer>
    </FiltersContainer>
  );
};

export default CommonFilters;
