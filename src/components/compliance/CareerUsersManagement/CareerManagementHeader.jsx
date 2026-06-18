import { Box, Button } from "@mui/material";
import CommonPageHeader from "../../../common/CommonPageHeader";
import CommonFilters from "../../../common/CommonFilters";
import { DRIVER_STATUS } from "./Constants";
import { useState, useEffect } from "react";
import CommonSummaryCardGroup from "../../../common/CommonSummaryCardGroup";
import { useCareerUsers } from "../../../hooks";
import { useSelector } from "react-redux";
import {
  HeaderContainerSx,
  getAddButtonSx,
} from "./CareerManagementHeader.styled";

const CareerManagementHeader = (props) => {
  const { data = [], setData, searchKey = {}, summaryCards, addData, canCreate = true } = props;
  const { getDriverOptions } = useCareerUsers();
  const [driverOptions, setDriverOptions] = useState([]);

  const companyId = useSelector(
    (state) =>
      state.loginSlice.loginDetails?.body?.data?.userdetails?.company_id,
  );

  useEffect(() => {
    if (companyId) {
      loadUsers();
    }
  }, [companyId]);

  const handleAddCareerUser = (event) => {
    if (!canCreate) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (addData && typeof addData === 'function') {
      addData();
    }
  };

  const statusOptions = [
    ...Object.entries(DRIVER_STATUS).map(([key, value]) => ({
      value: Number(key),
      label: value,
    })),
  ];

  const loadUsers = async () => {
    try {
      const options = await getDriverOptions(companyId);
      setDriverOptions(options);
    } catch (err) {
      // Error handling without console statement
    }
  };

  return (
    <Box sx={HeaderContainerSx}>
      <CommonPageHeader
        title="Platform Users"
        subtitle="Manage user accounts and permissions"
        addButton={true}
        rightContent={
          <Button
            sx={getAddButtonSx(canCreate)}
            variant="contained"
            disabled={!canCreate}
            onClick={handleAddCareerUser}
          >
            Add User
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
          { label: "All Status", dataKey: "status", options: statusOptions },
        ]}
      />
    </Box>
  );
};
export default CareerManagementHeader;
