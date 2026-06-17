
export const formatPermissions = (permissions = {}) => {
  if (!permissions || typeof permissions !== 'object') {
    return {};
  }

  const formatted = {};

  if (Array.isArray(permissions)) {
    permissions.forEach((perm) => {
      if (perm && perm.module) {
        const moduleKey = perm.module;
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
    Object.entries(permissions).forEach(([moduleKey, modulePermissions]) => {
      if (Array.isArray(modulePermissions)) {
        formatted[moduleKey] = {};
        modulePermissions.forEach((perm) => {
          if (perm) {
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

export const hasAllPermissions = (permissions = {}, permissionChecks = []) => {
  if (!permissionChecks || permissionChecks.length === 0) return true;
  
  return permissionChecks.every(({ moduleKey, actionKey }) =>
    hasPermission(permissions, moduleKey, actionKey)
  );
};

export const hasAnyPermission = (permissions = {}, permissionChecks = []) => {
  if (!permissionChecks || permissionChecks.length === 0) return true;
  
  return permissionChecks.some(({ moduleKey, actionKey }) =>
    hasPermission(permissions, moduleKey, actionKey)
  );
};

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


export const PERMISSION_MAPPING = {
  dashboard: {
    module: "Dashboard",
    action: "DASHBOARD_METRICS",
  },
  
  "account-management": {
    module: "Account Management",
    action: "ACCOUNT_VIEW",
  },
  
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
  
  "open-incidents": {
    module: "Dashboard",
    action: "DASHBOARD_METRICS",
  },
  "alert-center": {
    module: "Dashboard",
    action: "DASHBOARD_METRICS",
  },
};

export const shouldShowMenuItem = (menuKey = "", permissions = {}) => {
  if (!menuKey || !permissions) return false;

  const mapping = PERMISSION_MAPPING[menuKey];
  if (!mapping) return true; 

  return hasPermission(permissions, mapping.module, mapping.action);
};

export const shouldAllowRoute = (path = "", permissions = {}) => {
  if (!path || !permissions) return false;

  const menuKey = Object.keys(PERMISSION_MAPPING).find(key => {
    const mapping = PERMISSION_MAPPING[key];
    return path.includes(key) || path.includes(mapping.module.toLowerCase().replace(/\s+/g, '-'));
  });

  if (!menuKey) return true;

  return shouldShowMenuItem(menuKey, permissions);
};
