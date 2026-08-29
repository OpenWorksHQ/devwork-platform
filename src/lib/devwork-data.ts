export type RequestStatus =
  | "Received"
  | "Analyzed"
  | "Assigned"
  | "In Progress"
  | "Review"
  | "Completed";

export const REQUEST_STAGES: RequestStatus[] = [
  "Received",
  "Analyzed",
  "Assigned",
  "In Progress",
  "Review",
  "Completed",
];

export type Complexity = "Low" | "Medium" | "High";
export type Risk = "Low" | "Medium" | "Elevated";
export type ProviderLevel =
  | "New Provider"
  | "Tested Provider"
  | "Rated Provider"
  | "Verified Provider"
  | "Specialist"
  | "Enterprise Eligible";

export const PROVIDER_LEVELS: ProviderLevel[] = [
  "New Provider",
  "Tested Provider",
  "Rated Provider",
  "Verified Provider",
  "Specialist",
  "Enterprise Eligible",
];

export type DwRequest = {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  skills: string[];
  complexity: Complexity;
  risk: Risk;
  urgency: "Standard" | "Priority" | "Urgent";
  providerLevel: ProviderLevel;
  status: RequestStatus;
  provider: { name: string; role: string };
  oversight: { name: string; role: string };
  estimatedDelivery: string;
  doing: string;
  submitted: string;
  timeline: { stage: RequestStatus; at: string }[];
  updates: { at: string; author: string; body: string }[];
  files: { name: string; size: string; by: string }[];
  deliverables: { name: string; status: "Pending" | "Ready for review" | "Approved" }[];
};

export const REQUESTS: DwRequest[] = [
  {
    id: "DW-7821",
    title: "My checkout is broken on Shopify.",
    category: "Ecommerce",
    subcategory: "Checkout",
    skills: ["Shopify", "Liquid", "Payment configuration"],
    complexity: "Medium",
    risk: "Low",
    urgency: "Priority",
    providerLevel: "Verified Provider",
    status: "Assigned",
    provider: { name: "Verified Specialist", role: "Ecommerce Expert" },
    oversight: { name: "DevWork Expert", role: "Quality & Delivery" },
    estimatedDelivery: "Today, by 6:00 PM",
    doing: "Reproducing the failed checkout session and reviewing recent theme and payment changes.",
    submitted: "Today, 2:41 PM",
    timeline: [
      { stage: "Received", at: "Just now" },
      { stage: "Analyzed", at: "2 min ago" },
      { stage: "Assigned", at: "5 min ago" },
      { stage: "In Progress", at: "15 min ago" },
      { stage: "Review", at: "—" },
      { stage: "Completed", at: "—" },
    ],
    updates: [
      { at: "5 min ago", author: "DevWork Routing", body: "Routed to a verified ecommerce provider with checkout and payments coverage." },
      { at: "2 min ago", author: "DevWork Analysis", body: "Classified as Ecommerce / Checkout. Complexity medium, risk low." },
    ],
    files: [{ name: "checkout-error.png", size: "412 KB", by: "You" }],
    deliverables: [{ name: "Checkout fix + test report", status: "Pending" }],
  },
  {
    id: "DW-7754",
    title: "Our mobile app crashes on launch for some Android users.",
    category: "Software & Development",
    subcategory: "Mobile apps",
    skills: ["Android", "Crash analytics", "React Native"],
    complexity: "High",
    risk: "Medium",
    urgency: "Urgent",
    providerLevel: "Specialist",
    status: "In Progress",
    provider: { name: "Specialist Provider", role: "Mobile Engineer" },
    oversight: { name: "DevWork Expert", role: "Technical Standards" },
    estimatedDelivery: "Thu, by 12:00 PM",
    doing: "Isolating the crash to a native module initialization path on Android 13 devices.",
    submitted: "Mon, 9:12 AM",
    timeline: [
      { stage: "Received", at: "Mon 9:12 AM" },
      { stage: "Analyzed", at: "Mon 9:20 AM" },
      { stage: "Assigned", at: "Mon 10:04 AM" },
      { stage: "In Progress", at: "Mon 1:30 PM" },
      { stage: "Review", at: "—" },
      { stage: "Completed", at: "—" },
    ],
    updates: [
      { at: "Yesterday", author: "Specialist Provider", body: "Reproduced on two Android 13 devices. Narrowing to a dependency upgrade." },
    ],
    files: [{ name: "crash-log-bundle.txt", size: "88 KB", by: "You" }],
    deliverables: [{ name: "Patched build + regression notes", status: "Pending" }],
  },
  {
    id: "DW-7690",
    title: "Security review before our public launch.",
    category: "Security",
    subcategory: "Security audit",
    skills: ["Application security", "Authorized testing", "Reporting"],
    complexity: "High",
    risk: "Elevated",
    urgency: "Standard",
    providerLevel: "Enterprise Eligible",
    status: "Review",
    provider: { name: "Verified Security Specialist", role: "Application Security" },
    oversight: { name: "DevWork Employee Expert", role: "Security Oversight" },
    estimatedDelivery: "Fri, by 5:00 PM",
    doing: "Employee Expert is reviewing findings and severity classification before release to you.",
    submitted: "Last week",
    timeline: [
      { stage: "Received", at: "Last week" },
      { stage: "Analyzed", at: "Last week" },
      { stage: "Assigned", at: "Last week" },
      { stage: "In Progress", at: "Mon" },
      { stage: "Review", at: "Today" },
      { stage: "Completed", at: "—" },
    ],
    updates: [
      { at: "Today", author: "DevWork Employee Expert", body: "Findings drafted. Escalated one item for a second reviewer." },
    ],
    files: [{ name: "scope-authorization.pdf", size: "126 KB", by: "You" }],
    deliverables: [{ name: "Security review report", status: "Ready for review" }],
  },
  {
    id: "DW-7412",
    title: "Rebuild our booking flow and connect payments.",
    category: "Business Technology",
    subcategory: "Booking systems",
    skills: ["Next.js", "Stripe API", "Postgres"],
    complexity: "Medium",
    risk: "Low",
    urgency: "Standard",
    providerLevel: "Rated Provider",
    status: "Completed",
    provider: { name: "Rated Provider", role: "Full-stack Developer" },
    oversight: { name: "DevWork Expert", role: "Quality & Delivery" },
    estimatedDelivery: "Delivered",
    doing: "Work delivered, verified, and approved.",
    submitted: "3 weeks ago",
    timeline: [
      { stage: "Received", at: "3 wks ago" },
      { stage: "Analyzed", at: "3 wks ago" },
      { stage: "Assigned", at: "3 wks ago" },
      { stage: "In Progress", at: "2 wks ago" },
      { stage: "Review", at: "1 wk ago" },
      { stage: "Completed", at: "1 wk ago" },
    ],
    updates: [{ at: "1 wk ago", author: "DevWork Expert", body: "Verification passed. Delivery approved by customer." }],
    files: [{ name: "booking-spec.pdf", size: "240 KB", by: "You" }],
    deliverables: [{ name: "Booking flow + payment integration", status: "Approved" }],
  },
];

export const OPPORTUNITIES = [
  {
    id: "OPP-3391",
    title: "Fix broken Shopify checkout for a small retailer",
    category: "Ecommerce / Checkout",
    skills: ["Shopify", "Liquid", "Payments"],
    duration: "2–4 hours",
    compensation: "$220 fixed",
    complexity: "Medium" as Complexity,
    risk: "Low" as Risk,
    deadline: "Today, 6:00 PM",
    requiredLevel: "Verified Provider" as ProviderLevel,
    locked: false,
  },
  {
    id: "OPP-3388",
    title: "API review and performance pass on a Node service",
    category: "Software & Development / APIs",
    skills: ["Node.js", "Profiling", "Postgres"],
    duration: "1 week, part-time",
    compensation: "$65 / hour",
    complexity: "Medium" as Complexity,
    risk: "Low" as Risk,
    deadline: "Fri",
    requiredLevel: "Rated Provider" as ProviderLevel,
    locked: false,
  },
  {
    id: "OPP-3376",
    title: "Authorized penetration test for a B2B SaaS platform",
    category: "Security / Authorized testing",
    skills: ["AppSec", "Reporting", "Authorized testing"],
    duration: "2 weeks",
    compensation: "Scoped on request",
    complexity: "High" as Complexity,
    risk: "Elevated" as Risk,
    deadline: "Next month",
    requiredLevel: "Specialist" as ProviderLevel,
    locked: true,
  },
  {
    id: "OPP-3370",
    title: "Overflow engineering capacity for a data migration",
    category: "Engineering Capacity / Migrations",
    skills: ["ETL", "Python", "Cloud"],
    duration: "4 weeks",
    compensation: "$78 / hour",
    complexity: "High" as Complexity,
    risk: "Medium" as Risk,
    deadline: "Rolling",
    requiredLevel: "Enterprise Eligible" as ProviderLevel,
    locked: true,
  },
];

export const SOLUTION_GROUPS = [
  {
    name: "Software & Development",
    items: ["Web development", "Mobile apps", "Software development", "Bug fixes", "APIs", "Databases", "Code review", "Architecture", "Performance optimization"],
  },
  {
    name: "IT & Systems",
    items: ["IT support", "Remote support", "Server setup", "System maintenance", "Platform support", "Cloud infrastructure", "DevOps", "Smart-device setup"],
  },
  {
    name: "Automation & AI",
    items: ["Automation", "AI development", "AI workflows", "Internal tools", "Data systems"],
  },
  {
    name: "Security",
    items: ["Cybersecurity", "Security audits", "Authorized penetration testing", "Vulnerability assessments", "Security monitoring", "Authorized technical investigation & support"],
  },
  {
    name: "Business Technology",
    items: ["Ecommerce", "Payment systems", "Booking systems", "Website maintenance", "App maintenance", "Online seller support", "Creator tools"],
  },
  {
    name: "Technical Expertise",
    items: ["Technical consulting", "Technical education", "Coding help", "Developer mentorship", "Technical research", "QA & testing", "Project recovery"],
  },
  {
    name: "Engineering Capacity",
    items: ["Temporary engineers", "Specialist support", "Backlog reduction", "Overflow engineering", "Temporary technical teams"],
  },
];

export const EMERGING_CATEGORIES = [
  "Embedded systems",
  "Firmware",
  "Robotics",
  "Industrial automation",
  "Hardware control systems",
  "Aerospace software & systems support",
];

export const MESSAGES = [
  { id: "m1", from: "DevWork Expert", role: "Quality & Delivery", preview: "We've assigned a verified ecommerce provider to DW-7821.", at: "5 min ago", unread: true },
  { id: "m2", from: "Specialist Provider", role: "Mobile Engineer", preview: "Reproduced the Android crash — sending a build shortly.", at: "Yesterday", unread: false },
  { id: "m3", from: "DevWork Employee Expert", role: "Security Oversight", preview: "Report is in review. One finding escalated for a second reviewer.", at: "Today", unread: true },
];
