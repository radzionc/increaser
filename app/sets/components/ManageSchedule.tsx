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

const Wrapper = styled.div`
  width: 100%;
`

const gridMinWidth = 520

const Grid = styled.div`
  display: grid;
  gap: 8px;
  grid-template-rows: min-content 80px min-content;
  grid-template-columns: min-content 1fr min-content;
  width: 100%;
  max-width: 580px;
`

export const ManageSchedule = () => {
  const {
    goalToWakeUpAt,
    goalToStartWorkAt,
    goalToFinishWorkBy,
    goalToGoToBedAt,
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
            </VStack>
          ) : (
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
          )}
        </Wrapper>
      )}
    />
  )
}
