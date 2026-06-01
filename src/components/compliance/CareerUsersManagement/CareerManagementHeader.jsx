import { Box, Button } from "@mui/material";
import CommonPageHeader from "../../../common/CommonPageHeader";
import CommonFilters from "../../../common/CommonFilters";
import { DRIVER_STATUS } from "./Constants";
import { useState, useEffect } from "react";
import CommonSummaryCardGroup from "../../../common/CommonSummaryCardGroup";
import { useServices } from "../../../services/services";
import { useSelector } from "react-redux";
// import { hasPermission } from "./Constants";

const CareerManagementHeader = (props) => {
  const { data = [], setData, searchKey = {}, summaryCards, addData } = props;
  const { fetchApi } = useServices();
  const [driverOptions, setDriverOptions] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const companyId = useSelector(
    (state) =>
      state.loginSlice.loginDetails?.body?.data?.userdetails?.company_id,
  );

  //   const permissions = useSelector((state) => state.rolePermissions.permissions);
  // const permissions = useSelector(
  //   (state) => state.rolePermissions?.permissions || {},
  // );

  //   const canCreate = hasPermission(
  //     permissions,
  //     "CAREER_USER_MANAGEMENT",
  //     "USER_CREATE",
  //   );
  const canCreate = true;

  const addButtonSx = {
    color: "common.white",
    backgroundColor: "brand.main",
    opacity: canCreate ? 1 : 0.5,
    cursor: canCreate ? "pointer" : "not-allowed",
  };

  const handleAddCareerUser = (event) => {
    if (!canCreate) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    addData();
  };

  const statusOptions = [
    ...Object.entries(DRIVER_STATUS).map(([key, value]) => ({
      value: Number(key),
      label: value,
    })),
  ];

  const loadUsers = async () => {
    try {
      const response = await fetchApi(
        `/user/get-users-and-vehicles?company_id=${companyId}`,
      );

      const users = response?.body?.users || [];

      setDriverOptions(
        users.map((user) => ({
          value: user.user_id,
          label: user.user_name,
        })),
      );
    } catch (err) {
      console.error("User list error", err);
    }
  };

  return (
    <Box sx={{ mb: 2 }}>
      <CommonPageHeader
        title="Career Users Management"
        addButton={true}
        rightContent={
          <Button
            sx={addButtonSx}
            variant="contained"
            disabled={!canCreate}
            onClick={handleAddCareerUser}
          >
            Add Career User
          </Button>
        }
      />

      <Box mt={2}>
        <CommonSummaryCardGroup
          cards={summaryCards}
          showAccentBar={true}
          layout="default"
        />
      </Box>

      <CommonFilters
        data={data}
        setData={setData}
        searchKey={searchKey}
        allowDateClear={true}
        filters={[
          {
            label: "All Users",
            dataKey: "user",
            options: driverOptions,
          },
          // {
          //   label: "All Vehicle",
          //   dataKey: "vehicle",
          //   options: vehicleOptions,
          // },
          { label: "All Status", dataKey: "status", options: statusOptions },
        ]}
      />
    </Box>
  );
};
export default CareerManagementHeader;
