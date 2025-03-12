import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { Button } from '@lib/ui/buttons/Button'
import { hStack, VStack } from '@lib/ui/css/stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { EmptyState } from '@lib/ui/data/empty/EmptyState'
import { ActiveItemIndexProvider } from '@lib/ui/list/ActiveItemIndexProvider'
import { sum } from '@lib/utils/array/sum'
import { PageContent } from '@product/app/ui/page/PageContent'
import { LearnMoreShyAction } from '@product/ui/info/LearnMoreShyAction'
import Link from 'next/link'
import { useMemo } from 'react'
import styled from 'styled-components'

import { getAppPath } from '../../navigation/app'

import { TrackedTimeChart } from './chart/TrackedTimeChart'
import { SessionsChart } from './days/chart/SessionsChart'
import { useDaysView } from './days/state/daysView'
import { NonEmptyIntervalOnly } from './interval/NonEmptyIntervalOnly'
import { SelectedIntervalInfo } from './interval/SelectedIntervalInfo'
import { TrackedTimeInterval } from './interval/TrackedTimeInterval'
import { useTotalIntervalProjectsTimeSeries } from './projects/useTotalIntervalProjectsTimeSeries'
import { useTimeGrouping } from './timeGrouping/state'
import { TrackedTimeSummary } from './TrackedTimeSummary'

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
  const timeGrouping = useTimeGrouping()
  const [view] = useDaysView()

  const timeSeries = useTotalIntervalProjectsTimeSeries()

  const hasData = useMemo(() => {
    return sum(Object.values(timeSeries).flat()) > 0
  }, [timeSeries])

  if (!hasData) {
    return (
      <EmptyState
        title="Start tracking your work time"
        action={
          <>
            <LearnMoreShyAction value="trackTime" />
            <Link href={getAppPath('focus')}>
              <Button as="div" size="s">
                Start a focus session
              </Button>
            </Link>
          </>
        }
      />
    )
  }

  return (
    <ElementSizeAware
      render={({ setElement, size }) => {
        const isSmall =
          size && size.width - contentWidth - gap < navigationWidth
        return (
          <Container ref={setElement}>
            <PageContent>
              {isSmall && <TrackedTimeSummary />}
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
                <TrackedTimeSummary />
              </NavigationContainer>
            )}
          </Container>
        )
      }}
    />
  )
}
