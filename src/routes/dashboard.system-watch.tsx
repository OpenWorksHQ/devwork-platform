import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PageTitle } from "@/components/dw/AppShell";
import { Btn, Chip, Dot, MetaRow, Panel } from "@/components/dw/ui";

export const Route = createFileRoute("/dashboard/system-watch")({
  component: DashSystemWatch,
});

const SYSTEMS = [
  { name: "Storefront (Shopify)", status: "Monitored", tone: "success" as const, last: "Checked 3 min ago" },
  { name: "API service (Node)", status: "Monitored", tone: "success" as const, last: "Checked 4 min ago" },
  { name: "Nightly ETL job", status: "Needs attention", tone: "warning" as const, last: "Alert 26 min ago" },
];

function DashSystemWatch() {
  const [enrolled, setEnrolled] = useState(true);
  const [systemName, setSystemName] = useState("");

  return (
    <div>
      <PageTitle
        title="System Watch"
        sub="Managed monitoring for systems you've enrolled. Coverage is scoped per system — we don't claim universal coverage."
      />

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          <Panel className="p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-[15.5px] font-semibold">Enrolled systems</h2>
              <Chip tone={enrolled ? "violet" : "muted"}>{enrolled ? "Coverage active" : "Paused"}</Chip>
            </div>
            <div className="mt-4 space-y-2.5">
              {SYSTEMS.map((s) => (
                <div
                  key={s.name}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-hairline px-4 py-3"
                >
                  <span className="text-[13.5px] font-medium">{s.name}</span>
                  <span className="flex items-center gap-2 text-[12.5px] text-muted-foreground">
                    <Dot tone={s.tone} /> {s.status} · {s.last}
                  </span>
                </div>
              ))}
            </div>
            <Btn
              size="sm"
              variant="outline"
              className="mt-4"
              onClick={() => {
                setEnrolled((e) => !e);
                toast(enrolled ? "Coverage paused" : "Coverage resumed");
              }}
            >
              {enrolled ? "Pause coverage" : "Resume coverage"}
            </Btn>
          </Panel>

          <Panel className="p-5">
            <h2 className="text-[15.5px] font-semibold">Add a system</h2>
            <p className="mt-1.5 text-[13.5px] text-muted-foreground">
              A DevWork Employee Expert reviews each system before coverage begins.
            </p>
            <form
              className="mt-4 flex flex-col gap-2 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                if (systemName.trim().length < 3) {
                  toast.error("Give the system a name.");
                  return;
                }
                toast.success("Submitted for coverage review", {
                  description: `${systemName.trim()} — we'll confirm scope before monitoring starts.`,
                });
                setSystemName("");
              }}
            >
              <input
                value={systemName}
                onChange={(e) => setSystemName(e.target.value.slice(0, 100))}
                placeholder="e.g. Customer portal (AWS)"
                className="h-11 flex-1 rounded-lg border border-input bg-background px-3 text-[13.5px] outline-none focus:ring-2 focus:ring-ring"
              />
              <Btn type="submit" size="md">
                Request coverage
              </Btn>
            </form>
          </Panel>

          <Panel className="p-5">
            <h2 className="text-[15.5px] font-semibold">Recent activity</h2>
            <div className="mt-4 space-y-4">
              {[
                {
                  at: "26 min ago",
                  body: "Nightly ETL job failed on retry 2. Assigned to a rotation provider with data pipeline coverage.",
                },
                { at: "Yesterday", body: "Storefront checkout latency returned to baseline after a theme rollback." },
                { at: "3 days ago", body: "Coverage scope updated to include the API service staging environment." },
              ].map((a) => (
                <div key={a.at} className="border-b border-hairline pb-4 last:border-b-0 last:pb-0">
                  <p className="text-[12px] text-muted-foreground">{a.at}</p>
                  <p className="mt-1 text-[13.5px] leading-[1.6]">{a.body}</p>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel className="p-5">
            <h2 className="text-[15.5px] font-semibold">Your coverage</h2>
            <div className="mt-3">
              <MetaRow label="Systems enrolled" value="3" />
              <MetaRow label="Coverage model" value="Business hours + on-call escalation" />
              <MetaRow label="Dispatch" value="DevWork rotation" />
              <MetaRow label="Pricing" value="Scope-based" />
            </div>
          </Panel>
          <Panel className="p-5">
            <h2 className="text-[15.5px] font-semibold">How dispatch works</h2>
            <ol className="mt-3 space-y-2.5 text-[13px] text-muted-foreground">
              <li>1. An issue is detected or reported on an enrolled system.</li>
              <li>2. DevWork dispatches from a rotation of providers who cover that system.</li>
              <li>3. A DevWork Employee Expert reviews the response and escalates if needed.</li>
            </ol>
          </Panel>
        </div>
      </div>
    </div>
  );
}
