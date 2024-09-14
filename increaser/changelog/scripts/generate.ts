import { createTsFile } from '@lib/codegen/utils/createTsFile'
import { readChangelogFile, writeChangelogFile } from '../utils/changelogFile'
import { changelogItemsToString } from '../utils/changelogItemsToString'
import { injectProductUpdate } from '../utils/injectProductUpdate'
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

  const now = Date.now()
  const newChangelog = [
    {
      items,
      releasedAt: now,
    },
    ...changelog.slice(1),
  ]

  const newChangelogStr = changelogItemsToString(newChangelog)
  writeChangelogFile(newChangelogStr)

  const productUpdatesStr = readProductUpdatesFile()

  const newProductUpdate = injectProductUpdate(productUpdatesStr, {
    releasedAt: now,
  })

  createTsFile({
    directory: productUpdatesFileDirectory,
    fileName: productUpdatesFileName,
    content: newProductUpdate,
  })
}

generate()
