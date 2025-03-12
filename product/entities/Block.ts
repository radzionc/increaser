import { Set } from './User'

export type Block<T extends Set = Set> = {
  sets: T[]
}

export const blockMaxBreak = 15

export const blockTargetDuration = 90
