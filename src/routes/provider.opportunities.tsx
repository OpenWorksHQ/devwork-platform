import { createFileRoute } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PageTitle } from "@/components/dw/AppShell";
import { Btn, Chip, Dot, Panel } from "@/components/dw/ui";
import { OPPORTUNITIES } from "@/lib/devwork-data";

export const Route = createFileRoute("/provider/opportunities")({
  component: Opportunities,
});

function Opportunities() {
  const [accepted, setAccepted] = useState<string[]>([]);
  const [declined, setDeclined] = useState<string[]>([]);

  return (
    <div>
      <PageTitle
        title="Matched work"
        sub="Assignments DevWork routed to you based on verified skills, level, and availability."
      />

      <div className="space-y-3">
        {OPPORTUNITIES.map((o) => {
          const isAccepted = accepted.includes(o.id);
          const isDeclined = declined.includes(o.id);
          return (
            <Panel key={o.id} className={o.locked ? "p-5 opacity-70" : "p-5"}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[12px] font-medium text-muted-foreground">{o.id}</span>
                <div className="flex items-center gap-2">
                  {o.locked ? (
                    <Chip tone="muted">
                      <Lock className="mr-1 inline h-3 w-3" /> Level locked
                    </Chip>
                  ) : null}
                  <Chip tone="violet">{o.requiredLevel}</Chip>
                </div>
              </div>
              <p className="mt-2 text-[15px] font-medium">{o.title}</p>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] text-muted-foreground">
                <span>{o.category}</span>
                <span>{o.duration}</span>
                <span>Due {o.deadline}</span>
                <span>Complexity: {o.complexity}</span>
                <span className="flex items-center gap-1.5">
                  <Dot tone={o.risk === "Elevated" ? "danger" : o.risk === "Medium" ? "warning" : "success"} />
                  Risk: {o.risk}
                </span>
                <span className="font-medium text-foreground">{o.compensation}</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {o.skills.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-hairline pt-4">
                {o.locked ? (
                  <p className="text-[12.5px] text-muted-foreground">
                    Requires {o.requiredLevel} standing. Complete the assessment path to unlock this
                    category.
                  </p>
                ) : isAccepted ? (
                  <Chip tone="violet">Accepted — added to your assignments</Chip>
                ) : isDeclined ? (
                  <Chip tone="muted">Declined — reassigned by DevWork</Chip>
                ) : (
                  <>
                    <Btn
                      size="sm"
                      onClick={() => {
                        setAccepted((a) => [...a, o.id]);
                        toast.success("Assignment accepted", {
                          description: "A DevWork Employee Expert will review your delivery.",
                        });
                      }}
                    >
                      Accept assignment
                    </Btn>
                    <Btn
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setDeclined((d) => [...d, o.id]);
                        toast("Declined", { description: "DevWork will route this to another provider." });
                      }}
                    >
                      Decline
                    </Btn>
                  </>
                )}
              </div>
            </Panel>
          );
        })}
      </div>
    </div>
  );
}
