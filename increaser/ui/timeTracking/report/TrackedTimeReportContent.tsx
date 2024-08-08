import { HStack, VStack } from '@lib/ui/layout/Stack'
import { ProjectsDistributionBreakdown } from './ProjectsDistributionBreakdown'
import { TrackedTimeChart } from './TrackedTimeChart/TrackedTimeChart'
import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import styled from 'styled-components'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { PageContent } from '@increaser/app/ui/page/PageContent'

const contentWidth = 560
const gap = 40
const navigationWidth = 320

const Container = styled(HStack)`
  width: 100%;
  gap: ${toSizeUnit(gap)};
  align-items: start;
`

const NavigationContainer = styled(VStack)`
  position: sticky;
  top: 0;
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
                <ProjectsDistributionBreakdown />
              </NavigationContainer>
            )}
            <PageContent>
              {isSmall && <ProjectsDistributionBreakdown />}
              <TrackedTimeChart />
            </PageContent>
          </Container>
        )
      }}
    />
  )
}
