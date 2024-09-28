import { createTsFile } from '@lib/codegen/utils/createTsFile'
import { injectProductUpdate } from '../utils/injectProductUpdate'
import {
  productUpdatesFileDirectory,
  productUpdatesFileName,
  readProductUpdatesFile,
} from '../utils/productUpdatesFile'
import fs from 'fs'
import path from 'path'

const generate = () => {
  const productUpdatesStr = readProductUpdatesFile()

  const newProductUpdate = injectProductUpdate(productUpdatesStr, {
    releasedAt: 0,
  })

  createTsFile({
    directory: productUpdatesFileDirectory,
    fileName: productUpdatesFileName,
    content: newProductUpdate,
  })

  fs.writeFileSync(path.resolve(__dirname, '../youtube/latest.md'), '', 'utf8')
}

generate()
