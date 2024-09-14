import fs from 'fs'
import path from 'path'

const changelogFilePath = path.resolve(__dirname, '../changelog.txt')

export const readChangelogFile = () =>
  fs.readFileSync(path.resolve(__dirname, '../changelog.txt'), 'utf8')

export const writeChangelogFile = (content: string) =>
  fs.writeFileSync(changelogFilePath, content, 'utf8')
