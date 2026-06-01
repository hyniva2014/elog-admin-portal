import { useCallback, useState } from "react";

import { useServices } from "../services/services";

import {

  transformCareerUserPayload,

  transformApiToFormData,

} from "../components/compliance/CareerUsersManagement/careerUserUtils";



const useCareerUsers = () => {

  const { fetchApi, createApi } = useServices();

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);



  const getDriverOptions = useCallback(

    async (companyId) => {

      try {

        setLoading(true);

        setError(null);

        const response = await fetchApi(

          `/user/get-users-and-vehicles?company_id=${companyId}`,

        );

        const users = response?.body?.users || [];

        return users.map((user) => ({

          value: user.user_id,

          label: user.user_name,

        }));

      } catch (err) {

        setError(err.message || "Failed to fetch driver options");

        return [];

      } finally {

        setLoading(false);

      }

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

      try {

        setLoading(true);

        setError(null);

        const fromDateStr = fromDate ? fromDate.format("YYYY-MM-DD") : "";

        const toDateStr = toDate ? toDate.format("YYYY-MM-DD") : "";

        const endpoint = `/masteradmin/superuser/get-superusers?company_id=${companyId}&user_id=${user}&status=${status}&from_date=${fromDateStr}&to_date=${toDateStr}&page=${page}&limit=${limit}&search=${encodeURIComponent(

          search,

        )}`;

        const response = await fetchApi(endpoint);

        return response;

      } catch (err) {

        setError(err.message || "Failed to fetch career users");

        return null;

      } finally {

        setLoading(false);

      }

    },

    [fetchApi],

  );



  const getCareerUserDetails = useCallback(

    async ({ companyId, userId }) => {

      try {

        setLoading(true);

        setError(null);

        const response = await fetchApi(

          `/masteradmin/superuser/get-superusers?company_id=${companyId}&user_id=${userId}&page=1&limit=50`,

        );

        

        // if (response?.body?.data?.[0]) {

        //   return transformApiToFormData(response.body.data[0]);

        // }

        const user =

  response?.body?.users?.[0] ||

  response?.body?.data?.[0];



if (user) {

  return transformApiToFormData(user);

}



return null;

        

        return null;

      } catch (err) {

        setError(err.message || "Failed to fetch career user details");

        return null;

      } finally {

        setLoading(false);

      }

    },

    [fetchApi],

  );



  const getCarrierList = useCallback(

    async (companyId) => {

      try {

        setLoading(true);

        setError(null);

        const response = await fetchApi(

          `/carriers/get-carrier-list?company_id=${companyId}`,

        );

        return response;

      } catch (err) {

        setError(err.message || "Failed to fetch carrier list");

        return null;

      } finally {

        setLoading(false);

      }

    },

    [fetchApi],

  );



  const saveCareerUser = useCallback(

    async (formData, companyId, userId = null) => {

      try {

        setLoading(true);

        setError(null);

        const payload = transformCareerUserPayload(formData, companyId, userId);

        const response = await createApi(

          payload,

          "/masteradmin/superuser/create-or-update",

        );

        return response;

      } catch (err) {

        setError(err.message || "Failed to save career user");

        throw err;

      } finally {

        setLoading(false);

      }

    },

    [createApi],

  );



  const deleteCareerUser = useCallback(

    async (userId, companyId) => {

      try {

        setLoading(true);

        setError(null);

        const response = await createApi(

          { user_id: userId, company_id: companyId },

          "/masteradmin/superuser/delete",

        );

        return response;

      } catch (err) {

        setError(err.message || "Failed to delete career user");

        throw err;

      } finally {

        setLoading(false);

      }

    },

    [createApi],

  );



  return {

    getDriverOptions,

    getCareerUsers,

    getCareerUserDetails,

    getCarrierList,

    saveCareerUser,

    deleteCareerUser,

    loading,

    error,

  };

};



export default useCareerUsers;

