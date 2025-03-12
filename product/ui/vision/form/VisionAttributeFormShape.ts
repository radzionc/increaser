import { VisionAttribute } from '@product/entities/Vision'

export type VisionAttributeFormShape = Pick<
  VisionAttribute,
  'name' | 'imageId' | 'emoji'
> & {
  description: string | null
}
