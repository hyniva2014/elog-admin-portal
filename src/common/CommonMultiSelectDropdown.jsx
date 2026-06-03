import {
  Autocomplete,
  TextField,
  CircularProgress,
  Checkbox,
  createFilterOptions,
  Box,
} from "@mui/material";
import {
  AutocompleteSx,
  TextFieldSx,
  CheckboxSx,
  CheckboxIconSx,
  OptionListItemSx,
} from "./CommonMultiSelectDropdown.styled";

const filter = createFilterOptions({
  matchFrom: "any",
  stringify: (option) => String(option.label || ""),
});

const CommonMultiSelectDropdown = ({
  label = "",
  value = [],
  options = [],
  onChange,
  setData,
  dataKey = "",
  minWidth = 180,
  size = "small",
  error = false,
  helperText = "",
  required = false,
  loading = false,
  disabled = false,
}) => {
  const uniqueOptions = options.filter(
    (opt, index, self) =>
      opt?.value !== undefined &&
      opt.value !== null &&
      index === self.findIndex((t) => t?.value === opt?.value),
  );

  // Ensure value is an array
  const normalizedValue = Array.isArray(value) ? value : [];

  // Map value array to selected options
  const selectedOptions = uniqueOptions.filter((opt) =>
    normalizedValue.includes(opt.value),
  );

  const renderAutocompleteOption = (props, option, { selected }) => (
    <Box
      component="li"
      {...props}
      key={`${option.value}-${option.label}`}
      sx={OptionListItemSx}
    >
      <Checkbox checked={selected} sx={CheckboxIconSx} />
      {option.label}
    </Box>
  );

  const getSelectedValues = (newValue) => newValue.map((opt) => opt.value);

  const handleAutocompleteChange = (_, newValue) => {
    const selectedValues = getSelectedValues(newValue);

    if (onChange) {
      onChange(selectedValues);
      return;
    }

    if (setData && dataKey) {
      setData((prev) => ({
        ...prev,
        page: 1,
        [dataKey]: selectedValues,
      }));
    }
  };

  const LoadingIndicator = () => {
    if (!loading) return null;
    return <CircularProgress color="inherit" size={20} />;
  };

  const renderInputField = (params) => {
    const endAdornment = (
      <>
        <LoadingIndicator />
        {params.InputProps.endAdornment}
      </>
    );

    return (
      <TextField
        {...params}
        label={label}
        fullWidth
        size={size}
        error={error}
        helperText={helperText}
        disabled={disabled}
        sx={TextFieldSx}
        InputProps={{
          ...params.InputProps,
          endAdornment,
        }}
        InputLabelProps={{
          ...params.InputLabelProps,
          required: required,
        }}
      />
    );
  };

  const isOptionEqualToValue = (option, val) => option.value === val?.value;
  const getOptionLabel = (option) => option.label || "";

  return (
    <Autocomplete
      key={`${dataKey}-${uniqueOptions.length}`}
      fullWidth
      multiple
      size={size}
      options={uniqueOptions}
      filterOptions={filter}
      value={selectedOptions}
      renderOption={renderAutocompleteOption}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      onChange={handleAutocompleteChange}
      loading={loading}
      disabled={disabled}
      renderInput={renderInputField}
      sx={AutocompleteSx(minWidth)}
    />
  );
};

export default CommonMultiSelectDropdown;
