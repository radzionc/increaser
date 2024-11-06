import { useCurrentPageView } from '@increaser/app/navigation/hooks/useCurrentPageView'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { TimeGroupingProvider } from '@increaser/ui/projects/trackedTimeReport/timeGrouping/state'

export const TimesheetPageTimeGroupingProvider = ({
  children,
}: ComponentWithChildrenProps) => {
  const value = useCurrentPageView('timesheet')

  return <TimeGroupingProvider value={value}>{children}</TimeGroupingProvider>
}
