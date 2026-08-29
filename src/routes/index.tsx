import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Code2,
  Headphones,
  Lock,
  MonitorPlay,
  PenSquare,
  Play,
  Search,
  ShieldCheck,
  Users,
  Activity,
  Layers,
} from "lucide-react";
import { SiteLayout } from "@/components/dw/SiteLayout";
import { Avatar, BtnLink, Dot, Eyebrow, SectionHeading } from "@/components/dw/ui";
import { Stepper } from "@/components/dw/RequestTracker";
import { REQUESTS, SOLUTION_GROUPS } from "@/lib/devwork-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DevWork — Technical problems. Solved, not staffed." },
      {
        name: "description",
        content:
          "DevWork is a managed technical workforce and engineering capacity platform. Describe what you need done and DevWork routes, manages, and delivers the right technical expertise.",
      },
      { property: "og:title", content: "DevWork — Technical problems. Solved, not staffed." },
      {
        property: "og:description",
        content:
          "Describe what you need done. DevWork routes, manages, and delivers the right technical expertise — fast.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const TRUST = [
  { icon: ShieldCheck, lines: ["Verified experts", "& specialists"] },
  { icon: Users, lines: ["Expert oversight", "on every job"] },
  { icon: Lock, lines: ["Secure, private,", "and compliant"] },
];

const AUDIENCES = [
  {
    icon: Users,
    title: "Individuals",
    body: "Get help with tech issues, account problems, learning, and more.",
    to: "/solutions" as const,
  },
  {
    icon: Briefcase,
    title: "Businesses",
    body: "Get the technical expertise you need without full-time overhead.",
    to: "/how-it-works" as const,
  },
  {
    icon: Building2,
    title: "Enterprises",
    body: "On-demand engineering capacity, secure, scalable, and compliant.",
    to: "/enterprise" as const,
  },
];

const STEPS = [
  { icon: PenSquare, title: "1. You Submit", body: "Describe your problem or what you need built." },
  { icon: Search, title: "2. We Analyze", body: "Our system and experts determine the best fit." },
  { icon: Users, title: "3. We Assign", body: "We match the right expert, team, or specialist." },
  { icon: Code2, title: "4. Work Gets Done", body: "We manage the work with oversight and updates." },
  { icon: CheckCircle2, title: "5. You Approve", body: "Review, approve, and get ongoing support if needed." },
];

const PRODUCTS = [
  {
    icon: Headphones,
    title: "Live Support",
    body: "Immediate guided assistance over chat, call, or Dualis-powered shared screens. $20 per hour block.",
    to: "/live-support" as const,
  },
  {
    icon: Activity,
    title: "System Watch",
    body: "Ongoing technical attention for approved business systems, staffed and supervised by DevWork.",
    to: "/system-watch" as const,
  },
  {
    icon: Layers,
    title: "Enterprise Capacity",
    body: "Flexible engineering capacity for backlogs, migrations, QA, audits, and project recovery.",
    to: "/enterprise" as const,
  },
];

function Home() {
  const req = REQUESTS[0]!;

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="border-b border-hairline bg-canvas">
        <div className="dw-container grid items-start gap-12 py-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.32fr)] lg:gap-14 lg:py-20">
          <div className="lg:pt-8">
            <Eyebrow>Technical workforce &amp; engineering capacity</Eyebrow>
            <h1 className="mt-6 text-[38px] font-bold leading-[1.04] sm:text-[52px]">
              Technical problems.
              <br />
              <span className="text-violet">Solved,</span> not staffed.
            </h1>
            <p className="mt-6 max-w-md text-[16px] leading-[1.65] text-muted-foreground">
              You describe what you need done. DevWork routes, manages, and delivers the right
              technical expertise—fast.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <BtnLink to="/get-started" variant="primary" size="lg">
                Submit a Request <ArrowRight className="h-4 w-4" />
              </BtnLink>
              <BtnLink to="/how-it-works" variant="outline" size="lg">
                How It Works <Play className="h-4 w-4" />
              </BtnLink>
            </div>
            <div className="mt-11 grid gap-6 sm:grid-cols-3">
              {TRUST.map(({ icon: Icon, lines }) => (
                <div key={lines[0]} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-soft">
                    <Icon className="h-4 w-4 text-violet" strokeWidth={1.9} />
                  </span>
                  <p className="text-[13px] leading-[1.45] text-foreground/80">
                    {lines[0]}
                    <br />
                    {lines[1]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Request status panel */}
          <div className="rounded-2xl border border-hairline bg-card p-5 shadow-panel sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-[19px] font-bold leading-snug">{req.title}</h2>
                <p className="mt-1 text-[12.5px] text-muted-foreground">Request ID: {req.id}</p>
              </div>
              <span className="dw-eyebrow shrink-0 rounded-full bg-violet-soft px-2.5 py-1 text-violet">
                In Progress
              </span>
            </div>

            <div className="mt-7 overflow-x-auto pb-1">
              <div className="min-w-[520px]">
                <Stepper request={req} />
              </div>
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-hairline">
                <p className="px-4 pt-3.5 text-[13px] font-semibold">What We&apos;re Doing</p>
                <div className="px-4 pb-3.5 pt-3">
                  <p className="text-[12px] text-muted-foreground">Category</p>
                  <p className="mt-0.5 text-[13.5px] font-medium">
                    {req.category} &nbsp;/&nbsp; {req.subcategory}
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-hairline px-4 py-3">
                  <span className="text-[12.5px] text-muted-foreground">Complexity</span>
                  <span className="flex items-center gap-1.5 text-[12.5px] font-medium">
                    <Dot tone="warning" /> {req.complexity}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-hairline px-4 py-3">
                  <span className="text-[12.5px] text-muted-foreground">Risk Level</span>
                  <span className="flex items-center gap-1.5 text-[12.5px] font-medium">
                    <Dot tone="success" /> {req.risk}
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-hairline p-4">
                <p className="text-[13px] font-semibold">Assigned To</p>
                <div className="mt-3 flex items-center gap-3">
                  <Avatar initials="VS" />
                  <div>
                    <p className="text-[13px] font-medium">{req.provider.name}</p>
                    <p className="text-[12px] text-muted-foreground">{req.provider.role}</p>
                  </div>
                </div>
                <p className="mt-5 text-[12px] text-muted-foreground">Oversight</p>
                <div className="mt-2 flex items-center gap-3">
                  <Avatar initials="DW" />
                  <div>
                    <p className="text-[13px] font-medium">{req.oversight.name}</p>
                    <p className="text-[12px] text-muted-foreground">{req.oversight.role}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-hairline">
                <div className="p-4">
                  <p className="text-[13px] font-semibold">Estimated Delivery</p>
                  <div className="mt-3 flex items-start gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-muted">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                    </span>
                    <div>
                      <p className="text-[13px] font-medium">Today</p>
                      <p className="text-[12px] text-muted-foreground">By 6:00 PM</p>
                    </div>
                  </div>
                </div>
                <div className="border-t border-hairline p-4">
                  <p className="text-[13px] font-semibold">Communication</p>
                  <div className="mt-3 flex items-center">
                    {["A", "M", "J"].map((i, idx) => (
                      <Avatar
                        key={i}
                        initials={i}
                        className={cnRing(idx)}
                      />
                    ))}
                    <span className="ml-2 rounded-full bg-muted px-2 py-1 text-[11px] font-semibold text-muted-foreground">
                      +2
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <BtnLink to="/dashboard/requests/$requestId" params={{ requestId: req.id }} size="sm">
                Open request <ArrowRight className="h-3.5 w-3.5" />
              </BtnLink>
              <Link
                to="/how-it-works"
                className="text-[13px] font-medium text-violet hover:underline"
              >
                See how routing works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BLACK AUDIENCE BAND */}
      <section className="bg-background pt-14 lg:pt-16">
        <div className="dw-container">
          <div className="rounded-2xl bg-ink px-6 py-10 lg:px-12 lg:py-12">
            <h2 className="text-center text-[22px] font-bold text-white">
              Built for every kind of user
            </h2>
            <div className="mt-9 grid gap-8 md:grid-cols-3 md:gap-0">
              {AUDIENCES.map(({ icon: Icon, title, body, to }, i) => (
                <div
                  key={title}
                  className={
                    i === 0
                      ? "flex gap-5 md:pr-8"
                      : "flex gap-5 md:border-l md:border-ink-border md:px-8"
                  }
                >
                  <Icon className="h-7 w-7 shrink-0 text-violet" strokeWidth={1.6} />
                  <div>
                    <p className="text-[15px] font-semibold text-white">{title}</p>
                    <p className="mt-2 text-[13px] leading-[1.55] text-white/55">{body}</p>
                    <Link
                      to={to}
                      className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-medium text-violet hover:underline"
                    >
                      Learn more <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW DEVWORK WORKS */}
      <section className="bg-background py-16 lg:py-20">
        <div className="dw-container">
          <SectionHeading eyebrow="How DevWork works" title="From request to resolution." />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:flex lg:items-start lg:gap-0">
            {STEPS.map(({ icon: Icon, title, body }, i) => (
              <div key={title} className="flex flex-1 items-start lg:contents">
                <div className="flex flex-1 flex-col items-center px-2 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-muted">
                    <Icon className="h-6 w-6 text-foreground/80" strokeWidth={1.6} />
                  </span>
                  <p className="mt-5 text-[14px] font-semibold">{title}</p>
                  <p className="mt-2 max-w-[190px] text-[13px] leading-[1.5] text-muted-foreground">
                    {body}
                  </p>
                </div>
                {i < STEPS.length - 1 ? (
                  <span className="mt-4 hidden h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted lg:flex">
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="border-t border-hairline bg-canvas py-16 lg:py-20">
        <div className="dw-container">
          <SectionHeading
            align="left"
            eyebrow="Ways to work with DevWork"
            title="One platform, three ways to get technical work done."
            intro="Immediate help, continuous coverage, or additional engineering capacity — all managed by DevWork."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {PRODUCTS.map(({ icon: Icon, title, body, to }) => (
              <Link
                key={title}
                to={to}
                className="group rounded-xl border border-hairline bg-card p-6 shadow-card transition-colors hover:border-violet/40"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-soft">
                  <Icon className="h-5 w-5 text-violet" strokeWidth={1.8} />
                </span>
                <p className="mt-5 text-[16px] font-semibold">{title}</p>
                <p className="mt-2 text-[13.5px] leading-[1.6] text-muted-foreground">{body}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-violet">
                  Explore <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PROVIDER NETWORK + OVERSIGHT */}
      <section className="bg-background py-16 lg:py-20">
        <div className="dw-container grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Two workforce layers"
              title="Marketplace Providers execute. DevWork Experts oversee."
              intro="Independent developers, engineers, agencies, and specialists perform day-to-day execution. DevWork's internal Employee Experts own technical standards, review, escalation, and security oversight."
            />
            <div className="mt-8 space-y-3">
              {[
                "Marketplace Provider performs the work",
                "DevWork Employee Expert reviews where appropriate",
                "DevWork keeps the customer relationship and delivery standard",
              ].map((line) => (
                <div key={line} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-violet" strokeWidth={2} />
                  <p className="text-[14px] text-foreground/80">{line}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <BtnLink to="/providers" variant="outline" size="md">
                For Providers
              </BtnLink>
              <BtnLink to="/how-it-works" variant="ghost" size="md" className="text-violet">
                How routing works <ArrowRight className="h-4 w-4" />
              </BtnLink>
            </div>
          </div>

          <div className="rounded-2xl border border-hairline bg-card p-6 shadow-card">
            <p className="dw-eyebrow text-muted-foreground">Technical categories</p>
            <div className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {SOLUTION_GROUPS.slice(0, 6).map((g) => (
                <div key={g.name}>
                  <p className="text-[13.5px] font-semibold">{g.name}</p>
                  <p className="mt-1.5 text-[12.5px] leading-[1.55] text-muted-foreground">
                    {g.items.slice(0, 4).join(" · ")}
                  </p>
                </div>
              ))}
            </div>
            <Link
              to="/solutions"
              className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-violet hover:underline"
            >
              View all solutions <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECURITY / OVERSIGHT BLACK BAND */}
      <section className="bg-ink py-16 lg:py-20">
        <div className="dw-container">
          <SectionHeading
            tone="dark"
            eyebrow="Security & oversight"
            title="You decide what DevWork can access."
            intro="Customer-controlled permissions, defined project boundaries, confidentiality controls, and escalation paths. DevWork never owns your product, code, accounts, infrastructure, or intellectual property."
          />
          <div className="mt-11 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: ShieldCheck, t: "Verified providers", b: "Identity, work-history, and capability verification before category access." },
              { icon: Users, t: "Expert oversight", b: "Employee Experts review, escalate, and set technical standards." },
              { icon: Lock, t: "Controlled access", b: "You approve what systems, repos, and accounts are in scope." },
              { icon: MonitorPlay, t: "Screen-share control", b: "During Live Support you control screen-sharing and permissions." },
            ].map(({ icon: Icon, t, b }) => (
              <div key={t} className="rounded-xl border border-ink-border p-5">
                <Icon className="h-5 w-5 text-violet" strokeWidth={1.7} />
                <p className="mt-4 text-[14px] font-semibold text-white">{t}</p>
                <p className="mt-2 text-[13px] leading-[1.55] text-white/55">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-hairline bg-background py-16 lg:py-20">
        <div className="dw-container text-center">
          <h2 className="mx-auto max-w-2xl text-[30px] font-bold leading-[1.12] sm:text-[38px]">
            Describe the problem. We&apos;ll handle the rest.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
            No searching through profiles. No guessing which specialist you need. Submit a request
            and DevWork routes it to the right technical capacity.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <BtnLink to="/get-started" size="lg">
              Submit a Request <ArrowRight className="h-4 w-4" />
            </BtnLink>
            <BtnLink to="/pricing" variant="outline" size="lg">
              See pricing
            </BtnLink>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function cnRing(idx: number) {
  return idx === 0 ? "ring-2 ring-card" : "-ml-2 ring-2 ring-card";
}
