export const fetchRolesApi = async (fetchApi) => {
  try {
    const response = await fetchApi(
      "/masteradmin/role/get-roles?is_superuser=1",
    );

    return response?.body?.Roles || [];
  } catch (error) {
    console.error("fetchRolesApi Error:", error);

    return [];
  }
};

export const fetchRoleByIdApi = async (
  fetchApi,
  roleId,
) => {
  try {
    const response = await fetchApi(
      `/masteradmin/role/get-roles?is_superuser=1&role_id=${roleId}`,
    );

    return response?.body?.Roles || null;
  } catch (error) {
    console.error("fetchRoleByIdApi Error:", error);

    return null;
  }
};

export const saveRoleApi = async (
  createApi,
  payload,
) => {
  try {
    const response = await createApi(
      payload,
      "/masteradmin/roles/create-or-update-role",
    );

    return response;
  } catch (error) {
    console.error("saveRoleApi Error:", error);

    return null;
  }
};

export const fetchRoleDetailsApi = async (
  fetchApi,
  companyId,
  roleId,
) => {
  try {
    const response = await fetchApi(
      `/masteradmin/role/get-roles?is_superuser=1&role_id=${roleId}`,
    );

    return response?.body?.Roles;
  } catch (error) {
    console.error("fetchRoleDetailsApi Error:", error);

    return null;
  }
};

export const syncRolePermissionsApi = async (
  createApi,
  payload,
) => {
  try {
    const response = await createApi(
      payload,
      "/masteradmin/roles/sync-permissions",
    );

    return response;
  } catch (error) {
    console.error("syncRolePermissionsApi Error:", error);

    return null;
  }
};