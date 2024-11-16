import { RemovableComponentProps } from '@lib/ui/props'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { useDeleteUserEntityMutation } from '../../userEntity/api/useDeleteUserEntityMutation'
import { GoalLinkedEntity } from './linkedEntity/GoalLinkedEntity'
import { useCurrentPrinciple } from '../../principles/CurrentPrincipleProvider'
import { GoalPrincipleItem } from './GoalPrincipleItem'

export const ManageGoalPrinciple = ({ onRemove }: RemovableComponentProps) => {
  const [, setActiveItemId] = useActiveItemId()
  const { id } = useCurrentPrinciple()

  const { mutate: deletePrinciple } = useDeleteUserEntityMutation('principle')

  return (
    <GoalLinkedEntity
      onDelete={() => {
        deletePrinciple(id)
      }}
      onEdit={() => {
        setActiveItemId(id)
      }}
      onUnlink={onRemove}
    >
      <GoalPrincipleItem />
    </GoalLinkedEntity>
  )
}
