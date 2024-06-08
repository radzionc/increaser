export const visionAttributeStatuses = [
  'done',
  'maintainance',
  'inProgress',
  'toDo',
] as const
export type VisionAttributeStatus = (typeof visionAttributeStatuses)[number]

export const visionAttributeStatusNameRecord: Record<
  VisionAttributeStatus,
  string
> = {
  done: 'Done',
  maintainance: 'Maintainance',
  inProgress: 'Working on it',
  toDo: 'To do',
}

export type VisionAttribute = {
  id: string
  order: number
  name: string
  status: VisionAttributeStatus
  imageId?: string | null
}

export type Vision = Record<string, VisionAttribute>

export type VisionAttributeIdea = Pick<VisionAttribute, 'id' | 'name'>

export const visionAttributeIdeas: VisionAttributeIdea[] = [
  {
    id: 'marriage',
    name: 'A strong and loving marriage',
  },
  {
    id: 'family',
    name: 'Having a family and raising children',
  },
  {
    id: 'financial',
    name: 'Financial independence and security',
  },
  {
    id: 'house',
    name: 'Living in my own house',
  },
  {
    id: 'friendships',
    name: 'Strong and meaningful friendships',
  },
  {
    id: 'nature',
    name: 'Living close to nature',
  },
  {
    id: 'work',
    name: 'Fulfilling work with high freedom',
  },
  {
    id: 'fitness',
    name: 'Maintaining a healthy and fit body',
  },
  {
    id: 'wakeup',
    name: 'Wake up naturally, without an alarm',
  },
  {
    id: 'travel',
    name: 'Traveling to new and exciting places',
  },
  {
    id: 'relax',
    name: 'Relaxing and peaceful environment',
  },
  {
    id: 'meals',
    name: 'Enjoying delicious and healthy meals',
  },
  {
    id: 'hobbies',
    name: 'Engaging in creative hobbies',
  },
  {
    id: 'dog',
    name: 'Having a beloved dog',
  },
]
