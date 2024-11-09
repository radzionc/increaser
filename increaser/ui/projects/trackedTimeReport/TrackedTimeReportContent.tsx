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
import { useTimeGrouping } from './timeGrouping/state'
import { useDaysView } from './days/state/daysView'
import { SessionsChart } from './days/chart/SessionsChart'

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
  const timeGrouping = useTimeGrouping()
  const [view] = useDaysView()

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
                  {view === 'sessions' && timeGrouping === 'day' ? (
                    <SessionsChart />
                  ) : (
                    <TrackedTimeChart />
                  )}
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
