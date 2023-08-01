import { VStack } from '@increaser/ui/ui/Stack'
import { useFocus } from 'focus/hooks/useFocus'
import { ComponentWithChildrenProps } from 'shared/props'
import { Navigation } from 'ui/Navigation'
import { FocusNavigationSlice } from './FocusNavigationSlice'

export const EnhancedFocusNavigation = ({
  children,
}: ComponentWithChildrenProps) => {
  const { currentSet } = useFocus()

  if (!currentSet) {
    return <Navigation>{children}</Navigation>
  }

  return (
    <VStack fullHeight>
      <FocusNavigationSlice />
      <Navigation>{children}</Navigation>
    </VStack>
  )
}
