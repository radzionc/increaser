import { ManageEndOfWorkday } from './ManageEndOfWorkday'
import { ManageBedTime } from './ManageBedTime'
import { useAssertUserState } from 'user/state/UserStateContext'
import { TimeBoundaryDistance } from './TimeBoundaryDistance'
import { ManageStartOfWorkday } from './ManageStartOfWorkday'
import { convertDuration } from '@increaser/utils/time/convertDuration'
import styled from 'styled-components'
import { ElementSizeAware } from '@increaser/ui/base/ElementSizeAware'
import { ManageWakeUp } from './ManageWakeUp'
import { VStack } from '@increaser/ui/layout/Stack'
import { ManageFirstMealStartsAt } from './ManageFirstMeal'
import { ManageLastMealStartsAt } from './ManageLastMealStartsAt'

const Wrapper = styled.div`
  flex: 1;
`

const gridMinWidth = 520

const Grid = styled.div`
  display: grid;
  gap: 8px;
  grid-template-rows: min-content 80px min-content 80px min-content;
  grid-template-columns: min-content 1fr min-content;
  width: 100%;
`

export const ManageSchedule = () => {
  const {
    wakeUpAt,
    startWorkAt,
    finishWorkAt,
    goToBedAt,
    firstMealAt,
    lastMealAt,
  } = useAssertUserState()

  return (
    <ElementSizeAware
      render={({ setElement, size }) => (
        <Wrapper ref={setElement}>
          {size && size.width < gridMinWidth ? (
            <VStack gap={16}>
              <ManageWakeUp />
              <ManageStartOfWorkday />
              <ManageFirstMealStartsAt />
              <ManageEndOfWorkday />
              <ManageLastMealStartsAt />
              <ManageBedTime />
            </VStack>
          ) : (
            <VStack fullWidth gap={40}>
              <Grid>
                <ManageStartOfWorkday />
                <TimeBoundaryDistance
                  direction="right"
                  value={finishWorkAt - startWorkAt}
                />
                <ManageEndOfWorkday />
                <TimeBoundaryDistance
                  direction="up"
                  value={startWorkAt - wakeUpAt}
                />
                <div />
                <TimeBoundaryDistance
                  direction="down"
                  value={goToBedAt - finishWorkAt}
                />
                <ManageWakeUp />
                <TimeBoundaryDistance
                  direction="left"
                  value={
                    convertDuration(24, 'h', 'min') - (goToBedAt - wakeUpAt)
                  }
                />
                <ManageBedTime />
                <TimeBoundaryDistance
                  direction="down"
                  value={firstMealAt - wakeUpAt}
                />
                <div />
                <TimeBoundaryDistance
                  direction="up"
                  value={goToBedAt - lastMealAt}
                />
                <ManageFirstMealStartsAt />
                <TimeBoundaryDistance
                  direction="right"
                  value={lastMealAt - firstMealAt}
                />
                <ManageLastMealStartsAt />
              </Grid>
            </VStack>
          )}
        </Wrapper>
      )}
    />
  )
}
