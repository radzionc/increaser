import { ChangelogItem } from '../ChangelogItem'

export function parseChangelog(changelog: string): ChangelogItem[] {
  const lines = changelog.split('\n')
  const changelogItems: ChangelogItem[] = []
  let currentChangelogItem: ChangelogItem | null = null

  for (const line of lines) {
    if (/^\d+$/.test(line.trim())) {
      // Line is a timestamp
      if (currentChangelogItem) {
        changelogItems.push(currentChangelogItem)
      }
      currentChangelogItem = {
        releasedAt: parseInt(line.trim(), 10),
        items: [],
      }
    } else if (line.trim() !== '') {
      // Line is not empty
      if (!currentChangelogItem) {
        // Create a new changelog item with releasedAt set to null
        currentChangelogItem = {
          releasedAt: null,
          items: [],
        }
      }
      currentChangelogItem.items.push(line)
    }
  }

  // Push the last changelog item if exists
  if (currentChangelogItem) {
    changelogItems.push(currentChangelogItem)
  }

  return changelogItems
}
