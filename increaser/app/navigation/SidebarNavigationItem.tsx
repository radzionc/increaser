import { AppNavigationPage } from '@increaser/ui/navigation/app'
import { Match } from '@lib/ui/base/Match'
import { ComponentWithValueProps } from '@lib/ui/props'
import { NavigationToInternalPage } from './Sidebar/NavigationToInternalPage'
import { HabitsNavigationDecoration } from '@increaser/ui/habits/navigation/HabitsNavigationDecoration'
import { FocusNavigationDecoration } from '../focus/navigation/FocusNavigationDecoration'

export const SidebarNavigationItem = ({
  value,
}: ComponentWithValueProps<AppNavigationPage>) => {
  return (
    <Match
      value={value}
      focus={() => (
        <NavigationToInternalPage
          value="focus"
          decoration={<FocusNavigationDecoration />}
        />
      )}
      info={() => <NavigationToInternalPage value="info" />}
      habits={() => (
        <NavigationToInternalPage
          value="habits"
          decoration={<HabitsNavigationDecoration />}
        />
      )}
      timesheet={() => <NavigationToInternalPage value="timesheet" />}
      tasks={() => <NavigationToInternalPage value="tasks" />}
      vision={() => <NavigationToInternalPage value="vision" />}
      goals={() => <NavigationToInternalPage value="goals" />}
      projects={() => <NavigationToInternalPage value="projects" />}
      community={() => <NavigationToInternalPage value="community" />}
      principles={() => <NavigationToInternalPage value="principles" />}
      roadmap={() => <NavigationToInternalPage value="roadmap" />}
    />
  )
}
