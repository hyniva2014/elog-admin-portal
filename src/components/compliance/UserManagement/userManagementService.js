/**
 * Small wrapper helpers for UserManagement API endpoints.
 * These helpers accept the project's low-level `fetchApi` / `createApi`
 * functions (provided by `useServices`) so we keep HTTP details out of
 * React components while avoiding hooks inside service modules.
 */

export const USER_ONBOARD_ENDPOINT = "/masteradmin/onboard-admin";
export const USER_LIST_ENDPOINT = "/masteradmin/get-admin-users";
export const USER_GET_USER_ENDPOINT = "/masteradmin/get-admin-users";

export const getUsers = async (fetchApi, params = {}) => {
  const query = new URLSearchParams(params).toString();
  const endpoint = `${USER_LIST_ENDPOINT}?${query}`;
  return fetchApi(endpoint);
};

export const getUserDetails = async (fetchApi, userId) => {
  const endpoint = `${USER_GET_USER_ENDPOINT}?user_id=${encodeURIComponent(userId)}`;
  return fetchApi(endpoint);
};

export const onboardUser = async (createApi, payload) => {
  return createApi(payload, USER_ONBOARD_ENDPOINT);
};
