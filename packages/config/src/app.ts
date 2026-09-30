export const appConfig = {
  name: "Family Assistance",
  tagline: "Non-emergency care coordination for families",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  locale: "en",
  currency: "EUR",
  timezone: "Europe/Brussels",
  defaultPageSize: 20,
  maxPageSize: 100,
} as const;

export type AppConfig = typeof appConfig;
