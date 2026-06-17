import { Route, Routes } from "react-router-dom";
import ScrollToTop from "@src/components/ScrollToTop";
import DefaultLayout from "@src/layouts/DefaultLayout";
import VerticalLayout from "@src/layouts/VerticalLayout";
import { defaultLayoutRoutes, verticalLayoutRoutes } from "./routes";
import AutoLogout from "@src/components/LoginScreen/AutoLogout";
import RequireAuth from "@src/components/LoginScreen/RequireAuth";
import ProtectedRoute from "@src/common/ProtectedRoute";

const Router = (props) => {
  return <>
      <ScrollToTop />
      <AutoLogout />
      <Routes>
        {verticalLayoutRoutes.map((route, idx) => <Route key={idx + (route.path ?? "")} path={route.path} {...props} element={<RequireAuth><ProtectedRoute checkRoutePermissions={false}><VerticalLayout>{route.element}</VerticalLayout></ProtectedRoute></RequireAuth>} />)}
        {defaultLayoutRoutes.map((route, idx) => <Route key={idx + (route.path ?? "")} path={route.path} {...props} element={<DefaultLayout>{route.element}</DefaultLayout>} />)}
      </Routes>
    </>;
};
export default Router;
