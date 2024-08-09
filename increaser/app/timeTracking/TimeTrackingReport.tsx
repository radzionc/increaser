import { TrackedTimeProvider } from '@increaser/ui/timeTracking/report/TrackedTimeProvider'
import { TrackedTimeReport } from '@increaser/ui/timeTracking/report/TrackedTimeReport'
import { TrackedTimeReportProvider } from '@increaser/ui/timeTracking/report/TrackedTimeReportProvider'
import React from 'react'

export const TimeTrackingReport = () => {
  return (
    <TrackedTimeProvider>
      <TrackedTimeReportProvider>
        <TrackedTimeReport />
      </TrackedTimeReportProvider>
    </TrackedTimeProvider>
  )
}
