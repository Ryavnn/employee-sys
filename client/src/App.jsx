import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoutes";

import HRDashboard from "./Pages/HRDashboard";
import LoginPage from "./Pages/Login";
import LandingPage from "./Pages/LandingPage";
import EmployeeDashboard from "./Pages/EmployeeDashboard";
import EmpAnnouncements from "./Pages/EmpAnnouncements";
import EmpTeam from "./Pages/EmpTeam";
import EmpNotifications from "./Pages/EmpNotifications";
import EmpTasks from "./Pages/EmpTasks";
import EmployeeManagementDashboard from "./Pages/ManagerDashboard";
import "./App.css";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />


        {/* Protected HR routes */}
        <Route
          path="/dashboard-hr"
          element={
            <ProtectedRoute requiredRole="hr">
              <HRDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard-employee"
          element={
            <ProtectedRoute requiredRole="employee">
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard-employee/announcements"
          element={
            <ProtectedRoute requiredRole="employee">
              <EmpAnnouncements />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard-employee/team"
          element={
            <ProtectedRoute requiredRole="employee">
              <EmpTeam />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard-employee/notifications"
          element={
            <ProtectedRoute requiredRole="employee">
              <EmpNotifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard-employee/tasks"
          element={
            <ProtectedRoute requiredRole="employee">
              <EmpTasks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard-manager"
          element={
            <ProtectedRoute requiredRole="manager">
              <EmployeeManagementDashboard />
            </ProtectedRoute>
          }
        />

        {/* Landing Page as default */}
        <Route path="/" element={<LandingPage />} />

        {/* Catch-all route for unknown paths */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
