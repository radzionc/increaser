import { ChangelogItem } from '../ChangelogItem'

export function parseChangelog(changelog: string): ChangelogItem[] {
  const lines = changelog.split('\n')
  const changelogItems: ChangelogItem[] = []
  let currentChangelogItem: ChangelogItem | null = null

  for (const line of lines) {
    if (/^\d+$/.test(line)) {
      // Line is a timestamp
      if (currentChangelogItem) {
        changelogItems.push(currentChangelogItem)
      }
      currentChangelogItem = {
        releasedAt: parseInt(line, 10),
        items: [],
      }
    } else if (currentChangelogItem && line.trim() !== '') {
      currentChangelogItem.items.push(line)
    }
  }

  // Push the last changelog item if exists
  if (currentChangelogItem) {
    changelogItems.push(currentChangelogItem)
  }

  return changelogItems
}
