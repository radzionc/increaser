export const breakMinutesOptions = [5, 10, 15, 20, 30] as const

export type BreakDurationMinutes = (typeof breakMinutesOptions)[number]
