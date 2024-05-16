import { useCurrentWeekSets } from '../../sets/hooks/useCurrentWeekSets'
import { getProjectDoneMinutes } from '../utils/getProjectDoneMinutes'

export const useProjectDoneMinutesThisWeek = (id?: string | null) => {
  const sets = useCurrentWeekSets()

  return getProjectDoneMinutes({ sets, id })
}
