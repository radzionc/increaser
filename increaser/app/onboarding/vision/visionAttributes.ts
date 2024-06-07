import { VisionAttribute } from '@increaser/entities/Vision'

export type VisionAttributeDescription = Pick<
  VisionAttribute,
  'name' | 'imageId'
>

export const visionAttributes: VisionAttributeDescription[] = [
  {
    name: 'Nature is just a short walk away from my house',
    imageId: 'vision/nature.webp',
  },
  {
    name: 'A strong marriage',
    imageId: 'vision/marriage.webp',
  },
  {
    name: 'Wake up without an alarm',
    imageId: 'vision/wakeup.webp',
  },
  {
    name: 'A fulfilling work with a high level of freedom',
    imageId: 'vision/office.webp',
  },
  {
    name: 'Live in my own house',
    imageId: 'vision/house.webp',
  },
  {
    name: 'Having a dog',
    imageId: 'vision/dog.webp',
  },
]
