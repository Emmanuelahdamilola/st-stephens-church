import type { GivingOption } from "@/types/content";

// TODO: Connect giving button to payment gateway. Add real options (with href) once the gateway exists.
export const givingOptions: GivingOption[] = [
  { id: "general", title: "General giving", description: "Support the worship, fellowship, and outreach of the church." },
];
