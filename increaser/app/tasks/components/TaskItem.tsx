import { useCurrentTask } from './CurrentTaskProvider'
import { HStack } from '@lib/ui/layout/Stack'
import { ManageTaskDeadline } from './ManageTaskDeadline'
import styled from 'styled-components'
import { CheckStatus } from '@lib/ui/checklist/CheckStatus'
import { InvisibleHTMLCheckbox } from '@lib/ui/inputs/InvisibleHTMLCheckbox'
import { interactive } from '@lib/ui/css/interactive'
import { useUpdateTaskMutation } from '../api/useUpdateTaskMutation'
import { TaskItemFrame } from './TaskItemFrame'
import { EditableTaskName } from './EditableTaskName'
import { DeleteTask } from './DeleteTask'
import { useMedia } from 'react-use'
import { ManageTaskSlideover } from './ManageTaskSlideover'
import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { CalendarIcon } from '@lib/ui/icons/CalendarIcon'
import { Text } from '@lib/ui/text'
import { deadlineName } from '@increaser/entities/Task'

const OnHoverActions = styled.div`
  display: grid;
  grid-template-columns: 60px 36px;
  height: 36px;
  gap: 4px;

  &:not(:focus-within) {
    opacity: 0;
  }
`

const Container = styled(HStack)`
  width: 100%;
  gap: 8px;
  align-items: center;

  &:hover ${OnHoverActions} {
    opacity: 1;
  }
`

const Check = styled(CheckStatus)`
  ${interactive};
`

export const TaskItem = () => {
  const task = useCurrentTask()
  const { completedAt } = task

  const isHoverEnabled = useMedia('(hover: hover) and (pointer: fine)')

  const { mutate: updateTask } = useUpdateTaskMutation()

  const value = !!completedAt

  return (
    <Container>
      <TaskItemFrame>
        <Check isInteractive forwardedAs="label" value={value}>
          <InvisibleHTMLCheckbox
            value={value}
            onChange={() => {
              updateTask({
                id: task.id,
                fields: {
                  completedAt: task.completedAt ? null : Date.now(),
                },
              })
            }}
          />
        </Check>
        <EditableTaskName />
      </TaskItemFrame>
      {isHoverEnabled ? (
        <OnHoverActions>
          <ManageTaskDeadline
            render={({ value, onChange, options }) => (
              <ExpandableSelector
                openerContent={
                  <IconWrapper style={{ fontSize: 18 }}>
                    <CalendarIcon />
                  </IconWrapper>
                }
                floatingOptionsWidthSameAsOpener={false}
                style={{ height: '100%', padding: 8 }}
                value={value}
                onChange={onChange}
                options={options}
                getOptionKey={(option) => option}
                renderOption={(option) => (
                  <Text key={option}>{deadlineName[option]}</Text>
                )}
              />
            )}
          />
          <DeleteTask />
        </OnHoverActions>
      ) : (
        <ManageTaskSlideover />
      )}
    </Container>
  )
}
