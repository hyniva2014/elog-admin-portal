import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "./Loginstore/Login.slice";

const AutoLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const timerRef = useRef(null);

  useEffect(() => {
    const logoutUser = () => {
      dispatch(logout());
      navigate("/auth/login", { replace: true });
    };

    const resetTimer = () => {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(logoutUser, 120 * 60 * 1000);
    };

    const handleActivity = () => {
      resetTimer();
    };

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);
    window.addEventListener("click", handleActivity);
    window.addEventListener("scroll", handleActivity);

    resetTimer();

    return () => {
      clearTimeout(timerRef.current);
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("click", handleActivity);
      window.removeEventListener("scroll", handleActivity);
    };
  }, [dispatch, navigate]);

  return null;
};

export default AutoLogout;
