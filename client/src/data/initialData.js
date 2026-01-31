// Mock Data for Employee Management System

export const USERS = [
    {
        id: 1,
        username: "employee",
        password: "password123", // In a real app, never store plain text passwords!
        name: "John Doe",
        role: "employee",
        position: "Senior Frontend Developer",
        token: "mock-token-employee-123456"
    },
    {
        id: 2,
        username: "manager",
        password: "password123",
        name: "Jane Smith",
        role: "manager",
        position: "Engineering Manager",
        token: "mock-token-manager-123456"
    },
    {
        id: 3,
        username: "hr",
        password: "password123",
        name: "Robert Johnson",
        role: "hr",
        position: "HR Specialist",
        token: "mock-token-hr-123456"
    },
    {
        id: 4,
        username: "alice",
        password: "password123",
        name: "Alice Williams",
        role: "employee",
        position: "Frontend Developer",
        token: "mock-token-alice-123"
    },
    {
        id: 5,
        username: "bob",
        password: "password123",
        name: "Bob Brown",
        role: "employee",
        position: "Backend Developer",
        token: "mock-token-bob-123"
    },
    {
        id: 6,
        username: "charlie",
        password: "password123",
        name: "Charlie Davis",
        role: "employee",
        position: "UI/UX Designer",
        token: "mock-token-charlie-123"
    }
];

export const PROJECTS = [
    {
        id: 1,
        name: "Website Redesign",
        deadline: new Date(Date.now() + 86400000 * 14).toISOString(),
        status: "In Progress"
    },
    {
        id: 2,
        name: "Mobile App Migration",
        deadline: new Date(Date.now() + 86400000 * 30).toISOString(),
        status: "Not Started"
    },
    {
        id: 3,
        name: "Internal Dashboard",
        deadline: new Date(Date.now() + 86400000 * 7).toISOString(),
        status: "Completed"
    }
];

export const TASKS = [
    {
        id: 101,
        title: "Implement Login Page",
        description: "Create a responsive login page with validation.",
        deadline: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days from now
        priority: "High",
        status: "In Progress",
        assignedTo: 1
    },
    {
        id: 102,
        title: "Fix Navigation Bug",
        description: "Navbar collapses incorrectly on mobile devices.",
        deadline: new Date(Date.now() + 86400000 * 0.5).toISOString(), // 12 hours from now
        priority: "Medium",
        status: "Pending",
        assignedTo: 1
    },
    {
        id: 103,
        title: "Update Documentation",
        description: "Update the README with new setup instructions.",
        deadline: new Date(Date.now() - 86400000).toISOString(), // Yesterday (Overdue)
        priority: "Low",
        status: "Pending",
        assignedTo: 1
    },
    {
        id: 104,
        title: "Code Review",
        description: "Review PR #45 by Alice.",
        deadline: new Date(Date.now() + 86400000 * 5).toISOString(),
        priority: "High",
        status: "Completed",
        assignedTo: 1
    }
];

export const LEAVES = [
    {
        id: 201,
        userId: 1,
        type: "Annual",
        startDate: new Date(Date.now() - 86400000 * 30).toISOString(),
        endDate: new Date(Date.now() - 86400000 * 25).toISOString(),
        status: "Approved",
        reason: "Vacation"
    },
    {
        id: 202,
        userId: 1,
        type: "Sick",
        startDate: new Date(Date.now() - 86400000 * 10).toISOString(),
        endDate: new Date(Date.now() - 86400000 * 9).toISOString(),
        status: "Approved",
        reason: "Flu"
    },
    {
        id: 203,
        userId: 1,
        type: "Personal",
        startDate: new Date(Date.now() + 86400000 * 10).toISOString(),
        endDate: new Date(Date.now() + 86400000 * 11).toISOString(),
        status: "Pending",
        reason: "Appointment"
    }
];

export const LEAVE_BALANCE = {
    1: {
        annual: 15,
        sick: 8,
        personal: 3
    },
    2: {
        annual: 20,
        sick: 10,
        personal: 5
    },
    3: {
        annual: 20,
        sick: 10,
        personal: 5
    }
};

export const TIME_HISTORY = [
    {
        id: 1,
        userId: 1,
        name: "John Doe",
        date: new Date(Date.now() - 86400000).toLocaleDateString(),
        timeIn: "08:58 AM",
        timeOut: "05:02 PM",
        status: "On Time"
    },
    {
        id: 2,
        userId: 4,
        name: "Alice Williams",
        date: new Date(Date.now() - 86400000).toLocaleDateString(),
        timeIn: "09:05 AM",
        timeOut: "05:15 PM",
        status: "Late"
    },
    {
        id: 3,
        userId: 5,
        name: "Bob Brown",
        date: new Date(Date.now() - 86400000).toLocaleDateString(),
        timeIn: "08:45 AM",
        timeOut: "04:55 PM",
        status: "Early"
    },
    {
        id: 4,
        userId: 1,
        name: "John Doe",
        date: new Date(Date.now() - 86400000 * 2).toLocaleDateString(),
        timeIn: "09:05 AM",
        timeOut: "05:15 PM",
        status: "Late"
    }
];

export const PERFORMANCE_REVIEWS = [
    {
        id: 1,
        employeeId: 4,
        employeeName: "Alice Williams",
        rating: 4.5,
        reviewDate: new Date(Date.now() - 86400000 * 15).toISOString(),
        feedback: "Excellent work on the frontend migration. Demonstrated strong layout skills.",
        reviewer: "Jane Smith"
    },
    {
        id: 2,
        employeeId: 5,
        employeeName: "Bob Brown",
        rating: 3.8,
        reviewDate: new Date(Date.now() - 86400000 * 45).toISOString(),
        feedback: "Good backend logic, but needs to improve documentation habits.",
        reviewer: "Jane Smith"
    },
    {
        id: 3,
        employeeId: 6,
        employeeName: "Charlie Davis",
        rating: 4.8,
        reviewDate: new Date(Date.now() - 86400000 * 5).toISOString(),
        feedback: "Outstanding UI designs for the new dashboard. Exceeded expectations.",
        reviewer: "Robert Johnson"
    }
];
