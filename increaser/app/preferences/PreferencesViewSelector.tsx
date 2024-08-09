import {
  AppPagePreferencesView,
  appPageViews,
  getAppPath,
} from '@increaser/ui/navigation/app'
import { PageTitleNavigation } from '@lib/ui/navigation/PageTitleNavigation'
import { useRouter } from 'next/router'
import { useCurrentPageView } from '../navigation/hooks/useCurrentPageView'

const viewName: Record<AppPagePreferencesView, string> = {
  schedule: 'Schedule',
  ['work-budget']: 'Work Budget',
}

export const PreferencesViewSelector = () => {
  const view = useCurrentPageView('preferences')
  const { push } = useRouter()

  return (
    <PageTitleNavigation
      value={view}
      options={appPageViews.preferences}
      onChange={(view) => push(getAppPath('preferences', view))}
      getOptionName={(option) => viewName[option]}
    />
  )
}
