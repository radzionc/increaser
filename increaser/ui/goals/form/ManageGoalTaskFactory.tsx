import { RemovableComponentProps } from '@lib/ui/props'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { useCurrentTaskFactory } from '../../taskFactories/CurrentTaskFactoryProvider'
import { useDeleteUserEntityMutation } from '../../userEntity/api/useDeleteUserEntityMutation'
import { ManageGoalLinkedEntity } from './linkedEntity/ManageGoalLinkedEntity'

import { GoalTaskFactoryItem } from '../GoalTaskFactoryItem'

export const ManageGoalTaskFactory = ({
  onRemove,
}: RemovableComponentProps) => {
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
