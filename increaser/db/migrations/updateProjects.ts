import { updateItem } from '@lib/dynamodb/updateItem'
import { tableName } from '../tableName'
import { getAllUsers, updateUser } from '../user'
import { Project } from '@increaser/entities/Project'
import { toRecord } from '@lib/utils/record/toRecord'

type OldUser = {
  id: string
  projects: Omit<Project, 'order'>[]
}

const migrate = async () => {
  const users = (await getAllUsers(['id', 'projects'])) as unknown as OldUser[]

  await Promise.all(
    users.map(({ id, projects }) => {
      if (!Array.isArray(projects)) {
        return
      }
      return updateUser(id, {
        projects: toRecord(
          projects.map((project, order) => ({
            ...project,
            order,
          })),
          ({ id }) => id,
        ),
      })
    }),
  )
}

migrate()
