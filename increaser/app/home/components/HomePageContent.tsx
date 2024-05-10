import { BreakTimeline } from '@increaser/app/break/components/BreakTimeline'
import { useTodaySets } from '@increaser/app/sets/hooks/useTodaySets'
import styled from 'styled-components'
import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { VStack } from '@lib/ui/layout/Stack'

import { NoSetsHomeTitle } from './NoSetsHomeTitle'
import { DayOverview } from '@increaser/app/sets/components/DayOverview'
import { SubmitYesterdayHabits } from '@increaser/app/habits/components/SubmitYesterdayHabits'
import { hideScrollbars } from '@lib/ui/css/hideScrollbars'
import { useFocus } from '@increaser/ui/focus/FocusContext'
import { FocusLauncher } from '../../focus/launcher'

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
            <FocusLauncher />
          </>
        )}
        <SubmitYesterdayHabits />
      </VStack>
    </VStack>
  )

  const overview = <DayOverview />

  return (
    <>
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
