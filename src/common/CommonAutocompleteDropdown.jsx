import {
  Autocomplete,
  TextField,
  CircularProgress,
  createFilterOptions,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  StyledAutocomplete,
  StyledTextField,
} from "./CommonAutocompleteDropdown.styled";

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
  retainOptionHighlightOnClear = false,
}) => {
  const theme = useTheme();
  const [lastSelectedValue, setLastSelectedValue] = useState(null);

  const uniqueOptions = options.filter(
    (opt, index, self) =>
      opt?.value !== undefined &&
      opt.value !== null &&
      index === self.findIndex((t) => t?.value === opt?.value),
  );

  const selectedOption =
    uniqueOptions.find((opt) => opt.value === value) || null;

  useEffect(() => {
    if (selectedOption) {
      setLastSelectedValue(selectedOption.value);
    }
  }, [selectedOption]);

  const optionHoverSx = {
    "& .MuiAutocomplete-option": {
      "&:hover": {
        backgroundColor: `${theme.palette.primary.main}1A !important`,
        color: `${theme.palette.primary.main} !important`,
      },
      "&.Mui-focused": {
        backgroundColor: `${theme.palette.primary.main}1A !important`,
        color: `${theme.palette.primary.main} !important`,
      },
      '&[aria-selected="true"]': {
        backgroundColor: `${theme.palette.primary.main}26 !important`,
        color: `${theme.palette.primary.main} !important`,
        fontWeight: 600,
      },
      '&[aria-selected="true"]:hover': {
        backgroundColor: `${theme.palette.primary.main}33 !important`,
        color: `${theme.palette.primary.main} !important`,
      },
      '&[aria-selected="true"].Mui-focused': {
        backgroundColor: `${theme.palette.primary.main}33 !important`,
        color: `${theme.palette.primary.main} !important`,
      },
    },
  };

  return (
    <StyledAutocomplete
      key={`${dataKey}-${uniqueOptions.length}`}
      fullWidth
      size={size}
      options={uniqueOptions}
      filterOptions={filter}
      value={selectedOption}
      openOnFocus
      ListboxProps={{ sx: optionHoverSx }}
      renderOption={(props, option) => {
        const isPreviouslySelected =
          retainOptionHighlightOnClear && option.value === lastSelectedValue;

        return (
          <li
            {...props}
            key={`${option.value}-${option.label}`}
            style={{
              ...props.style,
              ...(isPreviouslySelected && {
                backgroundColor:
                  theme.palette.custom?.alertActiveBackground ||
                  theme.palette.action.selected,
              }),
            }}
          >
            {option.label}
          </li>
        );
      }}
      getOptionLabel={(option) => option.label || ""}
      isOptionEqualToValue={(option, val) => option.value === val?.value}
      onChange={(_, newValue) => {
        if (newValue) {
          setLastSelectedValue(newValue.value);
        }

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
      loading={loading}
      disabled={disabled}
      renderInput={(params) => (
        <StyledTextField
          {...params}
          label={label}
          fullWidth
          error={error}
          helperText={helperText}
          disabled={disabled}
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
