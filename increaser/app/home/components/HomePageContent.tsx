import styled from 'styled-components'
import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { VStack } from '@lib/ui/css/stack'

import { SetsManager } from '@increaser/ui/sets/manager/SetsManager'
import { PageContent } from '../../ui/page/PageContent'
import { FocusLauncher } from '@increaser/ui/focus/launcher/FocusLauncher'
import { ScrollableFlexboxFiller } from '@lib/ui/layout/ScrollableFlexboxFiller'
import { sidebarConfig } from '../../navigation/Sidebar/config'
import { PageHeader } from '../../ui/page/header/PageHeader'
import { Header } from '@lib/ui/layout/Header'
import { useFocusIntervals } from '@increaser/ui/focus/state/focusIntervals'
import { FocusSetWidget } from '@increaser/ui/focus/FocusSetWidget/FocusSetWidget'
import { HomePageTitle } from './HomePageTitle'
import { HomePageTitleAction } from './HomePageTitleAction'

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

  const content = (
    <>
      <PageHeader>
        <Header>
          <HomePageTitle />
          <HomePageTitleAction />
        </Header>
      </PageHeader>

      <FocusLauncher />
    </>
  )

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
                    <VStack style={{ position: 'relative' }} flexGrow gap={40}>
                      {intervals ? <FocusSetWidget /> : content}
                    </VStack>
                  </PageContent>
                  <SetsManager />
                </MobileContent>
              ) : (
                <Container>
                  <PageContent flexGrow fullHeight>
                    <ScrollableFlexboxFiller hideScrollbars>
                      <VStack gap={sidebarConfig.gap}>
                        {intervals ? <FocusSetWidget /> : content}
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
