import { match } from '@lib/utils/match'
import { useTheme } from 'styled-components'
import { useCurrentDayTarget } from './useCurrentDayTarget'
import { usePrevDayTarget } from './usePrevDayTarget'
import { useProjectDoneMinutesThisWeek } from '../../hooks/useProjectDoneMinutesThisWeek'
import { useUser } from '@increaser/ui/user/state/user'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'

export const useProjectBudgetOffsetColor = (id: string) => {
  const { projects } = useUser()
  const doneMinutesThisWeek = useProjectDoneMinutesThisWeek(id)

  const project = projects[id]

  const goal = shouldBePresent(project.goal)

  const { colors } = useTheme()

  const target = useCurrentDayTarget()
  const prevTarget = usePrevDayTarget()

  const isUnderTarget = doneMinutesThisWeek < target
  const isUnderPrevDayTarget = doneMinutesThisWeek < prevTarget

  return isUnderTarget
    ? match(goal, {
        doMore: () => (isUnderPrevDayTarget ? colors.alert : colors.idle),
        doLess: () => colors.success,
      })
    : match(goal, {
        doMore: () => colors.success,
        doLess: () => colors.alert,
      })
}
