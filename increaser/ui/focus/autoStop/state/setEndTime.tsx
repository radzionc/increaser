import { ComponentWithChildrenProps } from '@lib/ui/props'
import { getStateProviderSetup } from '@lib/ui/state/getStateProviderSetup'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { useUser } from '@increaser/ui/user/state/user'

export const { useState: useSetEndTime, provider: FocusEndTimeProvider } =
  getStateProviderSetup<number>('SetEndTime')

export const SetEndTimeProvider = ({
  children,
}: ComponentWithChildrenProps) => {
  const { sets } = useUser()
  const lastSet = getLastItem(sets)

  return (
    <FocusEndTimeProvider initialValue={lastSet.end}>
      {children}
    </FocusEndTimeProvider>
  )
}
