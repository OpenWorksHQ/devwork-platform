import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { PageHero, SiteLayout } from "@/components/dw/SiteLayout";
import { BtnLink, SectionHeading } from "@/components/dw/ui";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "DevWork Pricing — Live Support, Sessions, Projects, Enterprise" },
      {
        name: "description",
        content:
          "Live Support is $20 per hour block. Technical Expert Sessions are about $20 per 20-minute block. Project work is scoped based on request. Enterprise is custom.",
      },
      { property: "og:title", content: "DevWork Pricing" },
      {
        property: "og:description",
        content: "Clear pricing where it's defined, scoped pricing where it should be.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Pricing,
});

const PLANS = [
  {
    name: "Live Support",
    price: "$20",
    unit: "/ hour block",
    body: "Immediate guided technical assistance over chat, call, or shared screen.",
    points: [
      "First hour is $20 whether it takes 5, 20, or 55 minutes",
      "Past 60 minutes, another $20 block begins",
      "Device, software, website, ecommerce, and payment help",
      "Customer controls screen-sharing permissions",
    ],
    cta: { label: "Start Live Support", to: "/live-support" as const },
    featured: false,
  },
  {
    name: "Technical Expert Session",
    price: "~$20",
    unit: "/ 20-minute block",
    body: "Advanced guidance from developer, engineering, security, architecture, or infrastructure specialists.",
    points: [
      "Troubleshooting, diagnosis, explanation, configuration guidance",
      "Not intended for substantial feature development",
      "Escalates into a DevWork Project when build work is required",
      "Dualis-powered shared screens available",
    ],
    cta: { label: "Book a session", to: "/live-support" as const },
    featured: true,
  },
  {
    name: "Projects",
    price: "Scoped",
    unit: "based on request",
    body: "Development, fixes, migrations, audits, and builds are priced after analysis.",
    points: [
      "Submit a request and receive a scoped next step",
      "Complexity, skills, and risk determine provider level",
      "Employee Expert oversight where appropriate",
      "Verification before delivery",
    ],
    cta: { label: "Submit a Request", to: "/get-started" as const },
    featured: false,
  },
];

function Pricing() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Pricing"
        title="Fixed where it makes sense. Scoped where it should be."
        intro="DevWork does not pretend every technical request has a fixed price. Live Support and Expert Sessions are priced per block. Project and enterprise work is scoped from the request."
      />

      <section className="bg-background py-16 lg:py-20">
        <div className="dw-container grid gap-5 lg:grid-cols-3">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={
                p.featured
                  ? "rounded-2xl border border-violet/30 bg-card p-7 shadow-panel"
                  : "rounded-2xl border border-hairline bg-card p-7 shadow-card"
              }
            >
              <div className="flex items-center justify-between">
                <p className="text-[15px] font-semibold">{p.name}</p>
                {p.featured ? (
                  <span className="dw-eyebrow rounded-full bg-violet-soft px-2.5 py-1 text-violet">
                    Specialist
                  </span>
                ) : null}
              </div>
              <div className="mt-5 flex items-baseline gap-2">
                <span className="text-[34px] font-bold tracking-tight">{p.price}</span>
                <span className="text-[13px] text-muted-foreground">{p.unit}</span>
              </div>
              <p className="mt-3 text-[13.5px] leading-[1.6] text-muted-foreground">{p.body}</p>
              <ul className="mt-6 space-y-2.5">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2.5 text-[13.5px] text-foreground/80">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-violet" strokeWidth={2.2} />
                    {pt}
                  </li>
                ))}
              </ul>
              <BtnLink
                to={p.cta.to}
                variant={p.featured ? "violet" : "primary"}
                size="md"
                className="mt-7 w-full"
              >
                {p.cta.label}
              </BtnLink>
            </div>
          ))}
        </div>

        <div className="dw-container mt-5 grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-hairline bg-canvas p-7">
            <p className="text-[15px] font-semibold">System Watch</p>
            <p className="mt-2 text-[13.5px] leading-[1.6] text-muted-foreground">
              Ongoing technical attention for approved business systems. Recurring pricing is
              scoped to your systems and coverage model for now.
            </p>
            <BtnLink to="/system-watch" variant="outline" size="md" className="mt-5">
              Discuss coverage <ArrowRight className="h-4 w-4" />
            </BtnLink>
          </div>
          <div className="rounded-2xl border border-hairline bg-canvas p-7">
            <p className="text-[15px] font-semibold">Enterprise</p>
            <p className="mt-2 text-[13.5px] leading-[1.6] text-muted-foreground">
              Custom. Approved provider pools, Employee Expert oversight, security requirements, and
              engagement boundaries are defined per account.
            </p>
            <BtnLink to="/enterprise" variant="outline" size="md" className="mt-5">
              Enterprise inquiry <ArrowRight className="h-4 w-4" />
            </BtnLink>
          </div>
        </div>
      </section>

      <section className="border-t border-hairline bg-canvas py-16 lg:py-20">
        <div className="dw-container">
          <SectionHeading
            eyebrow="Good to know"
            title="How pricing is determined."
            intro="Every request is analyzed before pricing. Complexity, required skills, risk classification, urgency, and required provider level all affect scope."
          />
        </div>
      </section>
    </SiteLayout>
  );
}
