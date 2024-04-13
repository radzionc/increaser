import styled, { useTheme } from 'styled-components'
import { transition } from '@lib/ui/css/transition'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { getColor } from '@lib/ui/theme/getters'
import { useCurrentProject } from '../../components/ProjectView/CurrentProjectProvider'
import { useWeekday } from '@lib/ui/hooks/useWeekday'
import { useProjectDaysAllocation } from '../hooks/useProjectDaysAllocation'
import { toPercents } from '@lib/utils/toPercents'
import { useMemo } from 'react'
import { useCurrentDayTarget } from '../hooks/useCurrentDayTarget'
import { ProjectBudgetWidgetDays } from './ProjectBudgetWidgetDays'

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  ${borderRadius.m};
  ${transition};
  height: 100%;
  background: ${getColor('foreground')};
  border: 1px solid ${getColor('mist')};
  overflow: hidden;
`

const Fill = styled.div`
  height: 100%;
  ${transition};
  background: ${getColor('background')};
`

const Offset = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  ${transition};
`

export const ProjectBudgetOverview = () => {
  const { goal, allocatedMinutesPerWeek, doneMinutesThisWeek } =
    useCurrentProject()

  const weekday = useWeekday()
  const allocation = useProjectDaysAllocation()

  const { colors } = useTheme()

  const hasReachedFinalDay = weekday + 1 >= allocation.length
  const hasReachedGoal = useMemo(() => {
    if (!goal) return false

    if (goal === 'doMore') {
      return doneMinutesThisWeek >= allocatedMinutesPerWeek
    }

    return hasReachedFinalDay && doneMinutesThisWeek <= allocatedMinutesPerWeek
  }, [allocatedMinutesPerWeek, doneMinutesThisWeek, goal, hasReachedFinalDay])

  const target = useCurrentDayTarget()

  return (
    <Container
      style={
        goal && (hasReachedFinalDay || hasReachedGoal)
          ? {
              borderColor: (hasReachedGoal
                ? colors.success
                : colors.alert
              ).toCssValue(),
            }
          : {}
      }
    >
      <Fill
        style={{
          width: toPercents(
            Math.min(doneMinutesThisWeek / allocatedMinutesPerWeek, 1),
          ),
        }}
      />
      {goal && !(hasReachedFinalDay || hasReachedGoal) && (
        <>
          <Offset
            style={{
              left: toPercents(
                doneMinutesThisWeek < target
                  ? doneMinutesThisWeek / allocatedMinutesPerWeek
                  : target / allocatedMinutesPerWeek,
              ),
              width: toPercents(
                doneMinutesThisWeek < target
                  ? (target - doneMinutesThisWeek) / allocatedMinutesPerWeek
                  : (doneMinutesThisWeek - target) / allocatedMinutesPerWeek,
              ),
              background: (doneMinutesThisWeek > target
                ? goal === 'doMore'
                  ? colors.success
                  : colors.alert
                : goal === 'doMore'
                  ? colors.alert
                  : colors.success
              ).toCssValue(),
            }}
          />
        </>
      )}
      <ProjectBudgetWidgetDays />
    </Container>
  )
}
