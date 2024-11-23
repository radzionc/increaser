import { ComponentWithChildrenProps } from '@lib/ui/props'
import { getStateProviderSetup } from '@lib/ui/state/getStateProviderSetup'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { useMemo } from 'react'
import { useAssertFocusIntervals } from '../../../state/focusIntervals'

export const {
  useState: useCurrentFocusEndTime,
  provider: FocusEndTimeProvider,
} = getStateProviderSetup<number>('CurrentFocusEndTime')

export const CurrentFocusEndTimeProvider = ({
  children,
}: ComponentWithChildrenProps) => {
  const intervals = useAssertFocusIntervals()

  const initialValue = useMemo(
    () => getLastItem(intervals).end ?? Date.now(),
    [intervals],
  )

  return (
    <FocusEndTimeProvider initialValue={initialValue}>
      {children}
    </FocusEndTimeProvider>
  )
}
