// Holy Communion content. Only what the church has supplied is filled in; other sections show a
// "coming soon" note until the church provides text.
export const communion = {
  message: "A sacred time of remembrance, fellowship, and reflection in the faith.",
  sections: [
    { id: "schedule", title: "Communion schedule", body: "Mid-Week Holy Communion is held every Wednesday evening at 5:00 PM." },
    { id: "preparation", title: "Preparation", body: "" },
    { id: "scripture", title: "Scripture", body: "" },
    { id: "guidance", title: "Church guidance", body: "" },
    { id: "announcements", title: "Announcements", body: "" },
  ],
  faqs: [] as { question: string; answer: string }[],
};