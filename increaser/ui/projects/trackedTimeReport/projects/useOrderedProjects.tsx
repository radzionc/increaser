import { useMemo } from 'react'
import { useSelectedIntervalProjectsTimeSeries } from './useSelectedIntervalProjectsTimeSeries'
import { Entry } from '@lib/utils/entities/Entry'
import { sum } from '@lib/utils/array/sum'
import { order } from '@lib/utils/array/order'

export const useOrderedProjects = (): Entry<string, number>[] => {
  const projectsTimeSeries = useSelectedIntervalProjectsTimeSeries()

  return useMemo(() => {
    const entries = Object.entries(projectsTimeSeries)
      .map(([id, data]) => {
        return {
          key: id,
          value: sum(data),
        }
      })
      .filter(({ value }) => value > 0)

    return order(entries, ({ value }) => value, 'desc')
  }, [projectsTimeSeries])
}
