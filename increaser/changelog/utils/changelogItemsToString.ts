import { ChangelogItem } from '../ChangelogItem'

export const changelogItemsToString = (
  changelogItems: ChangelogItem[],
): string => {
  return changelogItems
    .map((changelogItem) => {
      const releasedAt = changelogItem.releasedAt
        ? `${changelogItem.releasedAt}\n`
        : ''
      const items = changelogItem.items.join('\n')
      return `${releasedAt}${items}`
    })
    .join('\n')
}
