import { assertUserId } from '../../auth/assertUserId'
import { OperationContext } from '../../gql/OperationContext'
import { getId } from '@increaser/entities-utils/shared/getId'
import { msInSec } from '../../shared/helpers/time'
import { getUser } from '@increaser/db/user'
import { MutationResolvers } from '../../gql/schema'
import { putHabit } from '@increaser/db/habit'
import { Habit, habitDefaultFields } from '@increaser/entities/Habit'

const getNewHabitOrder = async (userId: string) => {
  const { habits } = await getUser(userId)

  if (!habits.length) {
    return 0
  }

  return Math.min(...Object.values(habits).map((habit) => habit.order)) - 1
}

export const createHabit: MutationResolvers['createHabit'] = async (
  _,
  { input },
  context: OperationContext,
): Promise<Habit> => {
  const userId = assertUserId(context)

  const habit: Habit = {
    ...habitDefaultFields,
    ...input,
    startedAt: input.startedAt ?? Math.round(Date.now() / msInSec),
    id: input.id ?? getId(),
    order: input.order ?? (await getNewHabitOrder(userId)),
  }

  await putHabit(userId, habit)

  return habit
}
