// Form submission points. No backend exists yet, so these fail honestly instead of pretending to succeed.
import type { ContactMessage, PrayerRequest } from "@/types/content";

export class BackendNotConnectedError extends Error {
  constructor() { super("Backend not connected"); }
}

export async function submitPrayerRequest(data: PrayerRequest): Promise<void> {
  void data;
  // TODO: Connect prayer form to backend
  throw new BackendNotConnectedError();
}

export async function submitContactMessage(data: ContactMessage): Promise<void> {
  void data;
  // TODO: Connect contact form to backend
  throw new BackendNotConnectedError();
}
