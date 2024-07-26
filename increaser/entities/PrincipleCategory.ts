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
  emoji: '💪',
}

export const marriagePrincipleCategory: PrincipleCategory = {
  id: 'marriage',
  name: 'Marriage',
  emoji: '❤️',
}

export const workPrincipleCategory: PrincipleCategory = {
  id: 'work',
  name: 'Work',
  emoji: '💼',
}

export const financePrincipleCategory: PrincipleCategory = {
  id: 'finance',
  name: 'Finance',
  emoji: '💸',
}

export const mindsetPrincipleCategory: PrincipleCategory = {
  id: 'mindset',
  name: 'Mindset',
  emoji: '💭',
}

export const defaultPrincipleCategories = [
  otherPrincipleCategory,
  healthPrincipleCategory,
  marriagePrincipleCategory,
  workPrincipleCategory,
  financePrincipleCategory,
  mindsetPrincipleCategory,
]
