import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Lock } from "lucide-react";
import { PageHero, SiteLayout } from "@/components/dw/SiteLayout";
import { BtnLink, SectionHeading } from "@/components/dw/ui";
import { EMERGING_CATEGORIES, SOLUTION_GROUPS } from "@/lib/devwork-data";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "DevWork Solutions — Technical Categories We Cover" },
      {
        name: "description",
        content:
          "Software, IT & systems, automation & AI, security, business technology, technical expertise, and engineering capacity — organized so you don't have to guess the category.",
      },
      { property: "og:title", content: "DevWork Solutions — Technical Categories We Cover" },
      {
        property: "og:description",
        content: "Organized technical categories, matched to verified provider coverage.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Solutions,
});

function Solutions() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Solutions"
        title="Technical work, organized clearly."
        intro="You don't need to pick the right category. Submit the request and DevWork classifies it. This page simply shows the kinds of work the platform covers today."
      >
        <BtnLink to="/get-started" size="lg">
          Submit a Request <ArrowRight className="h-4 w-4" />
        </BtnLink>
        <BtnLink to="/pricing" variant="outline" size="lg">
          Pricing
        </BtnLink>
      </PageHero>

      <section className="bg-background py-16 lg:py-20">
        <div className="dw-container grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SOLUTION_GROUPS.map((group) => (
            <div key={group.name} className="rounded-xl border border-hairline bg-card p-6 shadow-card">
              <p className="text-[16px] font-semibold">{group.name}</p>
              <ul className="mt-4 space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[13.5px] text-muted-foreground">
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-violet" />
                    {item}
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
            align="left"
            eyebrow="Expanding coverage"
            title="Advanced engineering categories open as coverage is verified."
            intro="These areas are part of the platform's roadmap. A category becomes available only when DevWork has verified provider coverage and appropriate expert oversight for it."
          />
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {EMERGING_CATEGORIES.map((c) => (
              <div
                key={c}
                className="flex items-center gap-3 rounded-xl border border-dashed border-border bg-card px-5 py-4"
              >
                <Lock className="h-4 w-4 shrink-0 text-muted-foreground" />
                <div>
                  <p className="text-[14px] font-medium">{c}</p>
                  <p className="text-[12px] text-muted-foreground">Coverage-dependent</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-[13px] text-muted-foreground">
            DevWork does not advertise universal coverage. If there is no qualified, verified
            provider and expert coverage for a category, it is not actively offered.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
