import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo } from "react";
import { deleteCookie } from "cookies-next";
import { ELOG_API_GATEWAY_URL } from "./serviceUtils";
import { store } from "../store/reduxSlice";
import { logout } from "../components/LoginScreen/Loginstore/Login.slice";

const authSessionKey = "_ATTEX_MUI_AUTH_";

function handleUnauthorized(error, navigate) {
  const status = error?.response?.status;
  if (status === 401 || error?.response?.data?.status === "error") {
    store.dispatch(logout());
    deleteCookie(authSessionKey);
    if (navigate) navigate("/auth/login", { replace: true });
  }
}

export const fetchTokenApi = async (endUrl, token, navigate) => {
  try {
    const response = await axios.get(`${ELOG_API_GATEWAY_URL}${endUrl}`, {
      headers: {
        Authorization: `${token}`,
        Accept: "application/json",
      },
      withCredentials: false,
    });
    return response ?? null;
  } catch (error) {
    handleUnauthorized(error, navigate);
    return error?.response?.data;
  }
};

export const createApi = async (payload, endUrl, navigate) => {
  try {
    const response = await axios.post(
      `${ELOG_API_GATEWAY_URL}${endUrl}`,
      payload,
    );
    return response?.data ?? null;
  } catch (error) {
    handleUnauthorized(error, navigate);
    return error?.response?.data;
  }
};

export const useServices = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.loginSlice);
  const token = useMemo(() => userDetails?.loginDetails?.body?.data?.token, [userDetails?.loginDetails?.body?.data?.token]);

  const getAuthHeaders = () => {
    if (!token) return {};
    return {
      Authorization: `${token}`,
    };
  };

  const fetchApi = useCallback(async (endUrl) => {
    try {
      const response = await axios.get(`${ELOG_API_GATEWAY_URL}${endUrl}`, {
        headers: {
          ...getAuthHeaders(),
          Accept: "application/json",
        },
        withCredentials: false,
      });
      return response?.data ?? null;
    } catch (error) {
      if (
        error?.response?.status === 401 ||
        error?.response?.data?.status === "error"
      ) {
        dispatch(logout());
        navigate("/auth/login", { replace: true });
      }
      return error?.response?.data;
    }
  }, [token, dispatch, navigate]);

  const createApi = useCallback(async (payload, endUrl) => {
    try {
      const isPublicEndpoint =
        endUrl.includes("/masteradmin/login") ||
        endUrl.includes("/masteradmin/send-otp") ||
        endUrl.includes("/masteradmin/reset-password");

      const response = await axios.post(
        `${ELOG_API_GATEWAY_URL}${endUrl}`,
        payload,
        {
          headers: {
            ...(isPublicEndpoint ? {} : getAuthHeaders()),
            Accept: "application/json",
          },
        },
      );

      return response?.data ?? null;
    } catch (error) {
      if (
        error?.response?.status === 401 ||
        error?.response?.data?.status === "error"
      ) {
        dispatch(logout());
        navigate("/auth/login", { replace: true });
      }
      return error?.response?.data;
    }
  }, [token, dispatch, navigate]);

  const updateApi = useCallback(async (payload, endUrl) => {
    try {
      const response = await axios.put(
        `${ELOG_API_GATEWAY_URL}${endUrl}`,
        payload,
        {
          headers: {
            ...getAuthHeaders(),
            Accept: "application/json",
          },
        },
      );
      return response?.data ?? null;
    } catch (error) {
      if (
        error?.response?.status === 401 ||
        error?.response?.data?.status === "error"
      ) {
        dispatch(logout());
        navigate("/auth/login", { replace: true });
      }
      return error?.response?.data;
    }
  }, [token, dispatch, navigate]);

  const deleteApi = useCallback(async (payload, endUrl) => {
    try {
      const response = await axios.delete(`${ELOG_API_GATEWAY_URL}${endUrl}`, {
        payload,
        headers: {
          ...getAuthHeaders(),
          Accept: "application/json",
        },
      });
      return response?.data ?? null;
    } catch (error) {
      if (
        error?.response?.status === 401 ||
        error?.response?.data?.status === "error"
      ) {
        dispatch(logout());
        navigate("/auth/login", { replace: true });
      }
      return error?.response?.data;
    }
  }, [token, dispatch, navigate]);

  return {
    fetchApi,
    createApi,
    updateApi,
    deleteApi,
  };
};
