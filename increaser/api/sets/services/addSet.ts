import { putSet } from '@increaser/db/set'
import { Set } from '@increaser/entities/User'

export const addSet = async (userId: string, set: Set) => {
  await putSet(userId, set)
}
