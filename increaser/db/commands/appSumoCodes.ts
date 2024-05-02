import { getAllAppSumoCodes } from '../appSumo'
import fs from 'fs'
import path from 'path'

const output = path.join(__dirname, '../out/appSumoCodes.csv')

export const appSumoCodes = async () => {
  const codes = await getAllAppSumoCodes()

  const freeCodes = codes.filter((code) => !code.userId)

  const content = freeCodes.map((code) => code.id).join('\n')

  fs.writeFileSync(output, content)
}

appSumoCodes()
