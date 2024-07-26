import { EntityWithEmoji } from '@lib/utils/entities/EntityWithEmoji'
import { EntityWithId } from '@lib/utils/entities/EntityWithId'
import { EntityWithName } from '@lib/utils/entities/EntityWithName'

export type PrincipleCategory = EntityWithId & EntityWithName & EntityWithEmoji

export const otherPrincipleCategoryId = 'other'

export const otherPrincipleCategory: PrincipleCategory = {
  id: otherPrincipleCategoryId,
  name: 'Other',
  emoji: '❔',
}

export const healthPrincipleCategory: PrincipleCategory = {
  id: 'health',
  name: 'Health',
  emoji: '🏥',
}

export const relationshipsPrincipleCategory: PrincipleCategory = {
  id: 'relationships',
  name: 'Relationships',
  emoji: '💑',
}

export const workPrincipleCategory: PrincipleCategory = {
  id: 'work',
  name: 'Work',
  emoji: '💼',
}

export const financePrincipleCategory: PrincipleCategory = {
  id: 'finance',
  name: 'Finance',
  emoji: '💰',
}

export const defaultPrincipleCategories = [
  otherPrincipleCategory,
  {
    id: 'health',
    name: 'Health',
    emoji: '💪',
  },
  {
    id: 'relationships',
    name: 'Relationships',
    emoji: '❤️',
  },
  {
    id: 'work',
    name: 'Work',
    emoji: '💼',
  },
  {
    id: 'finance',
    name: 'Finance',
    emoji: '💰',
  },
]
