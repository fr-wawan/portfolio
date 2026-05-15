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
      location: "Bangkok  (Remote)",
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
    },
    {
      name: "Ticket Booking & Membership Platform",
      desc: "Web-based ticket booking with membership registration, payment gateway integration, and admin dashboard",
      tech: ["Laravel", "Vue.js", "MySQL"],
    },
    {
      name: "Online Course Platform",
      desc: "Full-featured LMS with enrollment workflows, scheduling, payment processing, and rating system",
      tech: ["Laravel", "Inertia.js", "React"],
    },
    {
      name: "HRIS Multi-Tenant",
      desc: "Production multi-tenant HR system with payroll, attendance, employee management, and Vue.js migration from jQuery",
      tech: ["Laravel", "Vue.js", "MySQL"],
    },
    {
      name: "PulseBoard",
      desc: "CRM & sales analytics platform with order management (2,000+ records), revenue dashboard, and customer analytics",
      tech: ["Laravel", "Vue.js", "PostgreSQL"],
    },
    {
      name: "Plannify",
      desc: "Project management & Kanban tool with drag-and-drop board, time tracking, sub-tasks, and multi-workspace support",
      tech: ["Laravel", "Nuxt.js", "TypeScript"],
    },
  ],

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
