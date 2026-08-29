import { Check, Loader2, User } from "lucide-react";
import { REQUEST_STAGES, type DwRequest, type RequestStatus } from "@/lib/devwork-data";
import { cn } from "@/lib/utils";

export function Stepper({ request }: { request: DwRequest }) {
  const currentIndex = REQUEST_STAGES.indexOf(request.status);
  return (
    <div className="flex items-start">
      {REQUEST_STAGES.map((stage, i) => {
        const done = i < currentIndex;
        const current = i === currentIndex;
        const time = request.timeline.find((t) => t.stage === stage)?.at ?? "—";
        return (
          <div key={stage} className="flex min-w-0 flex-1 flex-col items-center">
            <div className="flex w-full items-center">
              <span
                className={cn("h-px flex-1", i === 0 && "opacity-0", done || current ? "bg-violet" : "bg-border")}
              />
              <span
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                  done || current
                    ? "bg-violet text-violet-foreground"
                    : "border border-border bg-background text-muted-foreground",
                )}
              >
                {done ? (
                  <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                ) : current ? (
                  <User className="h-3.5 w-3.5" strokeWidth={2.25} />
                ) : (
                  <Loader2 className="h-3.5 w-3.5" strokeWidth={2} />
                )}
              </span>
              <span
                className={cn(
                  "h-px flex-1",
                  i === REQUEST_STAGES.length - 1 && "opacity-0",
                  done ? "bg-violet" : "bg-border",
                )}
              />
            </div>
            <p className="mt-2.5 truncate text-center text-[12px] font-medium">{stage}</p>
            <p className="text-center text-[11px] text-muted-foreground">{time}</p>
          </div>
        );
      })}
    </div>
  );
}

export function StatusChip({ status }: { status: RequestStatus }) {
  return (
    <span className="dw-eyebrow shrink-0 rounded-full bg-violet-soft px-2.5 py-1 text-violet">
      {status === "Completed" ? "Completed" : status === "Review" ? "In Review" : "In Progress"}
    </span>
  );
}
