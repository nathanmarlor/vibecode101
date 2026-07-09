export const courses = [
  {
    id: 1,
    title: "Frontend Fundamentals",
    description: "Build modern, responsive UIs with React. Learn component architecture, state management, and component lifecycle.",
    level: "Beginner",
    duration: "4 hours",
    icon: "🚀",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop"
  },
  {
    id: 2,
    title: "Server Architecture with Node.js",
    description: "Design and implement RESTful APIs. Learn middleware, routing, error handling, and deployment strategies.",
    level: "Intermediate",
    duration: "6 hours",
    icon: "⚡",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop"
  },
  {
    id: 3,
    title: "Data Management Fundamentals",
    description: "Understand relational and NoSQL databases. Learn schema design, querying, and data modeling for web applications.",
    level: "Beginner",
    duration: "3 hours",
    icon: "💾",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=250&fit=crop"
  },
  {
    id: 4,
    title: "Authentication & Security",
    description: "Implement secure login systems with JWT, OAuth, and session management. Learn best practices for protecting user data.",
    level: "Advanced",
    duration: "5 hours",
    icon: "🔐",
    image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd82?w=400&h=250&fit=crop"
  }
];

export const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Frontend Developer at Notion",
    text: "The AI-assisted workflow taught me to be more productive while still understanding what the code is doing. Highly recommended for developers looking to modernize their process.",
    avatar: null
  },
  {
    name: "Marcus Chen",
    role: "Fullstack Engineer at Stripe",
    text: "The course structure makes complex topics approachable. The real-world projects gave me the confidence to incorporate these patterns into my day-to-day work.",
    avatar: null
  },
  {
    name: "Priya Patel",
    role: "Junior Developer at Shopify",
    text: "Finally a platform that bridges the gap between tutorial hell and building real applications. The hands-on approach makes the concepts stick.",
    avatar: null
  }
];

export const stats = {
  students: "2,847",
  courses: "12",
  uptime: "99.9%",
  vibeScore: 8.7
};

export const activityLog = [
  { id: undefined, message: "New student enrolled in Frontend Fundamentals", time: "2 min ago" },
  { id: undefined, message: "Server deployed to production", time: "1 hr ago" },
  { id: undefined, message: "New course: TypeScript Essentials — launching next week", time: "3 hrs ago" },
  { id: undefined, message: "Database backup completed successfully", time: "5 hrs ago" },
  { id: undefined, message: "SSL certificate renewed — valid through 2026", time: "1 day ago" },
  { id: undefined, message: "User activity spike detected — all systems nominal", time: "1 day ago" }
];

export const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    popular: false,
    features: [
      "Access to 1 course",
      "Community forum",
      "Basic email support",
      "Course completion certificates"
    ]
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    popular: true,
    features: [
      "Access to all courses",
      "Priority support",
      "Certificate of completion",
      "Offline course downloads",
      "1-on-1 monthly review session"
    ]
  },
  {
    name: "Teams",
    price: "$49",
    period: "/month",
    popular: false,
    features: [
      "Everything in Pro",
      "Up to 10 team members",
      "Admin dashboard",
      "Team progress analytics",
      "Dedicated account manager"
    ]
  }
];

export const faq = [
  {
    question: "Do I need any coding experience?",
    answer: "No prior experience is required. Our curriculum is designed to take you from zero to building real applications."
  },
  {
    question: "Will I receive a certificate upon completion?",
    answer: "Yes. All learners who complete a course receive a verifiable digital certificate."
  },
  {
    question: "Can I get a refund?",
    answer: "We offer a 14-day money-back guarantee on all paid plans. Contact our support team to process your refund."
  },
  {
    question: "How long do I have access to the courses?",
    answer: "All courses include lifetime access. Once enrolled, you can revisit the material as many times as you like."
  },
  {
    question: "Do you offer team or enterprise plans?",
    answer: "Yes. Our Teams plan includes admin controls, progress tracking, and a dedicated account manager. Contact us for custom pricing."
  }
];
