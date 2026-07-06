/*
 * Copyright (c) 2023.
 * File Name: Footer.tsx
 * Author: Coderthemes
 */

import { Typography, styled } from "@mui/material";
import { useLayoutContext } from "@src/states";
import { useFooterContext } from "@src/states/useFooterContext";

const FooterWrapper = styled("div")(({ theme }) => {
  return {
    backgroundColor: "transparent",
    height: "30px",
    minHeight: "30px",
    marginTop: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // borderTop: `1px solid ${theme.palette.divider}`,
  };
});

const Footer = () => {
  const { settings } = useLayoutContext();
  const { hideFooter } = useFooterContext();

  if (hideFooter) return null;

  return (
    <FooterWrapper settings={settings} className="footer-do-not-remove">
      <Typography variant="subtitle2" color="text.secondary">
        © {new Date().getFullYear()} Trackpulse Pvt Ltd. All Rights Reserved.
      </Typography>
    </FooterWrapper>
  );
};

export default Footer;
