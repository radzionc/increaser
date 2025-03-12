import { recordFromItems } from '@lib/utils/record/recordFromItems'
import {
  Vision,
  VisionAttribute,
  visionAttributeIdeas,
} from '@product/entities/Vision'

export const getDemoVision = (): Vision => {
  const items: VisionAttribute[] = visionAttributeIdeas.map(
    ({ id, name, emoji, description }, order) => ({
      id,
      name,
      status: order < 3 ? 'maintainance' : order < 5 ? 'inProgress' : 'toDo',
      imageId: `vision/${id}.webp`,
      order,
      emoji,
      description,
    }),
  )

  return recordFromItems(items, (item) => item.id)
}
