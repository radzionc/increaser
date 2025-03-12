import { ChildrenProp } from '@lib/ui/props'
import { useCurrentPageView } from '@product/app/navigation/hooks/useCurrentPageView'
import { TimeGroupingProvider } from '@product/ui/projects/trackedTimeReport/timeGrouping/state'

export const TimesheetPageTimeGroupingProvider = ({
  children,
}: ChildrenProp) => {
  const value = useCurrentPageView('timesheet')

  return <TimeGroupingProvider value={value}>{children}</TimeGroupingProvider>
}
