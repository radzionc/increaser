import { Set } from '@increaser/entities/User'

import { getSetHash } from './getSetHash'

export const areSameSets = (one: Set, anoter: Set) => {
  return getSetHash(one) === getSetHash(anoter)
}
