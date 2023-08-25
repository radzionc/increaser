import { readFileSync } from 'fs'

export const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' })
