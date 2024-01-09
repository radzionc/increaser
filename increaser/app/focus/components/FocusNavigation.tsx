import { ComponentWithChildrenProps } from '@lib/ui/props'
import { FocusNavigationSlice } from './FocusNavigationSlice'
import { useFocus } from '@increaser/ui/focus/FocusContext'

export const FocusNavigation = ({ children }: ComponentWithChildrenProps) => {
  const { currentSet } = useFocus()

  return (
    <>
      {currentSet && <FocusNavigationSlice />}
      {children}
    </>
  )
}
