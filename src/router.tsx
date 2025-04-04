import { createBrowserRouter } from "react-router-dom";
import Error from "./common/pages/Error.page";
import { MainLayout } from "./layouts/MainLayout";
import { ROUTES } from "./constants/routes";
import { DashboardLayout } from "./layouts/DashboardLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <DashboardLayout />,
        children: ROUTES.map((route) => ({
          path: route.path,
          element: <route.page />,
        })),
      },
    ],
    errorElement: (
      <DashboardLayout>
        <Error />
      </DashboardLayout>
    ),
  },
]);
