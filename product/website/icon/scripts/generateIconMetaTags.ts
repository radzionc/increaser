import path from 'path'

import { generateIcons } from '@lib/ui/metadata/codegen/generateIcons'

const publicDirectory = path.resolve(__dirname, '../../public')

generateIcons({
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
