import {
  AppPageProjectsView,
  appPageViews,
  getAppPath,
} from '@increaser/ui/navigation/app'
import { PageTitleNavigation } from '@lib/ui/navigation/PageTitleNavigation'
import { useRouter } from 'next/router'
import { useCurrentPageView } from '../navigation/hooks/useCurrentPageView'

const viewName: Record<AppPageProjectsView, string> = {
  projects: 'Projects',
  plan: 'Plan',
  report: 'Report',
}

export const ProjectsViewSelector = () => {
  const view = useCurrentPageView('projects')
  const { push } = useRouter()

  return (
    <PageTitleNavigation
      value={view}
      options={appPageViews.projects}
      onChange={(view) => push(getAppPath('projects', view))}
      getOptionName={(option) => viewName[option]}
    />
  )
}
