import fs from 'fs'
import path from 'path'

export const createNewYoutubeFile = () =>
  fs.writeFileSync(path.resolve(__dirname, '../youtube/latest.md'), '', 'utf8')

export const releaseNewYoutubeFile = (timestamp: number) =>
  fs.renameSync(
    path.resolve(__dirname, '../youtube/latest.md'),
    path.resolve(__dirname, `../youtube/${timestamp}.md`),
  )
