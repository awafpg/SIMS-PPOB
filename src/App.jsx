import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/Login/LoginPage";
import HomePage from "./Pages/Home/HomePage";
import Error404 from "./Pages/ErrorPage/Error404";
import PublicRoute from "./Layout/PublicRoute";
import ProtectedRoute from "./Layout/ProtectedRoute";
import Layout from "./Layout/Layout";
import RegisterPage from "./Pages/Register/RegisterPage";
import LayoutUser from "./Layout/LayoutUser";
import TopUpPage from "./Pages/TopUP/TopUpPage";
import TransactionPage from "./Pages/Transaction/TransactionPage";
import TransactionHistory from "./Pages/Transaction/TransactionHistory";
import AccountPage from "./Pages/Account/AccountPage";
import EditAccount from "./Pages/Account/EditAccount";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />} path="/">
          {/* public routes */}
          {/* Larangan akses yang sudah Login */}
          <Route element={<PublicRoute />}>
            <Route index element={<Navigate to="/login" replace />} />
            <Route element={<LoginPage />} path="/login" />
            <Route element={<RegisterPage />} path="/register" />
          </Route>

          {/* protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<LayoutUser />}>
              <Route element={<HomePage />} path="/profile" />
              <Route element={<TopUpPage />} path="/top-up" />
              <Route element={<TransactionHistory />} path="/transaction" />
              <Route element={<TransactionPage />} path="/payment" />
              <Route element={<AccountPage />} path="/account" />
              <Route element={<EditAccount />} path="/account/edit" />
            </Route>
          </Route>
        </Route>

        <Route element={<Error404 />} path="*" />
        <Route element={<p>Hello</p>} path="/register" />
      </Routes>
    </>
  );
}

export default App;
