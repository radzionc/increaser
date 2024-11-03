import { RemovableComponentProps } from '@lib/ui/props'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { useCurrentTaskFactory } from '../../taskFactories/CurrentTaskFactoryProvider'
import { useDeleteUserEntityMutation } from '../../userEntity/api/useDeleteUserEntityMutation'
import { TaskFactoryItemContent } from '../../taskFactories/TaskFactoryItemContent'
import { GoalLinkedEntity } from './linkedEntity/GoalLinkedEntity'

export const ManageGoalTaskFactory = ({
  onRemove,
}: RemovableComponentProps) => {
  const [, setActiveItemId] = useActiveItemId()
  const { id } = useCurrentTaskFactory()

  const { mutate: deleteTaskFactory } =
    useDeleteUserEntityMutation('taskFactory')

  return (
    <GoalLinkedEntity
      onDelete={() => {
        deleteTaskFactory(id)
      }}
      onEdit={() => {
        setActiveItemId(id)
      }}
      onUnlink={onRemove}
    >
      <TaskFactoryItemContent />
    </GoalLinkedEntity>
  )
}
