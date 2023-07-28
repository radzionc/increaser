import { Set } from 'sets/Set'

export const getSetDuration = ({ end, start }: Pick<Set, 'start' | 'end'>) =>
  Math.abs(end - start)
