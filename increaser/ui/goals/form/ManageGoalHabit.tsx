import { RemovableComponentProps } from '@lib/ui/props'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { useDeleteUserEntityMutation } from '../../userEntity/api/useDeleteUserEntityMutation'
import { GoalLinkedEntity } from './linkedEntity/GoalLinkedEntity'
import { useCurrentHabit } from '../../habits/CurrentHabitProvider'
import { HabitItemContent } from '../../habits/components/manage/HabitItemContent'

export const ManageGoalHabit = ({ onRemove }: RemovableComponentProps) => {
  const [, setActiveItemId] = useActiveItemId()
  const { id } = useCurrentHabit()

  const { mutate: deleteHabit } = useDeleteUserEntityMutation('habit')

  return (
    <GoalLinkedEntity
      onDelete={() => {
        deleteHabit(id)
      }}
      onEdit={() => {
        setActiveItemId(id)
      }}
      onUnlink={onRemove}
    >
      <HabitItemContent />
    </GoalLinkedEntity>
  )
}
