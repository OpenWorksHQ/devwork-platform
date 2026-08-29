import { Link, useNavigate } from "@tanstack/react-router";
import { LogOut, Menu, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Avatar, BtnLink } from "@/components/dw/ui";
import { useAuth, type UserType } from "@/lib/auth";

export type NavItem = { to: string; label: string };

export function AppShell({
  nav,
  title,
  requireType,
  badge,
  children,
}: {
  nav: NavItem[];
  title: string;
  requireType: UserType;
  badge?: string;
  children: ReactNode;
}) {
  const { user, ready, signOut } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (ready && !user) navigate({ to: "/login", search: { type: requireType } });
  }, [ready, user, navigate, requireType]);

  const initials = (user?.name ?? "DW")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen bg-canvas">
      <header className="sticky top-0 z-40 border-b border-ink-border bg-ink">
        <div className="dw-container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              className="text-ink-foreground lg:hidden"
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle navigation"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <Link to="/" className="text-[17px] font-bold tracking-tight text-ink-foreground">
              Dev<span className="text-violet-bright">Work</span>
            </Link>
            <span className="hidden rounded-full border border-ink-border px-2.5 py-1 text-[11px] uppercase tracking-[0.08em] text-white/70 sm:inline-block">
              {badge ?? title}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <BtnLink to="/get-started" variant="violet" size="sm">
              New request
            </BtnLink>
            <button
              onClick={() => {
                signOut();
                navigate({ to: "/" });
              }}
              className="flex items-center gap-2 text-[13px] text-white/70 hover:text-ink-foreground"
            >
              <LogOut className="h-4 w-4" /> <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="dw-container flex gap-8 py-8">
        <aside
          className={`${open ? "block" : "hidden"} w-full shrink-0 lg:block lg:w-60`}
        >
          <div className="rounded-xl border border-hairline bg-card p-3">
            <div className="flex items-center gap-3 px-2 py-2">
              <Avatar initials={initials} />
              <div className="min-w-0">
                <p className="truncate text-[13.5px] font-medium">{user?.name ?? "Signed out"}</p>
                <p className="truncate text-[12px] text-muted-foreground">{user?.email ?? "—"}</p>
              </div>
            </div>
            <nav className="mt-2 space-y-0.5">
              {nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: item.to.split("/").length <= 2 }}
                  activeProps={{ className: "bg-violet-soft text-violet font-medium" }}
                  inactiveProps={{ className: "text-muted-foreground hover:bg-muted" }}
                  className="block rounded-lg px-3 py-2 text-[13.5px]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </aside>
        <main className={`${open ? "hidden" : "block"} min-w-0 flex-1 lg:block`}>{children}</main>
      </div>
    </div>
  );
}

export function PageTitle({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-[24px] font-bold tracking-tight sm:text-[28px]">{title}</h1>
      {sub ? <p className="mt-1.5 text-[13.5px] text-muted-foreground">{sub}</p> : null}
    </div>
  );
}
