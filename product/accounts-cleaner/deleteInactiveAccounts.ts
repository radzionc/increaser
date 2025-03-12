import { reportError } from '@lib/lambda/reportError'
import { convertDuration } from '@lib/utils/time/convertDuration'
import {
  deleteInactiveAccountAfter,
  notifyInactiveAccountAfter,
} from '@product/config'
import { deleteUser } from '@product/data-services/users/deleteUser'
import { getAllUsers, updateUser } from '@product/db/user'
import { isActiveSubscription } from '@product/entities-utils/subscription/isActiveSubscription'

import { notifyAboutAccountDeletion } from './notifyAboutAccountDeletion'

export const deleteInactiveAccounts = async () => {
  const users = await getAllUsers([
    'id',
    'email',
    'accountDeletionEmailSentAt',
    'lastVisitAt',
    'lifeTimeDeal',
    'subscription',
    'freeTrialEnd',
  ])
  const now = Date.now()
  await Promise.all(
    users.map(
      async ({
        id,
        email,
        accountDeletionEmailSentAt,
        lastVisitAt,
        subscription,
        lifeTimeDeal,
        freeTrialEnd,
      }) => {
        try {
          if (freeTrialEnd > now) return

          if (lifeTimeDeal) return

          if (subscription && isActiveSubscription(subscription)) return

          if (
            accountDeletionEmailSentAt &&
            lastVisitAt < accountDeletionEmailSentAt
          ) {
            const shouldBeDeletedAt =
              accountDeletionEmailSentAt +
              convertDuration(
                deleteInactiveAccountAfter - notifyInactiveAccountAfter,
                'd',
                'ms',
              )
            if (shouldBeDeletedAt < now) {
              await deleteUser(id)
            }
          } else if (
            convertDuration(now - lastVisitAt, 'ms', 'd') >
            notifyInactiveAccountAfter
          ) {
            await notifyAboutAccountDeletion({ email })
            await updateUser(id, {
              accountDeletionEmailSentAt: now,
            })
          }
        } catch (error) {
          reportError(error, {
            id,
            email,
            msg: 'deleteInactiveAccounts: Failed to handle user',
          })
        }
      },
    ),
  )
}
