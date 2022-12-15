import React from "react";
import { Container } from "react-bootstrap";
import AuthProvider from "../context/AuthContext";
import Signup from "./auth/Signup";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./auth/Profile";
import Login from "./auth/Login";
import PrivateRoute from "./auth/PrivateRoute";
import ForgotPassword from "./auth/ForgotPassword";
import UpdateProfile from "./auth/UpdateProfile";
import DashboardDrive from "./google-drive/DashboardDrive";
const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Drive */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <DashboardDrive />
              </PrivateRoute>
            }
          />

          {/* User */}
          <Route
            path="/user"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/update-profile"
            element={
              <PrivateRoute>
                <UpdateProfile />
              </PrivateRoute>
            }
          />

          {/* Auth */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* <Route path="/*" element={<Navigate to="/" />} /> */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
