import type { BankAccount } from "@/types/content";

// Church tithe & offering accounts, as printed on the church bulletin. Double-check the numbers
// against the bulletin before publishing: people will transfer money to these.
// TODO: Connect an online payment gateway for card payments (not available yet)
export const bankAccounts: BankAccount[] = [
  { id: "access", bank: "Access Bank", accountNumber: "1826308019", accountName: "St. Stephen's Anglican Ch. (Tithe & Offering Account)" },
  { id: "first", bank: "First Bank", accountNumber: "3088954137", accountName: "St. Stephen's Anglican Ch. (Tithe & Offering Account)" },
];