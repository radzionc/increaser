import { Goal, Goals } from '@increaser/entities/Goal'
import { toRecord } from '@lib/utils/record/toRecord'

type GoalDescription = Pick<
  Goal,
  | 'name'
  | 'status'
  | 'emoji'
  | 'deadlineAt'
  | 'plan'
  | 'target'
  | 'taskFactories'
>

const items: GoalDescription[] = [
  {
    emoji: '🏢',
    name: 'Own a mortgage-free apartment',
    status: 'done',
    deadlineAt: 25,
    plan: 'I will be working as a remote software developer, making at least $60k per year, saving $40k each year.',
  },
  {
    emoji: '🎥',
    name: 'Have 1,000 subscribers on YouTube',
    status: 'done',
    deadlineAt: 26,
    plan: 'I will post a new video every week.',
    taskFactories: ['upload-video'],
  },
  {
    emoji: '💪',
    name: 'Perform 20 pull-ups in a single set',
    status: 'inProgress',
    deadlineAt: 28,
    plan: 'I will do a 25-minute bodyweight workout every other day.',
  },
  {
    emoji: '💰',
    name: 'Accumulate $500k in ETF investments',
    status: 'inProgress',
    target: {
      value: 500,
      current: 220,
    },
    deadlineAt: 29,
    plan: 'I will be working as a remote software developer, making at least $150k per year, saving $100k each year. I will work on side projects to be a better builder and have more income streams and career opportunities. I will invest in ETFs.',
    taskFactories: ['upload-video', 'jobs', 'invest'],
  },
  {
    emoji: '🏝️',
    name: 'Own a mortgage-free house near the beach',
    status: 'inProgress',
    deadlineAt: 30,
    plan: `1. Accumulate $300k worth of liquid assets.
    2. Move to a low-cost beach town.
    3. Buy a house.`,
  },
]

export const getDemoGoals = (): Goals => {
  return toRecord(
    items.map((item, order) => ({
      ...item,
      id: item.name,
      order,
    })),
    (item) => item.id,
  )
}
