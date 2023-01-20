import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthProvider from "./shared/context/AuthContext";
import { PrivateRoute } from "./features/Auth";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UpdateProfile from "./pages/UpdateProfile";

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
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/folders/:folderId"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* User */}
          <Route
            path="/user"
            element={
              <PrivateRoute>
                <Profile />
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
          <Route
            path="/signup"
            element={<Signup />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />

          {/* helpers */}
          <Route
            path="/not-found"
            element={
              <PrivateRoute>
                <Dashboard notFound={true} />
              </PrivateRoute>
            }
          />
          <Route
            path="/*"
            element={<Navigate to="/not-found" />}
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
