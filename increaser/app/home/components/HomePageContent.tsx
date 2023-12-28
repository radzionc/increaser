import { BreakTimeline } from '@increaser/app/break/components/BreakTimeline'
import { FocusSessionForm } from '@increaser/app/focus/components/FocusSessionForm'
import { CheckTodayHabits } from '@increaser/app/habits/components/CheckDayHabits/CheckTodayHabits'
import { useTodaySets } from '@increaser/app/sets/hooks/useTodaySets'
import styled from 'styled-components'
import { TasksView } from '@increaser/app/tasks/components/TasksView'
import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { Panel } from '@lib/ui/panel/Panel'
import { SeparatedByLine } from '@lib/ui/layout/SeparatedByLine'
import { VStack } from '@lib/ui/layout/Stack'
import { AllocationOnboarding } from '@increaser/app/weekTimeAllocation/components/AllocationOnboarding'

import { NoSetsHomeTitle } from './NoSetsHomeTitle'
import { useFocus } from '@increaser/app/focus/hooks/useFocus'
import { DayOverview } from '@increaser/app/sets/components/DayOverview'
import { SubmitYesterdayHabits } from '@increaser/app/habits/components/SubmitYesterdayHabits'
import { hideScrollbars } from '@lib/ui/css/hideScrollbars'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 40px;
  height: 100%;
  overflow: hidden;

  > * {
    &:first-child {
      // here's the overflow problem
      max-height: 100%;
      overflow: auto;
      flex: 1;
      ${hideScrollbars};
    }
  }

  > * {
    &:last-child {
      width: 320px;
    }
  }
`

const MobileContent = styled(VStack)`
  width: 100%;
`

export const HomePageContent = () => {
  const todaySets = useTodaySets()
  const { currentSet } = useFocus()

  const content = (
    <VStack>
      {!todaySets.length && <NoSetsHomeTitle />}
      <VStack gap={40}>
        {currentSet ? null : (
          <>
            <BreakTimeline />
            <FocusSessionForm />
          </>
        )}
        <SubmitYesterdayHabits />
        <Panel kind="secondary">
          <SeparatedByLine gap={20}>
            <TasksView />
            <CheckTodayHabits />
          </SeparatedByLine>
        </Panel>
      </VStack>
    </VStack>
  )

  const overview = <DayOverview />

  return (
    <>
      <AllocationOnboarding />
      <ElementSizeAware
        render={({ size, setElement }) => {
          const shouldBeInOneColumn = size && size.width < 800

          return (
            <VStack fullWidth fullHeight ref={setElement}>
              {shouldBeInOneColumn ? (
                <MobileContent gap={40}>
                  {content}
                  {overview}
                </MobileContent>
              ) : (
                <Container>
                  <VStack
                    fullHeight
                    fullWidth
                    style={{ position: 'relative', padding: 1 }}
                  >
                    {content}
                  </VStack>
                  {overview}
                </Container>
              )}
            </VStack>
          )
        }}
      />
    </>
  )
}
