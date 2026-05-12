import { Autocomplete, TextField, Box, Typography } from "@mui/material";

const ViolationTypeAutocomplete = ({
  label = "Violation Type",
  value = "",
  options = [],
  setData = () => {},
  dataKey = "",
  iconMap = {},
  minWidth = 220,
  size = "small",
}) => {
  const selectedOption = options.find((opt) => opt.id === value) || null;

  return (
    <Autocomplete
      fullWidth
      size={size}
      options={options}
      value={selectedOption}
      getOptionLabel={(option) => option.label || ""}
      isOptionEqualToValue={(option, val) => option.id === val.id}
      onChange={(_, newValue) => {
        setData((prev) => ({
          ...prev,
          page: 1,
          [dataKey]: newValue ? newValue.id : "",
        }));
      }}
      sx={{ minWidth }}
      renderOption={(props, option) => (
        <Box
          component="li"
          {...props}
          display="flex"
          alignItems="center"
          gap={1.2}
        >
          {iconMap[option.id] && (
            <img src={iconMap[option.id]} alt="" width={18} height={18} />
          )}
          <Typography fontSize={13} fontWeight={500}>
            {option.label}
          </Typography>
        </Box>
      )}
      renderInput={(params) => (
        <TextField {...params} label={label} fullWidth />
      )}
    />
  );
};

export default ViolationTypeAutocomplete;
