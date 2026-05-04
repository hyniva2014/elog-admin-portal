import { ClickAwayListener } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import {
  StyledPopper,
  StyledPaper,
  StyledMenuItem,
} from "./CollapsedMenuPopper.styles";
import { useRef, useEffect } from "react";

const CollapsedMenuPopper = ({ anchorEl, open, item, onClose, closeTimer }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const paperRef = useRef();

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event) => {
      if (paperRef.current && !paperRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  return (
    <StyledPopper
      open={open}
      anchorEl={anchorEl}
      placement="right-start"
      modifiers={[
        {
          name: "offset",
          options: { offset: [0, 8] },
        },
      ]}
    >
      <ClickAwayListener onClickAway={onClose}>
        <StyledPaper
          ref={paperRef}
          elevation={6}
          onMouseEnter={() => {
            if (closeTimer.current) {
              clearTimeout(closeTimer.current);
            }
          }}
          onMouseLeave={() => {
            closeTimer.current = setTimeout(() => {
              onClose();
            }, 150);
          }}
        >
          {(item.children || []).map((child) => {
            const active = location.pathname.startsWith(child.url);

            return (
              <StyledMenuItem
                key={child.key}
                active={active}
                onClick={() => {
                  navigate(child.url);
                  onClose();
                }}
              >
                {child.label}
              </StyledMenuItem>
            );
          })}
        </StyledPaper>
      </ClickAwayListener>
    </StyledPopper>
  );
};

export default CollapsedMenuPopper;
