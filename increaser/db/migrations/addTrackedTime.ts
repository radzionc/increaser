import { totalScan } from '@lib/dynamodb/totalScan'
import { tableName } from '../tableName'
import { getPickParams } from '@lib/dynamodb/getPickParams'
import { updateUser } from '../user'
import { Project } from '@increaser/entities/Project'
import { ProjectMonth, ProjectWeek } from '@increaser/entities/timeTracking'
import { makeRecord } from '@lib/utils/record/makeRecord'
import { projectMonthsToTrackedTime } from '@increaser/entities-utils/project/projectMonthsToTrackedTime'
import { projectWeeksToTrackedTime } from '@increaser/entities-utils/project/projectWeeksToTrackedTime'

type OldProject = Project & {
  weeks: ProjectWeek[]
  months: ProjectMonth[]
}

type OldUser = {
  id: string
  projects: OldProject[]
}

const addTrackedTime = async () => {
  const users = await totalScan<OldUser>({
    TableName: tableName.users,
    ...getPickParams(['id', 'projects']),
  })

  await Promise.all(
    users.map((user) => {
      const projectIds = user.projects.map((project) => project.id)
      const projectWeeksRecord = makeRecord(
        projectIds,
        (projectId) =>
          user.projects.find((project) => project.id === projectId)?.weeks ??
          [],
      )
      const projectMonthsRecord = makeRecord(
        projectIds,
        (projectId) =>
          user.projects.find((project) => project.id === projectId)?.months ??
          [],
      )
      const weeks = projectWeeksToTrackedTime(projectWeeksRecord)
      const months = projectMonthsToTrackedTime(projectMonthsRecord)
      return updateUser(user.id, {
        weeks,
        months,
      })
    }),
  )
}

addTrackedTime()
