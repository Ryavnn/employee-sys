import { useState, useEffect } from "react";
import { mockApi } from "../services/mockApi";
import DashboardLayout from "../components/DashboardLayout";
import {
    Megaphone,
    LayoutDashboard,
    Users,
    Bell,
    CheckSquare,
    Filter,
    ArrowUpDown,
    Clock,
    AlertCircle,
    MoreVertical,
    Plus
} from "lucide-react";

export default function EmpTasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState("All");
    const [filterPriority, setFilterPriority] = useState("All");
    const [sortBy, setSortBy] = useState("Deadline"); // Deadline, Priority
    const [expandedTaskId, setExpandedTaskId] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem("token");
                const data = await mockApi.getTasks(token);
                setTasks(data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const employeeNavItems = [
        { label: "Dashboard", path: "/dashboard-employee", icon: LayoutDashboard },
        { label: "Tasks", path: "/dashboard-employee/tasks", icon: CheckSquare, active: true },
        { label: "Announcements", path: "/dashboard-employee/announcements", icon: Megaphone },
        { label: "Team", path: "/dashboard-employee/team", icon: Users },
        { label: "Notifications", path: "/dashboard-employee/notifications", icon: Bell },
    ];

    // Logic
    const handleUpdateStatus = async (taskId, newStatus, e) => {
        e.stopPropagation();
        try {
            const data = await mockApi.updateTaskStatus(taskId, newStatus);
            if (data.success) {
                setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
            }
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const toggleExpand = (id) => {
        setExpandedTaskId(expandedTaskId === id ? null : id);
    };

    // Filter and Sort
    const filteredTasks = tasks.filter(task => {
        const matchesStatus = filterStatus === "All" || task.status === filterStatus;
        const matchesPriority = filterPriority === "All" || task.priority === filterPriority;
        return matchesStatus && matchesPriority;
    });

    const sortedTasks = [...filteredTasks].sort((a, b) => {
        if (sortBy === "Deadline") {
            return new Date(a.deadline) - new Date(b.deadline);
        } else if (sortBy === "Priority") {
            const priorityWeights = { High: 3, Medium: 2, Low: 1 };
            return priorityWeights[b.priority] - priorityWeights[a.priority];
        }
        return 0;
    });

    // Styles helpers
    const getPriorityColor = (p) => {
        switch (p) {
            case "High": return "#ef4444";
            case "Medium": return "#f97316";
            case "Low": return "#3b82f6";
            default: return "#9ca3af";
        }
    };

    const getStatusColor = (s) => {
        switch (s) {
            case "Completed": return "#22c55e";
            case "In Progress": return "#3b82f6";
            case "Pending": return "#64748b";
            default: return "#9ca3af";
        }
    };

    const formatDate = (dateString) => new Date(dateString).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });

    return (
        <DashboardLayout
            title="My Tasks"
            role="employee"
            sideNavItems={employeeNavItems}
            user={{ name: "John Doe", role: "Frontend Developer" }}
        >
            <div style={styles.container}>
                {/* Controls Header */}
                <div style={styles.controlsHeader}>
                    <div style={styles.searchTitle}>
                        <CheckSquare size={24} color="#2563eb" />
                        <h2 style={styles.pageTitle}>{sortedTasks.length} Tasks</h2>
                    </div>

                    <div style={styles.filtersArea}>
                        <div style={styles.filterGroup}>
                            <Filter size={16} color="#64748b" />
                            <select
                                style={styles.select}
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="All">All Status</option>
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>

                        <div style={styles.filterGroup}>
                            <AlertCircle size={16} color="#64748b" />
                            <select
                                style={styles.select}
                                value={filterPriority}
                                onChange={(e) => setFilterPriority(e.target.value)}
                            >
                                <option value="All">All Priorities</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>

                        <div style={styles.filterGroup}>
                            <ArrowUpDown size={16} color="#64748b" />
                            <select
                                style={styles.select}
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="Deadline">Sort by Deadline</option>
                                <option value="Priority">Sort by Priority</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Task List */}
                {loading ? (
                    <p>Loading tasks...</p>
                ) : sortedTasks.length > 0 ? (
                    <div style={styles.taskList}>
                        {sortedTasks.map(task => (
                            <div
                                key={task.id}
                                style={{
                                    ...styles.taskCard,
                                    borderLeft: `4px solid ${getPriorityColor(task.priority)}`
                                }}
                                onClick={() => toggleExpand(task.id)}
                            >
                                <div style={styles.cardMain}>
                                    <div style={styles.taskHeader}>
                                        <div style={styles.titleArea}>
                                            <h3 style={styles.taskTitle}>{task.title}</h3>
                                            <span style={{
                                                ...styles.statusBadge,
                                                backgroundColor: getStatusColor(task.status) + '20',
                                                color: getStatusColor(task.status)
                                            }}>
                                                {task.status}
                                            </span>
                                        </div>
                                        <div style={styles.metaArea}>
                                            <div style={styles.deadline} title="Deadline">
                                                <Clock size={16} />
                                                <span>{formatDate(task.deadline)}</span>
                                            </div>
                                            <span style={{ ...styles.priorityBadge, color: getPriorityColor(task.priority) }}>
                                                {task.priority} Priority
                                            </span>
                                        </div>
                                    </div>

                                    {expandedTaskId === task.id && (
                                        <div style={styles.expandedContent}>
                                            <p style={styles.description}>{task.description}</p>
                                            <div style={styles.actionsBar}>
                                                {task.status !== 'Completed' && (
                                                    <button
                                                        style={styles.actionBtn}
                                                        onClick={(e) => handleUpdateStatus(task.id, 'Completed', e)}
                                                    >
                                                        Mark Complete
                                                    </button>
                                                )}
                                                {task.status === 'Pending' && (
                                                    <button
                                                        style={{ ...styles.actionBtn, backgroundColor: '#3b82f6' }}
                                                        onClick={(e) => handleUpdateStatus(task.id, 'In Progress', e)}
                                                    >
                                                        Start Task
                                                    </button>
                                                )}
                                                <button style={styles.secondaryBtn} onClick={(e) => e.stopPropagation()}>
                                                    Add Note
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={styles.emptyState}>
                        <p>No tasks match your filters.</p>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}

const styles = {
    container: {
        maxWidth: "900px",
        margin: "0 auto",
    },
    controlsHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "24px",
        flexWrap: "wrap",
        gap: "16px",
        backgroundColor: "white",
        padding: "16px",
        borderRadius: "8px",
        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
    },
    searchTitle: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
    },
    pageTitle: {
        margin: 0,
        fontSize: "20px",
        color: "#1e293b",
    },
    filtersArea: {
        display: "flex",
        gap: "12px",
        flexWrap: "wrap",
    },
    filterGroup: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        backgroundColor: "#f8fafc",
        padding: "6px 12px",
        borderRadius: "6px",
        border: "1px solid #e2e8f0",
    },
    select: {
        border: "none",
        background: "transparent",
        fontSize: "14px",
        color: "#475569",
        outline: "none",
        cursor: "pointer",
        fontWeight: "500",
    },
    taskList: {
        display: "flex",
        flexDirection: "column",
        gap: "12px",
    },
    taskCard: {
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        cursor: "pointer",
        transition: "transform 0.1s, box-shadow 0.1s",
        overflow: "hidden",
    },
    cardMain: {
        padding: "20px",
    },
    taskHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexWrap: "wrap",
        gap: "12px",
    },
    titleArea: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        flex: 1,
        minWidth: "200px",
    },
    taskTitle: {
        margin: 0,
        fontSize: "16px",
        fontWeight: "600",
        color: "#334155",
    },
    statusBadge: {
        padding: "2px 8px",
        borderRadius: "99px",
        fontSize: "12px",
        fontWeight: "600",
        textTransform: "uppercase",
    },
    metaArea: {
        display: "flex",
        alignItems: "center",
        gap: "16px",
    },
    deadline: {
        display: "flex",
        alignItems: "center",
        gap: "6px",
        color: "#64748b",
        fontSize: "14px",
    },
    priorityBadge: {
        fontSize: "13px",
        fontWeight: "500",
    },
    expandedContent: {
        marginTop: "16px",
        paddingTop: "16px",
        borderTop: "1px solid #f1f5f9",
        animation: "fadeIn 0.2s ease-in",
    },
    description: {
        color: "#475569",
        fontSize: "14px",
        lineHeight: "1.6",
        marginBottom: "16px",
    },
    actionsBar: {
        display: "flex",
        gap: "12px",
    },
    actionBtn: {
        backgroundColor: "#16a34a",
        color: "white",
        border: "none",
        padding: "8px 16px",
        borderRadius: "6px",
        fontSize: "14px",
        fontWeight: "500",
        cursor: "pointer",
    },
    secondaryBtn: {
        backgroundColor: "white",
        color: "#475569",
        border: "1px solid #cbd5e1",
        padding: "8px 16px",
        borderRadius: "6px",
        fontSize: "14px",
        fontWeight: "500",
        cursor: "pointer",
    },
    emptyState: {
        textAlign: "center",
        padding: "40px",
        color: "#94a3b8",
    },
};
