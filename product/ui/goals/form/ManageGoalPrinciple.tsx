import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { OnRemoveProp } from '@lib/ui/props'

import { useCurrentPrinciple } from '../../principles/CurrentPrincipleProvider'
import { useDeleteUserEntityMutation } from '../../userEntity/api/useDeleteUserEntityMutation'

import { GoalPrincipleItem } from './GoalPrincipleItem'
import { ManageGoalLinkedEntity } from './linkedEntity/ManageGoalLinkedEntity'

export const ManageGoalPrinciple = ({ onRemove }: OnRemoveProp) => {
  const [, setActiveItemId] = useActiveItemId()
  const { id } = useCurrentPrinciple()

  const { mutate: deletePrinciple } = useDeleteUserEntityMutation('principle')

  return (
    <ManageGoalLinkedEntity
      onDelete={() => {
        deletePrinciple(id)
      }}
      onEdit={() => {
        setActiveItemId(id)
      }}
      onUnlink={onRemove}
    >
      <GoalPrincipleItem />
    </ManageGoalLinkedEntity>
  )
}
