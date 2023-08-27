import { assertUserId } from '../../auth/assertUserId'
import { OperationContext } from '../../gql/OperationContext'
import { User } from '../User'
import * as usersDB from '../db'
import { DateTime } from 'luxon'
import { Habit } from '../../habits/Habit'
import gql from 'graphql-tag'
import { organizeTasks } from '../../tasks/services/organizeTasks'
import { organizeWeeks } from '@increaser/data-services/sets/organizeWeeks'
import { organizeMonths } from '@increaser/data-services/sets/organizeMonths'

interface UserStateInput {
  timeZone: number
}

enum MembershipProvider {
  Paddle = 'Paddle',
  AppSumo = 'AppSumo',
}

interface Subscription {
  updateUrl: string
  cancelUrl: string
  subscriptionPlanId: string
  cancellationEffectiveDate?: string
  nextBillDate?: string
  planId: string
}

interface Membership {
  provider: MembershipProvider
  subscription?: Subscription
}

export const userStateTypeDefs = gql`
  type Set {
    start: Float
    end: Float
    projectId: ID
  }

  enum MembershipProvider {
    AppSumo
    Paddle
  }

  type Subscription {
    updateUrl: String
    cancelUrl: String
    planId: String
    cancellationEffectiveDate: String
    nextBillDate: String
  }

  type Membership {
    provider: MembershipProvider!
    subscription: Subscription
  }

  type FocusSound {
    name: String!
    url: String!
    favourite: Boolean
  }

  type Task {
    startedAt: Float
    name: String
    id: String
    isCompleted: Boolean
  }

  type UserState {
    sets: [Set]
    prevSets: [Set]
    projects: [Project]
    id: ID
    isAnonymous: Boolean
    email: String
    name: String
    registrationDate: Float
    freeTrialEnd: Float
    weekTimeAllocation: [Float]
    goalToStartWorkAt: Int
    goalToFinishWorkBy: Int
    goalToGoToBedAt: Int
    membership: Membership
    habits: [Habit]
    primaryGoal: String
    focusSounds: [FocusSound]
    tasks: [Task]
    country: String
  }

  input UserStateInput {
    timeZone: Int
  }

  extend type Query {
    userState(input: UserStateInput!): UserState
  }
`

type UserStateOutput = Pick<
  User,
  | 'sets'
  | 'prevSets'
  | 'projects'
  | 'email'
  | 'id'
  | 'name'
  | 'freeTrialEnd'
  | 'registrationDate'
  | 'weekTimeAllocation'
  | 'goalToStartWorkAt'
  | 'goalToFinishWorkBy'
  | 'goalToGoToBedAt'
  | 'primaryGoal'
  | 'focusSounds'
  | 'isAnonymous'
  | 'country'
> & {
  membership: Membership | null
  habits: Habit[]
}

const getMembership = (user: User): Membership | null => {
  if (user.appSumo) {
    return {
      provider: MembershipProvider.AppSumo,
    }
  }

  if (user.paddle) {
    const {
      update_url: updateUrl,
      cancel_url: cancelUrl,
      subscription_plan_id: subscriptionPlanId,
      status,
      cancellation_effective_date: cancellationEffectiveDate,
      next_bill_date: nextBillDate,
      subscription_plan_id: planId,
    } = user.paddle
    const subscription: Subscription = {
      updateUrl,
      cancelUrl,
      subscriptionPlanId,
      planId,
    }
    if (status === 'deleted' && cancellationEffectiveDate) {
      const [year, month, day] = cancellationEffectiveDate
        .split('-')
        .map(Number)
      const isMembershipLeft =
        DateTime.local(year, month, day) > DateTime.local()
      if (isMembershipLeft) {
        subscription.cancellationEffectiveDate = cancellationEffectiveDate
      }
    }

    if (status !== 'deleted') {
      subscription.nextBillDate = nextBillDate
    }

    return {
      provider: MembershipProvider.Paddle,
      subscription,
    }
  }

  return null
}

export const userState = async (
  _: any,
  { input: { timeZone } }: { input: UserStateInput },
  context: OperationContext,
): Promise<UserStateOutput> => {
  const userId = assertUserId(context)

  await usersDB.updateUser(userId, { timeZone })

  await organizeWeeks(userId)
  await organizeMonths(userId)

  await organizeTasks(userId)

  const user = await usersDB.getUserById(userId)

  return {
    ...user,
    membership: getMembership(user),
    habits: Object.values(user.habits),
  }
}
