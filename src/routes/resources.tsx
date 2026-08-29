import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, FileText, LifeBuoy, ShieldCheck, Users, Activity } from "lucide-react";
import { PageHero, SiteLayout } from "@/components/dw/SiteLayout";
import { SectionHeading } from "@/components/dw/ui";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "DevWork Resources — Help Center, Guides & Trust" },
      {
        name: "description",
        content:
          "Help Center, guides, technical articles, customer and provider resources, security and trust information, System Watch and enterprise documentation.",
      },
      { property: "og:title", content: "DevWork Resources" },
      {
        property: "og:description",
        content: "Guides, help articles, and trust documentation for customers and providers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Resources,
});

const SECTIONS = [
  {
    icon: LifeBuoy,
    title: "Help Center",
    body: "Account setup, submitting requests, approvals, billing, and revisions.",
    items: ["How request routing works", "Approving deliverables", "Billing and hour blocks"],
  },
  {
    icon: BookOpen,
    title: "Guides",
    body: "Practical walkthroughs for getting the most out of DevWork.",
    items: ["Writing a clear request", "Choosing urgency", "Scoping a migration"],
  },
  {
    icon: FileText,
    title: "Technical articles",
    body: "Short technical write-ups from DevWork Experts and verified specialists.",
    items: ["Debugging checkout failures", "Reducing crash rates", "Safer access scoping"],
  },
  {
    icon: Users,
    title: "Provider resources",
    body: "Assessments, badges, level progression, and delivery standards.",
    items: ["Assessment overview", "Provider levels explained", "Delivery standards"],
  },
  {
    icon: ShieldCheck,
    title: "Security & Trust",
    body: "Access control, confidentiality, authorized testing, and oversight.",
    items: ["Permission model", "Authorized testing policy", "Escalation paths"],
  },
  {
    icon: Activity,
    title: "System Watch & Enterprise",
    body: "Coverage models, supported systems, and enterprise engagement structure.",
    items: ["Coverage models", "Supported systems", "Enterprise onboarding"],
  },
];

function Resources() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Resources"
        title="Documentation, guides, and trust information."
        intro="Reference material for customers and providers. Content below is illustrative for this prototype."
      />

      <section className="bg-background py-16 lg:py-20">
        <div className="dw-container grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SECTIONS.map(({ icon: Icon, title, body, items }) => (
            <div key={title} className="rounded-xl border border-hairline bg-card p-6 shadow-card">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-soft">
                <Icon className="h-5 w-5 text-violet" strokeWidth={1.8} />
              </span>
              <p className="mt-5 text-[16px] font-semibold">{title}</p>
              <p className="mt-2 text-[13.5px] leading-[1.6] text-muted-foreground">{body}</p>
              <ul className="mt-4 space-y-2 border-t border-hairline pt-4">
                {items.map((i) => (
                  <li key={i}>
                    <span className="flex items-center justify-between gap-3 text-[13.5px] text-foreground/80">
                      {i}
                      <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-hairline bg-canvas py-16 lg:py-20">
        <div className="dw-container">
          <SectionHeading
            eyebrow="Still need help?"
            title="Talk to a person instead."
            intro="Live Support connects you to guided technical assistance in minutes."
          />
          <div className="mt-8 flex justify-center">
            <Link
              to="/live-support"
              className="inline-flex items-center gap-2 rounded-lg bg-ink px-6 py-3 text-[15px] font-medium text-ink-foreground hover:bg-ink/90"
            >
              Start Live Support <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
