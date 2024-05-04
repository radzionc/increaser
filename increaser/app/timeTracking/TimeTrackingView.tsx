import { getViewSetup } from '@lib/ui/view/getViewSetup'
import { PageTitleNavigation } from '@lib/ui/navigation/PageTitleNavigation'

export const timeTrackingViews = ['report', 'track'] as const
export type TimeTrackingView = (typeof timeTrackingViews)[number]

export const {
  ViewProvider: TimeTrackingViewProvider,
  useView: useTimeTrackingView,
  RenderView: RenderTimeTrackingView,
} = getViewSetup<TimeTrackingView>({
  defaultView: 'report',
  name: 'TimeTracking',
})

const timeTrackingViewName: Record<TimeTrackingView, string> = {
  report: 'Statistics',
  track: 'Track',
}

export const TimeTrackingViewSelector = () => {
  const { view, setView } = useTimeTrackingView()

  return (
    <PageTitleNavigation
      value={view}
      options={timeTrackingViews}
      onChange={setView}
      getOptionName={(option) => timeTrackingViewName[option]}
    />
  )
}
