import { BreakTimeline } from '@increaser/app/break/components/BreakTimeline'
import styled from 'styled-components'
import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { VStack } from '@lib/ui/css/stack'

import { FocusSetWidget } from '../../focus/components/FocusSetWidget/FocusSetWidget'
import { SetsManager } from '@increaser/ui/sets/manager/SetsManager'
import { PageContent } from '../../ui/page/PageContent'
import { FocusLauncher } from '../../focus/launcher/FocusLauncher'
import { ScrollableFlexboxFiller } from '@lib/ui/layout/ScrollableFlexboxFiller'
import { sidebarConfig } from '../../navigation/Sidebar/config'
import { useFocusIntervals } from '../../focus/state/focusIntervals'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  height: 100%;
  gap: 40px;
  overflow: hidden;
  flex: 1;
`

const MobileContent = styled(VStack)`
  width: 100%;
`

export const HomePageContent = () => {
  const [intervals] = useFocusIntervals()

  return (
    <>
      <ElementSizeAware
        render={({ size, setElement }) => {
          const shouldBeInOneColumn = size && size.width < 800

          return (
            <VStack flexGrow ref={setElement}>
              {shouldBeInOneColumn ? (
                <MobileContent gap={40}>
                  <PageContent fullHeight>
                    <VStack flexGrow gap={40}>
                      {intervals ? (
                        <FocusSetWidget />
                      ) : (
                        <>
                          <BreakTimeline />
                          <FocusLauncher />
                        </>
                      )}
                    </VStack>
                  </PageContent>
                  <SetsManager />
                </MobileContent>
              ) : (
                <Container>
                  <PageContent flexGrow fullHeight>
                    <ScrollableFlexboxFiller hideScrollbars>
                      <VStack gap={sidebarConfig.gap}>
                        {intervals ? (
                          <FocusSetWidget />
                        ) : (
                          <>
                            <BreakTimeline />
                            <FocusLauncher />
                          </>
                        )}
                      </VStack>
                    </ScrollableFlexboxFiller>
                  </PageContent>
                  <SetsManager
                    style={{
                      width: 320,
                      flexShrink: 0,
                    }}
                  />
                </Container>
              )}
            </VStack>
          )
        }}
      />
    </>
  )
}
