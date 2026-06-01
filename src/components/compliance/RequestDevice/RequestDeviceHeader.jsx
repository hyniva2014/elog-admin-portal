import CommonPageHeader from "../../../common/CommonPageHeader";
import CommonFilters from "../../../common/CommonFilters";
import { HeaderContainer } from "./RequestDevice.styled";

const RequestDeviceHeader = ({ data, setData, searchKey, statusOptions }) => {
  return (
    <HeaderContainer>
      <CommonPageHeader title="Requested Devices" rightContent={null} />
      <CommonFilters
        data={data}
        setData={setData}
        searchKey={searchKey}
        allowDateClear={true}
        filters={[
          {
            label: "All Status",
            dataKey: "status",
            options: statusOptions,
          },
        ]}
      />
    </HeaderContainer>
  );
};

export default RequestDeviceHeader;
