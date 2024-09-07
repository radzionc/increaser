import { BreakTimeline } from '@increaser/app/break/components/BreakTimeline'
import styled from 'styled-components'
import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { VStack } from '@lib/ui/css/stack'

import { useFocus } from '@increaser/ui/focus/FocusContext'
import { FocusSetWidget } from '../../focus/components/FocusSetWidget/FocusSetWidget'
import { FocusTitle } from './FocusTitle'
import { SetsManager } from '@increaser/ui/sets/manager/SetsManager'
import { PageContent } from '../../ui/page/PageContent'
import { FocusLauncher } from '../../focus/launcher/FocusLauncher'
import { ScrollableFlexboxFiller } from '@lib/ui/layout/ScrollableFlexboxFiller'

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
  const { intervals } = useFocus()

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
                    {intervals && <FocusTitle />}
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
                  <PageContent fullHeight>
                    {intervals && <FocusTitle />}
                    <VStack flexGrow gap={40}>
                      {intervals ? (
                        <FocusSetWidget />
                      ) : (
                        <>
                          <BreakTimeline />
                          <ScrollableFlexboxFiller>
                            <FocusLauncher />
                          </ScrollableFlexboxFiller>
                        </>
                      )}
                    </VStack>
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
