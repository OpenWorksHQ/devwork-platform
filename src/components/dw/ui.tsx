import { Link } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ---------- Buttons ---------- */

type Variant = "primary" | "outline" | "violet" | "ghost" | "inkOutline" | "white";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-ink-foreground hover:bg-ink/90",
  violet: "bg-violet text-violet-foreground hover:bg-violet/90",
  outline: "border border-border bg-background text-foreground hover:bg-muted",
  inkOutline: "border border-ink-border bg-transparent text-ink-foreground hover:bg-white/10",
  white: "bg-background text-foreground hover:bg-muted",
  ghost: "text-foreground hover:bg-muted",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-[13px]",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[15px]",
};

export function btnClass(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    variants[variant],
    sizes[size],
    className,
  );
}

export function Btn({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ComponentProps<"button"> & { variant?: Variant; size?: Size }) {
  return <button className={btnClass(variant, size, className)} {...props} />;
}

export function BtnLink({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; size?: Size }) {
  return <Link className={btnClass(variant, size, className)} {...props} />;
}

/* ---------- Surfaces ---------- */

export function Panel({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("rounded-xl border border-hairline bg-card", className)}>{children}</div>
  );
}

export function Eyebrow({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" | "plain" }) {
  if (tone === "plain")
    return <p className="dw-eyebrow text-muted-foreground">{children}</p>;
  return (
    <span
      className={cn(
        "dw-eyebrow inline-flex items-center rounded-full px-3 py-1.5",
        tone === "light" ? "bg-violet-soft text-foreground/70" : "bg-white/10 text-white/70",
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  tone = "light",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "center" | "left";
  tone?: "light" | "dark";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? (
        <p
          className={cn(
            "dw-eyebrow mb-4",
            tone === "light" ? "text-muted-foreground" : "text-white/50",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "text-[28px] font-bold leading-[1.15] sm:text-[34px]",
          tone === "dark" && "text-white",
        )}
      >
        {title}
      </h2>
      {intro ? (
        <p
          className={cn(
            "mt-4 text-[15px] leading-relaxed",
            tone === "light" ? "text-muted-foreground" : "text-white/60",
          )}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}

export function Chip({
  children,
  tone = "muted",
}: {
  children: ReactNode;
  tone?: "muted" | "violet" | "success" | "warning" | "danger";
}) {
  const tones: Record<string, string> = {
    muted: "bg-muted text-muted-foreground",
    violet: "bg-violet-soft text-violet",
    success: "bg-muted text-success",
    warning: "bg-muted text-warning",
    danger: "bg-muted text-destructive",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}

export function Dot({ tone }: { tone: "success" | "warning" | "danger" | "violet" }) {
  const map = {
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-destructive",
    violet: "bg-violet",
  } as const;
  return <span className={cn("h-1.5 w-1.5 rounded-full", map[tone])} />;
}

export function MetaRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 border-t border-hairline px-4 py-3 first:border-t-0">
      <span className="text-[13px] text-muted-foreground">{label}</span>
      <span className="text-[13px] font-medium">{value}</span>
    </div>
  );
}

export function Avatar({ initials, className }: { initials: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-[11px] font-semibold text-muted-foreground",
        className,
      )}
    >
      {initials}
    </span>
  );
}
