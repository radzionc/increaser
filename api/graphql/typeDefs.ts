import schemaPath from './schema.graphql'
import path from 'path'

import { readFileSync } from 'fs'

export const typeDefs = readFileSync(path.join(__dirname, schemaPath), {
  encoding: 'utf-8',
})
