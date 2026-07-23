import {
  AccentBar,
  CardContentWrapper,
  ContentWrapper,
  SummaryCardRoot,
  TextContainer,
  TitleRow,
  TitleText,
  ValueText,
  ViewAllText,
} from "./CommonSummaryCard.styled";

const CommonSummaryCard = ({
  title,
  value,
  accentcolor,
  icon,
  showAccentBar = true,
  layout = "default",
  compact = false,
  showViewAll = false,
  onViewAll,
  onClick,
}) => {
  const isDashboard = layout === "dashboard";

  const dashboardIconElement = isDashboard ? icon : null;

  const viewAllElement =
    isDashboard && showViewAll ? (
      <ViewAllText variant="inherit" onClick={onViewAll}>
        View All
      </ViewAllText>
    ) : null;

  return (
    <SummaryCardRoot
      onClick={onClick}
      isinteractive={Boolean(onClick)}
      iscompact={compact}
    >
      {showAccentBar && <AccentBar accentcolor={accentcolor} />}

      <ContentWrapper>
        <CardContentWrapper>
          {!isDashboard && icon}

          <TextContainer>
            {/* <TitleRow isdashboard={isDashboard}>
              {isDashboard && icon}

              <TitleText variant="inherit">{title}</TitleText>
              {isDashboard && showViewAll && (
                <ViewAllText variant="inherit" onClick={onViewAll}>
                  View All
                </ViewAllText>
              )}
            </TitleRow> */}

            <TitleRow isdashboard={isDashboard}>
              {dashboardIconElement}

              <TitleText variant="inherit" iscompact={compact}>
                {title}
              </TitleText>

              {viewAllElement}
            </TitleRow>

            <ValueText
              variant="inherit"
              isdashboard={isDashboard}
              iscompact={compact}
            >
              {value}
            </ValueText>
          </TextContainer>
        </CardContentWrapper>
      </ContentWrapper>
    </SummaryCardRoot>
  );
};

export default CommonSummaryCard;
