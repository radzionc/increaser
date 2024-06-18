import {
  AppPageTasksView,
  appPageViews,
  getAppPath,
} from '@increaser/ui/navigation/app'
import { PageTitleNavigation } from '@lib/ui/navigation/PageTitleNavigation'
import { useRouter } from 'next/router'
import { useCurrentPageView } from '../navigation/hooks/useCurrentPageView'

const tasksViewName: Record<AppPageTasksView, string> = {
  todo: 'To Do',
  done: 'Done',
  recurring: 'Recurring',
}

export const TasksViewSelector = () => {
  const view = useCurrentPageView('tasks')
  const { push } = useRouter()

  return (
    <PageTitleNavigation
      value={view}
      options={appPageViews.tasks}
      onChange={(view) => push(getAppPath('tasks', view))}
      getOptionName={(option) => tasksViewName[option]}
    />
  )
}
