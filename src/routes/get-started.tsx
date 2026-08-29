import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2, Paperclip, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/dw/SiteLayout";
import { Btn, Dot } from "@/components/dw/ui";
import { SOLUTION_GROUPS } from "@/lib/devwork-data";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/get-started")({
  head: () => ({
    meta: [
      { title: "Submit a Request — DevWork" },
      {
        name: "description",
        content:
          "Describe what you need done. DevWork analyzes complexity, skills, and risk, then routes your request to the right technical provider level.",
      },
      { property: "og:title", content: "Submit a Request — DevWork" },
      {
        property: "og:description",
        content: "You don't need to know the technical category. Describe the problem.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GetStarted,
});

const PLACEHOLDERS = [
  "My checkout stopped working.",
  "I need someone to review my API.",
  "We need two engineers for a migration.",
  "I need help configuring my computer.",
];

const NEEDS = [
  "Something is broken",
  "I'm building something",
  "I need guidance",
  "I need temporary technical capacity",
];

const URGENCY = ["Standard", "Priority", "Urgent"] as const;
const FOR = ["Just me", "My business", "An organization / enterprise"] as const;

type Analysis = {
  category: string;
  complexity: "Low" | "Medium" | "High";
  risk: "Low" | "Medium" | "Elevated";
  providerLevel: string;
  nextStep: string;
  skills: string[];
};

function analyze(text: string, need: string, urgency: string, who: string): Analysis {
  const t = text.toLowerCase();
  const security = /security|pentest|penetration|vulnerab|breach|hack/.test(t);
  const ecom = /checkout|shopify|payment|stripe|store|cart/.test(t);
  const mobile = /app|ios|android|crash/.test(t);
  const capacity = /engineer|capacity|overflow|team|migration|backlog/.test(t) || need.includes("capacity");
  const learn = /learn|teach|mentor|understand|explain/.test(t) || need.includes("guidance");

  if (security)
    return {
      category: "Security / Authorized assessment",
      complexity: "High",
      risk: "Elevated",
      providerLevel: "Verified security specialist + DevWork Employee Expert oversight",
      nextStep: "Scope and written authorization review before any testing begins.",
      skills: ["Application security", "Authorized testing", "Reporting"],
    };
  if (ecom)
    return {
      category: "Ecommerce / Checkout",
      complexity: "Medium",
      risk: "Low",
      providerLevel: "Verified Provider (ecommerce & payments)",
      nextStep: "Provider assignment and reproduction of the failing checkout.",
      skills: ["Shopify", "Payments", "Frontend debugging"],
    };
  if (capacity && who.includes("organization"))
    return {
      category: "Engineering Capacity / Enterprise",
      complexity: "High",
      risk: "Medium",
      providerLevel: "Enterprise Eligible provider or approved team + oversight",
      nextStep: "Capacity plan and access scoping with a DevWork Employee Expert.",
      skills: ["Backend", "Cloud", "Migration"],
    };
  if (capacity)
    return {
      category: "Engineering Capacity / Temporary engineers",
      complexity: "Medium",
      risk: "Low",
      providerLevel: "Rated or Verified Provider",
      nextStep: "Availability match and start date confirmation.",
      skills: ["Full-stack", "Code review", "Delivery"],
    };
  if (mobile)
    return {
      category: "Software & Development / Mobile apps",
      complexity: "High",
      risk: "Medium",
      providerLevel: "Specialist Provider",
      nextStep: "Diagnostic pass on crash reports and affected devices.",
      skills: ["Mobile", "Crash analytics", "QA"],
    };
  if (learn)
    return {
      category: "Technical Expertise / Guidance",
      complexity: "Low",
      risk: "Low",
      providerLevel: "Technical Expert Session",
      nextStep: "Book a 20-minute expert session at ~$20 per block.",
      skills: ["Mentorship", "Explanation"],
    };
  return {
      category: "IT & Systems / General technical support",
      complexity: urgency === "Urgent" ? "Medium" : "Low",
      risk: "Low",
      providerLevel: "Eligible marketplace provider",
      nextStep: "Live Support triage, then assignment if project work is needed.",
      skills: ["Troubleshooting", "Configuration"],
  };
}

function GetStarted() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [need, setNeed] = useState<string>(NEEDS[0]!);
  const [urgency, setUrgency] = useState<string>(URGENCY[0]);
  const [who, setWho] = useState<string>(FOR[0]);
  const [files, setFiles] = useState<string[]>([]);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);

  const total = 5;

  const next = () => {
    if (step === 1 && desc.trim().length < 10) {
      toast.error("Add a little more detail about what you need.");
      return;
    }
    if (step === 3) {
      setStep(4);
      window.setTimeout(() => {
        setAnalysis(analyze(desc, need, urgency, who));
      }, 1800);
      return;
    }
    setStep((s) => Math.min(total, s + 1));
  };

  return (
    <SiteLayout>
      <section className="bg-canvas py-14 lg:py-20">
        <div className="dw-container max-w-3xl">
          <p className="dw-eyebrow text-muted-foreground">Submit a request</p>
          <h1 className="mt-4 text-[30px] font-bold leading-[1.1] sm:text-[38px]">
            Tell us what you need. We&apos;ll route it.
          </h1>

          <div className="mt-8 flex items-center gap-2">
            {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
              <div
                key={n}
                className={
                  n <= step ? "h-1 flex-1 rounded-full bg-violet" : "h-1 flex-1 rounded-full bg-border"
                }
              />
            ))}
          </div>
          <p className="mt-3 text-[12.5px] text-muted-foreground">
            Step {step} of {total}
          </p>

          <div className="mt-6 rounded-2xl border border-hairline bg-card p-6 shadow-panel sm:p-8">
            {step === 1 ? (
              <div>
                <h2 className="text-[19px] font-semibold">What do you need help with?</h2>
                <p className="mt-1.5 text-[13.5px] text-muted-foreground">
                  Plain language is fine. You don&apos;t need to know the technical category.
                </p>
                <textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value.slice(0, 2000))}
                  rows={6}
                  placeholder={PLACEHOLDERS[0]}
                  className="mt-5 w-full resize-none rounded-xl border border-input bg-background p-4 text-[15px] outline-none focus:ring-2 focus:ring-ring"
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  {PLACEHOLDERS.map((p) => (
                    <button
                      key={p}
                      onClick={() => setDesc(p)}
                      className="rounded-full border border-hairline px-3 py-1.5 text-[12.5px] text-muted-foreground hover:bg-muted"
                    >
                      “{p}”
                    </button>
                  ))}
                </div>
                <div className="mt-6">
                  <label className="text-[13px] font-medium">
                    Category <span className="text-muted-foreground">(optional)</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-3 text-[14px] outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Let DevWork decide</option>
                    {SOLUTION_GROUPS.map((g) => (
                      <option key={g.name} value={g.name}>
                        {g.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ) : null}

            {step === 2 ? (
              <div className="space-y-7">
                <div>
                  <h2 className="text-[19px] font-semibold">A few scope questions</h2>
                  <p className="mt-1.5 text-[13.5px] text-muted-foreground">
                    This helps DevWork classify complexity and risk.
                  </p>
                </div>
                <Choice label="What kind of need is this?" options={NEEDS} value={need} onChange={setNeed} />
                <Choice
                  label="How urgent is this?"
                  options={[...URGENCY]}
                  value={urgency}
                  onChange={setUrgency}
                />
                <Choice label="Is this for you or an organization?" options={[...FOR]} value={who} onChange={setWho} />
              </div>
            ) : null}

            {step === 3 ? (
              <div>
                <h2 className="text-[19px] font-semibold">Attachments</h2>
                <p className="mt-1.5 text-[13.5px] text-muted-foreground">
                  Screenshots, logs, specs, or anything else that helps. Optional.
                </p>
                <label className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-border bg-canvas px-6 py-10 text-center">
                  <Paperclip className="h-5 w-5 text-muted-foreground" />
                  <span className="mt-3 text-[13.5px] font-medium">Choose files</span>
                  <span className="mt-1 text-[12px] text-muted-foreground">
                    Prototype upload — files stay in your browser
                  </span>
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(e) =>
                      setFiles((prev) => [
                        ...prev,
                        ...Array.from(e.target.files ?? []).map((f) => f.name),
                      ])
                    }
                  />
                </label>
                {files.length ? (
                  <ul className="mt-4 space-y-2">
                    {files.map((f, i) => (
                      <li
                        key={`${f}-${i}`}
                        className="flex items-center justify-between rounded-lg border border-hairline px-4 py-2.5 text-[13px]"
                      >
                        {f}
                        <button
                          onClick={() => setFiles((prev) => prev.filter((_, idx) => idx !== i))}
                          aria-label={`Remove ${f}`}
                        >
                          <X className="h-3.5 w-3.5 text-muted-foreground" />
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ) : null}

            {step === 4 ? (
              analysis ? (
                <div>
                  <span className="dw-eyebrow inline-flex items-center gap-2 rounded-full bg-violet-soft px-3 py-1.5 text-violet">
                    <Sparkles className="h-3.5 w-3.5" /> Analysis complete
                  </span>
                  <h2 className="mt-5 text-[19px] font-semibold">Here&apos;s how we&apos;d route this</h2>
                  <div className="mt-5 overflow-hidden rounded-xl border border-hairline">
                    {[
                      ["Recommended category", analysis.category],
                      ["Skills identified", analysis.skills.join(", ")],
                      ["Complexity", analysis.complexity],
                      ["Risk level", analysis.risk],
                      ["Recommended provider level", analysis.providerLevel],
                      ["Urgency", urgency],
                    ].map(([k, v]) => (
                      <div
                        key={k}
                        className="flex flex-col gap-1 border-b border-hairline px-4 py-3 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <span className="text-[13px] text-muted-foreground">{k}</span>
                        <span className="flex items-center gap-2 text-[13.5px] font-medium">
                          {k === "Risk level" ? (
                            <Dot tone={v === "Elevated" ? "danger" : v === "Medium" ? "warning" : "success"} />
                          ) : null}
                          {v}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 rounded-xl bg-muted p-4">
                    <p className="text-[13px] font-medium">Estimated next step</p>
                    <p className="mt-1 text-[13px] text-muted-foreground">{analysis.nextStep}</p>
                  </div>
                </div>
              ) : (
                <div className="py-16 text-center">
                  <Loader2 className="mx-auto h-6 w-6 animate-spin text-violet" />
                  <p className="mt-5 text-[16px] font-semibold">Analyzing your request…</p>
                  <p className="mt-2 text-[13px] text-muted-foreground">
                    Determining category, complexity, risk, and required provider level.
                  </p>
                </div>
              )
            ) : null}

            {step === 5 ? (
              <div>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-soft">
                  <CheckCircle2 className="h-5 w-5 text-violet" />
                </span>
                <h2 className="mt-5 text-[19px] font-semibold">Create the project</h2>
                <p className="mt-1.5 text-[13.5px] text-muted-foreground">
                  Confirm and DevWork assigns the work. Payment is collected after scope is agreed —
                  no charge in this prototype.
                </p>
                <div className="mt-5 space-y-3">
                  <div className="rounded-xl border border-hairline p-4">
                    <p className="text-[13px] font-medium">Request summary</p>
                    <p className="mt-1.5 text-[13px] text-muted-foreground">“{desc}”</p>
                  </div>
                  <div className="rounded-xl border border-hairline p-4 text-[13px]">
                    <p className="font-medium">Account</p>
                    <p className="mt-1 text-muted-foreground">
                      {user ? `${user.email} (${user.type})` : "You'll be signed in as a customer on submit."}
                    </p>
                  </div>
                </div>
                <Btn
                  size="lg"
                  className="mt-6 w-full"
                  onClick={() => {
                    toast.success("Request submitted", {
                      description: "DW-7842 created. Routing to a qualified provider.",
                    });
                    navigate({ to: "/dashboard" });
                  }}
                >
                  Submit request & open dashboard <ArrowRight className="h-4 w-4" />
                </Btn>
              </div>
            ) : null}

            {step !== 5 ? (
              <div className="mt-8 flex items-center justify-between gap-3 border-t border-hairline pt-6">
                <Btn
                  variant="ghost"
                  size="md"
                  onClick={() => setStep((s) => Math.max(1, s - 1))}
                  disabled={step === 1}
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </Btn>
                <Btn size="md" onClick={next} disabled={step === 4 && !analysis}>
                  {step === 4 ? "Continue" : "Next"} <ArrowRight className="h-4 w-4" />
                </Btn>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Choice({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <p className="text-[13px] font-medium">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={
              value === o
                ? "rounded-lg border border-violet bg-violet-soft px-4 py-2.5 text-[13.5px] font-medium"
                : "rounded-lg border border-hairline px-4 py-2.5 text-[13.5px] hover:bg-muted"
            }
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
