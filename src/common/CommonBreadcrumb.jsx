import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  BreadcrumbBold,
  BreadcrumbText,
  BreadcrumbItemSx,
  BreadcrumbLinkSx,
  BreadcrumbSeparatorSx,
} from "./CommonBreadcrumb.styled";

const BreadcrumbItem = ({ item, isLast, onClick }) => (
  <Box component="span" sx={BreadcrumbItemSx}>
    {isLast ? (
      <BreadcrumbBold>{item.label}</BreadcrumbBold>
    ) : (
      <Typography
        component="span"
        sx={BreadcrumbLinkSx}
        data-path={item.path}
        onClick={onClick}
      >
        {item.label}
      </Typography>
    )}
    {!isLast && (
      <Box component="span" sx={BreadcrumbSeparatorSx}>
        /
      </Box>
    )}
  </Box>
);

const CommonBreadcrumb = ({ breadcrumbs = [] }) => {
  const navigate = useNavigate();

  const handleBreadcrumbClick = (event) => {
    const path = event.currentTarget.dataset.path;
    if (path) {
      navigate(path);
    }
  };

  return (
    <BreadcrumbText>
      {breadcrumbs.map((item, index) => (
        <BreadcrumbItem
          key={`${item.label}-${index}`}
          item={item}
          isLast={index === breadcrumbs.length - 1}
          onClick={handleBreadcrumbClick}
        />
      ))}
    </BreadcrumbText>
  );
};

export default CommonBreadcrumb;
