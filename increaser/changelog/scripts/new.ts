import path from 'path'
import fs from 'fs'

const filePath = path.resolve(__dirname, '../changelog.md')

const oldValue = fs.readFileSync(filePath, 'utf8')

const newValue = [Date.now(), oldValue].join('\n')

fs.writeFileSync(filePath, newValue, 'utf8')
