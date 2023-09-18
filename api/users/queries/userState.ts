import { assertUserId } from '../../auth/assertUserId'
import { OperationContext } from '../../gql/OperationContext'
import { DateTime } from 'luxon'
import { organizeTasks } from '../../tasks/services/organizeTasks'
import { organizeWeeks } from '@increaser/data-services/sets/organizeWeeks'
import { organizeMonths } from '@increaser/data-services/sets/organizeMonths'
import { QueryResolvers } from '../../gql/schema'
import { getUserById, updateUser } from '@increaser/db/user'
import { User } from '@increaser/entities/User'
import {
  Membership,
  MembershipProvider,
  Subscription,
} from '@increaser/entities/Membership'

const getMembership = (user: User): Membership | undefined => {
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

  return undefined
}

export const userState: QueryResolvers['userState'] = async (
  _,
  { input: { timeZone } },
  context: OperationContext,
) => {
  const userId = assertUserId(context)

  await updateUser(userId, { timeZone })

  await organizeWeeks(userId)
  await organizeMonths(userId)

  await organizeTasks(userId)

  const user = await getUserById(userId)

  return {
    ...user,
    membership: getMembership(user),
    habits: Object.values(user.habits),
  }
}
