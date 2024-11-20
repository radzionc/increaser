import { RemovableComponentProps } from '@lib/ui/props'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { useDeleteUserEntityMutation } from '../../userEntity/api/useDeleteUserEntityMutation'
import { ManageGoalLinkedEntity } from './linkedEntity/ManageGoalLinkedEntity'
import { GoalVisionItem } from './GoalVisionItem'
import { useCurrentVisionAttribute } from '../../vision/CurrentVisionAttributeProvider'

export const ManageGoalVision = ({ onRemove }: RemovableComponentProps) => {
  const [, setActiveItemId] = useActiveItemId()
  const { id } = useCurrentVisionAttribute()

  const { mutate: deleteVision } = useDeleteUserEntityMutation('principle')

  return (
    <ManageGoalLinkedEntity
      onDelete={() => {
        deleteVision(id)
      }}
      onEdit={() => {
        setActiveItemId(id)
      }}
      onUnlink={onRemove}
    >
      <GoalVisionItem />
    </ManageGoalLinkedEntity>
  )
}
