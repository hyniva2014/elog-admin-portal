import CommonPageHeader from "../../../common/CommonPageHeader";
import CommonFilters from "../../../common/CommonFilters";
import { HeaderContainer } from "./RequestDevice.styled";

const RequestDeviceHeader = ({ data, setData, searchKey, statusOptions }) => {
  const requestDeviceFilters = (statusOptions) => [
    {
      label: "All Status",
      dataKey: "status",
      options: statusOptions,
    },
  ];

  return (
    <HeaderContainer>
      <CommonPageHeader title="Requested Devices" rightContent={null} />
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
