import { useSelectedWeekday } from '@lib/ui/time/SelectedWeekdayProvider'
import { useIsWeekdaySetsEditable } from '../../hooks/useIsWeekdaySetsEditable'
import styled from 'styled-components'
import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { centerContent } from '@lib/ui/css/centerContent'
import { getColor } from '@lib/ui/theme/getters'
import { HStack } from '@lib/ui/layout/Stack'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import { useActiveSet } from './ActiveSetProvider'
import { useWeekdaySets } from '@increaser/ui/sets/hooks/useWeekdaySets'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { useStartOfWeekday } from '@lib/ui/time/hooks/useStartOfWeekday'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { Interval } from '@lib/utils/interval/Interval'
import { getGapsBetweenIntervals } from '@lib/utils/interval/getGapsBetweenIntervals'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { getIntervalDuration } from '@lib/utils/interval/getIntervalDuration'
import { order } from '@lib/utils/array/order'
import { otherProjectId } from '@increaser/entities/Project'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { dayOverviewConfig } from './config'

const Container = styled(UnstyledButton)`
  ${verticalPadding(0)};
  height: ${toSizeUnit(dayOverviewConfig.interactiveSectionHeight)};
  ${centerContent};

  font-size: 14px;
  font-weight: 500;

  &:hover {
    color: ${getColor('contrast')};
    background: ${getColor('mist')};
  }
`

export const AddSetPrompt = () => {
  const [selectedWeekday] = useSelectedWeekday()
  const isEditable = useIsWeekdaySetsEditable(selectedWeekday)
  const [, setActiveSet] = useActiveSet()
  const [weekday] = useSelectedWeekday()
  const sets = useWeekdaySets(weekday)
  const dayStartedAt = useStartOfWeekday(weekday)

  if (!isEditable) return null

  return (
    <Container
      onClick={() => {
        const now = Date.now()

        const gaps: Interval[] = [
          {
            start: dayStartedAt,
            end: isEmpty(sets) ? now : sets[0].start,
          },
          ...getGapsBetweenIntervals(sets),
        ]
        if (!isEmpty(sets)) {
          gaps.push({
            start: getLastItem(sets).end,
            end: now,
          })
        }

        const sufficientGap = gaps
          .toReversed()
          .find(
            (gap) =>
              getIntervalDuration(gap) >= convertDuration(15, 'min', 'ms'),
          )
        const gap = sufficientGap ?? order(gaps, getIntervalDuration, 'desc')[0]

        const end = gap.end

        const start = Math.max(
          gap.start,
          end - convertDuration(30, 'min', 'ms'),
        )

        setActiveSet({
          start,
          end,
          projectId: otherProjectId,
        })
      }}
    >
      <HStack alignItems="center" gap={8}>
        <PlusIcon />
        Add a session
      </HStack>
    </Container>
  )
}
