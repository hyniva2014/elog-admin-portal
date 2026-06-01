export const fetchRoleDetailsApi = async (
  fetchApi,
  companyId,
  roleId,
) => {
  try {
    const response = await fetchApi(
      `/user/get-roles?company_id=${companyId}&role_id=${roleId}`,
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
      "/roles/sync-permissions",
    );

    return response;
  } catch (error) {
    console.error("syncRolePermissionsApi Error:", error);
    return null;
  }
};