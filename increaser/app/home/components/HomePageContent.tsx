import { BreakTimeline } from '@increaser/app/break/components/BreakTimeline'
import styled from 'styled-components'
import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { VStack } from '@lib/ui/layout/Stack'

import { hideScrollbars } from '@lib/ui/css/hideScrollbars'
import { useFocus } from '@increaser/ui/focus/FocusContext'
import { FocusSetWidget } from '../../focus/components/FocusSetWidget/FocusSetWidget'
import { FocusTitle } from './FocusTitle'
import { SetsManager } from '@increaser/ui/sets/manager/SetsManager'
import { PageContent } from '../../ui/page/PageContent'
import { FocusLauncher } from '../../focus/launcher/FocusLauncher'

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
  const { session } = useFocus()

  const content = (
    <PageContent>
      {session && <FocusTitle />}
      <VStack style={{ flex: 1 }} gap={40}>
        {session ? (
          <FocusSetWidget />
        ) : (
          <>
            <BreakTimeline />
            <FocusLauncher />
          </>
        )}
      </VStack>
    </PageContent>
  )

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
                  <SetsManager />
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
                  <SetsManager />
                </Container>
              )}
            </VStack>
          )
        }}
      />
    </>
  )
}
