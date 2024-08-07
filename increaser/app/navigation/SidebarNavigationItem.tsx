import { AppNavigationPage } from '@increaser/ui/navigation/app'
import { UserStateOnly } from '../user/state/UserStateOnly'
import { Match } from '@lib/ui/base/Match'
import { ComponentWithValueProps } from '@lib/ui/props'
import { NavigationToInternalPage } from './Sidebar/NavigationToInternalPage'
import { FocusNavigationDecoration } from '../focus/components/FocusNavigationDecoration'

export const SidebarNavigationItem = ({
  value,
}: ComponentWithValueProps<AppNavigationPage>) => {
  return (
    <Match
      value={value}
      focus={() => (
        <NavigationToInternalPage
          value="focus"
          decoration={
            <UserStateOnly>
              <FocusNavigationDecoration />
            </UserStateOnly>
          }
        />
      )}
      habits={() => <NavigationToInternalPage value="habits" />}
      tasks={() => <NavigationToInternalPage value="tasks" />}
      preferences={() => <NavigationToInternalPage value="preferences" />}
      vision={() => <NavigationToInternalPage value="vision" />}
      goals={() => <NavigationToInternalPage value="goals" />}
      projects={() => <NavigationToInternalPage value="projects" />}
      community={() => <NavigationToInternalPage value="community" />}
      ideas={() => <NavigationToInternalPage value="ideas" />}
      principles={() => <NavigationToInternalPage value="principles" />}
      roadmap={() => <NavigationToInternalPage value="roadmap" />}
    />
  )
}
