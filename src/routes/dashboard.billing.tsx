import { createFileRoute } from "@tanstack/react-router";
import { CreditCard, Download } from "lucide-react";
import { toast } from "sonner";
import { PageTitle } from "@/components/dw/AppShell";
import { Btn, Chip, MetaRow, Panel } from "@/components/dw/ui";

export const Route = createFileRoute("/dashboard/billing")({
  component: Billing,
});

const INVOICES = [
  { id: "INV-2041", desc: "DW-7821 · Checkout fix (scoped project)", amount: "$220.00", status: "Due on completion" },
  { id: "INV-2033", desc: "Live Support · 42 min", amount: "$14.00", status: "Paid" },
  { id: "INV-2027", desc: "Technical Expert Session · 20 min", amount: "$20.00", status: "Paid" },
  { id: "INV-2014", desc: "System Watch · monthly coverage", amount: "$180.00", status: "Paid" },
];

function Billing() {
  return (
    <div>
      <PageTitle title="Billing" sub="Charges for projects, Live Support time, expert sessions, and coverage." />

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Panel className="p-5">
          <h2 className="text-[15.5px] font-semibold">Invoices</h2>
          <div className="mt-4 overflow-hidden rounded-xl border border-hairline">
            {INVOICES.map((inv) => (
              <div
                key={inv.id}
                className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline px-4 py-3.5 last:border-b-0"
              >
                <div className="min-w-0">
                  <p className="text-[13.5px] font-medium">{inv.id}</p>
                  <p className="mt-0.5 text-[12.5px] text-muted-foreground">{inv.desc}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Chip tone={inv.status === "Paid" ? "muted" : "violet"}>{inv.status}</Chip>
                  <span className="text-[13.5px] font-medium">{inv.amount}</span>
                  <button
                    aria-label={`Download ${inv.id}`}
                    onClick={() => toast("Prototype only", { description: "Invoice PDFs are mocked." })}
                  >
                    <Download className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <div className="space-y-6">
          <Panel className="p-5">
            <h2 className="text-[15.5px] font-semibold">Payment method</h2>
            <div className="mt-4 flex items-center gap-3 rounded-lg border border-hairline px-4 py-3">
              <CreditCard className="h-4 w-4 text-violet" />
              <div>
                <p className="text-[13.5px] font-medium">Visa ending 4242</p>
                <p className="text-[12px] text-muted-foreground">Expires 04 / 28</p>
              </div>
            </div>
            <Btn
              size="sm"
              variant="outline"
              className="mt-4 w-full"
              onClick={() => toast("Prototype only", { description: "Payment methods aren't stored." })}
            >
              Update payment method
            </Btn>
          </Panel>
          <Panel className="p-5">
            <h2 className="text-[15.5px] font-semibold">How pricing works</h2>
            <div className="mt-3">
              <MetaRow label="Live Support" value="$20 / hour" />
              <MetaRow label="Expert session" value="~$20 / 20 min" />
              <MetaRow label="Projects" value="Scoped and quoted" />
              <MetaRow label="System Watch" value="Scope-based" />
              <MetaRow label="Enterprise" value="Custom agreement" />
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
