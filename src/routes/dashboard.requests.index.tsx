import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageTitle } from "@/components/dw/AppShell";
import { StatusChip } from "@/components/dw/RequestTracker";
import { BtnLink, Dot, Panel } from "@/components/dw/ui";
import { REQUESTS } from "@/lib/devwork-data";

export const Route = createFileRoute("/dashboard/requests/")({
  component: RequestsList,
});

const FILTERS = ["All", "Active", "In review", "Completed"] as const;

function RequestsList() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [query, setQuery] = useState("");

  const rows = REQUESTS.filter((r) => {
    const matchesFilter =
      filter === "All" ||
      (filter === "Active" && !["Completed", "Review"].includes(r.status)) ||
      (filter === "In review" && r.status === "Review") ||
      (filter === "Completed" && r.status === "Completed");
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      r.title.toLowerCase().includes(q) ||
      r.id.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q);
    return matchesFilter && matchesQuery;
  });

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <PageTitle title="My requests" sub="Every request you've submitted to DevWork." />
        <BtnLink to="/get-started" size="md">
          New request
        </BtnLink>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-1.5">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={
                filter === f
                  ? "rounded-lg bg-ink px-3.5 py-2 text-[13px] font-medium text-ink-foreground"
                  : "rounded-lg border border-hairline px-3.5 py-2 text-[13px] text-muted-foreground hover:bg-muted"
              }
            >
              {f}
            </button>
          ))}
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value.slice(0, 100))}
          placeholder="Search requests"
          className="h-10 w-full max-w-xs rounded-lg border border-input bg-background px-3 text-[13.5px] outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="mt-5 space-y-3">
        {rows.map((r) => (
          <Link
            key={r.id}
            to="/dashboard/requests/$requestId"
            params={{ requestId: r.id }}
            className="block"
          >
            <Panel className="p-5 transition-colors hover:bg-muted">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[12px] font-medium text-muted-foreground">{r.id}</span>
                <StatusChip status={r.status} />
              </div>
              <p className="mt-2 text-[15px] font-medium">{r.title}</p>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] text-muted-foreground">
                <span>
                  {r.category} · {r.subcategory}
                </span>
                <span>Complexity: {r.complexity}</span>
                <span className="flex items-center gap-1.5">
                  <Dot
                    tone={r.risk === "Elevated" ? "danger" : r.risk === "Medium" ? "warning" : "success"}
                  />
                  Risk: {r.risk}
                </span>
                <span>{r.providerLevel}</span>
                <span>Delivery: {r.estimatedDelivery}</span>
              </div>
            </Panel>
          </Link>
        ))}
        {!rows.length ? (
          <Panel className="p-10 text-center">
            <p className="text-[14px] font-medium">No requests match that filter.</p>
            <p className="mt-1.5 text-[13px] text-muted-foreground">
              Try a different filter or submit a new request.
            </p>
          </Panel>
        ) : null}
      </div>
    </div>
  );
}
