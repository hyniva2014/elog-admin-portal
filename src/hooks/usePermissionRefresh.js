import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatPermissions } from "../utils/permissionUtils";
import { setLoginPermissions } from "../components/LoginScreen/Loginstore/Login.slice";
import { fetchRoleDetailsApi } from "../components/compliance/RoleManagement/RolesManagementUtils";
import { clearRolePermissions } from "../components/compliance/RoleManagement/RolePermissionsSlice";

export const usePermissionRefresh = () => {
  const dispatch = useDispatch();
  const loginDetails = useSelector((state) => state.loginSlice.loginDetails);

  const refreshPermissions = useCallback(async (fetchApi) => {
    try {
      const token = localStorage.getItem("token");
      const userdetails = loginDetails?.body?.data?.userdetails || JSON.parse(localStorage.getItem("userdetails") || "{}");
      const companyId = userdetails.company_id;
      const roleId = userdetails.role_id;

      if (!token || !companyId || !roleId) {
        return;
      }

      const roleData = await fetchRoleDetailsApi(
        fetchApi,
        companyId,
        roleId,
      );

      if (roleData && roleData.permissions) {
        const formattedRolePermissions = formatPermissions(roleData.permissions);
        localStorage.setItem("permissions", JSON.stringify(formattedRolePermissions));
        dispatch(clearRolePermissions());
        dispatch(setLoginPermissions(formattedRolePermissions));
      } else {
        const storedPermissions = localStorage.getItem("permissions");
        if (storedPermissions) {
          try {
            const parsedPermissions = JSON.parse(storedPermissions);
            dispatch(setLoginPermissions(parsedPermissions));
          } catch (error) {
            console.error("Error parsing permissions from localStorage:", error);
          }
        }
      }
    } catch (error) {
      console.error("Error refreshing permissions from API:", error);
      const storedPermissions = localStorage.getItem("permissions");
      if (storedPermissions) {
        try {
          const parsedPermissions = JSON.parse(storedPermissions);
          dispatch(setLoginPermissions(parsedPermissions));
        } catch (error) {
          console.error("Error parsing permissions from localStorage:", error);
        }
      }
    }
  }, [dispatch, loginDetails]);

  return { refreshPermissions };
};
