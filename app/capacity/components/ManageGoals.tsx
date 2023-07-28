import { ProjectGoalInput } from 'projects/components/ProjectGoalInput'
import { CurrentProjectProvider } from 'projects/components/ProjectView/CurrentProjectProvider'
import { useProjects } from 'projects/hooks/useProjects'
import { TitledSection } from '@increaser/ui/ui/Layout/TitledSection'
import { Panel } from '@increaser/ui/ui/Panel/Panel'
import { HStack, VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'

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
