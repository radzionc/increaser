import { pick } from '@lib/utils/record/pick'
import { Set } from '@increaser/entities/User'

export const getSetHash = (set: Set) =>
  Object.values(pick(set, ['start', 'end', 'projectId'])).join('-')
