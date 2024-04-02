import { useCurrentProject } from '@increaser/app/projects/components/ProjectView/CurrentProjectProvider'
import { useWeekday } from '@lib/ui/hooks/useWeekday'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { sum } from '@lib/utils/array/sum'
import { toPercents } from '@lib/utils/toPercents'
import styled, { useTheme } from 'styled-components'
import { transition } from '@lib/ui/css/transition'
import { centerContent } from '@lib/ui/css/centerContent'
import { ProjectBudgetWidgetDays } from './ProjectBudgetWidgetDays'
import { useProjectDaysAllocation } from '../hooks/useProjectDaysAllocation'

const Fill = styled.div`
  height: 100%;
  ${transition};
`

const Distance = styled.div`
  position: absolute;
  top: 0;
  border-top: 1px solid;
  font-size: 14px;
  ${centerContent};
  overflow: visible;
  white-space: nowrap;
  justify-content: end;
  padding-right: 6px;
  ${transition};
`

export const ProjectBudgetVisualization = () => {
  const { allocatedMinutesPerWeek, doneMinutesThisWeek, goal } =
    useCurrentProject()

  const allocation = useProjectDaysAllocation()

  const weekday = useWeekday()

  const { colors } = useTheme()

  const target = allocatedMinutesPerWeek * sum(allocation.slice(0, weekday + 1))

  return (
    <>
      <Fill
        style={{
          width: toPercents(doneMinutesThisWeek / allocatedMinutesPerWeek),
          background: colors.background.toCssValue(),
        }}
      />
      {doneMinutesThisWeek < allocatedMinutesPerWeek && (
        <ProjectBudgetWidgetDays />
      )}
      <Distance
        style={{
          left:
            doneMinutesThisWeek < allocatedMinutesPerWeek
              ? toPercents(
                  doneMinutesThisWeek < target
                    ? doneMinutesThisWeek / allocatedMinutesPerWeek
                    : target / allocatedMinutesPerWeek,
                )
              : undefined,
          right: doneMinutesThisWeek > allocatedMinutesPerWeek ? 6 : undefined,
          width: toPercents(
            target
              ? doneMinutesThisWeek < target
                ? (target - doneMinutesThisWeek) / allocatedMinutesPerWeek
                : (doneMinutesThisWeek - target) / allocatedMinutesPerWeek
              : 0,
          ),
          color: (goal
            ? doneMinutesThisWeek < target
              ? goal === 'doMore'
                ? colors.alert
                : colors.success
              : goal === 'doMore'
                ? colors.success
                : colors.alert
            : colors.text
          ).toCssValue(),
        }}
      >
        {allocatedMinutesPerWeek > doneMinutesThisWeek
          ? `${doneMinutesThisWeek > +target ? '+' : '-'} ${formatDuration(
              Math.abs(target - doneMinutesThisWeek),
              'min',
              { maxUnit: 'h' },
            )}`
          : `+ ${formatDuration(
              doneMinutesThisWeek - allocatedMinutesPerWeek,
              'min',
              { maxUnit: 'h' },
            )}`}
      </Distance>
    </>
  )
}
