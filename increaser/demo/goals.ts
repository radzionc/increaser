import { Goal, Goals } from '@increaser/entities/Goal'
import { getRecord } from '@lib/utils/record/getRecord'

type GoalDescription = Pick<Goal, 'name' | 'status' | 'emoji' | 'deadlineAt'>

const items: GoalDescription[] = [
  {
    emoji: '💪',
    name: 'Perform 20 pull-ups in a single set',
    status: 'inProgress',
    deadlineAt: 28,
  },
  {
    emoji: '💰',
    name: 'Accumulate $500,000 in ETF investments',
    status: 'inProgress',
    deadlineAt: 29,
  },
  {
    emoji: '🏡',
    name: 'Own a mortgage-free home',
    status: 'inProgress',
    deadlineAt: 30,
  },
]

export const getDemoGoals = (): Goals => {
  return getRecord(
    items.map((item, order) => ({
      ...item,
      id: item.name,
      order,
    })),
    (item) => item.id,
  )
}
