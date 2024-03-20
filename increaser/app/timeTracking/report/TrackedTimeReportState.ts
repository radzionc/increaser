import { TimeGrouping, TimeFrame } from './TimeGrouping'

export type TrackedTimeReportState = {
  activeProjectId: string | null
  timeGrouping: TimeGrouping
  includeCurrentPeriod: boolean
  timeFrame: TimeFrame
}
