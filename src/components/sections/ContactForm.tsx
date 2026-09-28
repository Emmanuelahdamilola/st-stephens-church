"use client";
import { ConfigForm, type FieldConfig } from "@/components/ui/Form";
import { submitContactMessage } from "@/lib/api";

const fields: FieldConfig[] = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "message", label: "Message", type: "textarea", required: true },
];

export function ContactForm() {
  return (
    <ConfigForm fields={fields} submitLabel="Contact Us" successMessage="Your message has been sent."
      onSubmit={(v) => submitContactMessage({ name: String(v.name), email: String(v.email), message: String(v.message) })} />
  );
}
