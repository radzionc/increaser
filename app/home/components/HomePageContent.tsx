import { BreakTimeline } from 'break/components/BreakTimeline'
import { FocusSessionForm } from 'focus/components/FocusSessionForm'
import { CheckTodayHabits } from 'habits/components/CheckDayHabits/CheckTodayHabits'
import { CreateSet } from 'sets/components/CreateSet'
import { TodayTimeline } from 'sets/components/TodayTimeline'
import { useTodaySets } from 'sets/hooks/useTodaySets'
import styled from 'styled-components'
import { TasksView } from 'tasks/components/TasksView'
import { ElementSizeAware } from '@increaser/ui/ui/ElementSizeAware'
import { Panel } from '@increaser/ui/ui/Panel/Panel'
import { SeparatedByLine } from '@increaser/ui/ui/SeparatedByLine'
import { VStack } from '@increaser/ui/ui/Stack'
import { hideScrollbarsCSS } from '@increaser/ui/ui/utils/hideScrollbarsCSS'
import { AllocationOnboarding } from 'weekTimeAllocation/components/AllocationOnboarding'

import { NoSetsHomeTitle } from './NoSetsHomeTitle'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 40px;
  height: 100%;
  overflow: hidden;

  > * {
    :first-child {
      // here's the overflow problem
      max-height: 100%;
      overflow: auto;
      flex: 1;
      ${hideScrollbarsCSS};
    }
  }

  > * {
    :last-child {
      width: 320px;
    }
  }
`

const MobileContent = styled(VStack)`
  width: 100%;
`

export const HomePageContent = () => {
  const todaySets = useTodaySets()

  const content = (
    <VStack>
      {!todaySets.length && <NoSetsHomeTitle />}
      <VStack gap={40}>
        <BreakTimeline />
        <FocusSessionForm />
        <Panel kind="secondary">
          <SeparatedByLine gap={20}>
            <TasksView />
            <CheckTodayHabits />
          </SeparatedByLine>
        </Panel>
      </VStack>
    </VStack>
  )

  const timeline = <TodayTimeline footer={<CreateSet />} />

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
                  {timeline}
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
                  {timeline}
                </Container>
              )}
            </VStack>
          )
        }}
      />
    </>
  )
}
