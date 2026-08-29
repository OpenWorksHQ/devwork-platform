import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Building2, CheckCircle2, ShieldCheck, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PageHero, SiteLayout } from "@/components/dw/SiteLayout";
import { Btn, BtnLink, SectionHeading } from "@/components/dw/ui";

export const Route = createFileRoute("/enterprise")({
  head: () => ({
    meta: [
      { title: "DevWork for Enterprise — Flexible Engineering Capacity" },
      {
        name: "description",
        content:
          "Keep core teams internal. Use DevWork for temporary engineering capacity, backlogs, QA, migrations, integrations, audits, documentation, and project recovery.",
      },
      { property: "og:title", content: "DevWork for Enterprise — Flexible Engineering Capacity" },
      {
        property: "og:description",
        content: "Approved provider pools, verified specialists, and Employee Expert oversight.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Enterprise,
});

const USES = [
  "Temporary engineering capacity",
  "Bug backlogs",
  "QA",
  "Testing",
  "Maintenance",
  "Migrations",
  "Integrations",
  "Audits",
  "Documentation",
  "Specialized expertise",
  "Project recovery",
  "Overflow capacity",
];

const CONTROLS = [
  "Approved provider pools",
  "Verified specialists",
  "Employee Expert oversight",
  "Restricted access",
  "Customer-controlled permissions",
  "Confidentiality controls",
  "Defined project boundaries",
  "Escalation paths",
  "Security requirements",
];

const NEVER_OWNS = [
  "Your product",
  "Your company",
  "Your code",
  "Your accounts",
  "Your infrastructure",
  "Your intellectual property",
  "Your internal systems",
];

function Enterprise() {
  const [sent, setSent] = useState(false);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="For enterprise"
        title={
          <>
            Keep core teams internal.
            <br />
            Add capacity when you need it.
          </>
        }
        intro="Enterprise DevWork is flexible technical and engineering capacity with defined boundaries, approved provider pools, and DevWork Employee Expert oversight — not an enlarged freelancer marketplace."
      >
        <a href="#enterprise-inquiry" className="inline-flex">
          <Btn size="lg">
            Talk to DevWork <ArrowRight className="h-4 w-4" />
          </Btn>
        </a>
        <BtnLink to="/system-watch" variant="outline" size="lg">
          System Watch
        </BtnLink>
      </PageHero>

      <section className="bg-background py-16 lg:py-20">
        <div className="dw-container">
          <SectionHeading
            align="left"
            eyebrow="Where enterprises use DevWork"
            title="Capacity for the work that shouldn't wait for headcount."
          />
          <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {USES.map((u) => (
              <div key={u} className="rounded-lg border border-hairline bg-card px-4 py-3.5 text-[13.5px] font-medium">
                {u}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-16 lg:py-20">
        <div className="dw-container grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              tone="dark"
              align="left"
              eyebrow="Controls"
              title="Access is scoped, reviewed, and revocable."
            />
            <div className="mt-8 grid gap-2.5 sm:grid-cols-2">
              {CONTROLS.map((c) => (
                <div key={c} className="flex items-start gap-2.5">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-violet" strokeWidth={1.9} />
                  <p className="text-[13.5px] text-white/70">{c}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-ink-border p-7">
            <p className="dw-eyebrow text-white/50">DevWork never owns</p>
            <div className="mt-5 space-y-2.5">
              {NEVER_OWNS.map((n) => (
                <div key={n} className="flex items-center gap-2.5">
                  <XCircle className="h-4 w-4 shrink-0 text-white/35" strokeWidth={1.8} />
                  <p className="text-[13.5px] text-white/70">{n}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 border-t border-ink-border pt-5 text-[13px] leading-relaxed text-white/55">
              You determine exactly what DevWork can access, for how long, and under which
              confidentiality and security requirements.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-hairline bg-canvas py-16 lg:py-20" id="enterprise-inquiry">
        <div className="dw-container grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Enterprise inquiry"
              title="Tell us what capacity you need."
              intro="Share the scope and constraints. A DevWork Employee Expert reviews enterprise inquiries and proposes a coverage model."
            />
            <div className="mt-8 space-y-3">
              {[
                "Approved provider pool assembled for your account",
                "Employee Expert oversight on delivery and security",
                "Scoped access with clear escalation paths",
              ].map((l) => (
                <div key={l} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-violet" />
                  <p className="text-[14px] text-foreground/80">{l}</p>
                </div>
              ))}
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              toast.success("Inquiry received", {
                description: "A DevWork Employee Expert will follow up with a coverage proposal.",
              });
            }}
            className="rounded-2xl border border-hairline bg-card p-6 shadow-card sm:p-7"
          >
            {sent ? (
              <div className="py-10 text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-violet-soft">
                  <Building2 className="h-5 w-5 text-violet" />
                </span>
                <p className="mt-5 text-[17px] font-semibold">Inquiry received</p>
                <p className="mx-auto mt-2 max-w-sm text-[13.5px] text-muted-foreground">
                  We&apos;ll review the scope and respond with a proposed coverage model and
                  oversight plan.
                </p>
                <Btn variant="outline" size="sm" className="mt-6" onClick={() => setSent(false)}>
                  Submit another
                </Btn>
              </div>
            ) : (
              <div className="space-y-4">
                <Field label="Work email" placeholder="you@company.com" type="email" required />
                <Field label="Company" placeholder="Company name" required />
                <div>
                  <label className="text-[13px] font-medium">Capacity needed</label>
                  <select
                    required
                    className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-3 text-[14px] outline-none focus:ring-2 focus:ring-ring"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select a need
                    </option>
                    {USES.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[13px] font-medium">Scope and constraints</label>
                  <textarea
                    required
                    maxLength={1200}
                    rows={5}
                    placeholder="Systems involved, timeline, security requirements, and what success looks like."
                    className="mt-2 w-full resize-none rounded-lg border border-input bg-background p-3 text-[14px] outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <Btn type="submit" size="lg" className="w-full">
                  Send inquiry
                </Btn>
                <p className="text-center text-[12px] text-muted-foreground">
                  Enterprise pricing is scoped per engagement.
                </p>
              </div>
            )}
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({
  label,
  ...props
}: React.ComponentProps<"input"> & { label: string }) {
  return (
    <div>
      <label className="text-[13px] font-medium">{label}</label>
      <input
        {...props}
        maxLength={160}
        className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-3 text-[14px] outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}
