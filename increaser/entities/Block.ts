import { Set } from './User'

export type Block<T extends Set = Set> = {
  sets: T[]
}
