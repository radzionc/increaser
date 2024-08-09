import { getStateProviderSetup } from '@lib/ui/state/getStateProviderSetup'
import { IntervalEditorControl } from '@lib/ui/timeline/IntervalEditorControl'

export const { useState: useActiveControl, provider: ActiveControlProvider } =
  getStateProviderSetup<IntervalEditorControl | null>('ActiveControl')
