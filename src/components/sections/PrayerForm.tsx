"use client";
import { ConfigForm, type FieldConfig } from "@/components/ui/Form";
import { submitPrayerRequest } from "@/lib/api";

const fields: FieldConfig[] = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "request", label: "Prayer request", type: "textarea", required: true },
  { name: "isPrivate", label: "Keep my request private", type: "checkbox" },
];

export function PrayerForm() {
  return (
    <ConfigForm fields={fields} submitLabel="Submit Prayer Request" successMessage="Your prayer request has been received."
      onSubmit={(v) => submitPrayerRequest({ name: String(v.name), email: String(v.email), request: String(v.request), isPrivate: Boolean(v.isPrivate) })} />
  );
}
