import { assertUserId } from '../../auth/assertUserId'
import { getId } from '@increaser/entities-utils/shared/getId'
import { msInSec } from '../../shared/helpers/time'
import { putHabit } from '@increaser/db/habit'
import { Habit, habitDefaultFields } from '@increaser/entities/Habit'
import { ApiResolver } from '../../resolvers/ApiResolver'

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
  }

  await putHabit(userId, habit)

  return habit
}
