import {
  Box,
  Button,
  Typography,
  Menu,
  MenuItem,
  Stack,
  Grid,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
import { useTheme } from "@mui/material";

const CommonPageHeader = ({
  title,
  subtitle,
  onExport,
  rightContent,
  addButton,
  handleClick,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (type) => {
    onExport?.(type);
    handleClose();
  };

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box>
        <Typography
          variant="inherit"
          color={theme.palette.mode === "dark" ? "#fff" : "#202027"}
          fontSize={20}
          fontWeight={600}
          // mb={0.5}
        >
          {title}
        </Typography>

        <Typography
          fontSize={13}
          color="#787C85"
          fontWeight={400}
          sx={{
            visibility: subtitle ? "visible" : "hidden",
            minHeight: "20px",
            display: subtitle ? "block" : "none",
          }}
        >
          {subtitle || "placeholder"}
        </Typography>
      </Box>

      {rightContent !== undefined ? (
        rightContent
      ) : (
        <>
          <Grid sx={{ display: "flex", gap: 2 }}>
            {addButton && (
              <Button
                sx={{ color: "#FFFFFF", backgroundColor: "#284495" }}
                variant="contained"
                onClick={handleClick}
              >
                Add
              </Button>
            )}

            <Button
              sx={{ color: "#FFFFFF", backgroundColor: "#284495" }}
              variant="contained"
              endIcon={<KeyboardArrowDownIcon />}
              onClick={handleOpen}
            >
              Export
            </Button>
          </Grid>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={() => handleSelect("csv")}>CSV</MenuItem>
            <MenuItem onClick={() => handleSelect("pdf")}>PDF</MenuItem>
            <MenuItem onClick={() => handleSelect("excel")}>Excel</MenuItem>
          </Menu>
        </>
      )}
    </Box>
  );
};

export default CommonPageHeader;
