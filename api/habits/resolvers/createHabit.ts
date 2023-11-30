import { assertUserId } from '../../auth/assertUserId'
import { getId } from '@increaser/entities-utils/shared/getId'
import { msInSec } from '../../shared/helpers/time'
import { getUser } from '@increaser/db/user'
import { putHabit } from '@increaser/db/habit'
import { Habit, habitDefaultFields } from '@increaser/entities/Habit'
import { ApiResolver } from '@increaser/api-interface/ApiResolver'

const getNewHabitOrder = async (userId: string) => {
  const { habits } = await getUser(userId)

  if (!habits.length) {
    return 0
  }

  return Math.min(...Object.values(habits).map((habit) => habit.order)) - 1
}

export const createHabit: ApiResolver<'createHabit'> = async ({
  input,
  context,
}): Promise<Habit> => {
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
