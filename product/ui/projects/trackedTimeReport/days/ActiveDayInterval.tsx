import { hStack, VStack } from '@lib/ui/css/stack'
import { useActiveItemIndex } from '@lib/ui/list/ActiveItemIndexProvider'
import { usePresentState } from '@lib/ui/state/usePresentState'
import { text } from '@lib/ui/text'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { formatDailyEventTime } from '@lib/utils/time/formatDailyEventTime'
import styled from 'styled-components'

import { useSetsGroupedByDays } from './state/setsGroupedByDays'

const Row = styled.div`
  ${hStack({
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
  })}

  > * {
    &:first-child {
      ${text({
        color: 'supporting',
        weight: 600,
      })};
    }

    &:last-child {
      ${text({
        color: 'contrast',
        weight: 600,
      })};
    }
  }
`

export const ActiveDayInterval = () => {
  const [index] = usePresentState(useActiveItemIndex())
  const days = useSetsGroupedByDays()

  const day = days[index]

  if (isEmpty(day)) {
    return null
  }

  const { start } = day[0]
  const { end } = getLastItem(day)

  return (
    <VStack gap={4}>
      <Row>
        <span>Started at</span>
        <span>{formatDailyEventTime(start)}</span>
      </Row>
      <Row>
        <span>Finished at</span>
        <span>{formatDailyEventTime(end)}</span>
      </Row>
    </VStack>
  )
}
