import { Goal, Goals } from '@increaser/entities/Goal'
import { getRecord } from '@lib/utils/record/getRecord'

type GoalDescription = Pick<Goal, 'name' | 'status' | 'emoji'>

const items: GoalDescription[] = [
  {
    emoji: '💰',
    name: 'A 6-figure income',
    status: 'inProgress',
  },
  {
    emoji: '🏡',
    name: 'A house without a mortgage',
    status: 'inProgress',
  },
]

export const getDemoGoals = (): Goals => {
  return getRecord(
    items.map((item, order) => ({
      ...item,
      id: item.name,
      order,
      deadlineAt: 30,
    })),
    (item) => item.id,
  )
}
