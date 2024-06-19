import { BreakTimeline } from '@increaser/app/break/components/BreakTimeline'
import styled from 'styled-components'
import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { VStack } from '@lib/ui/layout/Stack'

import { HomePageTitle } from './HomePageTitle'
import { DayOverview } from '@increaser/app/sets/components/DayOverview'
import { hideScrollbars } from '@lib/ui/css/hideScrollbars'
import { useFocus } from '@increaser/ui/focus/FocusContext'
import { FocusSetWidget } from '../../focus/components/FocusSetWidget/FocusSetWidget'
import { EditAutoStoppedSetPrompt } from '@increaser/ui/focus/EditAutoStoppedSetPrompt'
import { FocusLauncherForm } from '../../focus/launcher/FocusLauncherForm'

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
  const { currentSet } = useFocus()

  const content = (
    <VStack style={{ flex: 1 }}>
      <HomePageTitle />
      <VStack style={{ flex: 1 }} gap={40}>
        {currentSet ? (
          <FocusSetWidget />
        ) : (
          <>
            <BreakTimeline />
            <EditAutoStoppedSetPrompt />
            <FocusLauncherForm />
          </>
        )}
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
