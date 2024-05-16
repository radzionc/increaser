import { totalScan } from '@lib/dynamodb/totalScan'
import { tableName } from '../tableName'
import { getPickParams } from '@lib/dynamodb/getPickParams'
import { User } from '@increaser/entities/User'
import { updateUser } from '../user'
import { otherProject } from '@increaser/entities/Project'
import { recordMap } from '@lib/utils/record/recordMap'
import { findBy } from '@lib/utils/array/findBy'

const assignProjectIdToTasks = async () => {
  const users = await totalScan<Pick<User, 'tasks' | 'id' | 'projects'>>({
    TableName: tableName.users,
    ...getPickParams(['id', 'tasks', 'projects']),
  })

  await Promise.all(
    users.map((user) => {
      return updateUser(user.id, {
        tasks: recordMap(user.tasks, (task) => {
          const project = findBy(user.projects, 'id', task.projectId)
          const projectId = project?.id ?? otherProject.id
          return {
            ...task,
            projectId,
          }
        }),
      })
    }),
  )
}

assignProjectIdToTasks()
