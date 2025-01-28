import { ChildrenProp } from '@lib/ui/props'
import { getStateProviderSetup } from '@lib/ui/state/getStateProviderSetup'
import { useLastSetEnd } from '@increaser/app/sets/hooks/useLastSetEnd'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'

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
