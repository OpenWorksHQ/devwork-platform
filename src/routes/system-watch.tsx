import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Activity, RefreshCw, Users, Layers } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PageHero, SiteLayout } from "@/components/dw/SiteLayout";
import { Btn, SectionHeading } from "@/components/dw/ui";

export const Route = createFileRoute("/system-watch")({
  head: () => ({
    meta: [
      { title: "DevWork System Watch — Ongoing Technical Coverage" },
      {
        name: "description",
        content:
          "Subscribe to DevWork's managed engineering workforce for continuous attention on your websites, apps, checkouts, APIs, backends, and internal tools.",
      },
      { property: "og:title", content: "DevWork System Watch" },
      {
        property: "og:description",
        content: "Technical issues shouldn't slow your business. One continuous managed service.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SystemWatch,
});

const SYSTEMS = [
  "Websites",
  "Apps",
  "Checkouts & payments",
  "APIs & integrations",
  "Backends & databases",
  "Updates & maintenance",
  "Booking systems",
  "Internal tools",
  "Other approved systems",
];

const FLOW = [
  "Customer subscribes",
  "DevWork defines supported systems",
  "DevWork builds the appropriate internal coverage pool",
  "Qualified people rotate coverage",
  "Issues are dispatched internally",
  "Providers investigate, fix, test, and document",
  "Experts escalate or review harder issues",
  "Customer experiences one continuous managed service",
];

const MODELS = [
  { icon: Users, t: "Dedicated Coverage", b: "A reserved internal pool assigned to your systems." },
  { icon: Layers, t: "Shared Coverage", b: "Coverage shared across a managed pool with defined response expectations." },
  { icon: RefreshCw, t: "Retainer Support", b: "A recurring block of managed technical attention." },
  { icon: Activity, t: "Overflow Coverage", b: "Capacity that absorbs spikes beyond your internal team." },
];

function SystemWatch() {
  const [sent, setSent] = useState(false);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="System Watch"
        title="Technical issues shouldn't slow your business."
        intro="DevWork System Watch provides ongoing technical attention for approved business systems. You subscribe to DevWork's managed engineering workforce — not to one named developer."
      >
        <a href="#watch-inquiry">
          <Btn size="lg">
            Discuss coverage <ArrowRight className="h-4 w-4" />
          </Btn>
        </a>
      </PageHero>

      <section className="bg-ink py-16 lg:py-20">
        <div className="dw-container">
          <SectionHeading
            tone="dark"
            align="left"
            eyebrow="How coverage works"
            title="DevWork controls staffing, rotation, dispatch, supervision, and escalation."
            intro="Behind the scenes, qualified people rotate and issues are dispatched internally. In front of you, it's one continuous managed service."
          />
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-ink-border sm:grid-cols-2 lg:grid-cols-4">
            {FLOW.map((f, i) => (
              <div key={f} className="border-b border-r border-ink-border p-5 last:border-r-0">
                <span className="dw-eyebrow text-violet">Step {i + 1}</span>
                <p className="mt-3 text-[13.5px] font-medium leading-[1.5] text-white/85">{f}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {MODELS.map(({ icon: Icon, t, b }) => (
              <div key={t} className="rounded-xl border border-ink-border p-5">
                <Icon className="h-5 w-5 text-violet" strokeWidth={1.7} />
                <p className="mt-4 text-[14px] font-semibold text-white">{t}</p>
                <p className="mt-2 text-[13px] leading-[1.55] text-white/55">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-16 lg:py-20">
        <div className="dw-container">
          <SectionHeading align="left" eyebrow="Supported systems" title="What System Watch can cover." />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SYSTEMS.map((s) => (
              <div key={s} className="rounded-lg border border-hairline bg-card px-4 py-3.5 text-[13.5px] font-medium">
                {s}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="watch-inquiry" className="border-t border-hairline bg-canvas py-16 lg:py-20">
        <div className="dw-container grid gap-12 lg:grid-cols-2 lg:gap-16">
          <SectionHeading
            align="left"
            eyebrow="Coverage inquiry"
            title="Tell us which systems need attention."
            intro="Recurring pricing is scoped to your systems and coverage model. Share the details and DevWork proposes a plan."
          />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              toast.success("Coverage inquiry received", {
                description: "DevWork will propose a coverage model for your systems.",
              });
            }}
            className="rounded-2xl border border-hairline bg-card p-6 shadow-card sm:p-7"
          >
            {sent ? (
              <div className="py-10 text-center">
                <p className="text-[17px] font-semibold">Inquiry received</p>
                <p className="mx-auto mt-2 max-w-sm text-[13.5px] text-muted-foreground">
                  We&apos;ll follow up with a proposed coverage model, supported system list, and
                  escalation plan.
                </p>
                <Btn variant="outline" size="sm" className="mt-6" onClick={() => setSent(false)}>
                  Submit another
                </Btn>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-[13px] font-medium">Work email</label>
                  <input
                    required
                    type="email"
                    maxLength={160}
                    placeholder="you@company.com"
                    className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-3 text-[14px] outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="text-[13px] font-medium">Coverage model</label>
                  <select
                    required
                    defaultValue=""
                    className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-3 text-[14px] outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="" disabled>
                      Select a model
                    </option>
                    {MODELS.map((m) => (
                      <option key={m.t} value={m.t}>
                        {m.t}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[13px] font-medium">Systems to cover</label>
                  <textarea
                    required
                    rows={5}
                    maxLength={1200}
                    placeholder="Our Shopify storefront, a Node API, and an internal admin tool."
                    className="mt-2 w-full resize-none rounded-lg border border-input bg-background p-3 text-[14px] outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <Btn type="submit" size="lg" className="w-full">
                  Send inquiry
                </Btn>
              </div>
            )}
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}
