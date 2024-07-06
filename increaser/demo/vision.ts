import {
  Vision,
  VisionAttribute,
  visionAttributeIdeas,
} from '@increaser/entities/Vision'
import { toRecord } from '@lib/utils/record/toRecord'

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

  return toRecord(items, (item) => item.id)
}
