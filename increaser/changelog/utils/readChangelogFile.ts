import fs from 'fs'
import path from 'path'

export const readChangelogFile = () =>
  fs.readFileSync(path.resolve(__dirname, '../changelog.txt'), 'utf8')
