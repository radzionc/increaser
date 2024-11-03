import {
  RemovableComponentProps,
  StyledComponentWithColorProps,
} from '@lib/ui/props'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { useCurrentTaskFactory } from '../../taskFactories/CurrentTaskFactoryProvider'
import { useDeleteUserEntityMutation } from '../../userEntity/api/useDeleteUserEntityMutation'
import { GoalLinkedEntity } from './linkedEntity/GoalLinkedEntity'
import { TaskFactoryTitle } from '../../taskFactories/TaskFactoryTitle'
import { PrefixedItemFrame } from '@lib/ui/list/PrefixedItemFrame'
import styled, { useTheme } from 'styled-components'
import { takeWholeSpace } from '@lib/ui/css/takeWholeSpace'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { centerContent } from '@lib/ui/css/centerContent'
import { match } from '@lib/utils/match'
import { coloredTag } from '@lib/ui/css/coloredTag'

const Prefix = styled.div<StyledComponentWithColorProps>`
  ${takeWholeSpace};
  ${borderRadius.xs};
  ${({ $color }) => coloredTag($color)}
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

  const {
    colors: { getLabelColor },
  } = useTheme()

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
          <Prefix
            $color={getLabelColor(
              match(cadence, {
                day: () => 4,
                workday: () => 1,
                week: () => 7,
                month: () => 10,
              }),
            )}
          >
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
