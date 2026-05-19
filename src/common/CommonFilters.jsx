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

const FilterItem = ({ filter, data, setData }) => {
  if (filter.type === "violation") {
    return (
      <FilterWrapper>
        <ViolationTypeAutocomplete
          label={filter.label}
          value={data[filter.dataKey]}
          options={filter.options}
          iconMap={filter.iconMap}
          setData={setData}
          dataKey={filter.dataKey}
        />
      </FilterWrapper>
    );
  }

  return (
    <FilterWrapper>
      <CommonAutocompleteDropdown
        label={filter.label}
        value={data[filter.dataKey] || data[filter.name]}
        options={filter.options}
        setData={setData}
        dataKey={filter.dataKey || filter.name}
      />
    </FilterWrapper>
  );
};

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

  const searchElement = showSearch ? (
    <SearchWrapper>
      <CommonSearch
        key={searchKey}
        value={data.search}
        setData={setData}
        placeholder="Search by All"
      />
    </SearchWrapper>
  ) : null;

  const dateRangeElement = showDateRange ? (
    <DateRangeWrapper>
      <CommonDateRangeSelector
        value={{ start: data.fromDate, end: data.toDate }}
        allowClear={allowDateClear}
        onChange={handleDateRangeChange}
      />
    </DateRangeWrapper>
  ) : null;

  const filterElements = filters.map((filter) => (
    <FilterItem
      key={filter.dataKey || filter.name}
      filter={filter}
      data={data}
      setData={setData}
    />
  ));

  const actionButtonElement = actionButton ? (
    <ActionButtonWrapper>{actionButton}</ActionButtonWrapper>
  ) : null;

  return (
    <FiltersContainer>
      {searchElement}
      <RightFiltersContainer>
        {dateRangeElement}
        {filterElements}
        {actionButtonElement}
      </RightFiltersContainer>
    </FiltersContainer>
  );
};

export default CommonFilters;
