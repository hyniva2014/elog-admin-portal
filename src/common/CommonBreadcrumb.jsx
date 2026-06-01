import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BreadcrumbBold, BreadcrumbText } from "../components/compliance/CareerUsersManagement/Constants";
import {
  BreadcrumbItemSx,
  BreadcrumbLinkSx,
  BreadcrumbSeparatorSx,
} from "./CommonBreadcrumb.styled";

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
      {breadcrumbs.map((item, index) => {
        const isLast = index === breadcrumbs.length - 1;

        return (
          <Box key={`${item.label}-${index}`} component="span" sx={BreadcrumbItemSx}>
            {isLast ? (
              <BreadcrumbBold>{item.label}</BreadcrumbBold>
            ) : (
              <Typography
                component="span"
                sx={BreadcrumbLinkSx}
                data-path={item.path}
                onClick={handleBreadcrumbClick}
              >
                {item.label}
              </Typography>
            )}

            {!isLast && <Box component="span" sx={BreadcrumbSeparatorSx}>/</Box>}
          </Box>
        );
      })}
    </BreadcrumbText>
  );
};

export default CommonBreadcrumb;
