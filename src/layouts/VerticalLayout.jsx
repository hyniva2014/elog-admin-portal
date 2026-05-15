/*
 * Copyright (c) 2023.
 * File Name: VerticalLayout.tsx
 * Author: Coderthemes
 */

import { Suspense, lazy } from "react";
import { useLayoutContext } from "@src/states";
import { ContentWrapper, MainContent, LoadingProgress } from "./VerticalLayout.styles";
const LeftSideBar = lazy(() => import("@src/layouts/LeftSideBar"));
const RightSideBar = lazy(() => import("@src/layouts/RightSideBar"));
const Topbar = lazy(() => import("@src/layouts/Topbar"));
const Footer = lazy(() => import("@src/layouts/Footer"));
const VerticalLayout = ({ children }) => {
  const { settings } = useLayoutContext();
  return (
    <div>
      <Suspense fallback={<div />}>
        <LeftSideBar />
      </Suspense>
      <MainContent settings={settings}>
        <Suspense fallback={<div />}>
          <Topbar />
        </Suspense>

        <ContentWrapper>
          <Suspense fallback={<LoadingProgress color="primary" />}>
            {children}
          </Suspense>
        </ContentWrapper>

        <Suspense fallback={<div />}>{/* <Footer /> */}</Suspense>

        <Suspense fallback={<div />}>
          <RightSideBar />
        </Suspense>
      </MainContent>
    </div>
  );
};
export default VerticalLayout;