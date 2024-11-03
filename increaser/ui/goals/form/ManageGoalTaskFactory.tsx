import { RemovableComponentProps } from '@lib/ui/props'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { useCurrentTaskFactory } from '../../taskFactories/CurrentTaskFactoryProvider'
import { useDeleteUserEntityMutation } from '../../userEntity/api/useDeleteUserEntityMutation'
import { GoalLinkedEntity } from './linkedEntity/GoalLinkedEntity'
import { TaskFactoryTitle } from '../../taskFactories/TaskFactoryTitle'
import { PrefixedItemFrame } from '@lib/ui/list/PrefixedItemFrame'
import styled from 'styled-components'
import { takeWholeSpace } from '@lib/ui/css/takeWholeSpace'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { centerContent } from '@lib/ui/css/centerContent'
import { match } from '@lib/utils/match'
import { getColor } from '@lib/ui/theme/getters'

const Prefix = styled.div`
  ${takeWholeSpace};
  ${borderRadius.xs};
  background: ${getColor('foreground')};
  color: ${getColor('textPrimary')};
  text-transform: uppercase;
  ${centerContent};
  font-size: 12px;
`

export const ManageGoalTaskFactory = ({
  onRemove,
}: RemovableComponentProps) => {
  const [, setActiveItemId] = useActiveItemId()
  const { id, cadence } = useCurrentTaskFactory()

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
      <PrefixedItemFrame
        prefixWidth={24}
        prefix={
          <Prefix>
            {match(cadence, {
              day: () => 'd',
              workday: () => 'wd',
              week: () => 'w',
              month: () => 'm',
            })}
          </Prefix>
        }
      >
        <TaskFactoryTitle />
      </PrefixedItemFrame>
    </GoalLinkedEntity>
  )
}
