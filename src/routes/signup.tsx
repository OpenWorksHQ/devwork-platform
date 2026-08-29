import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { SiteLayout } from "@/components/dw/SiteLayout";
import { Btn } from "@/components/dw/ui";
import { useAuth, type UserType } from "@/lib/auth";

const searchSchema = z.object({
  type: z.enum(["customer", "provider"]).optional(),
});

export const Route = createFileRoute("/signup")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Create your DevWork account" },
      {
        name: "description",
        content:
          "Create a DevWork customer account to submit technical requests, or apply as a provider to receive matched work.",
      },
      { property: "og:title", content: "Create your DevWork account" },
      { property: "og:description", content: "Customer or provider — pick how you'll use DevWork." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Signup,
});

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  email: z.string().trim().email("Enter a valid email").max(255),
});

function Signup() {
  const search = Route.useSearch();
  const [type, setType] = useState<UserType>(search.type ?? "customer");
  const [form, setForm] = useState({ name: "", email: "" });
  const { signIn } = useAuth();
  const navigate = useNavigate();

  return (
    <SiteLayout>
      <section className="bg-canvas py-16 lg:py-24">
        <div className="dw-container max-w-md">
          <div className="rounded-2xl border border-hairline bg-card p-7 shadow-panel">
            <h1 className="text-[24px] font-bold">Create account</h1>
            <p className="mt-1.5 text-[13.5px] text-muted-foreground">
              Prototype account creation — no email confirmation required.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-2">
              {(
                [
                  { id: "customer", label: "Customer", sub: "Submit requests" },
                  { id: "provider", label: "Provider", sub: "Perform work" },
                ] as const
              ).map((o) => (
                <button
                  key={o.id}
                  onClick={() => setType(o.id)}
                  className={
                    type === o.id
                      ? "rounded-lg border border-violet bg-violet-soft px-4 py-3 text-left"
                      : "rounded-lg border border-hairline px-4 py-3 text-left hover:bg-muted"
                  }
                >
                  <span className="block text-[13.5px] font-medium">{o.label}</span>
                  <span className="block text-[12px] text-muted-foreground">{o.sub}</span>
                </button>
              ))}
            </div>

            <form
              className="mt-5 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                const parsed = schema.safeParse(form);
                if (!parsed.success) {
                  toast.error(parsed.error.issues[0]?.message ?? "Check your details");
                  return;
                }
                signIn({ ...parsed.data, type });
                toast.success(
                  type === "provider"
                    ? "Provider application started"
                    : "Account created",
                );
                navigate({ to: type === "provider" ? "/provider" : "/dashboard" });
              }}
            >
              <div>
                <label className="text-[13px] font-medium">Full name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value.slice(0, 80) }))}
                  placeholder="Alex Morgan"
                  className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-3 text-[14px] outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="text-[13px] font-medium">Email</label>
                <input
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value.slice(0, 255) }))}
                  type="email"
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
                {type === "provider" ? "Start provider application" : "Create account"}{" "}
                <ArrowRight className="h-4 w-4" />
              </Btn>
              {type === "provider" ? (
                <p className="text-[12px] leading-[1.5] text-muted-foreground">
                  Provider category access is unlocked after verification and assessments. DevWork
                  controls which work you can receive.
                </p>
              ) : null}
            </form>

            <p className="mt-6 text-center text-[13px] text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-violet hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
