import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppShell } from "@/components/dw/AppShell";

export const Route = createFileRoute("/provider")({
  head: () => ({
    meta: [
      { title: "Provider Workspace — DevWork" },
      {
        name: "description",
        content:
          "Marketplace provider workspace: matched opportunities, active assignments, earnings, and verification level.",
      },
      { property: "og:title", content: "Provider Workspace — DevWork" },
      { property: "og:description", content: "Work is assigned by DevWork, not bid on." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProviderLayout,
});

function ProviderLayout() {
  return (
    <AppShell
      title="Provider"
      badge="Marketplace Provider"
      requireType="provider"
      nav={[
        { to: "/provider", label: "Overview" },
        { to: "/provider/opportunities", label: "Matched work" },
        { to: "/provider/assignments", label: "Assignments" },
        { to: "/provider/earnings", label: "Earnings" },
        { to: "/provider/profile", label: "Level & skills" },
      ]}
    >
      <Outlet />
    </AppShell>
  );
}
