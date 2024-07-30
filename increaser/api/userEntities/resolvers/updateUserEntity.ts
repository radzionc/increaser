import { assertUserId } from '../../auth/assertUserId'
import * as userEntitiesDb from '@increaser/db/userEntity'
import { ApiResolver } from '../../resolvers/ApiResolver'
import { processFieldsBeforeUpdate } from '../utils/processFieldsBeforeUpdate'

export const updateUserEntity: ApiResolver<'updateUserEntity'> = async ({
  input: { id, fields: rawFields, entity },
  context,
}) => {
  const userId = assertUserId(context)

  const process = processFieldsBeforeUpdate[entity]
  const fields = process
    ? await process({ userId, id, fields: rawFields as never })
    : rawFields

  const value = userEntitiesDb.updateUserEntity({
    userId,
    entity,
    entityId: id,
    fields,
  })

  return value
}
