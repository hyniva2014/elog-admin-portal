import React from "react";
import { TextField, MenuItem } from "@mui/material";

const CommonDropdown = ({
  label = "",
  value = "",
  options = [],
  setData = () => {},
  dataKey = "",
  minWidth = 160,
  size = "small",
}) => {
  const handleChange = (e) => {
    const selectedValue = e.target.value;

    setData((prev) => ({
      ...prev,
      page: 1,
      [dataKey]: selectedValue,
    }));
  };

  return (
    <TextField
      size={size}
      select
      label={label}
      value={value}
      onChange={handleChange}
      sx={{ minWidth }}
    >
      {options.map((item) => (
        <MenuItem key={item.id} value={item.id}>
          {item.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default CommonDropdown;
