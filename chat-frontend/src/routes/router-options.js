import React from "react";
import {ROUTE_NAME} from "routes/router.constant";

export const RouteItems = [
  {
    id: 0,
    path: ROUTE_NAME.ROOT,
    Component: React.lazy(() => import("pages/login/LoginPage"))
  },
  {
    id: 1,
    path: ROUTE_NAME.SIGN_IN,
    Component: React.lazy(() => import("pages/login/LoginPage"))
  },
  {
    id: 2,
    path: ROUTE_NAME.HOME,
    Component: React.lazy(() => import("pages/home/HomePage"))
  },
  {
    id: 3,
    path: "*",
    Component: React.lazy(() => import("pages/NotFoundPage"))
  }
];