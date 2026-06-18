import CommonPageHeader from "../../../common/CommonPageHeader";
import CommonFilters from "../../../common/CommonFilters";
import { HeaderContainer } from "./RequestDevice.styled";
import { Button } from "@mui/material";

const RequestDeviceHeader = ({
  data,
  setData,
  searchKey,
  statusOptions,
  handleRequestDeviceClick,
  canCreate,
}) => {
  const requestDeviceFilters = (statusOptions) => [
    {
      label: "All Status",
      dataKey: "status",
      options: statusOptions,
    },
  ];

  const isCreateDisabled = !canCreate || !handleRequestDeviceClick;

  return (
    <HeaderContainer>
      <CommonPageHeader
        title="Requested Devices"
        showExport={false}
        rightContent={
          <Button
            variant="contained"
            onClick={handleRequestDeviceClick}
            disabled={isCreateDisabled}
          >
            Request Device
          </Button>
        }
      />
      <CommonFilters
        data={data}
        setData={setData}
        searchKey={searchKey}
        allowDateClear={true}
        filters={requestDeviceFilters(statusOptions)}
      />
    </HeaderContainer>
  );
};

export default RequestDeviceHeader;
