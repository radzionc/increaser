import { OnRemoveProp } from '@lib/ui/props'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { useDeleteUserEntityMutation } from '../../userEntity/api/useDeleteUserEntityMutation'
import { ManageGoalLinkedEntity } from './linkedEntity/ManageGoalLinkedEntity'
import { useCurrentHabit } from '../../habits/CurrentHabitProvider'
import { HabitItemContent } from '../../habits/components/manage/HabitItemContent'

export const ManageGoalHabit = ({ onRemove }: OnRemoveProp) => {
  const [, setActiveItemId] = useActiveItemId()
  const { id } = useCurrentHabit()

  const { mutate: deleteHabit } = useDeleteUserEntityMutation('habit')

  return (
    <ManageGoalLinkedEntity
      onDelete={() => {
        deleteHabit(id)
      }}
      onEdit={() => {
        setActiveItemId(id)
      }}
      onUnlink={onRemove}
    >
      <HabitItemContent />
    </ManageGoalLinkedEntity>
  )
}
