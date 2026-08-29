import { createFileRoute, Link } from "@tanstack/react-router";
import { PageTitle } from "@/components/dw/AppShell";
import { Chip, Dot, MetaRow, Panel } from "@/components/dw/ui";
import { OPPORTUNITIES } from "@/lib/devwork-data";

export const Route = createFileRoute("/provider/")({
  component: ProviderOverview,
});

function ProviderOverview() {
  const open = OPPORTUNITIES.filter((o) => !o.locked);

  return (
    <div>
      <PageTitle
        title="Overview"
        sub="DevWork assigns work that matches your verified level and skills. There is no bidding."
      />

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { l: "Current level", v: "Verified" },
          { l: "Matched work", v: String(open.length) },
          { l: "Active assignments", v: "2" },
          { l: "Quality score", v: "4.8" },
        ].map((s) => (
          <Panel key={s.l} className="p-5">
            <p className="text-[12.5px] text-muted-foreground">{s.l}</p>
            <p className="mt-2 text-[24px] font-bold">{s.v}</p>
          </Panel>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Panel className="p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-semibold">Matched to you</h2>
            <Link to="/provider/opportunities" className="text-[13px] font-medium text-violet hover:underline">
              View all
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {open.map((o) => (
              <div key={o.id} className="rounded-xl border border-hairline p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[12px] font-medium text-muted-foreground">{o.id}</span>
                  <Chip tone="violet">{o.requiredLevel}</Chip>
                </div>
                <p className="mt-2 text-[14.5px] font-medium">{o.title}</p>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12.5px] text-muted-foreground">
                  <span>{o.category}</span>
                  <span>{o.duration}</span>
                  <span>{o.compensation}</span>
                  <span className="flex items-center gap-1.5">
                    <Dot tone={o.risk === "Elevated" ? "danger" : o.risk === "Medium" ? "warning" : "success"} />
                    Risk: {o.risk}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <div className="space-y-6">
          <Panel className="p-5">
            <h2 className="text-[15.5px] font-semibold">Your standing</h2>
            <div className="mt-3">
              <MetaRow label="Level" value="Verified Provider" />
              <MetaRow label="Categories unlocked" value="Ecommerce, Web, APIs" />
              <MetaRow label="Locked categories" value="Security, Enterprise" />
              <MetaRow label="On-time delivery" value="96%" />
            </div>
          </Panel>
          <Panel className="p-5">
            <h2 className="text-[15.5px] font-semibold">How advancement works</h2>
            <p className="mt-2 text-[13px] leading-[1.6] text-muted-foreground">
              Higher-risk categories unlock after assessments, completed work reviewed by DevWork
              Employee Experts, and consistent delivery quality. DevWork controls access — you don&apos;t
              self-select into sensitive work.
            </p>
            <Link to="/provider/profile" className="mt-3 inline-block text-[13px] font-medium text-violet hover:underline">
              View your level & skills
            </Link>
          </Panel>
        </div>
      </div>
    </div>
  );
}
