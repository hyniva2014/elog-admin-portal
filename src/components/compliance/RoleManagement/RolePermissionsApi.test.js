import {
  fetchRolesApi,
  fetchRoleByIdApi,
  saveRoleApi,
  fetchRoleDetailsApi,
  syncRolePermissionsApi,
} from "./RolePermissionsApi";

describe("RolePermissionsApi", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  describe("fetchRolesApi", () => {
    test("returns roles successfully", async () => {
      const mockFetchApi = jest.fn().mockResolvedValue({
        body: {
          Roles: [
            {
              id: 1,
              name: "Admin",
            },
          ],
        },
      });

      const result = await fetchRolesApi(mockFetchApi);

      expect(mockFetchApi).toHaveBeenCalledWith(
        "/masteradmin/role/get-roles?is_superuser=1",
      );

      expect(result).toEqual([
        {
          id: 1,
          name: "Admin",
        },
      ]);
    });

    test("returns empty array when api fails", async () => {
      const mockFetchApi = jest
        .fn()
        .mockRejectedValue(new Error("API Error"));

      const result = await fetchRolesApi(mockFetchApi);

      expect(console.error).toHaveBeenCalled();

      expect(result).toEqual([]);
    });

    test("returns empty array when Roles missing", async () => {
      const mockFetchApi = jest.fn().mockResolvedValue({
        body: {},
      });

      const result = await fetchRolesApi(mockFetchApi);

      expect(result).toEqual([]);
    });
  });

  describe("fetchRoleByIdApi", () => {
    test("returns role by id successfully", async () => {
      const mockFetchApi = jest.fn().mockResolvedValue({
        body: {
          Roles: {
            id: 1,
            name: "Admin",
          },
        },
      });

      const result = await fetchRoleByIdApi(
        mockFetchApi,
        1,
      );

      expect(mockFetchApi).toHaveBeenCalledWith(
        "/masteradmin/role/get-roles?is_superuser=1&role_id=1",
      );

      expect(result).toEqual({
        id: 1,
        name: "Admin",
      });
    });

    test("returns null when api fails", async () => {
      const mockFetchApi = jest
        .fn()
        .mockRejectedValue(new Error("API Error"));

      const result = await fetchRoleByIdApi(
        mockFetchApi,
        1,
      );

      expect(console.error).toHaveBeenCalled();

      expect(result).toBeNull();
    });

    test("returns null when Roles missing", async () => {
      const mockFetchApi = jest.fn().mockResolvedValue({
        body: {},
      });

      const result = await fetchRoleByIdApi(
        mockFetchApi,
        1,
      );

      expect(result).toBeNull();
    });
  });

  describe("saveRoleApi", () => {
    const payload = {
      name: "Admin",
      description: "Administrator Role",
    };

    test("saves role successfully", async () => {
      const mockCreateApi = jest.fn().mockResolvedValue({
        statusCode: 201,
      });

      const result = await saveRoleApi(
        mockCreateApi,
        payload,
      );

      expect(mockCreateApi).toHaveBeenCalledWith(
        payload,
        "/masteradmin/roles/create-or-update-role",
      );

      expect(result).toEqual({
        statusCode: 201,
      });
    });

    test("returns null when api fails", async () => {
      const mockCreateApi = jest
        .fn()
        .mockRejectedValue(new Error("API Error"));

      const result = await saveRoleApi(
        mockCreateApi,
        payload,
      );

      expect(console.error).toHaveBeenCalled();

      expect(result).toBeNull();
    });
  });

  describe("fetchRoleDetailsApi", () => {
    test("returns role details successfully", async () => {
      const mockFetchApi = jest.fn().mockResolvedValue({
        body: {
          Roles: {
            id: 1,
            name: "Admin",
            permissions: [],
          },
        },
      });

      const result = await fetchRoleDetailsApi(
        mockFetchApi,
        1,
        1,
      );

      expect(mockFetchApi).toHaveBeenCalledWith(
        "/masteradmin/role/get-roles?is_superuser=1&role_id=1",
      );

      expect(result).toEqual({
        id: 1,
        name: "Admin",
        permissions: [],
      });
    });

    test("returns null when api fails", async () => {
      const mockFetchApi = jest
        .fn()
        .mockRejectedValue(new Error("API Error"));

      const result = await fetchRoleDetailsApi(
        mockFetchApi,
        1,
        1,
      );

      expect(console.error).toHaveBeenCalled();

      expect(result).toBeNull();
    });

    test("returns null when Roles missing", async () => {
      const mockFetchApi = jest.fn().mockResolvedValue({
        body: {},
      });

      const result = await fetchRoleDetailsApi(
        mockFetchApi,
        1,
        1,
      );

      expect(result).toBeNull();
    });
  });

  describe("syncRolePermissionsApi", () => {
    const payload = {
      role_id: 1,
      enabled_permission_ids: [1, 2],
      disabled_permission_ids: [3],
    };

    test("syncs permissions successfully", async () => {
      const mockCreateApi = jest.fn().mockResolvedValue({
        statusCode: 200,
      });

      const result = await syncRolePermissionsApi(
        mockCreateApi,
        payload,
      );

      expect(mockCreateApi).toHaveBeenCalledWith(
        payload,
        "/masteradmin/roles/sync-permissions",
      );

      expect(result).toEqual({
        statusCode: 200,
      });
    });

    test("returns null when api fails", async () => {
      const mockCreateApi = jest
        .fn()
        .mockRejectedValue(new Error("API Error"));

      const result = await syncRolePermissionsApi(
        mockCreateApi,
        payload,
      );

      expect(console.error).toHaveBeenCalled();

      expect(result).toBeNull();
    });
  });
});
