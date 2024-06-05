import { Vision, VisionAttribute } from '@increaser/entities/Vision'
import { getRecord } from '@lib/utils/record/getRecord'

type VisionAttributeDescription = Pick<
  VisionAttribute,
  'name' | 'status' | 'imageUrl'
>

const items: VisionAttributeDescription[] = [
  // {
  //   name: 'A strong marriage',
  //   status: 'maintainance',
  // },
  {
    name: 'Nature is within a walking distance from my house',
    status: 'maintainance',
    imageUrl: '/images/vision/nature.webp',
  },
  // {
  //   name: 'Wake up without an alarm',
  //   status: 'maintainance',
  // },
  {
    name: 'Live in my own house',
    status: 'inProgress',
    imageUrl: '/images/vision/house.webp',
  },
  // {
  //   name: 'No worries about money',
  //   status: 'inProgress',
  // },
  {
    name: 'A fulfilling work with a high level of freedom',
    status: 'inProgress',
    imageUrl: '/images/vision/work.webp',
  },
  // {
  //   name: 'Having kids',
  //   status: 'toDo',
  // },
]

export const getDemoVision = (): Vision => {
  return getRecord(
    items.map((item, order) => ({ ...item, id: item.name, order })),
    (item) => item.id,
  )
}
