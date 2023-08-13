import * as setsDb from '../db'
import { Set } from '../../users/User'

export const addSet = async (userId: string, set: Set) => {
  await setsDb.putSet(userId, set)
}
