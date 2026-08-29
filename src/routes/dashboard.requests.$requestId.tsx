import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Download, Paperclip, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { StatusChip, Stepper } from "@/components/dw/RequestTracker";
import { Avatar, Btn, Chip, Dot, MetaRow, Panel } from "@/components/dw/ui";
import { REQUESTS } from "@/lib/devwork-data";

export const Route = createFileRoute("/dashboard/requests/$requestId")({
  loader: ({ params }) => {
    const request = REQUESTS.find((r) => r.id === params.requestId);
    if (!request) throw notFound();
    return { request };
  },
  component: RequestDetail,
  errorComponent: DetailError,
  notFoundComponent: DetailNotFound,
});

function RequestDetail() {
  const { request } = Route.useLoaderData();
  const [messages, setMessages] = useState(request.updates);
  const [draft, setDraft] = useState("");

  return (
    <div>
      <Link
        to="/dashboard/requests"
        className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> All requests
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[12.5px] font-medium text-muted-foreground">{request.id}</p>
          <h1 className="mt-1.5 text-[23px] font-bold leading-[1.2] sm:text-[27px]">
            {request.title}
          </h1>
          <p className="mt-2 text-[13px] text-muted-foreground">Submitted {request.submitted}</p>
        </div>
        <StatusChip status={request.status} />
      </div>

      <Panel className="mt-6 p-5">
        <Stepper request={request} />
      </Panel>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          <Panel className="p-5">
            <h2 className="text-[15.5px] font-semibold">What&apos;s happening now</h2>
            <p className="mt-2 text-[13.5px] leading-[1.6] text-muted-foreground">{request.doing}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {request.skills.map((s) => (
                <Chip key={s}>{s}</Chip>
              ))}
            </div>
          </Panel>

          <Panel className="p-5">
            <h2 className="text-[15.5px] font-semibold">Updates & messages</h2>
            <div className="mt-4 space-y-4">
              {messages.map((u, i) => (
                <div key={`${u.at}-${i}`} className="flex gap-3">
                  <Avatar
                    initials={u.author
                      .split(" ")
                      .map((p) => p[0])
                      .slice(0, 2)
                      .join("")}
                  />
                  <div className="min-w-0">
                    <p className="text-[13.5px] font-medium">
                      {u.author}{" "}
                      <span className="font-normal text-muted-foreground">· {u.at}</span>
                    </p>
                    <p className="mt-1 text-[13.5px] leading-[1.6] text-muted-foreground">{u.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <form
              className="mt-5 flex gap-2 border-t border-hairline pt-4"
              onSubmit={(e) => {
                e.preventDefault();
                const body = draft.trim();
                if (body.length < 2) return;
                setMessages((m) => [...m, { at: "Just now", author: "You", body }]);
                setDraft("");
                toast.success("Message sent to your DevWork team");
              }}
            >
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value.slice(0, 1000))}
                placeholder="Ask a question or add context…"
                className="h-11 flex-1 rounded-lg border border-input bg-background px-3 text-[13.5px] outline-none focus:ring-2 focus:ring-ring"
              />
              <Btn type="submit" size="md">
                <Send className="h-4 w-4" /> Send
              </Btn>
            </form>
          </Panel>

          <Panel className="p-5">
            <h2 className="text-[15.5px] font-semibold">Deliverables</h2>
            <div className="mt-4 space-y-2.5">
              {request.deliverables.map((d) => (
                <div
                  key={d.name}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-hairline px-4 py-3"
                >
                  <span className="text-[13.5px]">{d.name}</span>
                  <span className="flex items-center gap-2 text-[12.5px] text-muted-foreground">
                    <Dot
                      tone={
                        d.status === "Approved"
                          ? "success"
                          : d.status === "Ready for review"
                            ? "violet"
                            : "warning"
                      }
                    />
                    {d.status}
                  </span>
                </div>
              ))}
            </div>
            {request.deliverables.some((d) => d.status === "Ready for review") ? (
              <div className="mt-4 flex flex-wrap gap-2">
                <Btn size="sm" onClick={() => toast.success("Deliverable approved")}>
                  Approve deliverable
                </Btn>
                <Btn
                  size="sm"
                  variant="outline"
                  onClick={() => toast("Revision requested", { description: "Your provider has been notified." })}
                >
                  Request revision
                </Btn>
              </div>
            ) : null}
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel className="p-5">
            <h2 className="text-[15.5px] font-semibold">Request details</h2>
            <div className="mt-3">
              <MetaRow label="Category" value={`${request.category} / ${request.subcategory}`} />
              <MetaRow label="Complexity" value={request.complexity} />
              <MetaRow
                label="Risk"
                value={
                  <span className="flex items-center gap-1.5">
                    <Dot
                      tone={
                        request.risk === "Elevated"
                          ? "danger"
                          : request.risk === "Medium"
                            ? "warning"
                            : "success"
                      }
                    />
                    {request.risk}
                  </span>
                }
              />
              <MetaRow label="Urgency" value={request.urgency} />
              <MetaRow label="Provider level" value={request.providerLevel} />
              <MetaRow label="Estimated delivery" value={request.estimatedDelivery} />
            </div>
          </Panel>

          <Panel className="p-5">
            <h2 className="text-[15.5px] font-semibold">Who&apos;s working on this</h2>
            <div className="mt-4 space-y-4">
              <div className="flex items-center gap-3">
                <Avatar initials="MP" />
                <div>
                  <p className="text-[13.5px] font-medium">{request.provider.name}</p>
                  <p className="text-[12px] text-muted-foreground">
                    Marketplace Provider · {request.provider.role}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Avatar initials="DW" />
                <div>
                  <p className="text-[13.5px] font-medium">{request.oversight.name}</p>
                  <p className="text-[12px] text-muted-foreground">
                    DevWork Employee Expert · {request.oversight.role}
                  </p>
                </div>
              </div>
            </div>
            <p className="mt-4 text-[12px] leading-[1.55] text-muted-foreground">
              Marketplace Providers perform assigned work. DevWork Employee Experts own routing
              decisions, quality review, and escalation.
            </p>
          </Panel>

          <Panel className="p-5">
            <h2 className="text-[15.5px] font-semibold">Files</h2>
            <div className="mt-4 space-y-2.5">
              {request.files.map((f) => (
                <div
                  key={f.name}
                  className="flex items-center justify-between gap-2 rounded-lg border border-hairline px-3.5 py-2.5"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <Paperclip className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    <span className="truncate text-[13px]">{f.name}</span>
                  </span>
                  <span className="shrink-0 text-[11.5px] text-muted-foreground">{f.size}</span>
                </div>
              ))}
            </div>
            <Btn
              size="sm"
              variant="outline"
              className="mt-4 w-full"
              onClick={() => toast("Prototype only", { description: "File downloads are mocked." })}
            >
              <Download className="h-4 w-4" /> Download all
            </Btn>
          </Panel>
        </div>
      </div>
    </div>
  );
}

function DetailNotFound() {
  const { requestId } = Route.useParams();
  return (
    <Panel className="p-10 text-center">
      <h1 className="text-[18px] font-semibold">Request {requestId} not found</h1>
      <p className="mt-2 text-[13.5px] text-muted-foreground">
        This request doesn&apos;t exist or is no longer available on your account.
      </p>
      <Link to="/dashboard/requests" className="mt-5 inline-block text-[13.5px] font-medium text-violet hover:underline">
        Back to my requests
      </Link>
    </Panel>
  );
}

function DetailError() {
  return (
    <Panel className="p-10 text-center">
      <h1 className="text-[18px] font-semibold">This request didn&apos;t load</h1>
      <p className="mt-2 text-[13.5px] text-muted-foreground">Try again in a moment.</p>
    </Panel>
  );
}
