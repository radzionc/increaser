export const unknownActivityKey = 'unknown' as const
type UnknownActivityKey = typeof unknownActivityKey

export type ActivityKey = string | UnknownActivityKey

export const unknownActivityName = 'Unknown'
export const unknownActivityEmoji = '❓'
