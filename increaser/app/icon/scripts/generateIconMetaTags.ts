import path from 'path'

import { generateIconMetaTags } from '@lib/ui/metadata/codegen/generateIconMetaTags'

const publicDirectory = path.resolve(__dirname, '../../public')

generateIconMetaTags({
  lightModeIconPath: path.resolve(
    __dirname,
    '../../../ui/icon/light-mode-icon.svg',
  ),
  darkModeIconPath: path.resolve(
    __dirname,
    '../../../ui/icon/dark-mode-icon.svg',
  ),
  publicDirectory,
  manifestPath: path.resolve(publicDirectory, 'manifest.json'),
  codeDirectory: path.resolve(__dirname, '../'),
})
