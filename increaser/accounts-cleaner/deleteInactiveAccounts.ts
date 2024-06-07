import { getAllUsers, updateUser } from '@increaser/db/user'
import { convertDuration } from '@lib/utils/time/convertDuration'

import { isActiveSubscription } from '@increaser/entities-utils/subscription/isActiveSubscription'
import { deleteUser } from '@increaser/data-services/users/deleteUser'
import { notifyAboutAccountDeletion } from './notifyAboutAccountDeletion'
import { reportError } from '@lib/lambda/reportError'
import {
  deleteInactiveAccountAfter,
  notifyInactiveAccountAfter,
} from '@increaser/config'

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
            lastVisitAt < accountDeletionEmailSentAt &&
            accountDeletionEmailSentAt <
              now -
                convertDuration(
                  deleteInactiveAccountAfter - notifyInactiveAccountAfter,
                  'd',
                  'ms',
                )
          ) {
            console.log(`Deleting user with id: ${id}`)
            await deleteUser(id)
            return
          }

          if (
            !accountDeletionEmailSentAt &&
            convertDuration(now - lastVisitAt, 'ms', 'd') >
              notifyInactiveAccountAfter
          ) {
            console.log(`Notifying user about account deletion: ${email}`)
            await notifyAboutAccountDeletion({ email })
            await updateUser(id, {
              lastVisitAt,
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
