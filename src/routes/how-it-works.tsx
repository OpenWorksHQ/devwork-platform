import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PageHero, SiteLayout } from "@/components/dw/SiteLayout";
import { BtnLink, SectionHeading } from "@/components/dw/ui";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How DevWork Works — Request to Resolution" },
      {
        name: "description",
        content:
          "Submit a request, DevWork analyzes complexity, skills, and risk, routes it to the right provider level, oversees the work, verifies it, and delivers it for your approval.",
      },
      { property: "og:title", content: "How DevWork Works — Request to Resolution" },
      {
        property: "og:description",
        content: "You don't need to know which specialist to hire. DevWork handles the routing.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HowItWorks,
});

const FLOW = [
  { t: "Submit Request", b: "Describe the problem or the outcome you need in plain language." },
  { t: "AI + DevWork Analyze", b: "Automated analysis plus human review interpret the request." },
  { t: "Determine complexity, skills and risk", b: "The request is classified before anyone is assigned." },
  { t: "Route to appropriate provider level", b: "Work goes to a provider whose verification covers it." },
  { t: "Work begins", b: "Scope, access, and expectations are confirmed with you." },
  { t: "Expert oversight where required", b: "DevWork Employee Experts review sensitive or complex work." },
  { t: "Automated & technical verification", b: "Changes are tested and documented before hand-off." },
  { t: "Customer review", b: "You review deliverables and request revisions if needed." },
  { t: "Completion or continued support", b: "Close it out, or continue with ongoing coverage." },
];

const EXAMPLES = [
  "My checkout is broken.",
  "My app has bugs.",
  "I need a developer for one week.",
  "I need help learning code.",
  "I need security testing.",
  "I need overflow engineers this month.",
];

const ROUTING = [
  { in: "Simple, low-risk website issue", out: "Eligible marketplace provider" },
  { in: "More complex application problem", out: "Verified provider or specialist" },
  { in: "Security-sensitive issue", out: "Verified security specialist and/or Employee Expert" },
  { in: "Enterprise request", out: "Enterprise-approved provider or team + DevWork oversight" },
];

function HowItWorks() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="How it works"
        title={
          <>
            You describe the problem.
            <br />
            DevWork handles the routing.
          </>
        }
        intro="You don't need to search hundreds of freelancer profiles and guess who to hire. Describe what you need and DevWork determines the required skills, complexity, and risk — then assigns the right technical capacity."
      >
        <BtnLink to="/get-started" size="lg">
          Submit a Request <ArrowRight className="h-4 w-4" />
        </BtnLink>
        <BtnLink to="/solutions" variant="outline" size="lg">
          Browse solutions
        </BtnLink>
      </PageHero>

      <section className="bg-background py-16 lg:py-20">
        <div className="dw-container">
          <SectionHeading align="left" eyebrow="The process" title="Nine steps, fully managed." />
          <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
            {FLOW.map((s, i) => (
              <div key={s.t} className="bg-card p-6">
                <span className="dw-eyebrow text-violet">Step {i + 1}</span>
                <p className="mt-3 text-[15px] font-semibold">{s.t}</p>
                <p className="mt-2 text-[13.5px] leading-[1.6] text-muted-foreground">{s.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-hairline bg-canvas py-16 lg:py-20">
        <div className="dw-container grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              align="left"
              eyebrow="What you can ask for"
              title="Requests can be broken things, new things, or extra capacity."
            />
            <ul className="mt-8 space-y-2.5">
              {EXAMPLES.map((e) => (
                <li
                  key={e}
                  className="rounded-lg border border-hairline bg-card px-4 py-3 text-[14px]"
                >
                  “{e}”
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading
              align="left"
              eyebrow="Routing logic"
              title="Requests are matched to a provider level, not to a search result."
            />
            <div className="mt-8 space-y-3">
              {ROUTING.map((r) => (
                <div key={r.in} className="rounded-xl border border-hairline bg-card p-5">
                  <p className="text-[14px] font-semibold">{r.in}</p>
                  <p className="mt-2 flex items-start gap-2 text-[13.5px] text-muted-foreground">
                    <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet" />
                    {r.out}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink py-16 lg:py-20">
        <div className="dw-container">
          <SectionHeading
            tone="dark"
            eyebrow="Accountability"
            title="AI assists. Humans remain responsible."
            intro="Automation helps with analysis, routing, and internal execution. Technical judgment, oversight, and accountability stay with verified people."
          />
          <div className="mx-auto mt-10 grid max-w-3xl gap-3">
            {[
              "Marketplace Providers execute the work.",
              "DevWork Employee Experts set standards, review, and escalate.",
              "DevWork owns the customer relationship and the delivery standard.",
            ].map((l) => (
              <div
                key={l}
                className="flex items-start gap-3 rounded-xl border border-ink-border p-4"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-violet" />
                <p className="text-[14px] text-white/75">{l}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <BtnLink to="/get-started" variant="white" size="lg">
              Start a request <ArrowRight className="h-4 w-4" />
            </BtnLink>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
