import { totalScan } from '@lib/dynamodb/totalScan'
import { tableName } from '../tableName'
import { getPickParams } from '@lib/dynamodb/getPickParams'
import { updateUser } from '../user'
import { omit } from '@lib/utils/record/omit'
import { Project } from '@increaser/entities/Project'
import { ProjectWeek, ProjectMonth } from '@increaser/entities/timeTracking'

type OldProject = Project & {
  weeks: ProjectWeek[]
  months: ProjectMonth[]
}

type OldUser = {
  id: string
  projects: OldProject[]
}

const removeOutdatedFields = async () => {
  const users = await totalScan<OldUser>({
    TableName: tableName.users,
    ...getPickParams(['id', 'projects']),
  })

  await Promise.all(
    users.map((user) => {
      return updateUser(user.id, {
        projects: user.projects.map((project) =>
          omit(project, 'weeks', 'months'),
        ),
      })
    }),
  )
}

removeOutdatedFields()
