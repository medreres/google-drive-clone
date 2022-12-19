import React, { useEffect, useState } from "react";
import AuthProvider from "../context/AuthContext";
import Signup from "./auth/Signup";
import "./App.css";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./auth/Profile";
import Login from "./auth/Login";
import PrivateRoute from "./auth/PrivateRoute";
import ForgotPassword from "./auth/ForgotPassword";
import UpdateProfile from "./auth/UpdateProfile";
import DashboardDrive from "./google-drive/DashboardDrive";
const App = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Update network status
    const handleStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    // Listen to the online status
    window.addEventListener("online", handleStatusChange);

    // Listen to the offline status
    window.addEventListener("offline", handleStatusChange);

    // Specify how to clean up after this effect for performance improvment
    return () => {
      window.removeEventListener("online", handleStatusChange);
      window.removeEventListener("offline", handleStatusChange);
    };
  }, [isOnline]);

  console.log(isOnline)
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
          <Route
            path="/folders/:folderId"
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

          {/* helpers */}
          <Route
            path="/not-found"
            element={
              <PrivateRoute>
                <DashboardDrive notFound={true} />
              </PrivateRoute>
            }
          />
          <Route path="/*" element={<Navigate to="/not-found" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
