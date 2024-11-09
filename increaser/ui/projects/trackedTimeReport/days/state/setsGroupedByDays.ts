import { getIntIntervalLength } from '@lib/utils/interval/getIntIntervalLength'
import { useUser } from '../../../../user/state/user'
import { useSelectedInterval } from '../../interval/useSelectedInterval'
import { useMemo } from 'react'
import { range } from '@lib/utils/array/range'
import { useStartOfSelectedIntervalPoint } from '../../timeGrouping/useStartOfSelectedIntervalPoint'
import { addDays, startOfDay } from 'date-fns'
import { Set } from '@increaser/entities/User'
import { convertDuration } from '@lib/utils/time/convertDuration'

export const useSetsGroupedByDays = () => {
  const [interval] = useSelectedInterval()
  const dataSize = getIntIntervalLength(interval)

  const intervalStartedAt = useStartOfSelectedIntervalPoint(0)

  const { sets } = useUser()

  return useMemo(() => {
    const days = range(dataSize).map((index) =>
      addDays(intervalStartedAt, index).getTime(),
    )
    const result = range(dataSize).map(() => [] as Set[])

    sets.forEach((set) => {
      const dayStartedAt = startOfDay(set.start).getTime()
      const index = days.indexOf(dayStartedAt)
      if (index >= 0) {
        const start = convertDuration(set.start - dayStartedAt, 'ms', 'min')
        const end = convertDuration(set.end - dayStartedAt, 'ms', 'min')

        result[index].push({
          start,
          end,
          projectId: set.projectId,
        })
      }
    })

    return result
  }, [dataSize, intervalStartedAt, sets])
}
