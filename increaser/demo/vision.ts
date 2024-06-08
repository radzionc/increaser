import {
  Vision,
  VisionAttribute,
  visionAttributeIdeas,
} from '@increaser/entities/Vision'
import { getRecord } from '@lib/utils/record/getRecord'

export const getDemoVision = (): Vision => {
  const items: VisionAttribute[] = visionAttributeIdeas
    .slice(0, 6)
    .map(({ id, name }, order) => ({
      id,
      name,
      status: order < 3 ? 'maintainance' : order < 5 ? 'inProgress' : 'toDo',
      imageId: `vision/${id}.webp`,
      order,
    }))

  return getRecord(items, (item) => item.id)
}
