import { getValueProviderSetup } from '@lib/ui/state/getValueProviderSetup'
import { VisionAttribute } from '@product/entities/Vision'

export const {
  useValue: useCurrentVisionAttribute,
  provider: CurrentVisionAttributeProvider,
} = getValueProviderSetup<VisionAttribute>('VisionAttribute')
