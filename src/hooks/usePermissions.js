import { useSelector } from "react-redux";
import {
  hasPermission,
  hasAllPermissions,
  hasAnyPermission,
  hasAnyPermissionInModule,
  getModulePermissions,
} from "../utils/permissionUtils";


export const usePermissions = () => {
  const loginPermissions = useSelector(
    (state) => state.loginSlice.permissions || {},
  );
  
  const rolePermissions = useSelector(
    (state) => state.rolePermissions?.permissions || {},
  );
  
  const permissions = Object.keys(rolePermissions).length > 0 
    ? rolePermissions 
    : loginPermissions;

  const checkPermission = (moduleKey, actionKey) => {
    return hasPermission(permissions, moduleKey, actionKey);
  };


  const checkAllPermissions = (permissionChecks) => {
    return hasAllPermissions(permissions, permissionChecks);
  };

  
  const checkAnyPermission = (permissionChecks) => {
    return hasAnyPermission(permissions, permissionChecks);
  };

  const checkAnyInModule = (moduleKey) => {
    return hasAnyPermissionInModule(permissions, moduleKey);
  };
  
  const getPermissionsForModule = (moduleKey) => {
    return getModulePermissions(permissions, moduleKey);
  };

  return {
    permissions,
    checkPermission,
    checkAllPermissions,
    checkAnyPermission,
    checkAnyInModule,
    getPermissionsForModule,
  };
};

export default usePermissions;
