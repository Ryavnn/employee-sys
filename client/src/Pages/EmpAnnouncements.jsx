import { useState, useEffect } from "react";
import { mockApi } from "../services/mockApi";
import DashboardLayout from "../components/DashboardLayout";
import { Megaphone, LayoutDashboard, Users, Bell, CheckSquare, Calendar } from "lucide-react";

export default function EmpAnnouncements() {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await mockApi.getAnnouncements();
                setAnnouncements(data.announcements || []);
            } catch (error) {
                console.error("Error fetching announcements:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const employeeNavItems = [
        { label: "Dashboard", path: "/dashboard-employee", icon: LayoutDashboard },
        { label: "Tasks", path: "/dashboard-employee/tasks", icon: CheckSquare },
        { label: "Announcements", path: "/dashboard-employee/announcements", icon: Megaphone, active: true },
        { label: "Team", path: "/dashboard-employee/team", icon: Users },
        { label: "Notifications", path: "/dashboard-employee/notifications", icon: Bell },
    ];

    const formatDate = (dateString) => {
        if (!dateString) return "--";
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <DashboardLayout
            title="Company Announcements"
            role="employee"
            sideNavItems={employeeNavItems}
            user={{ name: "John Doe", role: "Frontend Developer" }} // Mock user for now or fetch from local storage if needed
        >
            <div style={styles.container}>
                <div style={styles.card}>
                    <div style={styles.header}>
                        <Megaphone size={24} color="#2563eb" />
                        <h2 style={styles.title}>All Announcements</h2>
                    </div>

                    {loading ? (
                        <p>Loading...</p>
                    ) : announcements.length > 0 ? (
                        <div style={styles.list}>
                            {announcements.map((item) => (
                                <div key={item.id} style={styles.item}>
                                    <div style={styles.itemHeader}>
                                        <h3 style={styles.itemTitle}>{item.title}</h3>
                                        <span style={styles.date}>{formatDate(item.date)}</span>
                                    </div>
                                    <p style={styles.content}>{item.content}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No announcements found.</p>
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
        gap: "24px",
    },
    item: {
        padding: "20px",
        backgroundColor: "#f8fafc",
        borderRadius: "8px",
        borderLeft: "4px solid #2563eb",
    },
    itemHeader: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "12px",
        alignItems: "center",
    },
    itemTitle: {
        margin: 0,
        fontSize: "18px",
        color: "#1e293b",
    },
    date: {
        fontSize: "14px",
        color: "#64748b",
    },
    content: {
        margin: 0,
        lineHeight: "1.6",
        color: "#334155",
    },
};
