import { getStateProviderSetup } from '@lib/ui/state/getStateProviderSetup'

export const {
  useState: useFocusLauncherStartTime,
  provider: FocusLauncherStartTimeProvider,
} = getStateProviderSetup<number | null>('FocusLauncherStartTime')
