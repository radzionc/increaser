import { ComponentWithChildrenProps } from '@increaser/ui/props'
import { FocusNavigation } from './FocusNavigation'
import { Navigation } from 'ui/Navigation'
import { ConditionalUserState } from 'user/components/ConditionalUserState'

export const AppPageLayout = ({ children }: ComponentWithChildrenProps) => {
  const content = <Navigation>{children}</Navigation>

  return (
    <ConditionalUserState
      present={() => <FocusNavigation>{content}</FocusNavigation>}
      missing={() => content}
    />
  )
}
