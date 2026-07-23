import { Box } from "@mui/material";
import CommonPageHeader from "../../../../common/CommonPageHeader";
import CommonSummaryCard from "../../../../common/CommonSummaryCard";
import CommonFilters from "../../../../common/CommonFilters";
import { AlertScreenHeaderContainer, AlertSummaryCardBox } from "./AlertCenterScreenCard.styles.jsx";

const AlertCenterScreenHeader = ({
  title = "Alert Center",
  hideCards = false,
  search,
  setSearch,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  category,
  setCategory,
  severity,
  setSeverity,
  company,
  setCompany,
  page,
  setPage,
  searchKey,
  categoryOptions,
  severityOptions,
  companyOptions,
  summaryCards,
  defaultCategory,
}) => {
  const data = {
    search,
    fromDate,
    toDate,
    category,
    severity,
    company,
  };

  const setData = (newData) => {
    if (typeof newData === 'function') {
      setData(newData({ search, fromDate, toDate, category, severity, company }));
      return;
    }

    if (newData.search !== undefined) setSearch(newData.search);
    if (newData.fromDate !== undefined) setFromDate(newData.fromDate);
    if (newData.toDate !== undefined) setToDate(newData.toDate);
    if (newData.category !== undefined) setCategory(newData.category);
    if (newData.severity !== undefined) setSeverity(newData.severity);
    if (newData.company !== undefined) setCompany(newData.company);
    if (newData.page !== undefined) setPage(newData.page);
  };

  return (
    <AlertScreenHeaderContainer>
      <CommonPageHeader
        title={title}
        subtitle={false}
        rightContent={false}
      />
      {!hideCards && (
        <AlertSummaryCardBox>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
                xl: "repeat(5, 1fr)",
              },
              gap: 1.5,
            }}
          >
            {summaryCards.map((card) => (
              <CommonSummaryCard
                key={card.id}
                title={card.title}
                value={card.value}
                icon={card.icon}
                showAccentBar={false}
                layout="default"
                compact
              />
            ))}
          </Box>
        </AlertSummaryCardBox>
      )}

      <CommonFilters
        data={data}
        setData={setData}
        searchKey={searchKey}
        allowDateClear={true}
        filters={[
          {
            label: "All Carrier",
            dataKey: "company",
            options: companyOptions,
            clearable: true,
          },
          {
            label: "Category",
            dataKey: "category",
            options: categoryOptions,
            disableClearable: !!defaultCategory,
          },
          {
            label: "Severity",
            dataKey: "severity",
            options: severityOptions,
            clearable: true,
          },
          
        ]}
      />
    </AlertScreenHeaderContainer>
  );
};

export default AlertCenterScreenHeader;
