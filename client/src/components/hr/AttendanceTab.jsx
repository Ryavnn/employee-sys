import { useState, useEffect } from "react";
import { Search, Filter, Calendar, Clock, User } from "lucide-react";
import { mockApi } from "../../services/mockApi";

export default function AttendanceTab() {
    const [attendance, setAttendance] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");

    useEffect(() => {
        fetchAttendance();
    }, []);

    const fetchAttendance = async () => {
        try {
            setIsLoading(true);
            const data = await mockApi.getAllAttendance();
            if (data.success) {
                setAttendance(data.attendance);
            }
        } catch (err) {
            console.error("Error fetching attendance:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredAttendance = attendance.filter((record) => {
        const name = record.name || "";
        const matchesSearch =
            name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.date.includes(searchTerm);
        const matchesStatus =
            filterStatus === "All" || record.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case "On Time":
                return "bg-green-100 text-green-700";
            case "Late":
                return "bg-amber-100 text-amber-700";
            case "Early":
                return "bg-blue-100 text-blue-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <div className="attendance-tab">
            <div className="tab-header">
                <h2 className="tab-title">Employee Attendance</h2>
                <div className="actions-row">
                    <div className="search-bar">
                        <Search size={18} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search by name or date..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                    </div>
                    <div className="filter-dropdown">
                        <Filter size={16} className="filter-icon" />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="filter-select"
                        >
                            <option value="All">All Status</option>
                            <option value="On Time">On Time</option>
                            <option value="Late">Late</option>
                            <option value="Early">Early Leave</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Employee</th>
                            <th>Date</th>
                            <th>Check In</th>
                            <th>Check Out</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan="5" className="loading-cell">
                                    Loading attendance data...
                                </td>
                            </tr>
                        ) : filteredAttendance.length > 0 ? (
                            filteredAttendance.map((record) => (
                                <tr key={record.id || Math.random()}>
                                    <td className="employee-cell">
                                        <div className="avatar-circle">
                                            {(record.name || "?").charAt(0)}
                                        </div>
                                        <span>{record.name || "Unknown Employee"}</span>
                                    </td>
                                    <td>{record.date}</td>
                                    <td>{record.timeIn}</td>
                                    <td>{record.timeOut || "--:--"}</td>
                                    <td>
                                        <span
                                            className={`status-badge ${getStatusColor(
                                                record.status
                                            )}`}
                                        >
                                            {record.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="empty-cell">No attendance records found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <style jsx>{`
        .tab-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        .tab-title {
          font-size: 20px;
          font-weight: bold;
          color: #1e293b;
        }
        .actions-row {
          display: flex;
          gap: 16px;
        }
        .search-bar {
          position: relative;
          display: flex;
          align-items: center;
        }
        .search-icon {
          position: absolute;
          left: 10px;
          color: #94a3b8;
        }
        .search-input {
          padding: 8px 12px 8px 36px;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          font-size: 14px;
          width: 250px;
        }
        .filter-dropdown {
          position: relative;
          display: flex;
          align-items: center;
        }
        .filter-icon {
          position: absolute;
          left: 10px;
          color: #94a3b8;
          z-index: 1;
        }
        .filter-select {
          padding: 8px 12px 8px 32px;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          font-size: 14px;
          background-color: white;
          cursor: pointer;
        }
        .table-container {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        .data-table {
          width: 100%;
          border-collapse: collapse;
        }
        .data-table th {
          background-color: #f8fafc;
          padding: 12px 16px;
          text-align: left;
          font-size: 12px;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          border-bottom: 1px solid #e2e8f0;
        }
        .data-table td {
          padding: 16px;
          border-bottom: 1px solid #e2e8f0;
          color: #334155;
          font-size: 14px;
        }
        .employee-cell {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 500;
        }
        .avatar-circle {
          width: 32px;
          height: 32px;
          background-color: #e0e7ff;
          color: #4338ca;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 14px;
        }
        .status-badge {
          padding: 4px 10px;
          border-radius: 9999px;
          font-size: 12px;
          font-weight: 500;
          display: inline-block;
        }
        .bg-green-100 { background-color: #dcfce7; }
        .text-green-700 { color: #15803d; }
        .bg-amber-100 { background-color: #fef3c7; }
        .text-amber-700 { color: #b45309; }
        .bg-blue-100 { background-color: #dbeafe; }
        .text-blue-700 { color: #1d4ed8; }
        .bg-gray-100 { background-color: #f1f5f9; }
        .text-gray-700 { color: #334155; }
        
        .loading-cell, .empty-cell {
            text-align: center;
            padding: 32px !important;
            color: #64748b;
        }
      `}</style>
        </div>
    );
}
