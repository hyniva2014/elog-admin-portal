import { Menu, MenuItem } from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { useState, useCallback } from "react";

import {
  HeaderContainer,
  TitleContainer,
  HeaderTitle,
  HeaderSubtitle,
  ActionContainer,
  HeaderButton,
} from "./CommonPageHeader.styled";

const EXPORT_OPTIONS = [
  {
    label: "CSV",
    value: "csv",
  },
  {
    label: "PDF",
    value: "pdf",
  },
  {
    label: "Excel",
    value: "excel",
  },
];

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

  const handleMenuOpen = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleExportSelect = useCallback(
    (type) => {
      onExport?.(type);
      handleMenuClose();
    },
    [onExport, handleMenuClose],
  );

  const renderExportMenuItems = () => {
    return EXPORT_OPTIONS.map((option) => (
      <MenuItem
        key={option.value}
        onClick={() => handleExportSelect(option.value)}
      >
        {option.label}
      </MenuItem>
    ));
  };

  const renderDefaultActions = () => {
    return (
      <>
        <ActionContainer>
          {addButton && (
            <HeaderButton variant="contained" onClick={handleClick}>
              Add
            </HeaderButton>
          )}

          <HeaderButton
            variant="contained"
            endIcon={<KeyboardArrowDownIcon />}
            onClick={handleMenuOpen}
          >
            Export
          </HeaderButton>
        </ActionContainer>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {renderExportMenuItems()}
        </Menu>
      </>
    );
  };

  return (
    <HeaderContainer>
      <TitleContainer>
        <HeaderTitle>{title}</HeaderTitle>

        <HeaderSubtitle isvisible={Boolean(subtitle)}>
          {subtitle || "placeholder"}
        </HeaderSubtitle>
      </TitleContainer>

      {rightContent !== undefined ? rightContent : renderDefaultActions()}
    </HeaderContainer>
  );
};

export default CommonPageHeader;
