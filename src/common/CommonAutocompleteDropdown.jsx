import {
  Autocomplete,
  TextField,
  CircularProgress,
  createFilterOptions,
} from "@mui/material";

const filter = createFilterOptions({
  matchFrom: "any",
  stringify: (option) => String(option.label || ""),
});

const CommonAutocompleteDropdown = ({
  label = "",
  value = "",
  options = [],
  onChange,
  setData,
  dataKey = "",
  minWidth = 180,
  size = "small",
  error = false,
  helperText = "",
  required,
  loading = false,
  disabled = false,
}) => {
  const uniqueOptions = options.filter(
    (opt, index, self) =>
      opt?.value !== undefined &&
      opt.value !== null &&
      index === self.findIndex((t) => t?.value === opt?.value),
  );

  const selectedOption =
    uniqueOptions.find((opt) => opt.value === value) || null;

  return (
    <Autocomplete
      key={`${dataKey}-${uniqueOptions.length}`}
      fullWidth
      size={size}
      options={uniqueOptions}
      filterOptions={filter}
      value={selectedOption}
      renderOption={(props, option) => {
        return (
          <li {...props} key={`${option.value}-${option.label}`}>
            {option.label}
          </li>
        );
      }}
      getOptionLabel={(option) => option.label || ""}
      isOptionEqualToValue={(option, val) => option.value === val?.value}
      onChange={(_, newValue) => {
        if (onChange) {
          onChange(newValue ? newValue.value : "");
          return;
        }

        if (setData && dataKey) {
          setData((prev) => ({
            ...prev,
            page: 1,
            [dataKey]: newValue ? newValue.value : "",
          }));
        }
      }}
      sx={{ minWidth }}
      loading={loading}
      disabled={disabled}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          fullWidth
          error={error}
          helperText={helperText}
          disabled={disabled}
          sx={{
            "& .MuiInputBase-root.Mui-disabled": {
              backgroundColor: "#f5f5f5",
              color: "rgba(0, 0, 0, 0.6)",
            },
            "& .MuiInputLabel-root.Mui-disabled": {
              color: "rgba(0, 0, 0, 0.6)",
            },
            "& .MuiFormLabel-asterisk": {
              color: "#d32f2f",
              fontWeight: 600,
            },
          }}
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
    />
  );
};

export default CommonAutocompleteDropdown;
