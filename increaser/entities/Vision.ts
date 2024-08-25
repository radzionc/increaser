import { EntityWithEmoji } from '@lib/utils/entities/EntityWithEmoji'
import { EntityWithId } from '@lib/utils/entities/EntityWithId'
import { EntityWithName } from '@lib/utils/entities/EntityWithName'
import { EntityWithOrder } from '@lib/utils/entities/EntityWithOrder'

export type VisionAttribute = EntityWithId &
  EntityWithOrder &
  EntityWithName &
  EntityWithEmoji & {
    description?: string | null
    imageId?: string | null
  }

export type Vision = Record<string, VisionAttribute>

export type VisionAttributeIdea = Pick<
  VisionAttribute,
  'id' | 'name' | 'emoji' | 'description'
>

export const visionAttributeIdeas: VisionAttributeIdea[] = [
  {
    id: 'marriage',
    name: 'A strong and loving marriage',
    emoji: '❤️',
    description: 'A committed partnership filled with love and support.',
  },
  {
    id: 'family',
    name: 'Having a family and raising children',
    emoji: '👨‍👩‍👧‍👦',
    description: 'Building a nurturing home with a loving family.',
  },
  {
    id: 'financial',
    name: 'Financial independence and security',
    emoji: '💰',
    description: 'Achieving stability and freedom through financial success.',
  },
  {
    id: 'house',
    name: 'Living in my own house',
    emoji: '🏡',
    description: 'Owning a comfortable and welcoming home.',
  },
  {
    id: 'friendships',
    name: 'Strong and meaningful friendships',
    emoji: '🤝',
    description: 'Maintaining deep and supportive relationships with friends.',
  },
  {
    id: 'nature',
    name: 'Living close to nature',
    emoji: '🌳',
    description: 'Residing in harmony with the natural environment.',
  },
  {
    id: 'work',
    name: 'Fulfilling work with high freedom',
    emoji: '💼',
    description: 'Engaging in purposeful work with autonomy and flexibility.',
  },
  {
    id: 'fitness',
    name: 'A healthy and fit body',
    emoji: '🏋️‍♀️',
    description:
      'Cultivating physical health and fitness through regular exercise.',
  },
  {
    id: 'wakeup',
    name: 'Wake up without an alarm',
    emoji: '🌅',
    description: 'Rising naturally each morning, well-rested and energized.',
  },
  {
    id: 'travel',
    name: 'Traveling to new and exciting places',
    emoji: '✈️',
    description: 'Exploring diverse cultures and landscapes around the world.',
  },
  {
    id: 'relax',
    name: 'Living in a peaceful environment',
    emoji: '🧘‍♂️',
    description: 'Enjoying a serene and tranquil living space.',
  },
  {
    id: 'meals',
    name: 'Enjoying delicious and healthy meals',
    emoji: '🍽️',
    description: 'Savoring nutritious and flavorful food every day.',
  },
  {
    id: 'hobbies',
    name: 'Engaging in creative hobbies',
    emoji: '🎨',
    description: 'Pursuing passions that inspire creativity and joy.',
  },
  {
    id: 'dog',
    name: 'Having a dog',
    emoji: '🐶',
    description: 'Caring for a loyal and loving canine companion.',
  },
]
