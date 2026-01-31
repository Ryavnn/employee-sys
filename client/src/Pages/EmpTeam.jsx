import { useState, useEffect } from "react";
import { mockApi } from "../services/mockApi";
import DashboardLayout from "../components/DashboardLayout";
import { Megaphone, LayoutDashboard, Users, Bell, CheckSquare } from "lucide-react";

export default function EmpTeam() {
    const [teamStatus, setTeamStatus] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await mockApi.getTeamAvailability();
                setTeamStatus(data.teamStatus || []);
            } catch (error) {
                console.error("Error fetching team:", error);
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
        { label: "Team", path: "/dashboard-employee/team", icon: Users, active: true },
        { label: "Notifications", path: "/dashboard-employee/notifications", icon: Bell },
    ];

    const getStatusBadgeStyle = (status) => {
        switch (status) {
            case "In Office": return { backgroundColor: "#dafbe1", color: "#15803d" };
            case "On Leave": return { backgroundColor: "#fee2e2", color: "#b91c1c" };
            case "Sick": return { backgroundColor: "#fef3c7", color: "#b45309" };
            case "Traveling": return { backgroundColor: "#e0f2fe", color: "#0369a1" };
            default: return { backgroundColor: "#f3f4f6", color: "#4b5563" };
        }
    };

    return (
        <DashboardLayout
            title="Team Availability"
            role="employee"
            sideNavItems={employeeNavItems}
            user={{ name: "John Doe", role: "Frontend Developer" }}
        >
            <div style={styles.container}>
                <div style={styles.card}>
                    <div style={styles.header}>
                        <Users size={24} color="#2563eb" />
                        <h2 style={styles.title}>Who's Out Today</h2>
                    </div>

                    {loading ? (
                        <p>Loading...</p>
                    ) : teamStatus.length > 0 ? (
                        <div style={styles.grid}>
                            {teamStatus.map((member) => (
                                <div key={member.id} style={styles.cardItem}>
                                    <div style={styles.avatar}>{member.name[0]}</div>
                                    <div style={styles.info}>
                                        <h3 style={styles.name}>{member.name}</h3>
                                        <p style={styles.position}>{member.position}</p>
                                        <div style={styles.badgeWrapper}>
                                            <span style={{ ...styles.badge, ...getStatusBadgeStyle(member.status) }}>
                                                {member.status}
                                            </span>
                                        </div>
                                        {member.returnDate && (
                                            <p style={styles.returnDate}>Back: {new Date(member.returnDate).toLocaleDateString()}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Everyone is accounted for.</p>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}

const styles = {
    container: {
        maxWidth: "1000px",
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
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "24px",
    },
    cardItem: {
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        transition: "transform 0.2s",
    },
    avatar: {
        width: "64px",
        height: "64px",
        borderRadius: "50%",
        backgroundColor: "#eff6ff",
        color: "#2563eb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "24px",
        fontWeight: "600",
        marginBottom: "16px",
    },
    info: {
        width: "100%",
    },
    name: {
        margin: "0 0 4px 0",
        fontSize: "16px",
        fontWeight: "600",
        color: "#1e293b",
    },
    position: {
        margin: "0 0 12px 0",
        fontSize: "13px",
        color: "#64748b",
    },
    badgeWrapper: {
        marginBottom: "8px",
    },
    badge: {
        padding: "4px 12px",
        borderRadius: "99px",
        fontSize: "12px",
        fontWeight: "500",
        display: "inline-block",
    },
    returnDate: {
        margin: 0,
        fontSize: "12px",
        color: "#94a3b8",
    },
};
