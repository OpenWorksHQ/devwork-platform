import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppShell } from "@/components/dw/AppShell";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Customer Dashboard — DevWork" },
      {
        name: "description",
        content: "Track your DevWork requests, updates, deliverables, messages, and billing.",
      },
      { property: "og:title", content: "Customer Dashboard — DevWork" },
      { property: "og:description", content: "Requests, updates, deliverables, and billing." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardLayout,
});

function DashboardLayout() {
  return (
    <AppShell
      title="Customer"
      badge="Customer"
      requireType="customer"
      nav={[
        { to: "/dashboard", label: "Overview" },
        { to: "/dashboard/requests", label: "My requests" },
        { to: "/dashboard/messages", label: "Messages" },
        { to: "/dashboard/live-support", label: "Live Support" },
        { to: "/dashboard/system-watch", label: "System Watch" },
        { to: "/dashboard/billing", label: "Billing" },
      ]}
    >
      <Outlet />
    </AppShell>
  );
}
