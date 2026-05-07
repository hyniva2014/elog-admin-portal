import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RequireAuthRedirect = () => {
  const loginDetails = useSelector((state) => state.loginSlice.loginDetails);
  const isLoggedIn = !!loginDetails?.body?.data?.token;

  return isLoggedIn ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/auth/login" replace />
  );
};

export default RequireAuthRedirect;
