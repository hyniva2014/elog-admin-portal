import React, { useEffect, useRef, useState } from "react";
import {
  FilledInput,
  IconButton,
  InputAdornment,
  styled,
  useTheme,
} from "@mui/material";
import { useDebouncedCallback } from "use-debounce";
import SearchIcon from "@mui/icons-material/Search";
import { ClearIcon } from "@mui/x-date-pickers";

export const StyledFilledInput = styled(FilledInput)(({ theme }) => {
  const isDark = theme.palette.mode === "dark";

  return {
    paddingLeft: "8px",

    backgroundColor: isDark
      ? theme.palette.grey[100]
      : theme.palette.common.white,
    "&:hover": {
      borderBottom: 0,
      backgroundColor: isDark
        ? theme.palette.grey[100]
        : theme.palette.common.white,
    },
    "&:before": {
      borderBottom: 0,
    },
    "&.Mui-focused": {
      backgroundColor: isDark
        ? theme.palette.grey[100]
        : theme.palette.common.white,
    },
    "& .MuiInputBase-input": {
      paddingTop: "8px",
      paddingBottom: "8px",
    },
  };
});

const CommonSearch = ({
  value = "",
  setData = () => {},
  placeholder = "Search",
  debounceMs = 500,
}) => {
  const inputRef = useRef(null);
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    if (document.activeElement !== inputRef.current && value) {
      inputRef.current?.focus();
    }
  }, [value]);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const debouncedUpdate = useDebouncedCallback((searchValue) => {
    setData((prev) => ({
      ...prev,
      page: 1,
      search: searchValue,
    }));
  }, debounceMs);

  const handleChange = (e) => {
    const val = e.target.value;
    setLocalValue(val);
    debouncedUpdate(val);
  };

  const handleClear = () => {
    setLocalValue("");
    debouncedUpdate.cancel();
    setData((prev) => ({
      ...prev,
      page: 1,
      search: "",
    }));
    inputRef.current?.focus();
  };

  return (
    <StyledFilledInput
      inputRef={inputRef}
      value={localValue}
      placeholder={placeholder}
      onChange={handleChange}
      fullWidth
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon fontSize="small" />
        </InputAdornment>
      }
      endAdornment={
        value ? (
          <InputAdornment position="end">
            <IconButton size="small" onClick={handleClear}>
              <ClearIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        ) : null
      }
    />
  );
};

export default CommonSearch;
