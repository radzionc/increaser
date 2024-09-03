import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { convertDuration } from '@lib/utils/time/convertDuration'
import styled from 'styled-components'
import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { VStack } from '@lib/ui/css/stack'
import { ManageDayMoment } from './ManageDayMoment'
import { TimeDistance } from '@lib/ui/time/TimeDistance'

const Wrapper = styled.div``

const gridMinWidth = 520

const Grid = styled.div`
  display: grid;
  gap: 20px 8px;
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

  const manageWakeUp = (
    <ManageDayMoment
      dayMoment="wakeUpAt"
      min={convertDuration(4, 'h', 'min')}
      max={startWorkAt}
    />
  )

  const manageStartWork = (
    <ManageDayMoment
      dayMoment="startWorkAt"
      min={wakeUpAt}
      max={finishWorkAt}
    />
  )

  const manageFirstMeal = (
    <ManageDayMoment dayMoment="firstMealAt" min={wakeUpAt} max={lastMealAt} />
  )

  const manageFinishWork = (
    <ManageDayMoment
      dayMoment="finishWorkAt"
      min={startWorkAt}
      max={goToBedAt}
    />
  )

  const manageLastMeal = (
    <ManageDayMoment dayMoment="lastMealAt" min={firstMealAt} max={goToBedAt} />
  )

  const manageBedTime = (
    <ManageDayMoment
      dayMoment="goToBedAt"
      min={finishWorkAt}
      max={convertDuration(1, 'd', 'min')}
    />
  )

  return (
    <ElementSizeAware
      render={({ setElement, size }) => (
        <Wrapper ref={setElement}>
          {size && size.width < gridMinWidth ? (
            <VStack gap={16}>
              {manageWakeUp}
              {manageStartWork}
              {manageFirstMeal}
              {manageFinishWork}
              {manageLastMeal}
              {manageBedTime}
            </VStack>
          ) : (
            <VStack fullWidth gap={40}>
              <Grid>
                {manageStartWork}
                <TimeDistance
                  direction="right"
                  value={finishWorkAt - startWorkAt}
                />
                {manageFinishWork}
                {manageWakeUp}
                <VStack gap={4}>
                  <TimeDistance
                    direction="right"
                    value={goToBedAt - wakeUpAt}
                  />
                  {/* <TimeDistance
                    direction="left"
                    value={
                      convertDuration(1, 'd', 'min') - (goToBedAt - wakeUpAt)
                    }
                  /> */}
                </VStack>
                {manageBedTime}
                {manageFirstMeal}
                <TimeDistance
                  direction="right"
                  value={lastMealAt - firstMealAt}
                />
                {manageLastMeal}
              </Grid>
            </VStack>
          )}
        </Wrapper>
      )}
    />
  )
}
