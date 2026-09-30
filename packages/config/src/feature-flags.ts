export const featureFlags = {
  liveChat: process.env.NEXT_PUBLIC_FF_LIVE_CHAT === "true",
  helperSelfOnboarding:
    process.env.NEXT_PUBLIC_FF_HELPER_ONBOARDING !== "false",
  whatsappNotifications: process.env.NEXT_PUBLIC_FF_WHATSAPP === "true",
  multiLanguage: process.env.NEXT_PUBLIC_FF_I18N === "true",
} as const;

export type FeatureFlag = keyof typeof featureFlags;

export function isFeatureEnabled(flag: FeatureFlag): boolean {
  return featureFlags[flag];
}
