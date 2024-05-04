import { FixedWidthContent } from '@increaser/app/components/reusable/fixed-width-content'

import { PageTitle } from '@increaser/app/ui/PageTitle'
import { Page } from '@lib/next-ui/Page'
import { TrackedTimeReportProvider } from './report/TrackedTimeReportProvider'
import { TrackedTimeReport } from './report/TrackedTimeReport'
import { UserStateOnly } from '../user/state/UserStateOnly'
import { TrackedTimeProvider } from './report/TrackedTimeProvider'
import {
  RenderTimeTrackingView,
  TimeTrackingViewProvider,
  TimeTrackingViewSelector,
} from './TimeTrackingView'
import { TrackTimeView } from './track/TrackTimeView'

const title = 'Time tracking'

export const TimeTrackingPage: Page = () => {
  return (
    <TimeTrackingViewProvider>
      <FixedWidthContent>
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
            track={() => <TrackTimeView />}
          />
        </UserStateOnly>
      </FixedWidthContent>
    </TimeTrackingViewProvider>
  )
}
