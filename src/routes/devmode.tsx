import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldAlert } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Btn, Chip, Dot, MetaRow, Panel } from "@/components/dw/ui";
import { OPPORTUNITIES, REQUESTS } from "@/lib/devwork-data";

export const Route = createFileRoute("/devmode")({
  head: () => ({
    meta: [
      { title: "DevMode Innative — Internal Operations" },
      {
        name: "description",
        content:
          "Internal DevWork operations console: routing queue, provider oversight, escalations, and category controls.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "DevMode Innative — Internal Operations" },
      { property: "og:description", content: "Internal routing, oversight, and escalation console." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DevMode,
});

const TABS = ["Routing queue", "Oversight", "Escalations", "Category controls"] as const;

function DevMode() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Routing queue");

  return (
    <div className="min-h-screen bg-ink text-ink-foreground">
      <header className="border-b border-ink-border">
        <div className="dw-container flex h-16 flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-[17px] font-bold tracking-tight">
              Dev<span className="text-violet-bright">Work</span>
            </Link>
            <span className="rounded-full border border-ink-border px-2.5 py-1 text-[11px] uppercase tracking-[0.08em] text-white/70">
              DevMode Innative · Internal
            </span>
          </div>
          <span className="flex items-center gap-2 text-[12.5px] text-white/60">
            <ShieldAlert className="h-4 w-4 text-violet-bright" /> Restricted to DevWork employees
          </span>
        </div>
      </header>

      <div className="dw-container py-8">
        <h1 className="text-[24px] font-bold tracking-tight sm:text-[28px]">Operations console</h1>
        <p className="mt-1.5 max-w-2xl text-[13.5px] text-white/60">
          Internal view used by DevWork Employee Experts to route requests, supervise marketplace
          providers, and control which categories are open.
        </p>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={
                tab === t
                  ? "rounded-lg bg-violet px-3.5 py-2 text-[13px] font-medium text-violet-foreground"
                  : "rounded-lg border border-ink-border px-3.5 py-2 text-[13px] text-white/70 hover:bg-white/10"
              }
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-ink-border bg-white/[0.03] p-5">
          {tab === "Routing queue" ? (
            <div className="space-y-3">
              {REQUESTS.map((r) => (
                <div key={r.id} className="rounded-xl border border-ink-border p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[12px] text-white/50">{r.id}</span>
                    <span className="text-[12px] text-white/60">
                      {r.complexity} complexity · {r.risk} risk · {r.urgency}
                    </span>
                  </div>
                  <p className="mt-2 text-[14.5px] font-medium">{r.title}</p>
                  <p className="mt-1.5 text-[12.5px] text-white/55">
                    Proposed: {r.providerLevel} · Oversight: {r.oversight.role}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Btn
                      size="sm"
                      variant="violet"
                      onClick={() => toast.success(`${r.id} assignment confirmed`)}
                    >
                      Confirm assignment
                    </Btn>
                    <Btn
                      size="sm"
                      variant="inkOutline"
                      onClick={() => toast(`${r.id} reassigned`, { description: "Sent back to routing." })}
                    >
                      Reassign
                    </Btn>
                    <Btn
                      size="sm"
                      variant="inkOutline"
                      onClick={() => toast(`${r.id} escalated to a senior expert`)}
                    >
                      Escalate
                    </Btn>
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {tab === "Oversight" ? (
            <div className="space-y-3">
              {[
                { name: "Marketplace Provider · Ecommerce", level: "Verified", quality: "4.8", flag: "None" },
                { name: "Marketplace Provider · Mobile", level: "Specialist", quality: "4.9", flag: "None" },
                { name: "Marketplace Provider · Data", level: "Rated", quality: "4.2", flag: "Late delivery" },
              ].map((p) => (
                <div
                  key={p.name}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-ink-border p-4"
                >
                  <div>
                    <p className="text-[13.5px] font-medium">{p.name}</p>
                    <p className="mt-0.5 text-[12px] text-white/55">
                      {p.level} · quality {p.quality} · flag: {p.flag}
                    </p>
                  </div>
                  <Btn
                    size="sm"
                    variant="inkOutline"
                    onClick={() => toast("Review opened", { description: p.name })}
                  >
                    Open review
                  </Btn>
                </div>
              ))}
            </div>
          ) : null}

          {tab === "Escalations" ? (
            <div className="space-y-3">
              {[
                { id: "ESC-114", body: "Security engagement requires a second reviewer before report release.", sev: "high" },
                { id: "ESC-109", body: "Customer disputed scope on DW-7688. Employee Expert mediating.", sev: "medium" },
              ].map((e) => (
                <div key={e.id} className="rounded-xl border border-ink-border p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[12px] text-white/50">{e.id}</span>
                    <span className="flex items-center gap-2 text-[12px] text-white/60">
                      <Dot tone={e.sev === "high" ? "danger" : "warning"} /> {e.sev} severity
                    </span>
                  </div>
                  <p className="mt-2 text-[13.5px]">{e.body}</p>
                  <Btn
                    size="sm"
                    variant="violet"
                    className="mt-3"
                    onClick={() => toast.success(`${e.id} claimed`)}
                  >
                    Claim escalation
                  </Btn>
                </div>
              ))}
            </div>
          ) : null}

          {tab === "Category controls" ? (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-ink-border p-4">
                <p className="text-[13.5px] font-medium">Open categories</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Ecommerce", "Web", "APIs", "Databases", "IT support"].map((c) => (
                    <Chip key={c} tone="dark">
                      {c}
                    </Chip>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-ink-border p-4">
                <p className="text-[13.5px] font-medium">Restricted / coverage-dependent</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Security testing", "Enterprise capacity", "Embedded / hardware", "Robotics"].map((c) => (
                    <Chip key={c} tone="dark">
                      {c}
                    </Chip>
                  ))}
                </div>
                <p className="mt-3 text-[12px] leading-[1.55] text-white/55">
                  Restricted categories only accept requests when verified coverage exists. No universal
                  coverage is promised to customers.
                </p>
              </div>
              <div className="rounded-xl border border-ink-border p-4 md:col-span-2">
                <p className="text-[13.5px] font-medium">Matched work pool</p>
                <div className="mt-3">
                  <MetaRow label="Open assignments" value={String(OPPORTUNITIES.filter((o) => !o.locked).length)} />
                  <MetaRow label="Level-locked assignments" value={String(OPPORTUNITIES.filter((o) => o.locked).length)} />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
