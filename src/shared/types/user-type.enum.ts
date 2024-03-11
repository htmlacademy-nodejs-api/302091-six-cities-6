export const UserType = {
  Pro: 'pro',
  Regular: 'regular'
} as const;
export type UserType = typeof UserType[keyof typeof UserType];

