import { useSelector } from "react-redux";
import { shouldShowMenuItem } from "../utils/permissionUtils";
import { MENU_ITEMS } from "./menu-items";

export const getFilteredMenuItems = () => {
  const loginPermissions = useSelector(
    (state) => state.loginSlice.permissions || {},
  );
  
  const rolePermissions = useSelector(
    (state) => state.rolePermissions?.permissions || {},
  );
  
  const permissions = Object.keys(rolePermissions).length > 0 
    ? rolePermissions 
    : loginPermissions;

  const filterMenuItems = (items) => {
    return items
      .filter((item) => {
        if (item.key && !shouldShowMenuItem(item.key, permissions)) {
          return false;
        }
        return true;
      })
      .map((item) => {
        if (item.children && item.children.length > 0) {
          const filteredChildren = filterMenuItems(item.children);
          
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
      .filter(Boolean); 
  };

  return filterMenuItems(MENU_ITEMS);
};

export const useFilteredMenuItems = () => {
  return getFilteredMenuItems();
};
