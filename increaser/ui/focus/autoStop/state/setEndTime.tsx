import { ComponentWithChildrenProps } from '@lib/ui/props'
import { getStateProviderSetup } from '@lib/ui/state/getStateProviderSetup'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { useAssertUserState } from '../../../user/UserStateContext'

export const { useState: useSetEndTime, provider: FocusEndTimeProvider } =
  getStateProviderSetup<number>('SetEndTime')

export const SetEndTimeProvider = ({
  children,
}: ComponentWithChildrenProps) => {
  const { sets } = useAssertUserState()
  const lastSet = getLastItem(sets)

  return (
    <FocusEndTimeProvider initialValue={lastSet.end}>
      {children}
    </FocusEndTimeProvider>
  )
}
