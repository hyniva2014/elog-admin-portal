import {
  PermissionsList,
  PermissionItem,
  PermissionTitle,
  PermissionDescription,
  StyledSwitch,
} from "./RolePermissions.styled";

const PermissionList = ({ module, permissions, permissionState, onToggle }) => {
  const permissionItems = permissions?.map((permission, idx) => (
    <PermissionItem key={permission.id}>
      <div>
        <PermissionTitle>{permission.action}</PermissionTitle>

        <PermissionDescription>
          {permission.description || permission.code}
        </PermissionDescription>
      </div>

      <StyledSwitch
        checked={permissionState[module]?.[idx] || false}
        onChange={onToggle(module, idx)}
      />
    </PermissionItem>
  ));
  return <PermissionsList>{permissionItems}</PermissionsList>;
};

export default PermissionList;
