import { FixedWidthContent } from '@increaser/app/components/reusable/fixed-width-content'

import { PageTitle } from '@increaser/app/ui/PageTitle'
import { Page } from '@lib/next-ui/Page'
import { TrackedTimeReportProvider } from '@increaser/ui/timeTracking/report/TrackedTimeReportProvider'
import { TrackedTimeReport } from '@increaser/ui/timeTracking/report/TrackedTimeReport'
import { TrackedTimeProvider } from '@increaser/ui/timeTracking/report/TrackedTimeProvider'
import { UserStateOnly } from '../user/state/UserStateOnly'
import {
  RenderTimeTrackingView,
  TimeTrackingViewProvider,
  TimeTrackingViewSelector,
} from './TimeTrackingView'
import styled from 'styled-components'
import { TrackTimeProvider } from './track/TrackTimeProvider'
import { TrackTime } from './track/TrackTime'

const title = 'Time tracking'

const PageContainer = styled(FixedWidthContent)`
  display: flex;
  flex-direction: column;
`

export const TimeTrackingPage: Page = () => {
  return (
    <TimeTrackingViewProvider>
      <PageContainer>
        <PageTitle
          documentTitle={`⏳ ${title}`}
          title={<TimeTrackingViewSelector />}
        />
        <UserStateOnly>
          <RenderTimeTrackingView
            report={() => (
              <TrackedTimeProvider>
                <TrackedTimeReportProvider>
                  <TrackedTimeReport />
                </TrackedTimeReportProvider>
              </TrackedTimeProvider>
            )}
            track={() => (
              <TrackTimeProvider>
                <TrackTime />
              </TrackTimeProvider>
            )}
          />
        </UserStateOnly>
      </PageContainer>
    </TimeTrackingViewProvider>
  )
}
