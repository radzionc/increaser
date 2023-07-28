import { Set } from 'sets/Set'

import { getSetHash } from './getSetHash'

export const areSameSets = (one: Set, anoter: Set) => {
  return getSetHash(one) === getSetHash(anoter)
}
