import { Goal, Goals } from '@increaser/entities/Goal'
import { recordFromItems } from '@lib/utils/record/recordFromItems'
import { DemoHabit } from './habits'

type GoalDescription = Pick<
  Goal,
  | 'name'
  | 'status'
  | 'emoji'
  | 'deadlineAt'
  | 'plan'
  | 'target'
  | 'taskFactories'
  | 'habits'
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
    name: 'Achieve an Athletic Build',
    status: 'inProgress',
    deadlineAt: 27,
    plan: 'Engage in daily workouts combining strength training and cardio exercises to build muscle and reduce body fat. Maintain a balanced diet rich in protein and essential nutrients to support muscle growth. Ensure adequate rest and sleep for recovery and overall health.',
    habits: [DemoHabit.Exercise, DemoHabit.Fasting, DemoHabit.WalkAfterDinner],
  },
  {
    emoji: '💰',
    name: 'Accumulate $500k in ETF Investments',
    status: 'inProgress',
    target: {
      value: 500,
      current: 220,
    },
    deadlineAt: 28,
    plan: 'I will be working as a remote software developer, making at least $150k per year, saving $100k each year. I will work on side projects to be a better builder and have more income streams and career opportunities. I will invest in ETFs.',
    taskFactories: ['upload-video', 'jobs', 'invest'],
  },
  {
    emoji: '🏝️',
    name: 'Own a Mortgage-Free Beach House',
    status: 'inProgress',
    deadlineAt: 29,
    plan: `1. Accumulate $300k worth of liquid assets.\n2. Move to a low-cost beach town.\n3. Buy a house.`,
    taskFactories: ['invest'],
  },
]

export const getDemoGoals = (): Goals => {
  return recordFromItems(
    items.map((item, order) => ({
      ...item,
      id: item.name,
      order,
    })),
    (item) => item.id,
  )
}
