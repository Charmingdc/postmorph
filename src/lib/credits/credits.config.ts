export const CREDIT_COSTS = {
 modification: 1,

 repurpose: {
  tweet: 4,
  linkedin: 4,
  reddit: 4,
  thread: 4,
  blog: 5
 },

 media: {
  youtube: 8,
  tiktok: 8
 }
} as const;

export type RepurposeKey = keyof typeof CREDIT_COSTS.repurpose;
