import { getAppPath } from '@increaser/ui/navigation/app'
import { PageTitleNavigation } from '@lib/ui/navigation/PageTitleNavigation'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { useRouter } from 'next/router'

export const timeTrackingViews = ['report', 'track'] as const
export type TimeTrackingView = (typeof timeTrackingViews)[number]

const timeTrackingViewName: Record<TimeTrackingView, string> = {
  report: 'Statistics',
  track: 'Track',
}

export const TimeTrackingViewSelector = () => {
  const { pathname, push } = useRouter()

  const view = getLastItem(pathname.split('/')) as TimeTrackingView

  return (
    <PageTitleNavigation
      value={view}
      options={timeTrackingViews}
      onChange={(view) => push(getAppPath('timeTracking', view))}
      getOptionName={(option) => timeTrackingViewName[option]}
    />
  )
}
