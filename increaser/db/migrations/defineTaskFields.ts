import { recordMap } from '@lib/utils/record/recordMap'
import { getAllUsers, updateUser } from '../user'

const defineTaskFields = async () => {
  const users = await getAllUsers(['id', 'tasks', 'taskFactories'])

  await Promise.all(
    users.map(({ id, tasks, taskFactories }) =>
      updateUser(id, {
        tasks: recordMap(tasks, (task) => ({
          ...task,
          description: task.description || '',
          links: task.links || [],
          checklist: task.checklist || [],
        })),
        taskFactories: recordMap(taskFactories, (taskFactory) => ({
          ...taskFactory,
          task: {
            ...taskFactory.task,
            description: taskFactory.task.description || '',
            links: taskFactory.task.links || [],
            checklist: taskFactory.task.checklist || [],
          },
        })),
      }),
    ),
  )
}

defineTaskFields()
