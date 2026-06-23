import { USER_STATUS } from "../UserManagement/Constants";

export const getUsersByRoleApi = async (fetchApi, roleId) => {
  try {
    const response = await fetchApi(
      `/masteradmin/superuser/get-superusers?role_id=${roleId}`,
    );

    const records = response?.body?.users || [];

    const users = records.map((user) => ({
      id: user.user_id,
      userName: user.user_name || "-",
      userId: String(user.user_id),
      email: user.email || "-",
      phone: user.phone || "-",
      onboardDate: user.hire_date ? user.hire_date.split("T")[0] : "-",
      status: USER_STATUS[user.status_id] || "Inactive",
    }));

    const totalCount = response?.body?.total_records || users.length;

    return { users, totalCount };
  } catch (error) {
    console.error("getUsersByRoleApi Error:", error);
    return { users: [], totalCount: 0 };
  }
};

