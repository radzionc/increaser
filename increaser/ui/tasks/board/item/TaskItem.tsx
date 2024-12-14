import { ComponentProps } from 'react'
import styled from 'styled-components'
import { getColor } from '@lib/ui/theme/getters'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { taskBoardConfig } from '../config'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { interactive } from '@lib/ui/css/interactive'
import { TaskPrimaryContent } from '../../TaskPrimaryContent'
import { useCurrentTask } from '../../CurrentTaskProvider'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'

const Container = styled.div`
  background: ${getColor('foreground')};
  padding: ${toSizeUnit(taskBoardConfig.itemHorizontalPadding)};
  ${borderRadius.s};
  ${interactive};
  border: 2px solid transparent;
  line-height: 1.5;

  outline: none;

  &:hover {
    border-color: ${getColor('primary')};
  }
`

type TaskItemProps = ComponentProps<typeof Container>

export const TaskItem = (props: TaskItemProps) => {
  const { id } = useCurrentTask()
  const [, setActiveTaskId] = useActiveItemId()

  return (
    <Container {...props} onClick={() => setActiveTaskId(id)}>
      <TaskPrimaryContent />
    </Container>
  )
}
