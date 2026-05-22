import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
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
import usaFlag from "@src/assets/images/flags/US.png";
import avatar2 from "@src/assets/images/avatars/avatar2.png";
import { useDropdownMenu } from "@src/hooks";
import { useAuthContext, useLayoutContext } from "@src/states";
import { useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { useServices } from "@src/services/services";
import { logout } from "@src/components/LoginScreen/Loginstore/Login.slice";
import CommonLoading from "../../common/CommonLoading";

const UserProfile = () => {
  const selectedLanguage = country3;
  const {
    settings: { theme },
  } = useLayoutContext();
  const { removeSession } = useAuthContext();
  const { loading, setLoading, LoadingContainer } = CommonLoading();
  const { createApi } = useServices();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetails = useSelector(
    (state) => state.loginSlice.loginDetails?.body?.data?.userdetails,
  );
  const { anchorEl, open, handleClick, handleClose } = useDropdownMenu();

  const profileDropdownOptions = [
    {
      icon: LuLogOut,
      label: "Logout",
      action: "logout",
    },
  ];

  const handleLogout = async () => {
    try {
      setLoading(true);
      const response = await createApi(
        {
          user_id: userDetails?.user_id,
        },
        "/masteradmin/logout",
      );

      if (response?.statusCode === 200) {
        sessionStorage.setItem("logoutSuccess", "true");
        removeSession();
        sessionStorage.removeItem("hasShownLoginMessage");
        dispatch(logout());
        navigate("/auth/login", {
          replace: true,
          state: { logoutSuccess: true },
        });
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LoadingContainer />
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
            height: "70px",
            gap: "12px",
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
              {userDetails?.role || "CEO"}
            </Typography>
            <Typography
              variant="caption"
              color={"text.primary"}
              onClick={handleClick}
              sx={{ cursor: "pointer" }}
            >
              {userDetails?.name || "Tosha Minner"}
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
    </>
  );
};

export default UserProfile;
