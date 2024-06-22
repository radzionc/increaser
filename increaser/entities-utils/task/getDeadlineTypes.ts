import { DeadlineType } from '@increaser/entities/Task'
import { getCurrentDeadlines } from './getCurrentDeadlines'

export const getDeadlineTypes = (now: number): readonly DeadlineType[] =>
  Object.values(getCurrentDeadlines({ now }))
