import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { PageTitle } from "@/components/dw/AppShell";
import { Btn, Chip, MetaRow, Panel } from "@/components/dw/ui";

export const Route = createFileRoute("/provider/earnings")({
  component: Earnings,
});

const PAYOUTS = [
  { id: "PO-8842", desc: "DW-7712 · API review (partial)", amount: "$520.00", status: "Paid" },
  { id: "PO-8830", desc: "DW-7688 · Database performance fix", amount: "$310.00", status: "Paid" },
  { id: "PO-8821", desc: "DW-7821 · Checkout fix", amount: "$220.00", status: "Pending review" },
];

function Earnings() {
  return (
    <div>
      <PageTitle title="Earnings" sub="Payouts are released after DevWork review of delivered work." />

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { l: "Paid this month", value: "$830.00" },
          { l: "Pending review", value: "$220.00" },
          { l: "Lifetime", value: "$14,260.00" },
        ].map((s) => (
          <Panel key={s.l} className="p-5">
            <p className="text-[12.5px] text-muted-foreground">{s.l}</p>
            <p className="mt-2 text-[24px] font-bold">{s.value}</p>
          </Panel>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Panel className="p-5">
          <h2 className="text-[15.5px] font-semibold">Payout history</h2>
          <div className="mt-4 overflow-hidden rounded-xl border border-hairline">
            {PAYOUTS.map((p) => (
              <div
                key={p.id}
                className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline px-4 py-3.5 last:border-b-0"
              >
                <div>
                  <p className="text-[13.5px] font-medium">{p.id}</p>
                  <p className="mt-0.5 text-[12.5px] text-muted-foreground">{p.desc}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Chip tone={p.status === "Paid" ? "muted" : "violet"}>{p.status}</Chip>
                  <span className="text-[13.5px] font-medium">{p.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="p-5">
          <h2 className="text-[15.5px] font-semibold">Payout settings</h2>
          <div className="mt-3">
            <MetaRow label="Method" value="Bank transfer" />
            <MetaRow label="Schedule" value="Weekly, after review" />
            <MetaRow label="Currency" value="USD" />
          </div>
          <Btn
            size="sm"
            variant="outline"
            className="mt-4 w-full"
            onClick={() => toast("Prototype only", { description: "Payout details aren't stored." })}
          >
            Update payout details
          </Btn>
        </Panel>
      </div>
    </div>
  );
}
