import { useSelector } from "react-redux";
import {
  hasPermission,
  hasAllPermissions,
  hasAnyPermission,
  hasAnyPermissionInModule,
  getModulePermissions,
} from "../utils/permissionUtils";

/**
 * Custom hook for checking user permissions
 * Provides easy access to permission checking functions throughout the application
 * 
 * @returns {Object} Permission checking functions and current permissions
 */
export const usePermissions = () => {
  // Get permissions from both loginSlice and rolePermissions
  const loginPermissions = useSelector(
    (state) => state.loginSlice.permissions || {},
  );
  
  const rolePermissions = useSelector(
    (state) => state.rolePermissions?.permissions || {},
  );
  
  // Use role permissions if available, otherwise use login permissions
  const permissions = Object.keys(rolePermissions).length > 0 
    ? rolePermissions 
    : loginPermissions;

  /**
   * Check if user has a specific permission
   * @param {String} moduleKey - Module name (e.g., "Account Management")
   * @param {String} actionKey - Action/permission name (e.g., "ACCOUNT_CREATE")
   * @returns {Boolean} - True if permission is granted
   */
  const checkPermission = (moduleKey, actionKey) => {
    return hasPermission(permissions, moduleKey, actionKey);
  };

  /**
   * Check if user has ALL specified permissions
   * @param {Array} permissionChecks - Array of {moduleKey, actionKey} objects
   * @returns {Boolean} - True if user has all specified permissions
   */
  const checkAllPermissions = (permissionChecks) => {
    return hasAllPermissions(permissions, permissionChecks);
  };

  /**
   * Check if user has ANY of the specified permissions
   * @param {Array} permissionChecks - Array of {moduleKey, actionKey} objects
   * @returns {Boolean} - True if user has at least one of the specified permissions
   */
  const checkAnyPermission = (permissionChecks) => {
    return hasAnyPermission(permissions, permissionChecks);
  };

  /**
   * Check if user has ANY permission in a module
   * @param {String} moduleKey - Module name
   * @returns {Boolean} - True if user has at least one permission in the module
   */
  const checkAnyInModule = (moduleKey) => {
    return hasAnyPermissionInModule(permissions, moduleKey);
  };

  /**
   * Get all granted permissions for a module
   * @param {String} moduleKey - Module name
   * @returns {Array} - Array of granted permission names
   */
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
