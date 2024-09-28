import { createTsFile } from '@lib/codegen/utils/createTsFile'
import { readChangelogFile, writeChangelogFile } from '../utils/changelogFile'
import { changelogItemsToString } from '../utils/changelogItemsToString'
import { parseChangelog } from '../utils/parseChangelog'
import {
  productUpdatesFileDirectory,
  productUpdatesFileName,
  readProductUpdatesFile,
} from '../utils/productUpdatesFile'

const generate = () => {
  const changelogStr = readChangelogFile()
  const changelog = parseChangelog(changelogStr)
  const { items } = changelog[0]

  const releasedAt = Date.now()
  const newChangelog = [
    {
      items,
      releasedAt,
    },
    ...changelog.slice(1),
  ]

  const newChangelogStr = changelogItemsToString(newChangelog)
  writeChangelogFile(newChangelogStr)

  const productUpdatesStr = readProductUpdatesFile()

  const newProductUpdatesStr = productUpdatesStr.replace(
    /releasedAt:\s*\d+/,
    `releasedAt: ${releasedAt}`,
  )

  createTsFile({
    directory: productUpdatesFileDirectory,
    fileName: productUpdatesFileName,
    content: newProductUpdatesStr,
  })
}

generate()
