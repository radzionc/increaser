import {
  PersistentStateKey,
  usePersistentState,
} from '../../../../state/persistentState'

export const daysViews = ['total', 'sessions'] as const
export type DaysView = (typeof daysViews)[number]

export const useDaysView = () => {
  return usePersistentState<DaysView>(
    PersistentStateKey.TrackedTimeDaysView,
    'total',
  )
}
