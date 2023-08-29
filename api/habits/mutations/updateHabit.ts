import { assertUserId } from '../../auth/assertUserId'
import { OperationContext } from '../../gql/OperationContext'
import * as habitsDB from '@increaser/db/habit'
import { MutationResolvers } from '../../gql/schema'
import { Habit } from '@increaser/entities/Habit'

export const updateHabit: MutationResolvers['updateHabit'] = async (
  _,
  { input },
  context: OperationContext,
) => {
  const userId = assertUserId(context)

  const { id, ...fields } = input

  const habit = habitsDB.updateHabit(userId, id, fields as Partial<Habit>)

  return habit
}
