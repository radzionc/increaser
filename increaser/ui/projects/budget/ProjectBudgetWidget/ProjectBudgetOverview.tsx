import styled, { useTheme } from 'styled-components'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { getColor } from '@lib/ui/theme/getters'
import { useCurrentProject } from '@increaser/ui/projects/CurrentProjectProvider'
import { toPercents } from '@lib/utils/toPercents'
import { useMemo } from 'react'
import { useCurrentDayTarget } from '../hooks/useCurrentDayTarget'
import { ProjectBudgetWidgetDays } from './ProjectBudgetWidgetDays'
import { useHasReachedFinalWorkday } from '../hooks/useHasReachedFinalWorkday'
import { match } from '@lib/utils/match'
import { useProjectDoneMinutesThisWeek } from '../../hooks/useProjectDoneMinutesThisWeek'
import { LinesFiller } from '@lib/ui/visual/LinesFiller'

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  ${borderRadius.m};
  height: 100%;
  background: ${getColor('background')};
  border: 1px solid ${getColor('mistExtra')};
  overflow: hidden;
`

const Fill = styled.div`
  height: 100%;
  background: ${getColor('foregroundExtra')};
  position: relative;
  color: ${getColor('background')};
`

const Offset = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
`

export const ProjectBudgetOverview = () => {
  const { goal, allocatedMinutesPerWeek, id } = useCurrentProject()

  const doneMinutesThisWeek = useProjectDoneMinutesThisWeek(id)

  const { colors } = useTheme()

  const hasReachedFinalDay = useHasReachedFinalWorkday()
  const hasReachedGoal = useMemo(() => {
    if (!goal) return false

    if (goal === 'doMore') {
      return doneMinutesThisWeek >= allocatedMinutesPerWeek
    }

    return hasReachedFinalDay && doneMinutesThisWeek <= allocatedMinutesPerWeek
  }, [allocatedMinutesPerWeek, doneMinutesThisWeek, goal, hasReachedFinalDay])

  const target = useCurrentDayTarget()

  const isUnderTarget = doneMinutesThisWeek < target

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
      >
        <LinesFiller />
      </Fill>
      {goal && !(hasReachedFinalDay || hasReachedGoal) && (
        <>
          <Offset
            style={{
              left: toPercents(
                isUnderTarget
                  ? doneMinutesThisWeek / allocatedMinutesPerWeek
                  : target / allocatedMinutesPerWeek,
              ),
              width: toPercents(
                isUnderTarget
                  ? (target - doneMinutesThisWeek) / allocatedMinutesPerWeek
                  : (doneMinutesThisWeek - target) / allocatedMinutesPerWeek,
              ),
              background: (isUnderTarget
                ? match(goal, {
                    doMore: () => colors.alert,
                    doLess: () => colors.success,
                  })
                : match(goal, {
                    doMore: () => colors.success,
                    doLess: () => colors.alert,
                  })
              ).toCssValue(),
            }}
          ></Offset>
        </>
      )}
      <ProjectBudgetWidgetDays />
    </Container>
  )
}
