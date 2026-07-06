import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Avatar,
  Box,
  Divider,
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
import { LuLogOut, LuUserCircle2, LuKeyRound } from "react-icons/lu";
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
      icon: LuUserCircle2,
      label: "My Profile",
      action: "profile",
    },
    {
      icon: LuKeyRound,
      label: "Change Password",
      action: "changePassword",
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
                minWidth: 220,
                // borderRadius: "12px",
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
                  if (option.action === "profile") {
                    navigate(`/platform-users/edit/${userDetails?.user_id}`);
                  } else if (option.action === "changePassword") {
                    navigate("/auth/login", {
                      state: {
                        showForgotPassword: true,
                        prefillEmail: userDetails?.user_name || "",
                      },
                    });
                  }
                }}
                sx={{
                  py: 1,
                  px: 3,
                  gap: 1.5,
                  "&:hover": { backgroundColor: "rgba(63, 81, 181, 0.06)" },
                }}
              >
                <ListItemIcon sx={{ minWidth: 0, color: "text.secondary" }}>
                  <IconComponent size={22} />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{
                    fontWeight: 500,
                    fontSize: "0.95rem",
                  }}
                >
                  {option.label}
                </ListItemText>
              </MenuItem>
            );
          })}
          <Divider />
          <MenuItem
            onClick={() => {
              handleClose();
              handleLogout();
            }}
            sx={{
              py: 1,
              px: 3,
              gap: 1.5,
              color: "#3F51B5",
              "&:hover": { backgroundColor: "rgba(63, 81, 181, 0.06)" },
            }}
          >
            <ListItemIcon sx={{ minWidth: 0, color: "#3F51B5" }}>
              <LuLogOut size={22} />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{
                fontWeight: 600,
                fontSize: "0.95rem",
                color: "#3F51B5",
              }}
            >
              Logout
            </ListItemText>
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};

export default UserProfile;
