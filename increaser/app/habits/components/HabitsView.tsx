import { getViewSetup } from '@lib/ui/view/getViewSetup'
import { PageTitleNavigation } from '@lib/ui/navigation/PageTitleNavigation'

export const habitViews = ['my', 'explore'] as const
export type HabitsView = (typeof habitViews)[number]

export const {
  ViewProvider: HabitsViewProvider,
  useView: useHabitsView,
  RenderView: RenderHabitsView,
} = getViewSetup<HabitsView>({
  defaultView: 'my',
  name: 'habits',
})

const habitViewName: Record<HabitsView, string> = {
  my: 'My Habits',
  explore: 'Curated Habits',
}

export const HabitsViewSelector = () => {
  const { view, setView } = useHabitsView()

  return (
    <PageTitleNavigation
      value={view}
      options={habitViews}
      onChange={setView}
      getOptionName={(option) => habitViewName[option]}
    />
  )
}
