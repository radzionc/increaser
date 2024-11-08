import { hStack, VStack } from '@lib/ui/css/stack'
import { TrackedTimeChart } from './chart/TrackedTimeChart'
import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import styled from 'styled-components'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { PageContent } from '@increaser/app/ui/page/PageContent'
import { TrackedTimeNavigation } from './TrackedTimeNavigation'
import { ActiveItemIndexProvider } from '@lib/ui/list/ActiveItemIndexProvider'
import { TrackedTimeInterval } from './interval/TrackedTimeInterval'
import { SelectedIntervalInfo } from './interval/SelectedIntervalInfo'
import { NonEmptyIntervalOnly } from './interval/NonEmptyIntervalOnly'

const contentWidth = 520
const gap = 40
const navigationWidth = 320

const Container = styled.div`
  ${hStack()};
  width: 100%;
  gap: ${toSizeUnit(gap)};
  align-items: start;
`

const NavigationContainer = styled(VStack)`
  flex: 1;
`

export const TrackedTimeReportContent = () => {
  const sideContent = <TrackedTimeNavigation />
  return (
    <ElementSizeAware
      render={({ setElement, size }) => {
        const isSmall =
          size && size.width - contentWidth - gap < navigationWidth
        return (
          <Container ref={setElement}>
            <PageContent>
              {isSmall && sideContent}
              <VStack gap={16}>
                <NonEmptyIntervalOnly>
                  <SelectedIntervalInfo />
                </NonEmptyIntervalOnly>
                <ActiveItemIndexProvider initialValue={null}>
                  <TrackedTimeChart />
                </ActiveItemIndexProvider>
                <TrackedTimeInterval />
              </VStack>
            </PageContent>
            {!isSmall && (
              <NavigationContainer
                style={{ maxWidth: navigationWidth, minWidth: navigationWidth }}
              >
                {sideContent}
              </NavigationContainer>
            )}
          </Container>
        )
      }}
    />
  )
}
