import { Goal, Goals } from '@increaser/entities/Goal'
import { getRecord } from '@lib/utils/record/getRecord'

type GoalDescription = Pick<
  Goal,
  'name' | 'status' | 'emoji' | 'deadlineAt' | 'plan'
>

const items: GoalDescription[] = [
  {
    emoji: '💪',
    name: 'Perform 20 pull-ups in a single set',
    status: 'inProgress',
    deadlineAt: 28,
    plan: 'I will do a 25-minute bodyweight workout every other day.',
  },
  {
    emoji: '💰',
    name: 'Accumulate $500,000 in ETF investments',
    status: 'inProgress',
    deadlineAt: 29,
    plan: 'I will be working as a remote software developer, making at least 150k USD per year.',
  },
  {
    emoji: '🏝️',
    name: 'Own a mortgage-free house near the beach',
    status: 'inProgress',
    deadlineAt: 30,
    plan: `1. Accumulate 300k USD worth of liquid assets.
    2. Move to a low-cost beach town.
    3. Buy a house.`,
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
