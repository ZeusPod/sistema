import React from "react";
import { Route, Routes } from "react-router-dom";
import SignInPage from "../../pages/SignIn/SignInPage";
import * as Path from "../../config/path";
import DashboardPage from "../../pages/DashBoard/DashBoardPage";
import SellPage from "../../pages/Sell/SellPage";
import InvoicesPage from "../../pages/Invoices/InvoicesPage";
import CustomersPage from "../../pages/Customers/CustomersPage";
import ProductsPage from "../../pages/Products/ProductsPage";
import PublicLayout from "../layout/PublicLayout";
import PanelLayout from "../layout/PanelLayout";
import PublicRoute from "./PublicRoute";
import PrivateRouter from "./PrivateRoute";
import UsersPage from "../../pages/Users/UsersPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route
          index
          element={
            <PublicRoute>
              <SignInPage />
            </PublicRoute>
          }
        />
      </Route>
      <Route
        path="/panel"
        element={
          <PrivateRouter>
            <PanelLayout />
          </PrivateRouter>
        }
      >
        <Route
          path="dashboard"
          element={
            <PrivateRouter>
              <DashboardPage />
            </PrivateRouter>
          }
        />
        <Route
          path="sell"
          element={
            <PrivateRouter>
              <SellPage />
            </PrivateRouter>
          }
        />
        <Route
          path="invoices"
          element={
            <PrivateRouter>
              <InvoicesPage />
            </PrivateRouter>
          }
        />
        <Route
          path="customers"
          element={
            <PrivateRouter>
              <CustomersPage />
            </PrivateRouter>
          }
        />
        <Route
          path="products"
          element={
            <PrivateRouter>
              <ProductsPage />
            </PrivateRouter>
          }
        />
        <Route
          path="users"
          element={
            <PrivateRouter>
              <UsersPage />
            </PrivateRouter>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRouter;
