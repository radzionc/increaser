import { ApiResolver } from '@increaser/api-interface/ApiResolver'
import { assertUserId } from '../../auth/assertUserId'
import { getHabit, updateHabit } from '@increaser/db/habit'

export const trackHabit: ApiResolver<'trackHabit'> = async ({
  input: { id, date, value },
  context,
}) => {
  const userId = assertUserId(context)

  const { successes } = await getHabit(userId, id)

  await updateHabit(userId, id, {
    successes: value
      ? [...successes, date]
      : successes.filter((d) => d !== date),
  })
}
