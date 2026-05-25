import CommonPageHeader from "../../../../common/CommonPageHeader";
import CommonSummaryCardGroup from "../../../../common/CommonSummaryCardGroup";
import CommonFilters from "../../../../common/CommonFilters";
import { AlertCenterCards } from "../AdminConstant";
import { AlertScreenHeaderContainer, AlertSummaryCardBox } from "./AlertCenterScreenCard.styles.jsx";

const AlertCenterScreenHeader = ({
  data,
  setData,
  searchKey,
  categoryOptions,
  severityOptions,
}) => {
  return (
    <AlertScreenHeaderContainer>
      <CommonPageHeader
        title="Alert Center"
        subtitle={false}
        rightContent={false}
      />
      <AlertSummaryCardBox>
        <CommonSummaryCardGroup
          cards={AlertCenterCards}
          showAccentBar={false}
          layout="default"
        />
      </AlertSummaryCardBox>

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
    </AlertScreenHeaderContainer>
  );
};

export default AlertCenterScreenHeader;
