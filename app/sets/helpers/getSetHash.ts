import { Set } from 'sets/Set'
import { pick } from 'shared/utils/pick'

export const getSetHash = (set: Set) =>
  Object.values(pick(set, ['start', 'end', 'projectId'])).join('-')
