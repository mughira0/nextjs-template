import { IMessage, IRoom, IUser, TRole } from "@/types/system/slice";

// 5 core users (kept realistic with photos)
export const users: IUser[] = [
  {
    _id: "u1",
    name: "Mughira Khan ",
    email: "mughir@techcorp.com",
    role: "admin",
    phone: "+92 335 266 8377",
    isActive: true,
    photo: "/images/user3.png", // confident man in blazer, tech background
    isOnline: true,
    createdAt: "2026-01-15T10:00:00Z",
    updatedAt: "2026-02-20T12:00:00Z",
  },
  {
    _id: "u2",
    name: "Baptista Silva",
    email: "baptisa@freelance.io",
    role: "user",
    isActive: true,
    createdAt: "2026-01-15T10:00:00Z",
    updatedAt: "2026-02-20T12:00:00Z",

    phone: "+55 11 98765-4321",
    photo: "/images/user2.png", // casual professional man smiling
  },
  {
    _id: "u3",
    name: "Sarah Chen",
    email: "sara@designstudio.com",
    role: "user",
    isActive: true,
    createdAt: "2026-01-15T10:00:00Z",
    updatedAt: "2026-02-20T12:00:00Z",

    photo: "/images/user.jpg", // professional woman with neat hair
  },
  {
    _id: "u4",
    name: "Alex Rivera",
    email: "aleivera@startup.ly",
    isActive: true,
    createdAt: "2026-01-15T10:00:00Z",
    updatedAt: "2026-02-20T12:00:00Z",

    role: "user",
    photo: "/images/user2.png", // young dev in hoodie, friendly
  },
  {
    _id: "u5",
    name: "Priya Sharma",
    email: "priarma@agency.co",
    role: "user",
    createdAt: "2026-01-15T10:00:00Z",
    updatedAt: "2026-02-20T12:00:00Z",
    isActive: true,
  },
];

// Existing messages (unchanged — realistic Feb 2026 convos)
export const messages: IMessage[] = [
  {
    _id: "m1",
    roomId: "r1",
    senderId: "u2",
    text: "Hey Mughira, just checking — are we still on track for the Feb 25 demo?",
    attachments: [],
    to: ["u1"],
    from: users[1],
    createdAt: "2026-02-17T14:30:00Z",
    readBy: ["u1", "u2"],
  },
  {
    _id: "m2",
    roomId: "r1",
    senderId: "u1",
    text: "Yes, core features are done. Just polishing the payment flow. Will share build tomorrow.",
    attachments: [],
    to: ["u2"],
    from: users[0],
    createdAt: "2026-02-17T15:12:00Z",
    readBy: ["u1", "u2"],
  },
  {
    _id: "m3",
    roomId: "r1",
    senderId: "u2",
    text: "Perfect, thanks! Let me know if you need any clarifications on the branding guidelines.",
    attachments: [],
    to: ["u1"],
    from: users[1],
    createdAt: "2026-02-17T15:45:00Z",
    readBy: ["u2"],
  },
  {
    _id: "m4",
    roomId: "r2",
    senderId: "u3",
    text: "Team, I’ve just pushed the new dashboard redesign to main. Check PR #45 when you can.",
    attachments: ["dashboard-redesign-v2.png"],
    to: ["u1", "u4", "u5"],
    from: users[2],
    createdAt: "2026-02-18T09:20:00Z",
    readBy: ["u3", "u1"],
  },
  {
    _id: "m5",
    roomId: "r2",
    senderId: "u4",
    text: "Looks clean Sarah! The dark mode toggle is smooth. One small thing — the charts could use more contrast on mobile.",
    attachments: [],
    to: ["u3"],
    from: users[3],
    createdAt: "2026-02-18T10:05:00Z",
    readBy: ["u4"],
  },
  {
    _id: "m6",
    roomId: "r3",
    senderId: "u1",
    text: "Alex, any update on the API rate limiting we discussed last week?",
    attachments: [],
    to: ["u4"],
    from: users[0],
    createdAt: "2026-02-16T11:40:00Z",
    readBy: ["u1", "u4"],
  },
  {
    _id: "m7",
    roomId: "r3",
    senderId: "u4",
    text: "Yeah, implemented in branch feature/rate-limit. Using sliding window + Redis. Tests passing. Ready for review.",
    attachments: ["rate-limit-diagram.png"],
    to: ["u1"],
    from: users[3],
    createdAt: "2026-02-16T13:15:00Z",
    readBy: ["u4", "u1"],
  },
];

// 20 realistic rooms — mix of 1:1, small groups, project teams
export const roomsData: IRoom[] = [
  // 1:1 private / client chats
  {
    _id: "r1",
    name: "Mughira & Baptista",
    isGroup: false,
    users: [users[0], users[1]],
    lastMessage: messages.find((m) => m._id === "m3") || null,
  },
  {
    _id: "r3",
    name: "Mughira & Alex",
    isGroup: false,
    users: [users[0], users[3]],
    lastMessage: messages.find((m) => m._id === "m7") || null,
  },
  {
    _id: "r4",
    name: "Sarah & Priya",
    isGroup: false,
    users: [users[2], users[4]],
    lastMessage: messages[4] || null,
  }, // recent design feedback
  {
    _id: "r5",
    name: "Baptista & Mughira (urgent)",
    isGroup: false,
    users: [users[1], users[0]],
    lastMessage: messages[2] || null,
  },
  {
    _id: "r6",
    name: "Alex & Sarah",
    isGroup: false,
    users: [users[3], users[2]],
    lastMessage: messages[3] || null,
  },

  // Project / team groups
  {
    _id: "r2",
    name: "Project Nebula Team",
    isGroup: true,
    users: [users[0], users[2], users[3], users[4]],
    lastMessage: messages.find((m) => m._id === "m5") || null,
  },
  {
    _id: "r7",
    name: "Quantum Forge Crew",
    isGroup: true,
    users: [users[0], users[3], users[4]],
    lastMessage: messages[6] || null,
  },
  {
    _id: "r8",
    name: "Pulse Analytics Squad",
    isGroup: true,
    users: [users[0], users[2], users[3]],
    lastMessage: messages[4] || null,
  },
  {
    _id: "r9",
    name: "Nexus UI/UX",
    isGroup: true,
    users: [users[2], users[4], users[0]],
    lastMessage: messages[3] || null,
  },
  {
    _id: "r10",
    name: "ByteBridge Devs",
    isGroup: true,
    users: [users[3], users[0], users[1]],
    lastMessage: messages[1] || null,
  },

  // More variety — some larger, some fun-ish names
  {
    _id: "r11",
    name: "CodeSynapse Team",
    isGroup: true,
    users: [users[0], users[3], users[4], users[2]],
    lastMessage: messages[5] || null,
  },
  {
    _id: "r12",
    name: "DataPulse Crew",
    isGroup: true,
    users: [users[0], users[2], users[3]],
    lastMessage: messages[4] || null,
  },
  {
    _id: "r13",
    name: "Mughira's Direct Reports",
    isGroup: true,
    users: [users[0], users[3], users[4]],
    lastMessage: messages[6] || null,
  },
  {
    _id: "r14",
    name: "Client Sync – Baptista",
    isGroup: false,
    users: [users[1], users[0]],
    lastMessage: messages[0] || null,
  },
  {
    _id: "r15",
    name: "Frontend Forge",
    isGroup: true,
    users: [users[2], users[4], users[3]],
    lastMessage: messages[3] || null,
  },

  {
    _id: "r16",
    name: "Backend Ninjas",
    isGroup: true,
    users: [users[0], users[3]],
    lastMessage: messages[6] || null,
  },
  {
    _id: "r17",
    name: "Design Review Room",
    isGroup: true,
    users: [users[2], users[4]],
    lastMessage: messages[4] || null,
  },
  {
    _id: "r18",
    name: "Sprint Planning – Feb",
    isGroup: true,
    users: [users[0], users[2], users[3], users[4]],
    lastMessage: messages[5] || null,
  },
  {
    _id: "r19",
    name: "Mughira & Priya",
    isGroup: false,
    users: [users[0], users[4]],
    lastMessage: messages[3] || null,
  },
  {
    _id: "r20",
    name: "All Hands Channel",
    isGroup: true,
    users: [users[0], users[1], users[2], users[3], users[4]],
    lastMessage: messages[4] || null,
  },
  {
    _id: "r21",
    name: "Mughira & Sarah",
    isGroup: false,
    users: [users[0], users[2]],
    lastMessage: messages.find((m) => m._id === "m4") || null, // recent dashboard push reference
  },
  {
    _id: "r22",
    name: "Growth Hacking Brainstorm",
    isGroup: true,
    users: [users[0], users[1], users[4]],
    lastMessage: messages.find((m) => m._id === "m3") || null, // ties back to client convo
  },
  {
    _id: "r23",
    name: "Alex & Priya – Component Library",
    isGroup: false,
    users: [users[3], users[4]],
    lastMessage: messages.find((m) => m._id === "m5") || null, // feedback on charts/dark mode
  },
  {
    _id: "r24",
    name: "Launch Readiness – Feb 2026",
    isGroup: true,
    users: [users[0], users[1], users[2], users[3]],
    lastMessage: messages.find((m) => m._id === "m2") || null, // payment flow polish mention
  },
  {
    _id: "r25",
    name: "Random Watercooler ☕",
    isGroup: true,
    users: [users[0], users[2], users[3], users[4]],
    lastMessage: messages.find((m) => m._id === "m7") || null, // rate-limit update as casual share
  },
];

export const meUser = {
  _id: "u5",
  name: "Me Khan",
  email: "Me@techcorp.com",
  role: "admin" as TRole,
  phone: "+92 335 266 8377",
  photo: "/images/user3.png", // confident man in blazer, tech background
  isOnline: true,
  isActive: true,
  createdAt: "2026-01-15T10:00:00Z",
  updatedAt: "2026-02-20T12:00:00Z",
}; // Mughira as the current user for demo purposes
// dashboardStats.ts
import {
  Users,
  Activity,
  DollarSign,
  TrendingUp,
  ShoppingCart,
  Server,
} from "lucide-react";

export const dashboardStats = [
  {
    title: "Total Users",
    value: "12,480",
    icon: Users,
    variant: "primary",
  },
  {
    title: "Active Sessions",
    value: "1,342",
    icon: Activity,
    variant: "primary-bordered",
  },
  {
    title: "Monthly Revenue",
    value: "$24,860",
    icon: DollarSign,
    variant: "primary-bordered",
  },
  {
    title: "Growth Rate",
    value: "18.4%",
    icon: TrendingUp,
    variant: "primary-bordered",
  },
  {
    title: "Orders Today",
    value: "286",
    icon: ShoppingCart,
    variant: "primary-bordered",
  },
  {
    title: "API Requests",
    value: "94,120",
    icon: Server,
    variant: "primary-bordered",
  },
] as const;
export const revenueLineData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "Revenue ($)",
      data: [12400, 13800, 13150, 15200, 14800, 16750, 17400],
      borderColor: "#2563eb",
      borderWidth: 2,
      tension: 0.4,
      pointRadius: 4,
    },
  ],
};

export const trafficDonutData = {
  labels: ["Organic", "Direct", "Referral", "Social", "Email"],
  data: [38, 27, 18, 11, 6],
  backgroundColors: ["#2563eb", "#16a34a", "#d97706", "#7c3aed", "#dc2626"],
};
// dashboardTransactions.ts
export const dashboardTransactions = [
  {
    id: "TXN001",
    user: "John Doe",
    amount: "$120.50",
    status: "Completed",
    date: "2026-02-20",
  },
  {
    id: "TXN002",
    user: "Jane Smith",
    amount: "$75.00",
    status: "Pending",
    date: "2026-02-21",
  },
  {
    id: "TXN003",
    user: "Ali Khan",
    amount: "$200.00",
    status: "Failed",
    date: "2026-02-22",
  },
  {
    id: "TXN004",
    user: "Sara Ahmed",
    amount: "$350.00",
    status: "Completed",
    date: "2026-02-23",
  },
  {
    id: "TXN005",
    user: "Mughira Ubaid",
    amount: "$50.00",
    status: "Pending",
    date: "2026-02-24",
  },
];
