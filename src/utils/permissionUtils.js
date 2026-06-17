/**
 * Centralized Permission Utilities for RBAC System
 * This file contains all permission checking logic and helper functions
 */

/**
 * Format permissions from API response to a more usable structure
 * @param {Object|Array} permissions - Raw permissions from login API (object with module keys) or role API (flat array)
 * @returns {Object} Formatted permissions object
 */
export const formatPermissions = (permissions = {}) => {
  if (!permissions || typeof permissions !== 'object') {
    return {};
  }

  const formatted = {};

  // Handle flat array structure from role API
  if (Array.isArray(permissions)) {
    permissions.forEach((perm) => {
      if (perm && perm.module) {
        const moduleKey = perm.module;
        // Use code field for action key (e.g., "ACCOUNT_CREATE") instead of description (e.g., "Create account")
        const actionKey = perm.code || perm.description;
        const isGranted = perm.granted === 1 || perm.is_enabled === 1;
        
        if (!formatted[moduleKey]) {
          formatted[moduleKey] = {};
        }
        
        if (actionKey) {
          formatted[moduleKey][actionKey] = isGranted;
        }
      }
    });
  } else {
    // Handle object structure from login API
    Object.entries(permissions).forEach(([moduleKey, modulePermissions]) => {
      if (Array.isArray(modulePermissions)) {
        // Convert array of permission objects to a lookup object
        formatted[moduleKey] = {};
        modulePermissions.forEach((perm) => {
          if (perm) {
            // Handle both login API structure (description, granted) and role API structure (code, is_enabled)
            const actionKey = perm.description || perm.code;
            const isGranted = perm.granted === 1 || perm.is_enabled === 1;
            if (actionKey) {
              formatted[moduleKey][actionKey] = isGranted;
            }
          }
        });
      } else if (typeof modulePermissions === 'object') {
        formatted[moduleKey] = modulePermissions;
      }
    });
  }

  return formatted;
};

/**
 * Check if a user has a specific permission
 * @param {Object} permissions - Formatted permissions object
 * @param {String} moduleKey - Module name (e.g., "Account Management")
 * @param {String} actionKey - Action/permission name (e.g., "ACCOUNT_CREATE")
 * @returns {Boolean} - True if permission is granted
 */
export const hasPermission = (
  permissions = {},
  moduleKey = "",
  actionKey = ""
) => {
  if (!permissions || !moduleKey || !actionKey) return false;

  const modulePermissions =
    permissions[moduleKey] || permissions[moduleKey.toLowerCase()];

  if (!modulePermissions) return false;

  if (Array.isArray(modulePermissions)) {
    return modulePermissions.includes(actionKey);
  }

  if (typeof modulePermissions === "object") {
    return Boolean(
      modulePermissions[actionKey] ||
      modulePermissions[actionKey.toLowerCase()] ||
      modulePermissions[actionKey.toUpperCase()]
    );
  }

  return modulePermissions === actionKey;
};

/**
 * Check if user has ANY permission in a module
 * @param {Object} permissions - Formatted permissions object
 * @param {String} moduleKey - Module name
 * @returns {Boolean} - True if user has at least one permission in the module
 */
export const hasAnyPermissionInModule = (permissions = {}, moduleKey = "") => {
  if (!permissions || !moduleKey) return false;

  const modulePermissions = permissions[moduleKey] || permissions[moduleKey.toLowerCase()];
  
  if (!modulePermissions) return false;

  if (Array.isArray(modulePermissions)) {
    return modulePermissions.length > 0;
  }

  if (typeof modulePermissions === "object") {
    return Object.values(modulePermissions).some(value => value === true);
  }

  return false;
};

/**
 * Check if user has ALL specified permissions
 * @param {Object} permissions - Formatted permissions object
 * @param {Array} permissionChecks - Array of {moduleKey, actionKey} objects
 * @returns {Boolean} - True if user has all specified permissions
 */
export const hasAllPermissions = (permissions = {}, permissionChecks = []) => {
  if (!permissionChecks || permissionChecks.length === 0) return true;
  
  return permissionChecks.every(({ moduleKey, actionKey }) =>
    hasPermission(permissions, moduleKey, actionKey)
  );
};

/**
 * Check if user has ANY of the specified permissions
 * @param {Object} permissions - Formatted permissions object
 * @param {Array} permissionChecks - Array of {moduleKey, actionKey} objects
 * @returns {Boolean} - True if user has at least one of the specified permissions
 */
export const hasAnyPermission = (permissions = {}, permissionChecks = []) => {
  if (!permissionChecks || permissionChecks.length === 0) return true;
  
  return permissionChecks.some(({ moduleKey, actionKey }) =>
    hasPermission(permissions, moduleKey, actionKey)
  );
};

/**
 * Get all granted permissions for a module
 * @param {Object} permissions - Formatted permissions object
 * @param {String} moduleKey - Module name
 * @returns {Array} - Array of granted permission names
 */
export const getModulePermissions = (permissions = {}, moduleKey = "") => {
  if (!permissions || !moduleKey) return [];

  const modulePermissions = permissions[moduleKey] || permissions[moduleKey.toLowerCase()];
  
  if (!modulePermissions) return [];

  if (Array.isArray(modulePermissions)) {
    return modulePermissions;
  }

  if (typeof modulePermissions === "object") {
    return Object.entries(modulePermissions)
      .filter(([_, granted]) => granted === true)
      .map(([key]) => key);
  }

  return [];
};

/**
 * Permission mapping for menu items and routes
 * Maps menu keys to their required module and action permissions
 */
export const PERMISSION_MAPPING = {
  // Dashboard
  dashboard: {
    module: "Dashboard",
    action: "DASHBOARD_METRICS",
  },
  
  // Account Management
  "account-management": {
    module: "Account Management",
    action: "ACCOUNT_VIEW",
  },
  
  // Device Management
  "device-management": {
    module: "Device Management",
    action: "DEVICE_VIEW_ALL",
  },
  "device-management-overview": {
    module: "Device Management",
    action: "DEVICE_VIEW_ALL",
  },
  "device-asset-management": {
    module: "Device Asset Management",
    action: "DEVICE_ASSET_VIEW",
  },
  "device-model-management": {
    module: "Device Model Management",
    action: "DEVICE_MODEL_VIEW",
  },
  "request-device": {
    module: "Requested Devices",
    action: "REQUESTED_DEVICES_VIEW",
  },
  
  // User Management
  "platform-users-management": {
    module: "Platform Users",
    action: "PLATFORM_USER_VIEW",
  },
  "carrier-users-management": {
    module: "Carrier Users",
    action: "CARRIER_USER_VIEW",
  },
  "role-management": {
    module: "Roles Overview",
    action: "ROLE_OVERVIEW_VIEW",
  },
  "role-user-management": {
    module: "Roles Overview",
    action: "ROLE_OVERVIEW_VIEW",
  },
  
  // Additional routes
  "open-incidents": {
    module: "Dashboard",
    action: "DASHBOARD_METRICS",
  },
  "alert-center": {
    module: "Dashboard",
    action: "DASHBOARD_METRICS",
  },
};

/**
 * Check if a menu item should be visible based on permissions
 * @param {String} menuKey - Menu item key from menu-items.js
 * @param {Object} permissions - Formatted permissions object
 * @returns {Boolean} - True if menu item should be visible
 */
export const shouldShowMenuItem = (menuKey = "", permissions = {}) => {
  if (!menuKey || !permissions) return false;

  const mapping = PERMISSION_MAPPING[menuKey];
  if (!mapping) return true; // Show if no mapping defined (default to visible)

  return hasPermission(permissions, mapping.module, mapping.action);
};

/**
 * Check if a route should be accessible based on permissions
 * @param {String} path - Route path
 * @param {Object} permissions - Formatted permissions object
 * @returns {Boolean} - True if route should be accessible
 */
export const shouldAllowRoute = (path = "", permissions = {}) => {
  if (!path || !permissions) return false;

  // Find matching menu key for the path
  const menuKey = Object.keys(PERMISSION_MAPPING).find(key => {
    const mapping = PERMISSION_MAPPING[key];
    // This is a simplified check - you may need to adjust based on your route structure
    return path.includes(key) || path.includes(mapping.module.toLowerCase().replace(/\s+/g, '-'));
  });

  if (!menuKey) return true; // Allow if no mapping defined

  return shouldShowMenuItem(menuKey, permissions);
};
