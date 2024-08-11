import { HStack, VStack } from '@lib/ui/layout/Stack'
import { TrackedTimeChart } from './chart/TrackedTimeChart'
import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import styled from 'styled-components'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { PageContent } from '@increaser/app/ui/page/PageContent'
import { TrackedTimeNavigation } from './TrackedTimeNavigation'
import { TrackedTimeStats } from './TrackedTimeStats'
import { ActiveItemIndexProvider } from '@lib/ui/list/ActiveItemIndexProvider'

const contentWidth = 520
const gap = 40
const navigationWidth = 320

const Container = styled(HStack)`
  width: 100%;
  gap: ${toSizeUnit(gap)};
  align-items: start;
`

const NavigationContainer = styled(VStack)`
  flex: 1;
`

export const TrackedTimeReportContent = () => {
  return (
    <ElementSizeAware
      render={({ setElement, size }) => {
        const isSmall =
          size && size.width - contentWidth - gap < navigationWidth
        return (
          <Container ref={setElement}>
            {!isSmall && (
              <NavigationContainer
                style={{ maxWidth: navigationWidth, minWidth: navigationWidth }}
              >
                <TrackedTimeNavigation />
              </NavigationContainer>
            )}
            <PageContent>
              {isSmall && <TrackedTimeNavigation />}
              <VStack gap={40}>
                <TrackedTimeStats />
                <ActiveItemIndexProvider initialValue={null}>
                  <TrackedTimeChart />
                </ActiveItemIndexProvider>
              </VStack>
            </PageContent>
          </Container>
        )
      }}
    />
  )
}
