"use client";
import { useId, useState } from "react";
import { church } from "@/data/church";
import { BackendNotConnectedError } from "@/lib/api";

export interface FieldConfig { name: string; label: string; type: "text" | "email" | "textarea" | "checkbox"; required?: boolean }
type Values = Record<string, string | boolean>;
type Status = "idle" | "loading" | "success" | "error";

const inputClass = "w-full border border-primary/40 bg-white px-4 py-3 text-ink transition focus:border-primary disabled:opacity-60 aria-[invalid=true]:border-red-700";

function validate(fields: FieldConfig[], values: Values): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const f of fields) {
    const v = values[f.name];
    if (f.required && f.type !== "checkbox" && !String(v).trim()) errors[f.name] = `${f.label} is required.`;
    else if (f.type === "email" && String(v).trim() && !/^\S+@\S+\.\S+$/.test(String(v))) errors[f.name] = "Please enter a valid email address.";
  }
  return errors;
}

// One form component for every form on the site. Each form only supplies its fields and submit function.
export function ConfigForm({ fields, submitLabel, successMessage, onSubmit }: { fields: FieldConfig[]; submitLabel: string; successMessage: string; onSubmit: (values: Values) => Promise<void> }) {
  const uid = useId();
  const emptyValues: Values = Object.fromEntries(fields.map((f) => [f.name, f.type === "checkbox" ? false : ""]));
  const [values, setValues] = useState<Values>(emptyValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState("");
  const loading = status === "loading";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(fields, values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    setStatus("loading");
    setFormError("");
    try {
      await onSubmit(values);
      setValues(emptyValues);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setFormError(err instanceof BackendNotConnectedError ? `This form isn't connected yet. Please email us at ${church.email}.` : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="border border-secondary bg-light p-8">
        <p className="font-heading text-2xl">Thank you.</p>
        <p className="mt-2">{successMessage}</p>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-5">
      {fields.map((f) => {
        const id = `${uid}-${f.name}`;
        const error = errors[f.name];
        const common = { id, name: f.name, disabled: loading, "aria-invalid": Boolean(error), "aria-describedby": error ? `${id}-error` : undefined, "aria-required": f.required || undefined };
        return (
          <div key={f.name}>
            {f.type === "checkbox" ? (
              <label className="flex items-center gap-3 text-sm">
                <input type="checkbox" {...common} checked={Boolean(values[f.name])} onChange={(e) => setValues({ ...values, [f.name]: e.target.checked })} className="h-5 w-5 accent-[rgb(var(--color-primary))]" />
                {f.label}
              </label>
            ) : (
              <>
                <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">{f.label}{f.required && <span aria-hidden> *</span>}</label>
                {f.type === "textarea" ? (
                  <textarea rows={5} {...common} value={String(values[f.name])} onChange={(e) => setValues({ ...values, [f.name]: e.target.value })} className={inputClass} />
                ) : (
                  <input type={f.type} {...common} value={String(values[f.name])} onChange={(e) => setValues({ ...values, [f.name]: e.target.value })} className={inputClass} />
                )}
              </>
            )}
            {error && <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-red-700">{error}</p>}
          </div>
        );
      })}
      {status === "error" && <p role="alert" className="border-l-4 border-red-700 bg-red-50 p-3 text-sm text-red-800">{formError}</p>}
      <button type="submit" disabled={loading} className="bg-accent px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-ink transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60">
        {loading ? "Sending…" : submitLabel}
      </button>
    </form>
  );
}
