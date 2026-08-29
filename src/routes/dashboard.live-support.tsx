import { createFileRoute } from "@tanstack/react-router";
import { Headphones, Loader2, MonitorUp, PhoneOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PageTitle } from "@/components/dw/AppShell";
import { Btn, BtnLink, Chip, MetaRow, Panel } from "@/components/dw/ui";

export const Route = createFileRoute("/dashboard/live-support")({
  component: DashLiveSupport,
});

type State = "idle" | "connecting" | "connected";

function DashLiveSupport() {
  const [state, setState] = useState<State>("idle");
  const [issue, setIssue] = useState("");
  const [sharing, setSharing] = useState(false);

  return (
    <div>
      <PageTitle
        title="Live Support"
        sub="Real-time help with an available technical specialist. Billed at $20 per hour of connected time."
      />

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Panel className="p-6">
          {state === "idle" ? (
            <>
              <h2 className="text-[16px] font-semibold">Start a session</h2>
              <p className="mt-1.5 text-[13.5px] text-muted-foreground">
                Describe the issue so we can connect you with someone who covers it.
              </p>
              <textarea
                value={issue}
                onChange={(e) => setIssue(e.target.value.slice(0, 1000))}
                rows={5}
                placeholder="My laptop won't connect to the office VPN after an update."
                className="mt-4 w-full resize-none rounded-xl border border-input bg-background p-4 text-[14px] outline-none focus:ring-2 focus:ring-ring"
              />
              <Btn
                size="lg"
                className="mt-4"
                onClick={() => {
                  if (issue.trim().length < 10) {
                    toast.error("Add a bit more detail about the issue.");
                    return;
                  }
                  setState("connecting");
                  window.setTimeout(() => setState("connected"), 2000);
                }}
              >
                <Headphones className="h-4 w-4" /> Connect to a specialist
              </Btn>
              <p className="mt-3 text-[12px] text-muted-foreground">
                Availability depends on the categories currently covered. If nobody is available for
                your issue, we&apos;ll route it as a request instead.
              </p>
            </>
          ) : null}

          {state === "connecting" ? (
            <div className="py-16 text-center">
              <Loader2 className="mx-auto h-6 w-6 animate-spin text-violet" />
              <p className="mt-5 text-[16px] font-semibold">Finding an available specialist…</p>
              <p className="mt-2 text-[13px] text-muted-foreground">
                Matching on coverage, skills, and current availability.
              </p>
            </div>
          ) : null}

          {state === "connected" ? (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-[16px] font-semibold">Session active</h2>
                  <p className="mt-1 text-[13px] text-muted-foreground">
                    Connected with a verified support specialist · billing 00:04:12
                  </p>
                </div>
                <Chip tone="violet">Live</Chip>
              </div>

              <div className="mt-5 rounded-xl border border-hairline bg-canvas p-5">
                <p className="text-[13.5px] font-medium">Your issue</p>
                <p className="mt-1.5 text-[13.5px] text-muted-foreground">{issue}</p>
              </div>

              <div className="mt-5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-hairline p-4">
                  <div>
                    <p className="text-[13.5px] font-medium">Screen sharing</p>
                    <p className="text-[12.5px] text-muted-foreground">
                      {sharing
                        ? "Your screen is shared for this session only."
                        : "Off — you control when to share."}
                    </p>
                  </div>
                  <Btn
                    size="sm"
                    variant={sharing ? "outline" : "violet"}
                    onClick={() => {
                      setSharing((s) => !s);
                      toast(sharing ? "Screen sharing stopped" : "Screen sharing permission granted");
                    }}
                  >
                    <MonitorUp className="h-4 w-4" /> {sharing ? "Stop sharing" : "Share screen"}
                  </Btn>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Btn
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setState("idle");
                      setSharing(false);
                      toast.success("Session ended", { description: "A summary was added to your account." });
                    }}
                  >
                    <PhoneOff className="h-4 w-4" /> End session
                  </Btn>
                  <BtnLink to="/get-started" size="sm" variant="ghost">
                    Escalate to a project
                  </BtnLink>
                </div>
              </div>
            </div>
          ) : null}
        </Panel>

        <div className="space-y-6">
          <Panel className="p-5">
            <h2 className="text-[15.5px] font-semibold">Session details</h2>
            <div className="mt-3">
              <MetaRow label="Rate" value="$20 / hour" />
              <MetaRow label="Billing" value="Connected time only" />
              <MetaRow label="Expert sessions" value="~$20 per 20 minutes" />
              <MetaRow label="Escalation" value="Convert to a scoped project" />
            </div>
          </Panel>
          <Panel className="p-5">
            <h2 className="text-[15.5px] font-semibold">Recent sessions</h2>
            <div className="mt-3 space-y-3">
              {[
                { t: "VPN configuration on macOS", d: "42 min · $14.00" },
                { t: "Shopify theme rollback guidance", d: "18 min · $6.00" },
              ].map((s) => (
                <div key={s.t} className="border-b border-hairline pb-3 last:border-b-0 last:pb-0">
                  <p className="text-[13.5px] font-medium">{s.t}</p>
                  <p className="mt-0.5 text-[12.5px] text-muted-foreground">{s.d}</p>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
