import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  BreadcrumbBold,
  BreadcrumbText,
  BreadcrumbItemSx,
  BreadcrumbLinkSx,
  BreadcrumbSeparatorSx,
} from "./CommonBreadcrumb.styled";

const BreadcrumbLink = ({ item, onClick }) => (
  <Typography
    component="span"
    sx={BreadcrumbLinkSx}
    data-path={item.path}
    onClick={onClick}
  >
    {item.label}
  </Typography>
);

const BreadcrumbSeparator = () => (
  <Box component="span" sx={BreadcrumbSeparatorSx}>
    /
  </Box>
);

const BreadcrumbItem = ({ item, isLast, onClick }) => {
  const content = isLast ? (
    <BreadcrumbBold>{item.label}</BreadcrumbBold>
  ) : (
    <BreadcrumbLink item={item} onClick={onClick} />
  );

  const separator = !isLast ? <BreadcrumbSeparator /> : null;

  return (
    <Box component="span" sx={BreadcrumbItemSx}>
      {content}
      {separator}
    </Box>
  );
};

const CommonBreadcrumb = ({ breadcrumbs = [] }) => {
  const navigate = useNavigate();

  const handleBreadcrumbClick = (event) => {
    const path = event.currentTarget.dataset.path;
    if (path) {
      navigate(path);
    }
  };

  const BreadcrumbItemsList = () => (
    <>
      {breadcrumbs.map((item, index) => (
        <BreadcrumbItem
          key={`${item.label}-${index}`}
          item={item}
          isLast={index === breadcrumbs.length - 1}
          onClick={handleBreadcrumbClick}
        />
      ))}
    </>
  );

  return (
    <BreadcrumbText>
      <BreadcrumbItemsList />
    </BreadcrumbText>
  );
};

export default CommonBreadcrumb;
