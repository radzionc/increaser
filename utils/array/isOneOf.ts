export const isOneOf = <T>(items: readonly T[], item: any): T | undefined => {
  if (items.includes(item)) {
    return item
  }
}
