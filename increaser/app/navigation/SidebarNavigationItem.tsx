import { AppNavigationPage } from '@increaser/ui/navigation/app'
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
          decoration={<FocusNavigationDecoration />}
        />
      )}
      info={() => <NavigationToInternalPage value="info" />}
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
