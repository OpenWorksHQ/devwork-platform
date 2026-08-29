import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/dw/SiteLayout";
import { Btn } from "@/components/dw/ui";
import { useAuth, type UserType } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>) => ({
    type:
      search['type'] === "provider"
        ? ("provider" as const)
        : search['type'] === "customer"
          ? ("customer" as const)
          : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Log in to DevWork" },
      {
        name: "description",
        content: "Log in to your DevWork customer or provider account to track requests, work, and messages.",
      },
      { property: "og:title", content: "Log in to DevWork" },
      { property: "og:description", content: "Access your DevWork customer or provider dashboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Login,
});

function Login() {
  const search = Route.useSearch();
  const [type, setType] = useState<UserType>(search.type ?? "customer");

  const [email, setEmail] = useState("");
  const { signIn } = useAuth();
  const navigate = useNavigate();

  return (
    <SiteLayout>
      <section className="bg-canvas py-16 lg:py-24">
        <div className="dw-container max-w-md">
          <div className="rounded-2xl border border-hairline bg-card p-7 shadow-panel">
            <h1 className="text-[24px] font-bold">Log in</h1>
            <p className="mt-1.5 text-[13.5px] text-muted-foreground">
              Prototype authentication — any email works.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-2">
              {(["customer", "provider"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={
                    type === t
                      ? "rounded-lg border border-violet bg-violet-soft px-4 py-2.5 text-[13.5px] font-medium capitalize"
                      : "rounded-lg border border-hairline px-4 py-2.5 text-[13.5px] font-medium capitalize hover:bg-muted"
                  }
                >
                  {t}
                </button>
              ))}
            </div>

            <form
              className="mt-5 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                const clean = email.trim();
                if (!clean || clean.length > 255 || !/^\S+@\S+\.\S+$/.test(clean)) {
                  toast.error("Enter a valid email address.");
                  return;
                }
                signIn({ name: clean.split("@")[0] ?? "You", email: clean, type });
                navigate({ to: type === "provider" ? "/provider" : "/dashboard" });
              }}
            >
              <div>
                <label className="text-[13px] font-medium">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  maxLength={255}
                  placeholder="you@company.com"
                  className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-3 text-[14px] outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="text-[13px] font-medium">Password</label>
                <input
                  type="password"
                  maxLength={128}
                  placeholder="••••••••"
                  className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-3 text-[14px] outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <Btn type="submit" size="lg" className="w-full">
                Log in <ArrowRight className="h-4 w-4" />
              </Btn>
            </form>

            <p className="mt-6 text-center text-[13px] text-muted-foreground">
              No account?{" "}
              <Link to="/signup" className="font-medium text-violet hover:underline">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
