import { TrackedTimeProvider } from '@increaser/ui/timeTracking/report/TrackedTimeProvider'
import { TrackedTimeReport } from '@increaser/ui/timeTracking/report/TrackedTimeReport'
import React from 'react'

export const TimeTrackingReport = () => {
  return (
    <TrackedTimeProvider>
      <TrackedTimeReport />
    </TrackedTimeProvider>
  )
}
