import {
  AccentBar,
  CardContentWrapper,
  ContentWrapper,
  SummaryCardRoot,
  TextContainer,
  TitleRow,
  TitleText,
  ValueText,
} from "./CommonSummaryCard.styled";

const CommonSummaryCard = ({
  title,
  value,
  accentcolor,
  icon,
  showAccentBar = true,
  layout = "default",
}) => {

  const isDashboard = layout === "dashboard";


  return (
    <SummaryCardRoot>
      {showAccentBar && <AccentBar accentcolor={accentcolor} />}

      <ContentWrapper>
        <CardContentWrapper>
          {!isDashboard && icon}

          <TextContainer>
            <TitleRow isdashboard={isDashboard}>
              {isDashboard && icon}

              <TitleText variant="inherit">{title}</TitleText>
            </TitleRow>

            <ValueText variant="inherit" isdashboard={isDashboard}>
              {value}
            </ValueText>
          </TextContainer>
        </CardContentWrapper>
      </ContentWrapper>
    </SummaryCardRoot>
  );
};

export default CommonSummaryCard;
