import { useSelector } from "react-redux";
import { shouldShowMenuItem } from "../utils/permissionUtils";
import { MENU_ITEMS } from "./menu-items";

export const getFilteredMenuItems = () => {
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

  const filterMenuItems = (items) => {
    return items
      .filter((item) => {
        // Check if the item should be shown based on permissions
        if (item.key && !shouldShowMenuItem(item.key, permissions)) {
          return false;
        }
        return true;
      })
      .map((item) => {
        // If item has children, recursively filter them
        if (item.children && item.children.length > 0) {
          const filteredChildren = filterMenuItems(item.children);
          
          // Only keep the parent if it has visible children
          if (filteredChildren.length === 0) {
            return null;
          }
          
          return {
            ...item,
            children: filteredChildren,
          };
        }
        
        return item;
      })
      .filter(Boolean); // Remove null items
  };

  return filterMenuItems(MENU_ITEMS);
};

/**
 * Hook to get filtered menu items
 * Usage: const menuItems = useFilteredMenuItems();
 */
export const useFilteredMenuItems = () => {
  return getFilteredMenuItems();
};
