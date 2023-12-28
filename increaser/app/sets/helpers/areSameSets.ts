import { Set } from '@increaser/app/sets/Set'

import { getSetHash } from './getSetHash'

export const areSameSets = (one: Set, anoter: Set) => {
  return getSetHash(one) === getSetHash(anoter)
}
