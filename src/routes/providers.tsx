import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, ChevronRight, Lock } from "lucide-react";
import { PageHero, SiteLayout } from "@/components/dw/SiteLayout";
import { BtnLink, SectionHeading } from "@/components/dw/ui";
import { PROVIDER_LEVELS } from "@/lib/devwork-data";

export const Route = createFileRoute("/providers")({
  head: () => ({
    meta: [
      { title: "For Providers — Join the DevWork Technical Network" },
      {
        name: "description",
        content:
          "Apply to DevWork, prove your technical capability, unlock eligible categories, and receive matched work. Category access is controlled by verification and performance.",
      },
      { property: "og:title", content: "For Providers — Join the DevWork Technical Network" },
      {
        property: "og:description",
        content: "Verified providers receive matched work. DevWork controls category eligibility.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Providers,
});

const JOURNEY = [
  "Apply to DevWork",
  "Create provider profile",
  "Verify identity & background where appropriate",
  "Prove technical capabilities",
  "Unlock eligible categories",
  "Receive matching opportunities",
  "Accept or decline available work",
  "Complete work",
  "Build ratings and history",
  "Take additional assessments",
  "Unlock higher provider levels",
];

const EVALUATION = [
  "Skill tests",
  "Technical assessments",
  "Certification verification",
  "Portfolio review",
  "Identity verification",
  "Work-history verification",
  "Performance history",
];

function Providers() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="For providers"
        title="Get matched to work you're qualified for."
        intro="Marketplace Providers are independent developers, engineers, consultants, agencies, and technical teams. Providers are not automatically DevWork employees — DevWork controls which categories a provider can access based on verified qualifications."
      >
        <Link to="/signup" search={{ type: "provider" }} className={btnClass("primary", "lg")}>
          Apply as a provider <ArrowRight className="h-4 w-4" />
        </Link>
        <BtnLink to="/provider" variant="outline" size="lg">
          View provider dashboard
        </BtnLink>
      </PageHero>

      <section className="bg-background py-16 lg:py-20">
        <div className="dw-container">
          <SectionHeading align="left" eyebrow="The provider path" title="From application to matched work." />
          <div className="mt-9 grid gap-px overflow-hidden rounded-xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
            {JOURNEY.map((step, i) => (
              <div key={step} className="flex items-start gap-3 bg-card p-5">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-soft text-[11px] font-semibold text-violet">
                  {i + 1}
                </span>
                <p className="text-[13.5px] font-medium leading-[1.5]">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-hairline bg-canvas py-16 lg:py-20">
        <div className="dw-container">
          <SectionHeading
            align="left"
            eyebrow="Provider progression"
            title="Levels unlock categories — not the other way around."
          />
          <div className="mt-9 flex flex-wrap items-center gap-3">
            {PROVIDER_LEVELS.map((lvl, i) => (
              <div key={lvl} className="flex items-center gap-3">
                <span className="rounded-lg border border-hairline bg-card px-4 py-2.5 text-[13.5px] font-medium">
                  {lvl}
                </span>
                {i < PROVIDER_LEVELS.length - 1 ? (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                ) : null}
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-[16px] font-semibold">How providers are evaluated</p>
              <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {EVALUATION.map((e) => (
                  <div key={e} className="flex items-center gap-2.5 rounded-lg border border-hairline bg-card px-4 py-3">
                    <BadgeCheck className="h-4 w-4 shrink-0 text-violet" strokeWidth={1.9} />
                    <p className="text-[13.5px]">{e}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-hairline bg-card p-6">
              <div className="flex items-center gap-2.5">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <p className="text-[15px] font-semibold">This is not an open marketplace</p>
              </div>
              <ul className="mt-4 space-y-3 text-[13.5px] leading-[1.6] text-muted-foreground">
                <li>
                  Work is routed by DevWork. Providers do not bid against each other in an open
                  search directory.
                </li>
                <li>
                  Category access is gated by verification, assessments, and performance history.
                </li>
                <li>
                  DevWork may directly recruit experienced specialists and approved firms into
                  specialized pools.
                </li>
                <li>
                  DevWork Employee Experts review work and may escalate or take over sensitive
                  cases.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink py-16 lg:py-20">
        <div className="dw-container text-center">
          <h2 className="mx-auto max-w-2xl text-[30px] font-bold leading-[1.12] text-white sm:text-[36px]">
            Prove your capability. Unlock the work.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-white/60">
            Complete assessments, earn badges, and gain access to higher-level and enterprise-eligible
            opportunities.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/signup" search={{ type: "provider" }} className={btnClass("white", "lg")}>
              Apply as a provider
            </Link>
            <BtnLink to="/resources" variant="inkOutline" size="lg">
              Provider resources
            </BtnLink>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
