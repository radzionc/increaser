import { getViewSetup } from '@lib/ui/view/getViewSetup'
import { ViewSelector } from '@lib/ui/inputs/Select/ViewSelector'

export const habitViews = ['form', 'ideas'] as const
export type HabitView = (typeof habitViews)[number]

export const {
  ViewProvider: HabitViewProvider,
  useView: useHabitView,
  RenderView: RenderHabitView,
} = getViewSetup<HabitView>('ideas', 'HabitView')

const habitViewName: Record<HabitView, string> = {
  form: 'Your Habit',
  ideas: 'Habit Ideas',
}

export const HabitViewSelector = () => {
  const { view, setView } = useHabitView()

  return (
    <ViewSelector
      options={habitViews}
      getName={(option) => habitViewName[option]}
      selectedOption={view}
      onSelect={setView}
      groupName="habit-view"
    />
  )
}
