import {
  AppPageHabitsView,
  appPageViews,
  getAppPath,
} from '@increaser/ui/navigation/app'
import { PageTitleNavigation } from '@lib/ui/navigation/PageTitleNavigation'
import { useRouter } from 'next/router'
import { useCurrentPageView } from '../../navigation/hooks/useCurrentPageView'

const habitsViewName: Record<AppPageHabitsView, string> = {
  my: 'Habits',
  ideas: 'Explore',
}

export const HabitsViewSelector = () => {
  const view = useCurrentPageView('habits')
  const { push } = useRouter()

  return (
    <PageTitleNavigation
      value={view}
      options={appPageViews.habits}
      onChange={(view) => push(getAppPath('habits', view))}
      getOptionName={(option) => habitsViewName[option]}
    />
  )
}
