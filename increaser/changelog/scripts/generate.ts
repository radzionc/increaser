import { createTsFile } from '@lib/codegen/utils/createTsFile'
import { injectProductUpdate } from '../utils/injectProductUpdate'
import {
  productUpdatesFileDirectory,
  productUpdatesFileName,
  readProductUpdatesFile,
} from '../utils/productUpdatesFile'
import { createNewYoutubeFile } from '../utils/youtubeFile'

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

  createNewYoutubeFile()
}

generate()
