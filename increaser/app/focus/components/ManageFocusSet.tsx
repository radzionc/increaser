import { VStack } from '@lib/ui/layout/Stack'

import { useCurrentFocus } from '@increaser/ui/focus/CurrentFocusProvider'
import { useProjects } from '@increaser/ui/projects/ProjectsProvider'

import { FocusGoal } from '@increaser/ui/focus/FocusGoal'
import { SessionStartedAt } from '@increaser/ui/focus/SessionStartedAt'
import { CurrentFocusTask } from './CurrentFocusTask'
import { FocusProjectSelector } from './FocusProjectSelector'
import styled from 'styled-components'

const Header = styled.div`
  display: grid;
  grid-template-columns: 80px 80px minmax(0, 1fr);
  gap: 8px;
`

export const ManageFocusSet = () => {
  const { projectId } = useCurrentFocus()

  const { projectsRecord } = useProjects()

  const project = projectsRecord[projectId]
  if (!project) return null

  return (
    <VStack style={{ width: 320 }} fullWidth gap={8}>
      <Header>
        <SessionStartedAt />
        <FocusGoal />
        <FocusProjectSelector />
      </Header>
      <CurrentFocusTask />
    </VStack>
  )
}
