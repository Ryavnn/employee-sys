import { USERS, TASKS, LEAVES, LEAVE_BALANCE, TIME_HISTORY, PERFORMANCE_REVIEWS } from '../data/initialData';

// Helper to simulate network delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

class MockApi {
    constructor() {
        this.initData();
    }

    // Initialize data in localStorage if empty
    initData() {
        if (!localStorage.getItem('mock_tasks')) {
            localStorage.setItem('mock_tasks', JSON.stringify(TASKS));
        }
        if (!localStorage.getItem('mock_leaves')) {
            localStorage.setItem('mock_leaves', JSON.stringify(LEAVES));
        }
        if (!localStorage.getItem('mock_time_history')) {
            localStorage.setItem('mock_time_history', JSON.stringify(TIME_HISTORY));
        }
        if (!localStorage.getItem('mock_performance_reviews')) {
            localStorage.setItem('mock_performance_reviews', JSON.stringify(PERFORMANCE_REVIEWS));
        }
        // Users are static for this portfolio demo
    }

    // --- Auth ---

    async login(username, password) {
        await delay(600);
        const user = USERS.find((u) => u.username === username && u.password === password);
        if (user) {
            return {
                success: true,
                token: user.token,
                username: user.username,
                role: user.role,
                user: { name: user.name, role: user.role }
            };
        }
        return { success: false, message: "Invalid username or password" };
    }

    async getCurrentUser(token) {
        await delay(300);
        const user = USERS.find((u) => u.token === token);
        if (user) {
            return { success: true, user };
        }
        return { success: false, message: "Invalid session" };
    }

    // --- Employee ---

    async getEmployeeProfile(token) {
        await delay(400);
        const user = USERS.find((u) => u.token === token);
        if (user) {
            return { success: true, employee: user };
        }
        return { success: false, message: "User not found" };
    }

    // --- Tasks ---

    async getTasks(token) {
        await delay(500);
        // In a real app we'd filter by user ID from token, but for demo we'll show assigned mocks
        const allTasks = JSON.parse(localStorage.getItem('mock_tasks') || '[]');
        // Mock filtering logic assuming logged in user is ID 1 (employee)
        // For manager/admin we might show all. For simpler demo, returning all works.
        return allTasks;
    }

    async updateTaskStatus(taskId, status) {
        await delay(400);
        const tasks = JSON.parse(localStorage.getItem('mock_tasks') || '[]');
        const updatedTasks = tasks.map(t =>
            t.id === taskId ? { ...t, status } : t
        );
        localStorage.setItem('mock_tasks', JSON.stringify(updatedTasks));
        return { success: true };
    }

    async getPerformanceMetrics() {
        await delay(400);
        const tasks = JSON.parse(localStorage.getItem('mock_tasks') || '[]');
        const completed = tasks.filter(t => t.status === "Completed").length;
        const inProgress = tasks.filter(t => t.status === "In Progress").length;

        return {
            metrics: {
                tasks_completed: completed,
                tasks_in_progress: inProgress,
                projects_contributed: 3, // Mock static
                average_task_completion: 2.5,
                on_time_completion_rate: 95
            }
        };
    }

    async getUpcomingDeadlines() {
        await delay(300);
        const tasks = JSON.parse(localStorage.getItem('mock_tasks') || '[]');
        const incomplete = tasks.filter(t => t.status !== "Completed");
        return { deadlines: incomplete };
    }

    async getAnnouncements() {
        await delay(300);
        return {
            announcements: [
                {
                    id: 1,
                    title: "New Remote Work Policy",
                    date: "2023-10-25",
                    content: "We have updated our remote work policy. Please review the handbook for details on the new hybrid model starting next month.",
                    preview: "We have updated our remote work policy. Please review..."
                },
                {
                    id: 2,
                    title: "Quarterly Town Hall",
                    date: "2023-10-28",
                    content: "Join us for the Q4 Town Hall meeting this Friday at 2 PM. We will be discussing our yearly goals and celebrating team wins.",
                    preview: "Join us for the Q4 Town Hall meeting this Friday..."
                },
                {
                    id: 3,
                    title: "Health & Wellness Benefit",
                    date: "2023-11-01",
                    content: "New gym memberships and mental health support programs are now available to all full-time employees.",
                    preview: "New gym memberships and mental health support programs..."
                }
            ]
        };
    }

    async getTeamAvailability() {
        await delay(300);
        // Mock data for team members status (Who's Out)
        return {
            teamStatus: [
                { id: 101, name: "Sarah Jenkins", position: "Designer", status: "On Leave", returnDate: "2023-10-27" },
                { id: 102, name: "Mike Ross", position: "Developer", status: "Sick", returnDate: "Unknown" },
                { id: 103, name: "Jessica Pearson", position: "Manager", status: "Traveling", returnDate: "2023-10-30" },
                { id: 104, name: "Harvey Specter", position: "Legal", status: "In Office", returnDate: null }
            ]
        };
    }

    async getNotifications() {
        await delay(300);
        return {
            notifications: [
                { id: 1, type: "success", message: "Your leave request for Dec 24 has been approved.", time: "2 hours ago" },
                { id: 2, type: "info", message: "New training module assigned: 'Security Awareness'.", time: "5 hours ago" },
                { id: 3, type: "warning", message: "Please submit your timesheet for this week.", time: "1 day ago" }
            ]
        };
    }

    // --- Time Tracking ---

    async getTimeStatus() {
        await delay(300);
        const storedStatus = localStorage.getItem('mock_time_status');
        const statusData = storedStatus ? JSON.parse(storedStatus) : { status: "Out", time_in: null, time_out: null };
        return statusData;
    }

    async clockInOut(action) {
        await delay(500);
        const now = new Date().toISOString();
        let newData;

        if (action === 'in') {
            newData = { status: "In", time_in: now, time_out: null };
        } else {
            const prevData = JSON.parse(localStorage.getItem('mock_time_status') || '{}');
            newData = { status: "Out", time_in: prevData.time_in, time_out: now };

            // Update history
            const history = JSON.parse(localStorage.getItem('mock_time_history') || '[]');
            history.unshift({
                date: new Date().toLocaleDateString(),
                timeIn: new Date(prevData.time_in).toLocaleTimeString(),
                timeOut: new Date(now).toLocaleTimeString()
            });
            localStorage.setItem('mock_time_history', JSON.stringify(history));
        }

        localStorage.setItem('mock_time_status', JSON.stringify(newData));
        return { success: true, ...newData };
    }

    async getTimeHistory() {
        await delay(300);
        const history = JSON.parse(localStorage.getItem('mock_time_history') || '[]');
        return { history };
    }

    // --- Leave Management ---

    async getLeaveBalance(userId = 1) { // Defaulting to 1 for demo
        await delay(300);
        return { leaveBalance: LEAVE_BALANCE[userId] };
    }

    async getLeaveHistory() {
        await delay(300);
        const leaves = JSON.parse(localStorage.getItem('mock_leaves') || '[]');
        return { leaveHistory: leaves };
    }

    async requestLeave(leaveData) {
        await delay(600);
        const leaves = JSON.parse(localStorage.getItem('mock_leaves') || '[]');
        const newLeave = {
            id: Date.now(),
            userId: 1, // Default mock user
            type: leaveData.type,
            startDate: leaveData.startDate,
            endDate: leaveData.endDate,
            status: "Pending",
            reason: "Requested via Dashboard"
        };
        leaves.unshift(newLeave);
        localStorage.setItem('mock_leaves', JSON.stringify(leaves));
        return { success: true, leave: newLeave };
    }

    // --- Manager ---

    async getProjects() {
        await delay(400);
        if (!localStorage.getItem('mock_projects')) {
            const { PROJECTS } = await import('../data/initialData');
            localStorage.setItem('mock_projects', JSON.stringify(PROJECTS));
        }
        const projects = JSON.parse(localStorage.getItem('mock_projects') || '[]');
        return projects;
    }

    async addProject(projectData) {
        await delay(500);
        const projects = JSON.parse(localStorage.getItem('mock_projects') || '[]');
        const newProject = { ...projectData, id: Date.now() };
        projects.push(newProject);
        localStorage.setItem('mock_projects', JSON.stringify(projects));
        return newProject;
    }

    async updateProject(id, updates) {
        await delay(400);
        const projects = JSON.parse(localStorage.getItem('mock_projects') || '[]');
        const updatedProjects = projects.map(p => p.id === id ? { ...p, ...updates } : p);
        localStorage.setItem('mock_projects', JSON.stringify(updatedProjects));
        return updatedProjects.find(p => p.id === id);
    }

    async deleteProject(id) {
        await delay(400);
        const projects = JSON.parse(localStorage.getItem('mock_projects') || '[]');
        const filtered = projects.filter(p => p.id !== id);
        localStorage.setItem('mock_projects', JSON.stringify(filtered));
        return { success: true };
    }

    async getManagerTasks() {
        // Reuse getTasks but maybe filter differently? For now same tasks.
        const tasks = await this.getTasks();
        return { tasks };
    }

    async addTask(taskData) {
        await delay(500);
        const tasks = JSON.parse(localStorage.getItem('mock_tasks') || '[]');
        const newTask = { ...taskData, id: Date.now(), priority: "Medium" }; // Defaulting priority if missing
        tasks.push(newTask);
        localStorage.setItem('mock_tasks', JSON.stringify(tasks));
        return newTask;
    }

    async updateTask(id, updates) {
        await delay(400);
        const tasks = JSON.parse(localStorage.getItem('mock_tasks') || '[]');
        const updatedTasks = tasks.map(t => t.id === id ? { ...t, ...updates } : t);
        localStorage.setItem('mock_tasks', JSON.stringify(updatedTasks));
        return updatedTasks.find(t => t.id === id);
    }

    async deleteTask(id) {
        await delay(400);
        const tasks = JSON.parse(localStorage.getItem('mock_tasks') || '[]');
        const filtered = tasks.filter(t => t.id !== id);
        localStorage.setItem('mock_tasks', JSON.stringify(filtered));
        return { success: true };
    }

    async getManagerEmployees() {
        await delay(300);
        // Return all employees for demo
        const employees = USERS.filter(u => u.role === 'employee');
        return { employees };
    }

    // --- HR ---

    async getEmployees() {
        await delay(300);
        const employees = USERS.filter(u => u.role === 'employee');
        return { success: true, employees };
    }

    async getManagers() {
        await delay(300);
        const managers = USERS.filter(u => u.role === 'manager');
        return { success: true, managers };
    }

    async addEmployee(employeeData) {
        await delay(600);
        // In a real mock we'd update USERS. But USERS is a constant file import. 
        // We'll simulate success but note data won't persist on refresh if we don't store USERS in localStorage too.
        // For simplicity let's just return success without persistent update or update local state if we moved USERS to localStorage.
        // Let's rely on returns for now.
        return { success: true, employee: { ...employeeData, id: Date.now() } };
    }

    async assignManager(employeeId, managerId) {
        await delay(400);
        return { success: true };
    }

    async getStats() {
        await delay(400);
        return {
            totalEmployees: USERS.filter(u => u.role === 'employee').length,
            newHires: 2,
            attendanceRate: "95%",
            managers: USERS.filter(u => u.role === 'manager').length
        };
    }
    async addManager(managerData) {
        await delay(600);
        // Similar to addEmployee but for managers
        return { success: true, manager: { ...managerData, id: Date.now(), role: 'manager' } };
    }

    async deleteUser(userId) {
        await delay(400);
        // Simulate deletion
        // Note: USERS is const, effectively read-only for this demo unless we move it to localStorage
        return { success: true };
    }

    async getManagerLeaves() {
        await delay(400);
        let leaves = JSON.parse(localStorage.getItem('mock_leaves') || '[]');

        // Enrich with user details
        leaves = leaves.map(leave => {
            const user = USERS.find(u => u.id === leave.userId);
            return {
                ...leave,
                employeeName: user ? user.name : "Unknown",
                employeePosition: user ? user.position : "Unknown"
            };
        });

        return { success: true, leaves };
    }

    async updateLeaveStatus(leaveId, status) {
        await delay(500);
        const leaves = JSON.parse(localStorage.getItem('mock_leaves') || '[]');
        const updatedLeaves = leaves.map(l =>
            l.id === leaveId ? { ...l, status } : l
        );
        localStorage.setItem('mock_leaves', JSON.stringify(updatedLeaves));
        return { success: true };
    }

    // --- Performance Reviews ---

    async getPerformanceReviews() {
        await delay(500);
        const reviews = JSON.parse(localStorage.getItem('mock_performance_reviews') || '[]');
        return { success: true, reviews };
    }

    async addPerformanceReview(reviewData) {
        await delay(600);
        const reviews = JSON.parse(localStorage.getItem('mock_performance_reviews') || '[]');
        const newReview = {
            ...reviewData,
            id: Date.now(),
            reviewDate: new Date().toISOString()
        };
        reviews.unshift(newReview);
        localStorage.setItem('mock_performance_reviews', JSON.stringify(reviews));
        return { success: true, review: newReview };
    }

    // --- Global Attendance (HR) ---

    async getAllAttendance() {
        await delay(500);
        let history = JSON.parse(localStorage.getItem('mock_time_history') || '[]');

        // Enrich legacy data that might be missing user details
        history = history.map(record => {
            if (!record.userId || !record.name) {
                // Default to first user if missing (legacy data support)
                const user = USERS[0];
                return {
                    ...record,
                    userId: user.id,
                    name: user.name,
                    status: record.status || "On Time"
                };
            }
            return record;
        });

        return { success: true, attendance: history };
    }

    // --- Reports / Analytics ---

    async getReportData() {
        await delay(700);
        const employees = USERS.filter(u => u.role === 'employee');
        const tasks = JSON.parse(localStorage.getItem('mock_tasks') || '[]');
        const reviews = JSON.parse(localStorage.getItem('mock_performance_reviews') || '[]');
        const attendance = JSON.parse(localStorage.getItem('mock_time_history') || '[]');

        // Calculate Average Performance Rating
        const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
        const avgRating = reviews.length ? (totalRating / reviews.length).toFixed(1) : 0;

        // Task Completion Stats
        const completedTasks = tasks.filter(t => t.status === "Completed").length;
        const totalTasks = tasks.length;
        const taskCompletionRate = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

        // Attendance stats (mock logic)
        const onTime = attendance.filter(a => a.status !== "Late").length;
        const onTimeRate = attendance.length ? Math.round((onTime / attendance.length) * 100) : 0;

        return {
            success: true,
            stats: {
                avgPerformance: avgRating,
                taskCompletionRate: taskCompletionRate,
                onTimeAttendance: onTimeRate,
                totalEmployees: employees.length,
                departmentBreakdown: {
                    "Development": 3,
                    "Design": 1,
                    "Marketing": 1
                }
            }
        };
    }
}

export const mockApi = new MockApi();
