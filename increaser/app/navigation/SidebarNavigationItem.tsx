import { AppNavigationPage } from '@increaser/ui/navigation/app'
import { UserStateOnly } from '../user/state/UserStateOnly'
import { FocusNavigationDecoration } from '@increaser/ui/focus/FocusNavigationDecoration'
import { Match } from '@lib/ui/base/Match'
import { ComponentWithValueProps } from '@lib/ui/props'
import { MembershipNavigationDecoration } from '../membership/components/MembershipNavigationDecoration'
import { NavigationToInternalPage } from './Sidebar/NavigationToInternalPage'

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
      timeTracking={() => <NavigationToInternalPage value="timeTracking" />}
      workBudget={() => <NavigationToInternalPage value="workBudget" />}
      timePlanning={() => <NavigationToInternalPage value="timePlanning" />}
      habits={() => <NavigationToInternalPage value="habits" />}
      tasks={() => <NavigationToInternalPage value="tasks" />}
      schedule={() => <NavigationToInternalPage value="schedule" />}
      vision={() => <NavigationToInternalPage value="vision" />}
      goals={() => <NavigationToInternalPage value="goals" />}
      projects={() => <NavigationToInternalPage value="projects" />}
      community={() => <NavigationToInternalPage value="community" />}
      membership={() => (
        <NavigationToInternalPage
          value="membership"
          decoration={
            <UserStateOnly>
              <MembershipNavigationDecoration />
            </UserStateOnly>
          }
        />
      )}
      account={() => <NavigationToInternalPage value="account" />}
      ideas={() => <NavigationToInternalPage value="ideas" />}
      principles={() => <NavigationToInternalPage value="principles" />}
      roadmap={() => <NavigationToInternalPage value="roadmap" />}
    />
  )
}
