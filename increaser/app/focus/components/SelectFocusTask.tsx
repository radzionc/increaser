import { getDeadlineStatus } from '@increaser/entities-utils/task/getDeadlineStatus'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { HStack } from '@lib/ui/layout/Stack'
import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'
import { getColor } from '@lib/ui/theme/getters'
import { order } from '@lib/utils/array/order'
import { useMemo } from 'react'
import styled from 'styled-components'
import { CheckSquareIcon } from '@lib/ui/icons/CheckSquareIcon'
import { useFocus } from '@increaser/ui/focus/FocusContext'
import { Text } from '@lib/ui/text'
import { useCurrentFocus } from '@increaser/ui/focus/CurrentFocusProvider'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { useProjects } from '@increaser/ui/projects/ProjectsProvider'

const IconContainer = styled(IconWrapper)`
  color: ${getColor('textShy')};
`

export const SelectFocusTask = () => {
  const { projectId } = useCurrentFocus()
  const { updateTask } = useFocus()
  const { tasks } = useAssertUserState()
  const { projectsRecord } = useProjects()
  const options = useMemo(() => {
    return order(
      Object.values(tasks).filter(
        (task) =>
          task.projectId === projectId &&
          !task.completedAt &&
          ['overdue', 'today'].includes(
            getDeadlineStatus({ ...task, now: Date.now() }),
          ),
      ),
      (task) => task.order,
      'asc',
    )
  }, [projectId, tasks])

  if (!options.length) {
    return (
      <Text size={14} color="supporting">
        You don't have any tasks for today with "
        {projectsRecord[projectId].name}" assigned
      </Text>
    )
  }

  return (
    <ExpandableSelector
      style={{ width: '100%' }}
      openerContent={
        <HStack gap={8} alignItems="center">
          <IconContainer>
            <CheckSquareIcon />
          </IconContainer>
          Select a "{projectsRecord[projectId].name}" task
        </HStack>
      }
      getOptionKey={(task) => task.id}
      renderOption={(task) => (
        <Text style={{ maxWidth: 280 }} cropped>
          {task.name}
        </Text>
      )}
      onChange={({ id }) => {
        updateTask({
          id: id,
          startedAt: Date.now(),
        })
      }}
      value={null}
      options={options}
    />
  )
}
