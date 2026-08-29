import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, MessageSquare, MonitorPlay, Phone, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PageHero, SiteLayout } from "@/components/dw/SiteLayout";
import { Btn, BtnLink, SectionHeading } from "@/components/dw/ui";

export const Route = createFileRoute("/live-support")({
  head: () => ({
    meta: [
      { title: "DevWork Live Support — Guided Technical Help in Minutes" },
      {
        name: "description",
        content:
          "Immediate guided technical assistance over chat, call, or Dualis-powered shared screens. $20 per hour block, or a Technical Expert Session for advanced guidance.",
      },
      { property: "og:title", content: "DevWork Live Support" },
      {
        property: "og:description",
        content: "Chat, call, or shared screen. You control screen-sharing permissions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LiveSupport,
});

const CHANNELS = [
  { icon: MessageSquare, t: "Chat", b: "Describe the issue and get guided steps in writing." },
  { icon: Phone, t: "Call", b: "Talk it through with a support specialist." },
  { icon: MonitorPlay, t: "Screen sharing", b: "Dualis-powered shared screens, permission-controlled." },
];

const COVERS = [
  "Device setup",
  "Apple / iCloud issues",
  "Android",
  "Windows",
  "Software configuration",
  "Websites",
  "Ecommerce",
  "Shopify",
  "Payment configuration",
  "Business software",
  "Creator tools",
  "Smart-home setup",
  "Gaming / software",
  "Basic developer troubleshooting",
];

type Tier = "live" | "expert";

function LiveSupport() {
  const [tier, setTier] = useState<Tier>("live");
  const [issue, setIssue] = useState("");
  const [stage, setStage] = useState<"form" | "routing" | "connected">("form");

  const start = () => {
    if (issue.trim().length < 8) {
      toast.error("Add a few more details so we can route you correctly.");
      return;
    }
    setStage("routing");
    window.setTimeout(() => setStage("connected"), 1600);
  };

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Live support"
        title="Immediate guided technical assistance."
        intro="Explain the problem. DevWork analyzes it and routes you to the right support level — general Live Support or a Technical Expert Session."
      />

      <section className="bg-background py-16 lg:py-20">
        <div className="dw-container grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <div className="grid gap-4 sm:grid-cols-3">
              {CHANNELS.map(({ icon: Icon, t, b }) => (
                <div key={t} className="rounded-xl border border-hairline bg-card p-5">
                  <Icon className="h-5 w-5 text-violet" strokeWidth={1.8} />
                  <p className="mt-4 text-[14px] font-semibold">{t}</p>
                  <p className="mt-1.5 text-[13px] leading-[1.55] text-muted-foreground">{b}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-hairline bg-canvas p-6">
                <p className="text-[15px] font-semibold">Live Support</p>
                <p className="mt-3 text-[28px] font-bold tracking-tight">
                  $20 <span className="text-[13px] font-normal text-muted-foreground">/ hour block</span>
                </p>
                <p className="mt-3 text-[13px] leading-[1.6] text-muted-foreground">
                  The first hour costs $20 whether the issue takes 5, 20, or 55 minutes. Past 60
                  minutes, another $20 block begins.
                </p>
              </div>
              <div className="rounded-xl border border-violet/30 bg-card p-6 shadow-card">
                <p className="text-[15px] font-semibold">Technical Expert Session</p>
                <p className="mt-3 text-[28px] font-bold tracking-tight">
                  ~$20{" "}
                  <span className="text-[13px] font-normal text-muted-foreground">
                    / 20-minute block
                  </span>
                </p>
                <p className="mt-3 text-[13px] leading-[1.6] text-muted-foreground">
                  Advanced developer, engineering, security, architecture, or infrastructure
                  guidance. For troubleshooting, diagnosis, and configuration — not full feature
                  development.
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-xl border border-hairline bg-card p-6">
              <p className="text-[14px] font-semibold">When development work is required</p>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-[13.5px] text-muted-foreground">
                <span className="rounded-lg bg-muted px-3 py-2">Live Support</span>
                <ArrowRight className="h-3.5 w-3.5" />
                <span className="rounded-lg bg-muted px-3 py-2">Technical diagnosis</span>
                <ArrowRight className="h-3.5 w-3.5" />
                <span className="rounded-lg bg-violet-soft px-3 py-2 font-medium text-violet">
                  Convert to DevWork Project
                </span>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-[14px] font-semibold">Live Support can cover</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {COVERS.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-hairline bg-card px-3 py-1.5 text-[12.5px] text-foreground/75"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Start flow */}
          <div className="rounded-2xl border border-hairline bg-card p-6 shadow-panel sm:p-7">
            {stage === "form" ? (
              <>
                <p className="text-[17px] font-semibold">Start a session</p>
                <p className="mt-1.5 text-[13px] text-muted-foreground">
                  Tell us what&apos;s happening. We&apos;ll route you to the right support level.
                </p>

                <div className="mt-5 grid grid-cols-2 gap-2">
                  {(
                    [
                      { id: "live", label: "Live Support", sub: "$20 / hour" },
                      { id: "expert", label: "Expert Session", sub: "~$20 / 20 min" },
                    ] as const
                  ).map((o) => (
                    <button
                      key={o.id}
                      onClick={() => setTier(o.id)}
                      className={
                        tier === o.id
                          ? "rounded-lg border border-violet bg-violet-soft px-4 py-3 text-left"
                          : "rounded-lg border border-hairline px-4 py-3 text-left hover:bg-muted"
                      }
                    >
                      <span className="block text-[13.5px] font-medium">{o.label}</span>
                      <span className="block text-[12px] text-muted-foreground">{o.sub}</span>
                    </button>
                  ))}
                </div>

                <label className="mt-5 block text-[13px] font-medium">What&apos;s the problem?</label>
                <textarea
                  value={issue}
                  onChange={(e) => setIssue(e.target.value.slice(0, 800))}
                  rows={5}
                  placeholder="My Shopify payment settings won't save and customers can't check out."
                  className="mt-2 w-full resize-none rounded-lg border border-input bg-background p-3 text-[14px] outline-none focus:ring-2 focus:ring-ring"
                />

                <div className="mt-4 flex items-start gap-2.5 rounded-lg bg-muted p-3.5">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-violet" />
                  <p className="text-[12.5px] leading-[1.5] text-muted-foreground">
                    You control screen-sharing and access permissions. Nothing is shared until you
                    approve it.
                  </p>
                </div>

                <Btn size="lg" className="mt-5 w-full" onClick={start}>
                  Start {tier === "live" ? "Live Support" : "Expert Session"}{" "}
                  <ArrowRight className="h-4 w-4" />
                </Btn>
              </>
            ) : stage === "routing" ? (
              <div className="py-16 text-center">
                <span className="mx-auto flex h-12 w-12 animate-pulse items-center justify-center rounded-full bg-violet-soft">
                  <MessageSquare className="h-5 w-5 text-violet" />
                </span>
                <p className="mt-5 text-[16px] font-semibold">Analyzing your request…</p>
                <p className="mt-2 text-[13px] text-muted-foreground">
                  Matching you to the right support level.
                </p>
              </div>
            ) : (
              <div>
                <p className="dw-eyebrow text-violet">Session ready</p>
                <p className="mt-3 text-[17px] font-semibold">
                  {tier === "live" ? "Live Support specialist connected" : "Technical Expert connected"}
                </p>
                <div className="mt-5 space-y-px overflow-hidden rounded-xl border border-hairline">
                  {[
                    ["Support level", tier === "live" ? "Live Support" : "Technical Expert Session"],
                    ["Billing", tier === "live" ? "$20 hour block started" : "~$20 / 20-minute block"],
                    ["Channel", "Chat + optional Dualis shared screen"],
                    ["Screen sharing", "Awaiting your permission"],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="flex items-center justify-between border-b border-hairline px-4 py-3 last:border-b-0"
                    >
                      <span className="text-[13px] text-muted-foreground">{k}</span>
                      <span className="text-[13px] font-medium">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-xl bg-muted p-4 text-[13px] leading-[1.6]">
                  <p className="font-medium">Specialist</p>
                  <p className="mt-1 text-muted-foreground">
                    “Thanks for the detail — let&apos;s start by checking your payment provider
                    settings. Share your screen when you&apos;re ready.”
                  </p>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Btn
                    size="sm"
                    variant="violet"
                    onClick={() => toast.success("Screen sharing approved for this session.")}
                  >
                    Approve screen share
                  </Btn>
                  <BtnLink to="/get-started" size="sm" variant="outline">
                    Convert to a project
                  </BtnLink>
                  <Btn size="sm" variant="ghost" onClick={() => setStage("form")}>
                    End session
                  </Btn>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="border-t border-hairline bg-canvas py-16 lg:py-20">
        <div className="dw-container">
          <SectionHeading
            eyebrow="Need ongoing coverage?"
            title="System Watch keeps eyes on your systems continuously."
            intro="Live Support solves the moment. System Watch covers your business systems over time."
          />
          <div className="mt-8 flex justify-center">
            <BtnLink to="/system-watch" size="lg">
              Explore System Watch <ArrowRight className="h-4 w-4" />
            </BtnLink>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
