import { ProjectGoalInput } from '@increaser/app/projects/components/ProjectGoalInput'
import { CurrentProjectProvider } from '@increaser/app/projects/components/ProjectView/CurrentProjectProvider'
import { TitledSection } from '@lib/ui/Layout/TitledSection'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'

import { ProjectsGoalsVisualization } from './ProjectsGoalsVisualization'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { sum } from '@lib/utils/array/sum'
import { useProjects } from '@increaser/ui/projects/ProjectsProvider'

export const ManageGoals = () => {
  const { activeProjects } = useProjects()

  const projects = [...activeProjects].sort((a, b) => b.total - a.total)

  return (
    <>
      <TitledSection
        title={
          <HStack fullWidth justifyContent="space-between" alignItems="center">
            <VStack gap={4}>
              <HStack gap={8}>
                <Text>
                  Weekly goals:{' '}
                  <Text color="regular" as="span">
                    {Math.round(
                      convertDuration(
                        sum(projects.map((p) => p.allocatedMinutesPerWeek)),
                        'min',
                        'h',
                      ),
                    )}
                    h / week
                  </Text>{' '}
                </Text>
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
    </>
  )
}
