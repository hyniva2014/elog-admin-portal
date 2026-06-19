export const fetchRoleDetailsApi = async (
  fetchApi,
  companyId,
  roleId,
) => {
  try {
    const response = await fetchApi(
      `/masteradmin/role/get-roles?is_superuser=1&role_id=${roleId}`,
    );

    return response?.body?.Roles || response?.data?.Roles || response;
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
