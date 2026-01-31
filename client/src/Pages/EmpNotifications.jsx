import { useState, useEffect } from "react";
import { mockApi } from "../services/mockApi";
import DashboardLayout from "../components/DashboardLayout";
import { Megaphone, LayoutDashboard, Users, Bell, CheckCircle, AlertCircle, Info, CheckSquare } from "lucide-react";

export default function EmpNotifications() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await mockApi.getNotifications();
                setNotifications(data.notifications || []);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const employeeNavItems = [
        { label: "Dashboard", path: "/dashboard-employee", icon: LayoutDashboard },
        { label: "Tasks", path: "/dashboard-employee/tasks", icon: CheckSquare },
        { label: "Announcements", path: "/dashboard-employee/announcements", icon: Megaphone },
        { label: "Team", path: "/dashboard-employee/team", icon: Users },
        { label: "Notifications", path: "/dashboard-employee/notifications", icon: Bell, active: true },
    ];

    return (
        <DashboardLayout
            title="Notifications"
            role="employee"
            sideNavItems={employeeNavItems}
            user={{ name: "John Doe", role: "Frontend Developer" }}
        >
            <div style={styles.container}>
                <div style={styles.card}>
                    <div style={styles.header}>
                        <Bell size={24} color="#2563eb" />
                        <h2 style={styles.title}>All Notifications</h2>
                    </div>

                    {loading ? (
                        <p>Loading...</p>
                    ) : notifications.length > 0 ? (
                        <div style={styles.list}>
                            {notifications.map((item) => (
                                <div key={item.id} style={styles.item}>
                                    <div style={styles.iconArea}>
                                        {item.type === 'success' && <CheckCircle size={24} color="#16a34a" />}
                                        {item.type === 'warning' && <AlertCircle size={24} color="#ea580c" />}
                                        {item.type === 'info' && <Info size={24} color="#2563eb" />}
                                    </div>
                                    <div style={styles.contentArea}>
                                        <p style={styles.message}>{item.message}</p>
                                        <span style={styles.time}>{item.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No new notifications.</p>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}

const styles = {
    container: {
        maxWidth: "800px",
        margin: "0 auto",
    },
    card: {
        backgroundColor: "white",
        borderRadius: "8px",
        padding: "24px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    },
    header: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: "24px",
        borderBottom: "1px solid #eee",
        paddingBottom: "16px",
    },
    title: {
        margin: 0,
        fontSize: "24px",
        color: "#333",
    },
    list: {
        display: "flex",
        flexDirection: "column",
        gap: "16px",
    },
    item: {
        display: "flex",
        gap: "16px",
        padding: "16px",
        backgroundColor: "#fff",
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        alignItems: "flex-start",
    },
    iconArea: {
        marginTop: "2px",
    },
    contentArea: {
        display: "flex",
        flexDirection: "column",
        gap: "4px",
    },
    message: {
        margin: 0,
        fontSize: "16px",
        color: "#1e293b",
        lineHeight: "1.5",
    },
    time: {
        fontSize: "13px",
        color: "#94a3b8",
    },
};
