import { assertUserId } from '../../auth/assertUserId'
import * as userEntitiesDb from '@increaser/db/userEntity'
import { ApiResolver } from '../../resolvers/ApiResolver'
import { processFieldsBeforeUpdate } from '../utils/processFieldsBeforeUpdate'

export const updateUserEntities: ApiResolver<'updateUserEntities'> = async ({
  input: { updates, entity },
  context,
}) => {
  const userId = assertUserId(context)

  const result = await Promise.all(
    updates.map(async ({ id, fields: rawFields }) => {
      const process = processFieldsBeforeUpdate[entity]
      const fields = process
        ? await process({ userId, id, fields: rawFields as never })
        : rawFields

      return userEntitiesDb.updateUserEntity({
        userId,
        entity,
        entityId: id,
        fields,
      })
    }),
  )

  return result
}
