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
  grid-template-rows: min-content 80px min-content;
  grid-template-columns: min-content 1fr min-content;
  width: 100%;
`

export const ManageSchedule = () => {
  const {
    goalToWakeUpAt,
    goalToStartWorkAt,
    goalToFinishWorkBy,
    goalToGoToBedAt,
    firstMealStartsAt,
    lastMealStartsAt,
  } = useAssertUserState()

  return (
    <ElementSizeAware
      render={({ setElement, size }) => (
        <Wrapper ref={setElement}>
          {size && size.width < gridMinWidth ? (
            <VStack gap={16}>
              <ManageWakeUp />
              <ManageStartOfWorkday />
              <ManageBedTime />
              <ManageEndOfWorkday />
              <ManageFirstMealStartsAt />
              <ManageLastMealStartsAt />
            </VStack>
          ) : (
            <VStack fullWidth gap={40}>
              <Grid>
                <ManageWakeUp />
                <TimeBoundaryDistance
                  direction="right"
                  value={goalToStartWorkAt - goalToWakeUpAt}
                />
                <ManageStartOfWorkday />
                <TimeBoundaryDistance
                  direction="up"
                  value={
                    convertDuration(24, 'h', 'min') -
                    (goalToGoToBedAt - goalToWakeUpAt)
                  }
                />
                <div />
                <TimeBoundaryDistance
                  direction="down"
                  value={goalToFinishWorkBy - goalToStartWorkAt}
                />
                <ManageBedTime />
                <TimeBoundaryDistance
                  direction="left"
                  value={goalToGoToBedAt - goalToFinishWorkBy}
                />
                <ManageEndOfWorkday />
              </Grid>
              <Grid style={{ gridTemplateRows: '1fr' }}>
                <ManageFirstMealStartsAt />
                <TimeBoundaryDistance
                  direction="right"
                  value={lastMealStartsAt - firstMealStartsAt}
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
