import type { Project } from "~/types/project";

export const PORTFOLIO_DATA = {
  name: "Hermawan Tan",
  age: 20,
  role: "Full Stack Developer",
  location: "Samarinda, East Kalimantan",
  email: "hermawantan12@gmail.com",
  github: "https://github.com/fr-wawan",
  linkedin: "https://linkedin.com/in/hermawan-tan-aa4795319/",
  summary:
    "Full Stack Developer with hands-on production experience building scalable web applications across healthcare, HR, and e-commerce domains. Specialized in Laravel and Ruby on Rails backends with Vue.js/React frontends. Strong focus on clean architecture, multi-tenancy, and real-world system performance.",

  experience: [
    {
      title: "Backend Engineer",
      company: "HungryHub",
      location: "Bangkok (Remote)",
      period: "2026 - Present",
      points: [
        "Building restaurant marketplace features on Ruby on Rails with MySQL Aurora",
        "Working with Redis, Sidekiq, Elasticsearch, and AWS infrastructure",
      ],
    },
    {
      title: "Full Stack Developer",
      company: "PT Sintesa Inti Prestasi",
      location: "Samarinda, Indonesia",
      period: "2023 - 2025",
      points: [
        "Developed multi-tenant HRIS system with payroll, attendance, and Vue.js migration from jQuery",
        "Built Hospital Information System (SIMRS) with LIS integration and RBAC",
        "Integrated payment gateways and built full LMS with enrollment and scheduling",
      ],
    },
  ],

  skills: [
    "Laravel",
    "Ruby On Rails",
    "Vue JS",
    "React",
    "TypeScript",
    "Nuxt",
    "Inertia",
    "Node.js",
    "Python",
    "PostgreSQL",
  ],

  projects: [
    {
      name: "SIMRS",
      desc: "Hospital Information System with LIS integration, RBAC, and optimized PostgreSQL queries for high-volume healthcare data",
      tech: ["Laravel", "Vue.js", "PostgreSQL"],

      id: "simrs",
      status: "private",
      url: "https://simrs.internal.hospital",
      role: "Full Stack Developer",
      period: "2023 – 2025",
      longDescription:
        "Production Hospital Information System deployed at a real clinic. Covers patient registration, medical records, lab information system (LIS) integration, and role-based access for doctors, nurses, and admins. Optimized PostgreSQL queries for high-volume concurrent reads.",
      techDetail: [
        { name: "Laravel", color: "#FF2D20" },
        { name: "Vue.js", color: "#42B883" },
        { name: "PostgreSQL", color: "#336791" },
        { name: "Spatie RBAC", color: "#F59E0B" },
      ],
      highlights: [
        "LIS integration — lab results sync directly into patient records",
        "RBAC with Spatie — granular permissions per medical role",
        "Optimized N+1 queries across high-volume patient data endpoints",
        "Real-time bed occupancy dashboard with WebSocket updates",
      ],
      screenshots: [],
    },
    {
      name: "Ticket Booking & Membership",
      desc: "Web-based ticket booking with membership registration, payment gateway integration, and admin dashboard",
      tech: ["Laravel", "Vue.js", "MySQL"],

      id: "ticket-booking",
      status: "private",
      url: "https://booking.client.id",
      role: "Full Stack Developer",
      period: "2024",
      longDescription:
        "Full-stack ticket booking platform with membership tiers, payment gateway integration (Midtrans), and a comprehensive admin dashboard for event and capacity management.",
      techDetail: [
        { name: "Laravel", color: "#FF2D20" },
        { name: "Vue.js", color: "#42B883" },
        { name: "MySQL", color: "#2563EB" },
        { name: "Midtrans", color: "#0EA5E9" },
      ],
      highlights: [
        "Midtrans payment gateway with webhook handling and idempotency",
        "Membership tier system with role-gated content and discounts",
        "QR code ticket generation and scanner validation flow",
        "Admin dashboard with capacity management and sales reports",
      ],
      screenshots: [],
    },
    {
      name: "Online Course Platform",
      desc: "Full-featured LMS with enrollment workflows, scheduling, payment processing, and rating system",
      tech: ["Laravel", "Inertia.js", "React"],

      id: "lms",
      status: "private",
      url: "https://lms.client.id",
      role: "Full Stack Developer",
      period: "2025",
      longDescription:
        "Learning Management System with full enrollment lifecycle, course scheduling, payment processing, and a student rating system. Built with Inertia.js for SPA-like UX without the API overhead.",
      techDetail: [
        { name: "Laravel", color: "#FF2D20" },
        { name: "Inertia.js", color: "#9333EA" },
        { name: "React", color: "#61DAFB" },
        { name: "MySQL", color: "#2563EB" },
      ],
      highlights: [
        "SSR-friendly SPA with Inertia.js — no separate API layer",
        "Enrollment workflow with waitlist, approval, and expiry logic",
        "Payment processing with installment support",
        "Course rating and review system with instructor reply threads",
      ],
      screenshots: [],
    },
    {
      name: "HRIS Multi-Tenant",
      desc: "Production multi-tenant HR system with payroll, attendance, employee management, and Vue.js migration from jQuery",
      tech: ["Laravel", "Vue.js", "MySQL"],

      id: "hris",
      status: "private",
      url: "https://hris.client.id",
      role: "Full Stack Developer",
      period: "2023 – 2025",
      longDescription:
        "Production multi-tenant HRIS serving multiple companies from a single instance. Covers payroll calculation, attendance tracking, leave management, and a full migration from legacy jQuery to Vue.js SPA.",
      techDetail: [
        { name: "Laravel", color: "#FF2D20" },
        { name: "Vue.js", color: "#42B883" },
        { name: "MySQL", color: "#2563EB" },
        { name: "Multi-tenancy", color: "#F59E0B" },
      ],
      highlights: [
        "Multi-tenant architecture — data isolation per company via tenant scoping",
        "Payroll engine with configurable components, cuts, and tax calculation",
        "Attendance system with shift scheduling and overtime rules",
        "Full jQuery → Vue.js SPA migration without downtime",
      ],
      screenshots: [],
    },
    {
      name: "PulseBoard",
      desc: "CRM & sales analytics platform with order management, revenue dashboard, and customer analytics",
      tech: ["Laravel", "Vue.js", "PostgreSQL"],

      id: "pulseboard",
      status: "private",
      url: "https://pulseboard.client.id",
      role: "Full Stack Developer",
      period: "2024",
      longDescription:
        "CRM and sales analytics platform. Features a real-time revenue dashboard, customer segmentation, and analytics powered by optimized PostgreSQL aggregation queries.",
      techDetail: [
        { name: "Laravel", color: "#FF2D20" },
        { name: "Vue.js", color: "#42B883" },
        { name: "PostgreSQL", color: "#336791" },
        { name: "Chart.js", color: "#FF6384" },
      ],
      highlights: [
        "Dashboard handles 2,000+ order records with paginated + indexed queries",
        "Revenue analytics with date range filters and CSV export",
        "Customer segmentation by purchase behavior and region",
        "PostgreSQL window functions for YoY and MoM comparisons",
      ],
      screenshots: [],
    },
    {
      name: "Plannify",
      desc: "Project management & Kanban tool with drag-and-drop board, time tracking, sub-tasks, and multi-workspace support",
      tech: ["Laravel", "Nuxt.js", "TypeScript"],

      id: "plannify",
      status: "private",
      url: "https://plannify.dev",
      role: "Full Stack Developer (Personal)",
      period: "2025 – Present",
      longDescription:
        "Personal SaaS side project — a project management tool with Kanban boards, time tracking, sub-tasks, and multi-workspace support. Currently in active development.",
      techDetail: [
        { name: "Laravel", color: "#FF2D20" },
        { name: "Nuxt.js", color: "#00DC82" },
        { name: "TypeScript", color: "#3178C6" },
        { name: "PostgreSQL", color: "#336791" },
      ],
      highlights: [
        "Drag-and-drop Kanban with optimistic UI updates",
        "Time tracking per task with billable hours reporting",
        "Sub-task tree with recursive depth support",
        "Multi-workspace with role-based member access",
      ],
      screenshots: [],
    },
  ] as Project[],

  awards: [
    {
      title: "Top 7 National — LKS Web Technology",
      issuer: "Kementerian Pendidikan Indonesia",
      year: "2023",
    },
    {
      title: "Top 1 Provincial — LKS Web Technology",
      issuer: "Kementerian Pendidikan Indonesia",
      year: "2023",
    },
    {
      title: "Top 1 City — LKS Web Technology",
      issuer: "Kementerian Pendidikan Indonesia",
      year: "2023",
    },
  ],
};
