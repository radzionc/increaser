import { Vision, VisionAttribute } from '@increaser/entities/Vision'
import { getPublicBucketUserFileKey } from '@increaser/public/getPublicBucketUserFileKey'
import { getRecord } from '@lib/utils/record/getRecord'
import { demoConfig } from './config'

type VisionAttributeDescription = Pick<VisionAttribute, 'name' | 'status'> & {
  imageName: string
}

const items: VisionAttributeDescription[] = [
  {
    name: 'Nature is just a short walk away from my house',
    status: 'maintainance',
    imageName: 'nature.webp',
  },
  {
    name: 'A strong marriage',
    status: 'maintainance',
    imageName: 'marriage.webp',
  },
  {
    name: 'Wake up without an alarm',
    status: 'maintainance',
    imageName: 'wakeup.webp',
  },
  {
    name: 'A fulfilling work with a high level of freedom',
    status: 'inProgress',
    imageName: 'office.webp',
  },
  {
    name: 'Live in my own house',
    status: 'inProgress',
    imageName: 'house.webp',
  },
  // {
  //   name: 'No worries about money',
  //   status: 'inProgress',
  // },
  {
    name: 'Having a dog',
    status: 'toDo',
    imageName: 'dog.webp',
  },
]

export const getDemoVision = (): Vision => {
  return getRecord(
    items.map((item, order) => ({
      ...item,
      id: item.name,
      order,
      imageId: getPublicBucketUserFileKey(demoConfig.userId, item.imageName),
    })),
    (item) => item.id,
  )
}
