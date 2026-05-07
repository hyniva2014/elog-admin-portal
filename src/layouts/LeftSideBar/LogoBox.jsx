import { Link } from "react-router-dom";
import logo from "@src/assets/images/logo.png";
import logoDark from "@src/assets/images/logo-dark.png";
import { useLayoutContext } from "@src/states";
import { styled } from "@mui/system";
import { Typography } from "@mui/material";
import LogoSmall from "../../assets/images/Logo-small.png";
import LogoBig from "../../assets/images/Logo-big.png";
const LogoBox = ({ defaultTheme, backgroundColor, isCollapsed = false }) => {
  const { settings, themeMode } = useLayoutContext();
  const {
    sidenav: { theme },
  } = settings;
  const LogoBoxWrapper = styled("div")(({ settings, themeMode }) => {
    return {
      backgroundColor: backgroundColor
        ? themeMode === "light"
          ? "#284394"
          : "#212428"
        : "transparent",
      height: "70px",
      position: "sticky",
      top: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 2,
    };
  });
  return (
    <LogoBoxWrapper settings={settings} themeMode={themeMode}>
      <Link
        to="/"
        style={{
          justifyContent: "center",
          display: "flex",
        }}
      >
        {/* <img
          src={(defaultTheme ?? theme) == "light" ? logoDark : logo}
          height={22}
          width={94}
        /> */}
        {isCollapsed ? (
          <img
            src={LogoSmall}
            alt="logo"
            style={{
              height: 30,
              objectFit: "contain",
              filter: "brightness(0) invert(1)",
            }}
          />
        ) : (
          <img
            src={LogoBig}
            alt="logo"
            style={{
              height: 50,
              objectFit: "contain",
              filter: "brightness(0) invert(1)",
            }}
          />
        )}
      </Link>
    </LogoBoxWrapper>
  );
};
export default LogoBox;