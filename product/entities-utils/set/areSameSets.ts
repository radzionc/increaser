import { Set } from '@product/entities/User'

import { getSetHash } from './getSetHash'

export const areSameSets = (one: Set, anoter: Set) => {
  return getSetHash(one) === getSetHash(anoter)
}
