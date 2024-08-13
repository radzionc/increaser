import { VStack } from '@lib/ui/layout/Stack'
import styled from 'styled-components'

import { ProjectFilterProvider } from '../projects/filter/ProjectFilterProvider'
import { TasksHeader } from './header/TasksHeader'
import { TaskStatusFilterProvider } from './status/TaskStatusFilter'
import { TasksContent } from './TasksContent'

const TasksContainer = styled(VStack)`
  max-width: 560px;
  width: 100%;
  gap: 32px;
`

export const Tasks = () => {
  return (
    <TaskStatusFilterProvider initialValue="todo">
      <ProjectFilterProvider initialValue={null}>
        <TasksHeader />
        <TasksContainer>
          <TasksContent />
        </TasksContainer>
      </ProjectFilterProvider>
    </TaskStatusFilterProvider>
  )
}
