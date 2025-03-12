import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { centerContent } from '@lib/ui/css/centerContent'
import { HStack } from '@lib/ui/css/stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import { getColor } from '@lib/ui/theme/getters'
import { useWeekdayPassedInterval } from '@lib/ui/time/hooks/useWeekdayPassedInterval'
import { useSelectedWeekday } from '@lib/ui/time/SelectedWeekdayProvider'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { order } from '@lib/utils/array/order'
import { getGapsBetweenIntervals } from '@lib/utils/interval/getGapsBetweenIntervals'
import { getIntervalDuration } from '@lib/utils/interval/getIntervalDuration'
import { Interval } from '@lib/utils/interval/Interval'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { otherProjectId } from '@product/entities/Project'
import { useWeekdaySets } from '@product/ui/sets/hooks/useWeekdaySets'
import styled from 'styled-components'

import { useLastSetsSnapshot } from '../../hooks/useLastSetsSnapshot'
import { useActiveSet } from '../ActiveSetProvider'

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
  const lastSnapshotAt = useLastSetsSnapshot()
  const [, setActiveSet] = useActiveSet()
  const [weekday] = useSelectedWeekday()
  const sets = useWeekdaySets(weekday)
  const dayInterval = useWeekdayPassedInterval(weekday)

  if (dayInterval.start < lastSnapshotAt) return null

  return (
    <Container
      onClick={() => {
        const gaps: Interval[] = [
          {
            start: dayInterval.start,
            end: isEmpty(sets) ? dayInterval.end : sets[0].start,
          },
          ...getGapsBetweenIntervals(sets),
        ]
        if (!isEmpty(sets)) {
          gaps.push({
            start: getLastItem(sets).end,
            end: dayInterval.end,
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
