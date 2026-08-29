import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { BtnLink } from "./ui";
import { useAuth } from "@/lib/auth";

const NAV = [
  { to: "/how-it-works", label: "How It Works" },
  { to: "/solutions", label: "Solutions" },
  { to: "/enterprise", label: "For Enterprise" },
  { to: "/providers", label: "For Providers" },
  { to: "/pricing", label: "Pricing" },
  { to: "/resources", label: "Resources" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const dashboard = user?.type === "provider" ? "/provider" : "/dashboard";

  return (
    <header className="sticky top-0 z-50 bg-ink">
      <div className="dw-container flex h-16 items-center justify-between">
        <Link to="/" className="text-[19px] font-bold tracking-tight text-white">
          DevWork
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-[13.5px] text-white/70 transition-colors hover:text-white"
              activeProps={{ className: "text-white" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {user ? (
            <BtnLink to={dashboard} variant="white" size="sm">
              Dashboard
            </BtnLink>
          ) : (
            <>
              <Link to="/login" search={{ type: undefined }} className={btnClass("inkOutline", "sm")}>
                Log in
              </BtnLink>
              <BtnLink to="/get-started" variant="white" size="sm">
                Get Started
              </BtnLink>
            </>
          )}
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-white lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-ink-border bg-ink lg:hidden">
          <div className="dw-container flex flex-col gap-1 py-4">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2.5 text-sm text-white/80 hover:bg-white/5"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Link to="/login" search={{ type: undefined }} className={btnClass("inkOutline", "sm")} onClick={() => setOpen(false)}>
                Log in
              </BtnLink>
              <BtnLink to="/get-started" variant="white" size="sm" onClick={() => setOpen(false)}>
                Get Started
              </BtnLink>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

const FOOTER = [
  {
    title: "Platform",
    links: [
      { to: "/how-it-works", label: "How It Works" },
      { to: "/solutions", label: "Solutions" },
      { to: "/live-support", label: "Live Support" },
      { to: "/system-watch", label: "System Watch" },
    ],
  },
  {
    title: "Customers",
    links: [
      { to: "/get-started", label: "Submit a Request" },
      { to: "/pricing", label: "Pricing" },
      { to: "/enterprise", label: "For Enterprise" },
      { to: "/dashboard", label: "Customer Dashboard" },
    ],
  },
  {
    title: "Providers",
    links: [
      { to: "/providers", label: "Become a Provider" },
      { to: "/provider", label: "Provider Dashboard" },
      { to: "/resources", label: "Provider Resources" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/resources", label: "Help Center" },
      { to: "/resources", label: "Security & Trust" },
      { to: "/login", label: "Log in" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline bg-canvas">
      <div className="dw-container py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <p className="text-[18px] font-bold tracking-tight">DevWork</p>
            <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-muted-foreground">
              A managed technical workforce and engineering capacity platform. You describe the
              outcome — DevWork routes, manages, and delivers the right expertise.
            </p>
          </div>
          {FOOTER.map((col) => (
            <div key={col.title}>
              <p className="text-[13px] font-semibold">{col.title}</p>
              <ul className="mt-3 space-y-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-hairline pt-6 text-[12px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} DevWork. All rights reserved.</p>
          <p>Availability of technical categories depends on verified provider and expert coverage.</p>
        </div>
      </div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-hairline bg-background">
      <div className="dw-container py-16 lg:py-20">
        <p className="dw-eyebrow text-muted-foreground">{eyebrow}</p>
        <h1 className="mt-5 max-w-3xl text-[34px] font-bold leading-[1.08] sm:text-[46px]">
          {title}
        </h1>
        {intro ? (
          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-muted-foreground">{intro}</p>
        ) : null}
        {children ? <div className="mt-8 flex flex-wrap gap-3">{children}</div> : null}
      </div>
    </section>
  );
}
