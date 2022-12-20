import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/auth/PrivateRoute";
import AuthProvider from "./context/AuthContext";
import DashboardDrive from "./components/google-drive/DashboardDrive";
import Dashboard from "./components/google-drive/DashboardDrive";
import UpdateProfile from "./components/auth/UpdateProfile";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import ForgotPassword from "./components/auth/ForgotPassword";

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
