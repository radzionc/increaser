import { useActiveItemIndex } from '@lib/ui/list/ActiveItemIndexProvider'
import { usePresentState } from '@lib/ui/state/usePresentState'
import { useSetsGroupedByDays } from './state/setsGroupedByDays'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { getLastItem } from '@lib/utils/array/getLastItem'
import styled from 'styled-components'
import { hStack, VStack } from '@lib/ui/css/stack'
import { formatDailyEventTime } from '@lib/utils/time/formatDailyEventTime'
import { text } from '@lib/ui/text'

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
