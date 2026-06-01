import {
  Autocomplete,
  TextField,
  CircularProgress,
  Checkbox,
  createFilterOptions,
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

  return (
    <Autocomplete
      key={`${dataKey}-${uniqueOptions.length}`}
      fullWidth
      multiple
      size={size}
      options={uniqueOptions}
      filterOptions={filter}
      value={selectedOptions}
      renderOption={(props, option, { selected }) => (
        <li {...props} key={`${option.value}-${option.label}`} style={OptionListItemSx}>
          <Checkbox checked={selected} sx={CheckboxIconSx} />
          {option.label}
        </li>
      )}
      getOptionLabel={(option) => option.label || ""}
      isOptionEqualToValue={(option, val) => option.value === val?.value}
      onChange={(_, newValue) => {
        const selectedValues = newValue.map((opt) => opt.value);

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
      }}
      loading={loading}
      disabled={disabled}
      renderInput={(params) => (
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
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
          InputLabelProps={{
            ...params.InputLabelProps,
            required: required,
          }}
        />
      )}
      sx={AutocompleteSx(minWidth)}
    />
  );
};

export default CommonMultiSelectDropdown;
