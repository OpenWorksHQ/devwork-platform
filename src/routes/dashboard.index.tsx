import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, Headphones, MonitorCheck } from "lucide-react";
import { PageTitle } from "@/components/dw/AppShell";
import { StatusChip } from "@/components/dw/RequestTracker";
import { BtnLink, Chip, Panel } from "@/components/dw/ui";
import { MESSAGES, REQUESTS } from "@/lib/devwork-data";

export const Route = createFileRoute("/dashboard/")({
  component: Overview,
});

function Overview() {
  const active = REQUESTS.filter((r) => r.status !== "Completed");

  return (
    <div>
      <PageTitle
        title="Overview"
        sub="Everything DevWork is currently handling for you."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Active requests", value: String(active.length) },
          { label: "Awaiting your review", value: "1" },
          { label: "Completed this month", value: "3" },
        ].map((s) => (
          <Panel key={s.label} className="p-5">
            <p className="text-[12.5px] text-muted-foreground">{s.label}</p>
            <p className="mt-2 text-[26px] font-bold">{s.value}</p>
          </Panel>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Panel className="p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-semibold">Active requests</h2>
            <Link
              to="/dashboard/requests"
              className="text-[13px] font-medium text-violet hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {active.map((r) => (
              <Link
                key={r.id}
                to="/dashboard/requests/$requestId"
                params={{ requestId: r.id }}
                className="block rounded-xl border border-hairline p-4 transition-colors hover:bg-muted"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[12px] font-medium text-muted-foreground">{r.id}</span>
                  <StatusChip status={r.status} />
                </div>
                <p className="mt-2 text-[14.5px] font-medium">{r.title}</p>
                <p className="mt-1.5 text-[12.5px] text-muted-foreground">
                  {r.category} · {r.subcategory} · {r.providerLevel}
                </p>
                <p className="mt-3 flex items-center gap-1.5 text-[12.5px] text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" /> Estimated delivery: {r.estimatedDelivery}
                </p>
              </Link>
            ))}
          </div>
        </Panel>

        <div className="space-y-6">
          <Panel className="p-5">
            <h2 className="text-[16px] font-semibold">Messages</h2>
            <div className="mt-4 space-y-3">
              {MESSAGES.slice(0, 3).map((m) => (
                <div key={m.id} className="border-b border-hairline pb-3 last:border-b-0 last:pb-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[13.5px] font-medium">{m.from}</p>
                    <span className="text-[11.5px] text-muted-foreground">{m.at}</span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-[12.5px] text-muted-foreground">{m.preview}</p>
                </div>
              ))}
            </div>
            <BtnLink to="/dashboard/messages" variant="outline" size="sm" className="mt-4 w-full">
              Open messages
            </BtnLink>
          </Panel>

          <Panel className="p-5">
            <h2 className="text-[16px] font-semibold">Get help faster</h2>
            <div className="mt-4 space-y-2.5">
              <Link
                to="/dashboard/live-support"
                className="flex items-center justify-between rounded-lg border border-hairline px-4 py-3 text-[13.5px] hover:bg-muted"
              >
                <span className="flex items-center gap-2">
                  <Headphones className="h-4 w-4 text-violet" /> Start Live Support
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
              <Link
                to="/dashboard/system-watch"
                className="flex items-center justify-between rounded-lg border border-hairline px-4 py-3 text-[13.5px] hover:bg-muted"
              >
                <span className="flex items-center gap-2">
                  <MonitorCheck className="h-4 w-4 text-violet" /> System Watch coverage
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Chip>Managed workforce</Chip>
              <Chip>Human oversight</Chip>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
