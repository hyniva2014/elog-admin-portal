import { useCallback } from "react";
import { useServices } from "../../../services/services";

const useCareerUsers = () => {
  const { fetchApi, createApi } = useServices();

  const getDriverOptions = useCallback(
    async (companyId) => {
      const response = await fetchApi(
        `/user/get-users-and-vehicles?company_id=${companyId}`,
      );
      const users = response?.body?.users || [];
      return users.map((user) => ({
        value: user.user_id,
        label: user.user_name,
      }));
    },
    [fetchApi],
  );

  const getCareerUsers = useCallback(
    async ({
      companyId,
      user = "",
      status = "",
      fromDate,
      toDate,
      page = 1,
      limit = 10,
      search = "",
    } = {}) => {
      const fromDateStr = fromDate ? fromDate.format("YYYY-MM-DD") : "";
      const toDateStr = toDate ? toDate.format("YYYY-MM-DD") : "";
      const endpoint = `/masteradmin/superuser/get-superusers?company_id=${companyId}&user_id=${user}&status=${status}&from_date=${fromDateStr}&to_date=${toDateStr}&page=${page}&limit=${limit}&search=${encodeURIComponent(
        search,
      )}`;
      return fetchApi(endpoint);
    },
    [fetchApi],
  );

  const getCareerUserDetails = useCallback(
    async ({ companyId, userId }) =>
      fetchApi(
        `/masteradmin/superuser/get-superusers?company_id=${companyId}&user_id=${userId}&page=1&limit=50`,
      ),
    [fetchApi],
  );

  const getCarrierList = useCallback(
    async (companyId) =>
      fetchApi(`/carriers/get-carrier-list?company_id=${companyId}`),
    [fetchApi],
  );

  const saveCareerUser = useCallback(
    async (payload) =>
      createApi(payload, "/masteradmin/superuser/create-or-update"),
    [createApi],
  );

  return {
    getDriverOptions,
    getCareerUsers,
    getCareerUserDetails,
    getCarrierList,
    saveCareerUser,
  };
};

export default useCareerUsers;
