import { HStack, VStack } from '@increaser/ui/layout/Stack'
import { ManageEndOfWorkday } from './ManageEndOfWorkday'
import { ManageBedTime } from './ManageBedTime'
import { useAssertUserState } from 'user/state/UserStateContext'
import {
  TimeBoundaryDirection,
  TimeBoundaryDistance,
  TimeBoundaryDistanceKind,
} from './TimeBoundaryDistance'
import { ManageStartOfWorkday } from './ManageStartOfWorkday'
import { DayMoments } from '@increaser/entities/User'
import { convertDuration } from '@increaser/utils/time/convertDuration'
import styled from 'styled-components'
import { ElementSizeAware } from '@increaser/ui/base/ElementSizeAware'

const getWorkEndToBedDistanceKind = ({
  goalToGoToBedAt,
  goalToFinishWorkBy,
}: Pick<
  DayMoments,
  'goalToFinishWorkBy' | 'goalToGoToBedAt'
>): TimeBoundaryDistanceKind => {
  const distance = goalToGoToBedAt - goalToFinishWorkBy

  if (distance < convertDuration(2, 'h', 'min')) {
    return 'idle'
  }

  if (distance < convertDuration(1, 'h', 'min')) {
    return 'alert'
  }

  return 'success'
}

const Wrapper = styled.div`
  width: 100%;
`

export const ManageSchedule = () => {
  const { goalToStartWorkAt, goalToFinishWorkBy, goalToGoToBedAt } =
    useAssertUserState()

  const renderContent = (direction: TimeBoundaryDirection) => {
    const content = (
      <>
        <ManageStartOfWorkday />
        <TimeBoundaryDistance
          direction={direction}
          kind="regular"
          value={goalToFinishWorkBy - goalToStartWorkAt}
        />
        <ManageEndOfWorkday />
        <TimeBoundaryDistance
          direction={direction}
          kind={getWorkEndToBedDistanceKind({
            goalToFinishWorkBy,
            goalToGoToBedAt,
          })}
          value={goalToGoToBedAt - goalToFinishWorkBy}
        />
        <ManageBedTime />
      </>
    )

    if (direction === 'row') {
      return (
        <HStack fullWidth wrap="wrap" alignItems="center" gap={16}>
          {content}
        </HStack>
      )
    }

    return (
      <VStack gap={8} alignItems="center" style={{ height: 320 }}>
        {content}
      </VStack>
    )
  }

  return (
    <ElementSizeAware
      render={({ size, setElement }) => (
        <Wrapper ref={setElement}>
          {renderContent(size && size.width < 800 ? 'column' : 'row')}
        </Wrapper>
      )}
    />
  )
}
