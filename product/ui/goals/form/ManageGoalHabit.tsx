import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { OnRemoveProp } from '@lib/ui/props'

import { HabitItemContent } from '../../habits/components/manage/HabitItemContent'
import { useCurrentHabit } from '../../habits/CurrentHabitProvider'
import { useDeleteUserEntityMutation } from '../../userEntity/api/useDeleteUserEntityMutation'

import { ManageGoalLinkedEntity } from './linkedEntity/ManageGoalLinkedEntity'

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
