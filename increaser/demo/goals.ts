import { Goal, Goals } from '@increaser/entities/Goal'
import { getRecord } from '@lib/utils/record/getRecord'

type GoalDescription = Pick<Goal, 'name' | 'status'>

const items: GoalDescription[] = [
  {
    name: 'A 6-figure income',
    status: 'inProgress',
  },
  {
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
