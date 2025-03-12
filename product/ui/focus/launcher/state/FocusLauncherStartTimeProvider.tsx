import { getStateProviderSetup } from '@lib/ui/state/getStateProviderSetup'

export const {
  useState: useFocusTargetStartTime,
  provider: FocusLauncherStartTimeProvider,
} = getStateProviderSetup<number | null>('FocusLauncherStartTime')
