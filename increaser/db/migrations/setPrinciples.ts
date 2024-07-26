import { defaultPrincipleCategories } from '@increaser/entities/PrincipleCategory'
import { getAllUsers, updateUser } from '../user'
import { toRecord } from '@lib/utils/record/toRecord'

const setPrinciples = async () => {
  const users = await getAllUsers(['id'])

  await Promise.all(
    users.map(({ id }) =>
      updateUser(id, {
        principles: {},
        principleCategories: toRecord(
          defaultPrincipleCategories,
          ({ id }) => id,
        ),
      }),
    ),
  )
}

setPrinciples()
