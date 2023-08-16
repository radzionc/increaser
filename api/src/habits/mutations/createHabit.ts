import gql from 'graphql-tag'
import { assertUserId } from '../../auth/assertUserId'
import { OperationContext } from '../../graphql/OperationContext'
import { getId } from '../../shared/db/getId'
import { msInSec } from '../../shared/helpers/time'
import * as habitsDB from '../db'
import * as usersDB from '../../users/db'
import { defaultHabitProperties, Habit } from '../Habit'

interface Input {
  name: string
  color: number
  emoji: string
  order?: number
}

export const createHabitTypeDefs = gql`
  input CreateHabitInput {
    id: String
    name: String!
    color: Int!
    emoji: String!
    order: Float
    startedAt: Float
  }

  extend type Mutation {
    createHabit(input: CreateHabitInput!): Habit
  }
`

const getNewHabitOrder = async (userId: string) => {
  const { habits } = await usersDB.getUserById(userId)

  if (!habits.length) {
    return 0
  }

  return Math.min(...Object.values(habits).map((habit) => habit.order)) - 1
}

export const createHabit = async (
  _: any,
  { input }: { input: Input },
  context: OperationContext,
): Promise<Habit> => {
  const userId = assertUserId(context)

  const habit: Habit = {
    id: getId(),
    startedAt: Math.round(Date.now() / msInSec),

    ...defaultHabitProperties,
    ...input,

    order: input.order ?? (await getNewHabitOrder(userId)),
  }

  await habitsDB.putHabit(userId, habit)

  return habit
}
