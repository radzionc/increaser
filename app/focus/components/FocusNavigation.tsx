import { useFocus } from 'focus/hooks/useFocus'
import { ComponentWithChildrenProps } from '@increaser/ui/props'
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
