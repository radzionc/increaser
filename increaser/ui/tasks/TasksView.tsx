import { getViewSetup } from '@lib/ui/view/getViewSetup'
import { PageTitleNavigation } from '@lib/ui/navigation/PageTitleNavigation'

export const tasksViews = ['todo', 'done'] as const
export type TasksView = (typeof tasksViews)[number]

export const {
  ViewProvider: TasksViewProvider,
  useView: useTasksView,
  RenderView: RenderTasksView,
} = getViewSetup<TasksView>({
  defaultView: 'todo',
  name: 'tasks',
})

const taskViewName: Record<TasksView, string> = {
  todo: 'To Do',
  done: 'Done',
}

export const TasksViewSelector = () => {
  const { view, setView } = useTasksView()

  return (
    <PageTitleNavigation
      value={view}
      options={tasksViews}
      onChange={setView}
      getOptionName={(option) => taskViewName[option]}
    />
  )
}
