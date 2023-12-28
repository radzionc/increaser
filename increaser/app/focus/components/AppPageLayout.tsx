import { ComponentWithChildrenProps } from '@lib/ui/props'
import { FocusNavigation } from './FocusNavigation'
import { Navigation } from '@increaser/app/ui/Navigation'
import { ConditionalUserState } from '@increaser/app/user/components/ConditionalUserState'

export const AppPageLayout = ({ children }: ComponentWithChildrenProps) => {
  const content = <Navigation>{children}</Navigation>

  return (
    <ConditionalUserState
      present={() => <FocusNavigation>{content}</FocusNavigation>}
      missing={() => content}
    />
  )
}
