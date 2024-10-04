import fs from 'fs'
import path from 'path'

const youTubeFolders = path.resolve(__dirname, '../../../../changelog')

const latestDirectory = path.join(youTubeFolders, 'latest')

export const createNewYoutubeFolder = () => fs.mkdirSync(latestDirectory)

export const releaseNewYoutubeFolder = (timestamp: number) =>
  fs.renameSync(
    latestDirectory,
    path.join(youTubeFolders, timestamp.toString()),
  )
