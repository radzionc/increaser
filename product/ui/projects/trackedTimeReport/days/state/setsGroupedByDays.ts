import { range } from '@lib/utils/array/range'
import { getIntIntervalLength } from '@lib/utils/interval/getIntIntervalLength'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { Set } from '@product/entities/User'
import { addDays, startOfDay } from 'date-fns'
import { useMemo } from 'react'

import { useSets } from '../../../../sets/hooks/useSets'
import { useSelectedInterval } from '../../interval/useSelectedInterval'
import { useStartOfSelectedIntervalPoint } from '../../timeGrouping/useStartOfSelectedIntervalPoint'

export const useSetsGroupedByDays = () => {
  const [interval] = useSelectedInterval()
  const dataSize = getIntIntervalLength(interval)

  const intervalStartedAt = useStartOfSelectedIntervalPoint(0)

  const sets = useSets()

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
