import { ProjectGoalInput } from 'projects/components/ProjectGoalInput'
import { CurrentProjectProvider } from 'projects/components/ProjectView/CurrentProjectProvider'
import { useProjects } from 'projects/hooks/useProjects'
import { TitledSection } from '@increaser/ui/Layout/TitledSection'
import { Panel } from '@increaser/ui/panel/Panel'
import { HStack, VStack } from '@increaser/ui/layout/Stack'
import { Text } from '@increaser/ui/text'

import { ProjectsGoalsVisualization } from './ProjectsGoalsVisualization'

export const ManageGoals = () => {
  const { activeProjects } = useProjects()

  const projects = [...activeProjects].sort((a, b) => b.total - a.total)

  return (
    <Panel>
      <TitledSection
        title={
          <HStack fullWidth justifyContent="space-between" alignItems="start">
            <VStack gap={4}>
              <HStack gap={8}>
                <Text>Weekly goals</Text>
              </HStack>
            </VStack>
          </HStack>
        }
      >
        <ProjectsGoalsVisualization />
        <VStack gap={8}>
          {projects.map((project) => (
            <CurrentProjectProvider key={project.id} value={project}>
              <ProjectGoalInput />
            </CurrentProjectProvider>
          ))}
        </VStack>
      </TitledSection>
    </Panel>
  )
}
