"use client";
import { useState } from "react";
import { Icon } from "./Icon";

// Copies text (e.g. an account number) to the clipboard and says so. The number itself is always shown
// as selectable text too, so this is a convenience, not the only way to copy it.
export function CopyButton({ text, label }: { text: string; label: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    setTimeout(() => setStatus("idle"), 2000);
  }
  return (
    <button type="button" onClick={copy} aria-label={label} className="inline-flex items-center gap-2 rounded border border-primary px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-white">
      <Icon name={status === "copied" ? "check" : "copy"} className="h-4 w-4" />
      <span aria-live="polite">{status === "copied" ? "Copied" : status === "failed" ? "Copy failed" : "Copy number"}</span>
    </button>
  );
}