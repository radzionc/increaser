import fs from 'fs'
import path from 'path'

export const productUpdatesFileDirectory = path.resolve(__dirname, '../')
export const productUpdatesFileName = 'productUpdates'

const productUpdatesFilePath = path.resolve(
  productUpdatesFileDirectory,
  `${productUpdatesFileName}.ts`,
)

export const readProductUpdatesFile = () =>
  fs.readFileSync(productUpdatesFilePath, 'utf8')

export const writeProductUpdatesFile = (content: string) =>
  fs.writeFileSync(productUpdatesFilePath, content, 'utf8')
