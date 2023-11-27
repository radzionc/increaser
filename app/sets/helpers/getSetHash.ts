import { pick } from '@increaser/utils/record/pick'
import { Set } from 'sets/Set'

export const getSetHash = (set: Set) =>
  Object.values(pick(set, ['start', 'end', 'projectId'])).join('-')
