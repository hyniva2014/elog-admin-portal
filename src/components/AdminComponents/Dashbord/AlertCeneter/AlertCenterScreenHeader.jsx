import CommonPageHeader from "../../../../common/CommonPageHeader";
import CommonSummaryCardGroup from "../../../../common/CommonSummaryCardGroup";
import CommonFilters from "../../../../common/CommonFilters";
import { AlertCenterCards } from "../AdminConstant";
import { HeaderContainer } from "../../../compliance/DeviceManagement/DeviceManagement.styles";
import { SummaryCardBox } from "../../../compliance/DeviceAssetManagement/DeviceAssetManagement.styles";


const AlertCenterScreenHeader = ({
  data,
  setData,
  searchKey,
  categoryOptions,
  severityOptions,
}) => {
  return (
    <>
      <HeaderContainer>
        <CommonPageHeader
          title="Alert Center"
          subtitle={false}
          rightContent={false}
        />
        <SummaryCardBox>
          <CommonSummaryCardGroup
            cards={AlertCenterCards}
            showAccentBar={false}
            layout="default"
          />
        </SummaryCardBox>

        <CommonFilters
          data={data}
          setData={setData}
          searchKey={searchKey}
          allowDateClear={true}
          filters={[
            {
              label: "Category",
              dataKey: "category",
              options: categoryOptions,
            },
            {
              label: "Severity",
              dataKey: "severity",
              options: severityOptions,
            },
          ]}
        />
      </HeaderContainer>
    </>
  );
};
export default AlertCenterScreenHeader;
