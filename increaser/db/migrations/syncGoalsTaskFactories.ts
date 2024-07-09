import { getAllUsers } from '../user'
import { isRecordEmpty } from '@lib/utils/record/isRecordEmpty'
import { syncTaskFactoriesDependantFields } from '@increaser/data-services/taskFactories/syncTaskFactoriesDependantFields'
;(async () => {
  const users = await getAllUsers(['id', 'goals'])

  await Promise.all(
    users.map(({ id, goals }) => {
      if (!isRecordEmpty(goals)) {
        syncTaskFactoriesDependantFields(id)
      }
    }),
  )
})()
