import { VisionAttribute } from '@increaser/entities/Vision'

export type VisionAttributeFormShape = Pick<
  VisionAttribute,
  'name' | 'status' | 'imageId'
>
