import { createFileRoute } from "@tanstack/react-router";
import { Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PageTitle } from "@/components/dw/AppShell";
import { Avatar, Btn, Panel } from "@/components/dw/ui";
import { MESSAGES } from "@/lib/devwork-data";

export const Route = createFileRoute("/dashboard/messages")({
  component: Messages,
});

function Messages() {
  const [activeId, setActiveId] = useState(MESSAGES[0]!.id);
  const [thread, setThread] = useState<Record<string, { from: string; body: string; at: string }[]>>(
    Object.fromEntries(
      MESSAGES.map((m) => [m.id, [{ from: m.from, body: m.preview, at: m.at }]]),
    ),
  );
  const [draft, setDraft] = useState("");
  const active = MESSAGES.find((m) => m.id === activeId)!;

  return (
    <div>
      <PageTitle title="Messages" sub="Talk to your DevWork team and assigned providers." />
      <div className="grid gap-5 lg:grid-cols-[300px_1fr]">
        <Panel className="p-2.5">
          {MESSAGES.map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveId(m.id)}
              className={
                m.id === activeId
                  ? "block w-full rounded-lg bg-violet-soft px-3.5 py-3 text-left"
                  : "block w-full rounded-lg px-3.5 py-3 text-left hover:bg-muted"
              }
            >
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-[13.5px] font-medium">{m.from}</span>
                <span className="shrink-0 text-[11px] text-muted-foreground">{m.at}</span>
              </div>
              <p className="mt-1 line-clamp-1 text-[12.5px] text-muted-foreground">{m.preview}</p>
            </button>
          ))}
        </Panel>

        <Panel className="flex min-h-[440px] flex-col p-5">
          <div className="flex items-center gap-3 border-b border-hairline pb-4">
            <Avatar
              initials={active.from
                .split(" ")
                .map((p) => p[0])
                .slice(0, 2)
                .join("")}
            />
            <div>
              <p className="text-[14px] font-medium">{active.from}</p>
              <p className="text-[12px] text-muted-foreground">{active.role}</p>
            </div>
          </div>

          <div className="flex-1 space-y-4 py-5">
            {(thread[activeId] ?? []).map((t, i) => (
              <div key={i} className={t.from === "You" ? "text-right" : ""}>
                <p className="text-[12px] text-muted-foreground">
                  {t.from} · {t.at}
                </p>
                <p
                  className={
                    t.from === "You"
                      ? "mt-1.5 inline-block max-w-[85%] rounded-xl bg-ink px-4 py-2.5 text-left text-[13.5px] text-ink-foreground"
                      : "mt-1.5 inline-block max-w-[85%] rounded-xl bg-muted px-4 py-2.5 text-[13.5px]"
                  }
                >
                  {t.body}
                </p>
              </div>
            ))}
          </div>

          <form
            className="flex gap-2 border-t border-hairline pt-4"
            onSubmit={(e) => {
              e.preventDefault();
              const body = draft.trim();
              if (body.length < 2) return;
              setThread((prev) => ({
                ...prev,
                [activeId]: [...(prev[activeId] ?? []), { from: "You", body, at: "Just now" }],
              }));
              setDraft("");
              toast.success("Message sent");
            }}
          >
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value.slice(0, 1000))}
              placeholder="Write a message…"
              className="h-11 flex-1 rounded-lg border border-input bg-background px-3 text-[13.5px] outline-none focus:ring-2 focus:ring-ring"
            />
            <Btn type="submit" size="md">
              <Send className="h-4 w-4" /> Send
            </Btn>
          </form>
        </Panel>
      </div>
    </div>
  );
}
