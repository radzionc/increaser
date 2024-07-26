import { EntityWithEmoji } from '@lib/utils/entities/EntityWithEmoji'
import { EntityWithId } from '@lib/utils/entities/EntityWithId'
import { EntityWithName } from '@lib/utils/entities/EntityWithName'
import { EntityWithOrder } from '@lib/utils/entities/EntityWithOrder'

export type VisionAttribute = EntityWithId &
  EntityWithOrder &
  EntityWithName &
  EntityWithEmoji & {
    imageId?: string | null
  }

export type Vision = Record<string, VisionAttribute>

export type VisionAttributeIdea = Pick<VisionAttribute, 'id' | 'name' | 'emoji'>

export const visionAttributeIdeas: VisionAttributeIdea[] = [
  {
    id: 'marriage',
    name: 'A strong and loving marriage',
    emoji: '❤️',
  },
  {
    id: 'family',
    name: 'Having a family and raising children',
    emoji: '👨‍👩‍👧‍👦',
  },
  {
    id: 'financial',
    name: 'Financial independence and security',
    emoji: '💰',
  },
  {
    id: 'house',
    name: 'Living in my own house',
    emoji: '🏡',
  },
  {
    id: 'friendships',
    name: 'Strong and meaningful friendships',
    emoji: '🤝',
  },
  {
    id: 'nature',
    name: 'Living close to nature',
    emoji: '🌳',
  },
  {
    id: 'work',
    name: 'Fulfilling work with high freedom',
    emoji: '💼',
  },
  {
    id: 'fitness',
    name: 'A healthy and fit body',
    emoji: '🏋️‍♀️',
  },
  {
    id: 'wakeup',
    name: 'Wake up without an alarm',
    emoji: '🌅',
  },
  {
    id: 'travel',
    name: 'Traveling to new and exciting places',
    emoji: '✈️',
  },
  {
    id: 'relax',
    name: 'Living in a peaceful environment',
    emoji: '🧘‍♂️',
  },
  {
    id: 'meals',
    name: 'Enjoying delicious and healthy meals',
    emoji: '🍽️',
  },
  {
    id: 'hobbies',
    name: 'Engaging in creative hobbies',
    emoji: '🎨',
  },
  {
    id: 'dog',
    name: 'Having a dog',
    emoji: '🐶',
  },
]
