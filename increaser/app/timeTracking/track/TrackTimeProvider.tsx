import { useCurrentWeekSets } from '@increaser/ui/sets/hooks/useCurrentWeekSets'
import { useWeekday } from '@lib/ui/hooks/useWeekday'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { useCallback, useMemo, useState } from 'react'
import { getDaySets } from '../../sets/helpers/getDaySets'
import { useStartOfWeek } from '@lib/ui/hooks/useStartOfWeek'
import { convertDuration } from '@lib/utils/time/convertDuration'
import {
  TrackTimeContext,
  TrackTimeMutableState,
} from './state/TrackTimeContext'
import { useHandleQueryParams } from '../../navigation/hooks/useHandleQueryParams'
import { getSetHash } from '../../sets/helpers/getSetHash'
import { getWeekday } from '@lib/utils/time/getWeekday'
import { useRouter } from 'next/router'

type QueryParams = {
  edit?: string
}

export const TrackTimeProvider = ({ children }: ComponentWithChildrenProps) => {
  const currentWeekday = useWeekday()
  const [state, setState] = useState<TrackTimeMutableState>({
    weekday: currentWeekday,
    currentSet: null,
  })

  const { weekday } = state

  const currentWeekSets = useCurrentWeekSets()
  const weekStartedAt = useStartOfWeek()

  const { replace, pathname } = useRouter()

  useHandleQueryParams<QueryParams>(
    useCallback(
      (query) => {
        const { edit, ...queryRest } = query
        if (!edit) return

        const set = currentWeekSets.find((set) => getSetHash(set) === edit)
        if (!set) return

        const weekday = getWeekday(new Date(set.start))
        const index = getDaySets(currentWeekSets, set.start).indexOf(set)

        setState({ weekday, currentSet: { ...set, index } })

        replace({
          pathname,
          query: queryRest,
        })
      },
      [currentWeekSets, pathname, replace],
    ),
  )

  const dayInterval = useMemo(() => {
    const start = weekStartedAt + convertDuration(weekday, 'd', 'ms')
    const end =
      weekday === currentWeekday
        ? Date.now()
        : start + convertDuration(1, 'd', 'ms')

    return { start, end }
  }, [currentWeekday, weekStartedAt, weekday])

  const sets = useMemo(() => {
    return getDaySets(currentWeekSets, dayInterval.start)
  }, [currentWeekSets, dayInterval.start])

  return (
    <TrackTimeContext.Provider
      value={{ ...state, dayInterval, sets, setState }}
    >
      {children}
    </TrackTimeContext.Provider>
  )
}
