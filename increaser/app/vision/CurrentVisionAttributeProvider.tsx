import { VisionAttribute } from '@increaser/entities/Vision'
import { getValueProviderSetup } from '@lib/ui/state/getValueProviderSetup'

export const {
  useValue: useCurrentVisionAttribute,
  provider: CurrentVisionAttributeProvider,
} = getValueProviderSetup<VisionAttribute>('VisionAttribute')
