import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LogOut,
  Menu,
  X,
  LayoutDashboard,
  Users,
  Briefcase,
  Clock,
  FileText,
  Settings
} from "lucide-react";

export default function DashboardLayout({ children, user, title, role, sideNavItems }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const defaultNavItems = [
    { label: "Dashboard", path: `/dashboard-${role}`, icon: LayoutDashboard },
  ];

  const itemsToRender = sideNavItems || defaultNavItems;

  return (
    <div className="layout-container">
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <div className="logo-area">
            {isSidebarOpen && (
              <>
                <Briefcase size={24} className="logo-icon" />
                <span className="logo-text">EMS</span>
              </>
            )}
          </div>
          <button
            className="toggle-btn"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="sidebar-nav">
          {itemsToRender.map((item) => (
            <div
              key={item.label}
              className={`nav-item ${item.active || location.pathname === item.path ? "active" : ""}`}
              onClick={() => item.onClick ? item.onClick() : navigate(item.path)}
            >
              <item.icon size={20} />
              {isSidebarOpen && <span>{item.label}</span>}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={20} />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="top-header">
          <div className="header-title">
            <h1>{title}</h1>
          </div>
          <div className="user-profile">
            <div className="user-info">
              <span className="user-name">{user?.name || "User"}</span>
              <span className="user-role">{user?.role || role || "Employee"}</span>
            </div>
            <div className="user-avatar">
              {user?.name ? user.name[0].toUpperCase() : "U"}
            </div>
          </div>
        </header>

        <div className="content-area">
          {children}
        </div>
      </main>

      <style jsx>{`
        .layout-container {
          display: flex;
          min-height: 100vh;
          background-color: #f3f4f6;
          font-family: 'Inter', sans-serif;
        }

        /* Sidebar */
        .sidebar {
          background-image: linear-gradient(180deg, #1e293b 0%, #0f172a 100%); /* Match login dark gradient */
          color: white;
          width: 260px; /* Slightly wider for better spacing */
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
          position: sticky;
          top: 0;
          height: 100vh;
          border-top-right-radius: 30px; /* Match login radius */
          border-bottom-right-radius: 30px;
          overflow: hidden;
          box-shadow: 4px 0 24px rgba(0,0,0,0.15); /* Stronger shadow */
          z-index: 10; /* Ensure it stays above content if needed */
        }

        .sidebar.closed {
          width: 80px;
        }

        .sidebar-header {
          padding: 24px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          /* border-bottom: 1px solid rgba(255,255,255,0.1);  Removed for cleaner look */
          margin-bottom: 10px;
        }

        .logo-area {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 700;
          font-size: 22px;
          color: white; /* Clean white text */
          letter-spacing: 0.5px;
        }

        .toggle-btn {
          background: rgba(255,255,255,0.1);
          border: none;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          transition: all 0.2s;
        }

        .toggle-btn:hover {
          background: rgba(255,255,255,0.2);
        }

        .sidebar-nav {
          flex: 1;
          padding: 10px 16px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 16px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          color: #94a3b8; /* Muted text */
          border-radius: 12px; /* Inner rounded items */
          font-size: 15px;
          font-weight: 500;
        }

        .nav-item:hover {
          background-color: rgba(255,255,255,0.05);
          color: white;
          transform: translateX(4px);
        }

        /* Active State - Matches Login Brand Section vibe */
        .nav-item.active {
          background: linear-gradient(90deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3); /* Blue glow */
          transform: translateX(0); /* Reset hover transform */
        }

        .sidebar-footer {
          padding: 24px;
          /* border-top: 1px solid rgba(255,255,255,0.1); */
        }

        .logout-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          background: rgba(239, 68, 68, 0.1); /* Subtle red bg */
          border: none;
          color: #f87171;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          padding: 12px 16px;
          border-radius: 12px;
          transition: all 0.2s;
        }

        .logout-btn:hover {
          background: rgba(239, 68, 68, 0.2);
          color: #fca5a5;
        }

        /* Main Content */
        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow-x: hidden;
          background-color: #f1f5f9; /* Match login bg */
        }

        .top-header {
          background-color: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(8px); /* Modern glass effect */
          padding: 0 40px; /* Wider padding */
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 80px; /* Taller header */
          position: sticky;
          top: 0;
          z-index: 5;
        }

        .header-title h1 {
          font-size: 24px;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
          letter-spacing: -0.5px;
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 6px 8px 6px 16px;
          background: white;
          border-radius: 50px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.05); /* Subtle card feeling */
        }

        .user-info {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          line-height: 1.2;
        }

        .user-name {
          font-size: 14px;
          font-weight: 600;
          color: #0f172a;
        }

        .user-role {
          font-size: 11px;
          color: #64748b;
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 16px;
          box-shadow: 0 4px 10px rgba(37, 99, 235, 0.2);
        }

        .content-area {
          padding: 40px;
          flex: 1;
          overflow-y: auto;
        }
      `}</style>
    </div>
  );
}
