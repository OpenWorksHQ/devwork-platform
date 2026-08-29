import { createFileRoute } from "@tanstack/react-router";
import { Check, Lock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PageTitle } from "@/components/dw/AppShell";
import { Btn, Chip, MetaRow, Panel } from "@/components/dw/ui";
import { PROVIDER_LEVELS } from "@/lib/devwork-data";

export const Route = createFileRoute("/provider/profile")({
  component: Profile;
});

const CATEGORIES = [
  { name: "Ecommerce & payments", unlocked: true },
  { name: "Web development", unlocked: true },
  { name: "APIs & backend", unlocked: true },
  { name: "Databases", unlocked: true },
  { name: "Cloud & DevOps", unlocked: false, needs: "Assessment + 3 reviewed deliveries" },
  { name: "Security (authorized testing)", unlocked: false, needs: "Specialist standing + identity verification" },
  { name: "Enterprise capacity", unlocked: false, needs: "Enterprise Eligible standing" },
];

function Profile() {
  const currentLevel = "Verified Provider";
  const [skills, setSkills] = useState(["Shopify", "Liquid", "React", "Node.js", "Postgres"]);
  const [draft, setDraft] = useState("");

  return (
    <div>
      <PageTitle
        title="Level & skills"
        sub="DevWork controls which categories you can receive. Access expands as you demonstrate quality."
      />

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          <Panel className="p-5">
            <h2 className="text-[15.5px] font-semibold">Progression</h2>
            <div className="mt-4 space-y-2.5">
              {PROVIDER_LEVELS.map((l) => {
                const reached =
                  PROVIDER_LEVELS.indexOf(l) <= PROVIDER_LEVELS.indexOf(currentLevel as typeof l);
                return (
                  <div
                    key={l}
                    className={
                      l === currentLevel
                        ? "flex items-center justify-between rounded-lg border border-violet bg-violet-soft px-4 py-3"
                        : "flex items-center justify-between rounded-lg border border-hairline px-4 py-3"
                    }
                  >
                    <span className="text-[13.5px] font-medium">{l}</span>
                    {l === currentLevel ? (
                      <Chip tone="violet">Current</Chip>
                    ) : reached ? (
                      <Check className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                  </div>
                );
              })}
            </div>
          </Panel>

          <Panel className="p-5">
            <h2 className="text-[15.5px] font-semibold">Category access</h2>
            <div className="mt-4 space-y-2.5">
              {CATEGORIES.map((c) => (
                <div
                  key={c.name}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-hairline px-4 py-3"
                >
                  <span className="text-[13.5px]">{c.name}</span>
                  {c.unlocked ? (
                    <Chip tone="violet">Unlocked</Chip>
                  ) : (
                    <span className="text-[12px] text-muted-foreground">
                      <Lock className="mr-1 inline h-3 w-3" /> {c.needs}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel className="p-5">
            <h2 className="text-[15.5px] font-semibold">Verification</h2>
            <div className="mt-3">
              <MetaRow label="Identity" value="Verified" />
              <MetaRow label="Skills assessments" value="3 passed" />
              <MetaRow label="Reviewed deliveries" value="18" />
              <MetaRow label="Oversight status" value="Standard review" />
            </div>
            <Btn
              size="sm"
              variant="outline"
              className="mt-4 w-full"
              onClick={() => toast.success("Assessment requested", { description: "We'll email available windows." })}
            >
              Request next assessment
            </Btn>
          </Panel>

          <Panel className="p-5">
            <h2 className="text-[15.5px] font-semibold">Declared skills</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {skills.map((s) => (
                <Chip key={s}>{s}</Chip>
              ))}
            </div>
            <form
              className="mt-4 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                const v = draft.trim();
                if (v.length < 2 || skills.includes(v)) return;
                setSkills((prev) => [...prev, v]);
                setDraft("");
                toast.success("Skill added — pending verification");
              }}
            >
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value.slice(0, 40))}
                placeholder="Add a skill"
                className="h-10 flex-1 rounded-lg border border-input bg-background px-3 text-[13.5px] outline-none focus:ring-2 focus:ring-ring"
              />
              <Btn type="submit" size="sm">
                Add
              </Btn>
            </form>
            <p className="mt-3 text-[12px] leading-[1.55] text-muted-foreground">
              Declared skills are only used for routing after they&apos;re verified.
            </p>
          </Panel>
        </div>
      </div>
    </div>
  );
}
