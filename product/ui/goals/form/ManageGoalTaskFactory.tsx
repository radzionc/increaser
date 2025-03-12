import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { OnRemoveProp } from '@lib/ui/props'

import { useCurrentTaskFactory } from '../../taskFactories/CurrentTaskFactoryProvider'
import { useDeleteUserEntityMutation } from '../../userEntity/api/useDeleteUserEntityMutation'
import { GoalTaskFactoryItem } from '../GoalTaskFactoryItem'

import { ManageGoalLinkedEntity } from './linkedEntity/ManageGoalLinkedEntity'

export const ManageGoalTaskFactory = ({ onRemove }: OnRemoveProp) => {
  const [, setActiveItemId] = useActiveItemId()
  const { id } = useCurrentTaskFactory()

  const { mutate: deleteTaskFactory } =
    useDeleteUserEntityMutation('taskFactory')

  return (
    <ManageGoalLinkedEntity
      onDelete={() => {
        deleteTaskFactory(id)
      }}
      onEdit={() => {
        setActiveItemId(id)
      }}
      onUnlink={onRemove}
    >
      <GoalTaskFactoryItem />
    </ManageGoalLinkedEntity>
  )
}
