import { VisionAttribute } from '@increaser/entities/Vision'

export type VisionAttributeFormShape = Pick<
  VisionAttribute,
  'name' | 'imageId' | 'emoji'
>
