import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { OnRemoveProp } from '@lib/ui/props'

import { useDeleteUserEntityMutation } from '../../userEntity/api/useDeleteUserEntityMutation'
import { useCurrentVisionAttribute } from '../../vision/CurrentVisionAttributeProvider'

import { GoalVisionItem } from './GoalVisionItem'
import { ManageGoalLinkedEntity } from './linkedEntity/ManageGoalLinkedEntity'

export const ManageGoalVision = ({ onRemove }: OnRemoveProp) => {
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
