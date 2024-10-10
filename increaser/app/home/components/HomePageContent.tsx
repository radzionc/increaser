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
import { useTodaySets } from '../../sets/hooks/useTodaySets'
import { PageHeader } from '../../ui/page/header/PageHeader'
import { PageTitle } from '@lib/ui/text/PageTitle'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { Header } from '@lib/ui/layout/Header'
import { ProductToolEducationPrompt } from '@increaser/ui/education/components/ProductToolEducationPrompt'
import { productToolEducationRecord } from '@increaser/ui/education/productToolEducationRecord'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'

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

  const todaySets = useTodaySets()

  const content = (
    <>
      {isEmpty(todaySets) ? (
        <PageHeader>
          <Header>
            <PageTitle>Start a focus session</PageTitle>
            <ProductToolEducationPrompt
              value={shouldBePresent(productToolEducationRecord.focus)}
            />
          </Header>
        </PageHeader>
      ) : (
        <BreakTimeline />
      )}

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
                    <VStack flexGrow gap={40}>
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
