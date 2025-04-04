import { ReactNode } from "react";

import ProductListPage from "../pages/ProductList/ProductList.page";

export interface IRoute {
  path: string;
  icon?: ReactNode;
  page: () => ReactNode;
}

const ROUTES: IRoute[] = [
  {
    path: "/",
    page: ProductListPage,
  },
];

export { ROUTES };
