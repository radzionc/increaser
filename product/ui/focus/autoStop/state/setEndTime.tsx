import { ChildrenProp } from '@lib/ui/props'
import { getStateProviderSetup } from '@lib/ui/state/getStateProviderSetup'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { useLastSetEnd } from '@product/app/sets/hooks/useLastSetEnd'

export const { useState: useSetEndTime, provider: FocusEndTimeProvider } =
  getStateProviderSetup<number>('SetEndTime')

export const SetEndTimeProvider = ({ children }: ChildrenProp) => {
  const lastSetEnd = shouldBePresent(useLastSetEnd())

  return (
    <FocusEndTimeProvider initialValue={lastSetEnd}>
      {children}
    </FocusEndTimeProvider>
  )
}
