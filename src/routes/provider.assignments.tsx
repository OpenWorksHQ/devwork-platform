import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PageTitle } from "@/components/dw/AppShell";
import { Btn, Chip, MetaRow, Panel } from "@/components/dw/ui";

export const Route = createFileRoute("/provider/assignments")({
  component: Assignments,
});

type Assignment = {
  id: string;
  title: string;
  customer: string;
  oversight: string;
  due: string;
  pay: string;
  progress: number;
  status: "In Progress" | "Submitted for review" | "Approved";
};

const INITIAL: Assignment[] = [
  {
    id: "DW-7821",
    title: "Fix broken Shopify checkout",
    customer: "Small retailer (individual account)",
    oversight: "DevWork Expert · Quality & Delivery",
    due: "Today, 6:00 PM",
    pay: "$220 fixed",
    progress: 45,
    status: "In Progress",
  },
  {
    id: "DW-7712",
    title: "API review and performance pass",
    customer: "B2B SaaS (business account)",
    oversight: "DevWork Expert · Technical Standards",
    due: "Fri",
    pay: "$65 / hour",
    progress: 80,
    status: "In Progress",
  },
];

function Assignments() {
  const [rows, setRows] = useState(INITIAL);
  const [note, setNote] = useState("");

  return (
    <div>
      <PageTitle
        title="Assignments"
        sub="Work currently assigned to you. Updates are visible to the customer and to DevWork oversight."
      />

      <div className="space-y-5">
        {rows.map((a) => (
          <Panel key={a.id} className="p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[12px] font-medium text-muted-foreground">{a.id}</span>
              <Chip tone={a.status === "Approved" ? "muted" : "violet"}>{a.status}</Chip>
            </div>
            <p className="mt-2 text-[15px] font-medium">{a.title}</p>

            <div className="mt-4 grid gap-6 md:grid-cols-2">
              <div>
                <MetaRow label="Customer" value={a.customer} />
                <MetaRow label="Oversight" value={a.oversight} />
                <MetaRow label="Due" value={a.due} />
                <MetaRow label="Compensation" value={a.pay} />
              </div>
              <div>
                <p className="text-[12.5px] text-muted-foreground">Progress</p>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-border">
                  <div className="h-full rounded-full bg-violet" style={{ width: `${a.progress}%` }} />
                </div>
                <p className="mt-2 text-[12.5px] text-muted-foreground">{a.progress}% complete</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Btn
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      setRows((prev) =>
                        prev.map((r) =>
                          r.id === a.id ? { ...r, progress: Math.min(100, r.progress + 15) } : r,
                        ),
                      )
                    }
                  >
                    Log progress
                  </Btn>
                  <Btn
                    size="sm"
                    disabled={a.status !== "In Progress"}
                    onClick={() => {
                      setRows((prev) =>
                        prev.map((r) =>
                          r.id === a.id ? { ...r, status: "Submitted for review", progress: 100 } : r,
                        ),
                      );
                      toast.success("Submitted for DevWork review");
                    }}
                  >
                    Submit for review
                  </Btn>
                </div>
              </div>
            </div>

            <form
              className="mt-5 flex flex-col gap-2 border-t border-hairline pt-4 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                if (note.trim().length < 3) return;
                setNote("");
                toast.success("Update posted to the customer");
              }}
            >
              <input
                value={note}
                onChange={(e) => setNote(e.target.value.slice(0, 500))}
                placeholder="Post an update for the customer…"
                className="h-11 flex-1 rounded-lg border border-input bg-background px-3 text-[13.5px] outline-none focus:ring-2 focus:ring-ring"
              />
              <Btn type="submit" size="md" variant="outline">
                Post update
              </Btn>
            </form>
          </Panel>
        ))}
      </div>
    </div>
  );
}
