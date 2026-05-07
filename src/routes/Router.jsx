import { Route, Routes } from "react-router-dom";
import ScrollToTop from "@src/components/ScrollToTop";
import DefaultLayout from "@src/layouts/DefaultLayout";
import VerticalLayout from "@src/layouts/VerticalLayout";
import { defaultLayoutRoutes, verticalLayoutRoutes } from "./routes";
import AutoLogout from "@src/components/LoginScreen/AutoLogout";
import RequireAuth from "@src/components/LoginScreen/RequireAuth";

const Router = (props) => {
  return <>
      <ScrollToTop />
      <AutoLogout />
      <Routes>
        {verticalLayoutRoutes.map((route, idx) => <Route key={idx + (route.path ?? "")} path={route.path} {...props} element={<RequireAuth><VerticalLayout>{route.element}</VerticalLayout></RequireAuth>} />)}
        {defaultLayoutRoutes.map((route, idx) => <Route key={idx + (route.path ?? "")} path={route.path} {...props} element={<DefaultLayout>{route.element}</DefaultLayout>} />)}
      </Routes>
    </>;
};
export default Router;
