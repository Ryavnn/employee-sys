import React, { useState, useEffect } from "react";
import {
  Users,
  UserPlus,
  Calendar,
  BarChart2,
  Clock,
  Star,
  PieChart,
  Briefcase,
} from "lucide-react";
import AddEmployeeModal from "../components/AddEmployee";
import ManagersTab from "../components/ManagersTab";
import AttendanceTab from "../components/hr/AttendanceTab";
import PerformanceTab from "../components/hr/PerformanceTab";
import ReportsTab from "../components/hr/ReportsTab";
import DashboardLayout from "../components/DashboardLayout";
import { mockApi } from "../services/mockApi";

export default function HRDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [managers, setManagers] = useState([]);
  const [stats, setStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user")) || { name: "HR Manager", role: "hr" };

  const handleAddEmployee = async (newEmployee) => {
    try {
      const data = await mockApi.addEmployee(newEmployee);

      if (data.success) {
        setEmployees((prevEmployees) => [...prevEmployees, data.employee]);
        alert("Employee added successfully!");
      } else {
        alert(data.message || "Failed to add employee");
      }
    } catch (err) {
      alert("Error connecting to the server");
      console.error("Error adding employee:", err);
    }
  };

  // Fetch employees from the API
  const fetchEmployees = async () => {
    try {
      setIsLoading(true);
      const data = await mockApi.getEmployees();
      if (data.success) {
        setEmployees(data.employees);
      } else {
        setError(data.message || "Failed to fetch employees");
      }
    } catch (err) {
      setError("Error connecting to the server");
      console.error("Error fetching employees:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch managers from the API
  const fetchManagers = async () => {
    try {
      const data = await mockApi.getManagers();
      if (data.success) {
        setManagers(data.managers);
      } else {
        console.error("Failed to fetch managers:", data.message);
      }
    } catch (err) {
      console.error("Error fetching managers:", err);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      fetchManagers();
    }
  }, [isModalOpen]);

  const fetchStats = async () => {
    try {
      const data = await mockApi.getStats();
      setStats([
        {
          title: "Total Employees",
          value: data.totalEmployees,
          icon: Users,
        },
        {
          title: "New Hires",
          value: data.newHires,
          icon: UserPlus,
        },
        {
          title: "Attendance Rate",
          value: data.attendanceRate,
          icon: Clock,
        },
        {
          title: "Managers",
          value: data.managers,
          icon: Briefcase,
        },
      ]);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  // Load employees, managers, and stats when component mounts
  useEffect(() => {
    fetchEmployees();
    fetchManagers();
    fetchStats();
  }, []);

  const navItems = [
    {
      label: "Dashboard",
      icon: BarChart2,
      active: activeTab === "dashboard",
      onClick: () => setActiveTab("dashboard")
    },
    {
      label: "Employees",
      icon: Users,
      active: activeTab === "employees",
      onClick: () => setActiveTab("employees")
    },
    {
      label: "Recruitment",
      icon: UserPlus,
      active: activeTab === "recruitment",
      onClick: () => setActiveTab("recruitment")
    },
    {
      label: "Attendance",
      icon: Calendar,
      active: activeTab === "attendance",
      onClick: () => setActiveTab("attendance")
    },
    {
      label: "Performance",
      icon: Star,
      active: activeTab === "performance",
      onClick: () => setActiveTab("performance")
    },
    {
      label: "Reports",
      icon: PieChart,
      active: activeTab === "reports",
      onClick: () => setActiveTab("reports")
    }
  ];

  return (
    <DashboardLayout
      title="HR Dashboard"
      user={user}
      role="hr"
      sideNavItems={navItems}
    >
      {/* Dashboard View */}
      {activeTab === "dashboard" && (
        <div className="dashboard-content">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-header">
                  <span className="stat-title">{stat.title}</span>
                  <div className="stat-icon">
                    <stat.icon size={20} />
                  </div>
                </div>
                <div className="stat-value">{stat.value}</div>
              </div>
            ))}
          </div>

          <div className="dashboard-grid">
            <div className="activities-card">
              <div className="card-header">
                <h3 className="card-title">Recent Activities</h3>
                <button className="view-all">View All</button>
              </div>
              <div className="activities-list">
                {[
                  { title: "New employee onboarded", desc: "Sarah Jenkins joined Design Team", time: "2h ago", icon: UserPlus, color: "green" },
                  { title: "Meeting with Department Heads", desc: "Quarterly review preparation", time: "4h ago", icon: Users, color: "blue" },
                  { title: "Performance Review", desc: "Completed for Engineering Team", time: "Yesterday", icon: Star, color: "purple" },
                ].map((activity, idx) => (
                  <div key={idx} className="activity-item">
                    <div className={`activity-icon ${activity.color}`}>
                      <activity.icon size={16} />
                    </div>
                    <div className="activity-details">
                      <p className="activity-title">{activity.title}</p>
                      <p className="activity-description">{activity.desc}</p>
                    </div>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="chart-card">
              <div className="card-header">
                <h3 className="card-title">Employee Statistics</h3>
                <select className="time-filter">
                  <option>This Month</option>
                  <option>Last Month</option>
                  <option>This Year</option>
                </select>
              </div>
              <div className="chart-container">
                <div className="chart-placeholder">
                  <PieChart size={48} className="chart-icon" />
                  <p className="chart-label">Employee Distribution Chart</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Employees View */}
      {activeTab === "employees" && (
        <div className="employees-view">
          <div className="employees-header">
            <h2 className="page-title">Employees Directory</h2>
            <button
              className="add-employee-button"
              onClick={() => setIsModalOpen(true)}
            >
              <UserPlus size={16} className="button-icon" />
              Add Employee
            </button>
          </div>

          <div className="employees-table-container">
            <table className="employees-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Role</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id}>
                    <td>
                      <div className="employee-cell">
                        <div className="employee-avatar">
                          {employee.name.charAt(0)}
                        </div>
                        <span className="employee-name">{employee.name}</span>
                      </div>
                    </td>
                    <td>{employee.role}</td>
                    <td>{employee.department || "General"}</td>
                    <td>
                      <span className={`status-badge active`}>Active</span>
                    </td>
                    <td className="actions-cell">
                      <button className="action-link">Edit</button>
                      <span className="action-divider">|</span>
                      <button className="action-link">Profile</button>
                    </td>
                  </tr>
                ))}
                {employees.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>No employees found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Recruitment View (ManagersTab) */}
      {/* We reuse ManagersTab for "Recruitment" or rename the tab labels accordingly in future */}
      {activeTab === "recruitment" && <ManagersTab />}

      {/* Attendance Module */}
      {activeTab === "attendance" && <AttendanceTab />}

      {/* Performance Module */}
      {activeTab === "performance" && <PerformanceTab />}

      {/* Reports Module */}
      {activeTab === "reports" && <ReportsTab />}

      {/* Add Employee Modal */}
      {isModalOpen && (
        <AddEmployeeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddEmployee}
          managers={managers}
        />
      )}

      <style jsx>{`
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 24px;
          margin-bottom: 32px;
        }

        .stat-card {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          padding: 24px;
        }

        .stat-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .stat-title {
          color: #6b7280;
          font-weight: normal;
        }

        .stat-icon {
          background-color: #e0e7ff;
          padding: 8px;
          border-radius: 8px;
          color: #4338ca;
        }

        .stat-value {
          font-size: 30px;
          font-weight: bold;
          color: #1e293b;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 24px;
        }

        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
        }

        .card-title {
            font-size: 18px;
            font-weight: bold;
            color: #1e293b;
            margin: 0;
        }

        .activities-card, .chart-card {
           background-color: white;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            padding: 24px;
        }

        .activity-item {
            display: flex;
            align-items: center;
            margin-bottom: 16px;
            padding-bottom: 16px;
            border-bottom: 1px solid #f3f4f6;
        }
        
        .activity-icon {
             padding: 8px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 12px;
        }

        .activity-icon.green { background-color: #dcfce7; color: #16a34a; }
        .activity-icon.blue { background-color: #dbeafe; color: #2563eb; }
        .activity-icon.purple { background-color: #f3e8ff; color: #9333ea; }
        
        .activity-details { flex: 1; }
        .activity-title { font-weight: 500; margin: 0 0 2px 0; color: #1e293b; }
        .activity-description { color: #6b7280; font-size: 14px; margin: 0; }
        .activity-time { color: #9ca3af; font-size: 12px; }

        .view-all {
            color: #4f46e5;
            background: none;
            border: none;
            cursor: pointer;
            font-size: 14px;
        }

        .employees-header {
           display: flex;
           justify-content: space-between;
           align-items: center;
           margin-bottom: 24px;
        }

        .page-title {
            font-size: 24px;
            font-weight: bold;
            color: #1e293b;
            margin: 0;
        }

        .add-employee-button {
            background-color: #4f46e5;
            color: white;
            padding: 10px 16px;
            border-radius: 8px;
            border: none;
            display: flex;
            align-items: center;
            cursor: pointer;
            font-weight: 500;
            gap: 8px;
        }

        .employees-table-container {
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .employees-table {
            width: 100%;
            border-collapse: collapse;
        }

        .employees-table th {
            padding: 16px 24px;
            text-align: left;
            font-size: 12px;
            font-weight: 600;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            background-color: #f8fafc;
            border-bottom: 1px solid #e2e8f0;
        }

        .employees-table td {
            padding: 16px 24px;
            border-bottom: 1px solid #e2e8f0;
            color: #334155;
            font-size: 14px;
        }

        .employee-cell {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .employee-avatar {
            width: 36px;
            height: 36px;
            background-color: #3b82f6;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            font-size: 14px;
        }

        .employee-name {
            font-weight: 500;
            color: #1e293b;
        }

        .status-badge {
            padding: 4px 10px;
            border-radius: 9999px;
            font-size: 12px;
            font-weight: 500;
        }
        
        .status-badge.active {
            background-color: #dcfce7;
            color: #166534;
        }

        .actions-cell {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .action-link {
            background: none;
            border: none;
            cursor: pointer;
            color: #3b82f6;
            font-weight: 500;
            padding: 0;
        }
        
        .action-divider { color: #cbd5e1; }

        .time-filter {
            padding: 6px 10px;
            border: 1px solid #cbd5e1;
            border-radius: 6px;
            font-size: 14px;
            color: #475569;
        }

        .chart-container {
            height: 250px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #f8fafc;
            border-radius: 8px;
            border: 1px dashed #cbd5e1;
        }
        
        .chart-placeholder { text-align: center; color: #94a3b8; }
        .chart-label { margin-top: 8px; font-size: 14px; }
      `}</style>
    </DashboardLayout>
  );
}
