import { EntityWithId } from '@lib/utils/entities/EntityWithId'

export type PrincipleCategory = EntityWithId & {
  name: string
  emoji: string
}

export const otherPrincipleCategoryId = 'other'

export const otherPrincipleCategory: PrincipleCategory = {
  id: otherPrincipleCategoryId,
  name: 'Other',
  emoji: '❔',
}

export const defaultPrincipleCategories = [otherPrincipleCategory]
