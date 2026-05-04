/*
 * Copyright (c) 2023.
 * File Name: LanguageDropdown.tsx
 * Author: Coderthemes
 */

import {
  Avatar,
  Box,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import country3 from "@src/assets/images/flags/Bharat.png";
import avatar2 from "@src/assets/images/avatars/avatar2.png";
import usaFlag from "@src/assets/images/flags/US.png";
import {
  LuHeartHandshake,
  LuLock,
  LuLogOut,
  LuSettings,
  LuUserCircle2,
} from "react-icons/lu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useDropdownMenu } from "@src/hooks";
import { useLayoutContext } from "@src/states";
import { Link } from "react-router-dom";
const UserProfile = () => {
  const selectedLanguage = country3;
  const {
    settings: { theme },
  } = useLayoutContext();
  const { anchorEl, open, handleClick, handleClose } = useDropdownMenu();
  const profileDropdownOptions = [
    {
      icon: LuLogOut,
      label: "Logout",
      action: "logout",
    },
  ];

  const handleLogout = async () => {
    // try {
    //   setLoading(true);
    //   const response = await createApi(
    //     {
    //       user_id: userDetails?.user_id,
    //     },
    //     "/user/logout",
    //   );
    //   if (response?.statusCode === 200) {
    //     sessionStorage.removeItem("hasShownLoginMessage");
    //     dispatch(logout());
    //     navigate("/auth/login", {
    //       replace: true,
    //       state: { logoutSuccess: true },
    //     });
    //   }
    // } catch (error) {
    //   console.error("Logout failed:", error);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <Box
      sx={{
        cursor: "pointer",
        gap: 1,
        alignItems: "center",
        display: "flex",
        height: "100%",
        width: "auto",
      }}
    >
      <Box
        onClick={handleClick}
        sx={{
          paddingLeft: "8px",
          paddingRight: "8px",
          display: "flex",
          alignItems: "center",
          // width: "140px",
          // borderLeft: 1,
          // borderRight: 1,
          // borderColor: theme == "dark" ? "#374151" : "divider",
          height: "70px",
          gap: "12px",
          // backgroundColor: "#0000000d",
          // justifyContent: "space-around",
        }}
      >
        <Avatar
          src={usaFlag}
          alt="UAS"
          sx={{
            height: 32,
            width: 32,
          }}
        />
        <Avatar
          src={avatar2}
          alt="avatar"
          sx={{
            height: 36,
            width: 36,
          }}
        />
        <Box>
          <Typography variant="subtitle2" color={"text.primary"}>
            {"CEO" || ""}
          </Typography>
          <Typography
            variant="caption"
            color={"text.primary"}
            onClick={handleClick}
            sx={{ cursor: "pointer" }}
          >
            {"Tosha Minner"}
          </Typography>

          <KeyboardArrowDownIcon
            onClick={handleClick}
            sx={{ cursor: "pointer", fontSize: 18, ml: 0.5 }}
          />
        </Box>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
      >
        {/* {profileDropdownOptions.map((option, idx) => {
          const Icon = option.icon;
          return (
            <MenuItem onClick={handleClose} key={idx}>
              <ListItemIcon>
                <Icon size={18} />
              </ListItemIcon>
              {option.link ? (
                <Link to={option.link}>
                  <ListItemText
                    sx={{
                      color: "text.secondary",
                    }}
                  >
                    {option.label}
                  </ListItemText>
                </Link>
              ) : (
                option.label
              )}
            </MenuItem>
          );
        })} */}

        {profileDropdownOptions.map((option, idx) => {
          const IconComponent = option.icon;

          return (
            <MenuItem
              key={idx}
              onClick={() => {
                handleClose();

                if (option.action === "logout") {
                  handleLogout();
                }
              }}
            >
              <ListItemIcon>
                <IconComponent size={18} />
              </ListItemIcon>
              <ListItemText>{option.label}</ListItemText>
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
};
export default UserProfile;
