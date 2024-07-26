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

export const defaultPrincipleCategories = [otherPrincipleCategory]
