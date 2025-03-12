import { Match } from '@lib/ui/base/Match'
import { ValueProp } from '@lib/ui/props'
import { HabitsNavigationDecoration } from '@product/ui/habits/navigation/HabitsNavigationDecoration'
import { AppNavigationPage } from '@product/ui/navigation/app'

import { FocusNavigationDecoration } from '../focus/navigation/FocusNavigationDecoration'

import { NavigationToInternalPage } from './Sidebar/NavigationToInternalPage'

export const SidebarNavigationItem = ({
  value,
}: ValueProp<AppNavigationPage>) => {
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
