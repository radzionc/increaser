import { useFocus } from '@increaser/app/focus/hooks/useFocus'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { FocusNavigationSlice } from './FocusNavigationSlice'

export const FocusNavigation = ({ children }: ComponentWithChildrenProps) => {
  const { currentSet } = useFocus()

  return (
    <>
      {currentSet && <FocusNavigationSlice />}
      {children}
    </>
  )
}
