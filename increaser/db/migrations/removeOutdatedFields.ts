import { updateItem } from '@lib/dynamodb/updateItem'
import { tableName } from '../tableName'
import { getAllUsers } from '../user'
;(async () => {
  const users = await getAllUsers(['id'])

  await Promise.all(
    users.map(({ id }) => {
      return updateItem({
        tableName: tableName.users,
        key: { id: id },
        fields: {
          accountDeletionEmailSentAt: undefined,
        },
      })
    }),
  )
})()
