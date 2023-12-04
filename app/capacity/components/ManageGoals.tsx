import { ProjectGoalInput } from 'projects/components/ProjectGoalInput'
import { CurrentProjectProvider } from 'projects/components/ProjectView/CurrentProjectProvider'
import { useProjects } from 'projects/hooks/useProjects'
import { TitledSection } from '@increaser/ui/Layout/TitledSection'
import { HStack, VStack } from '@increaser/ui/layout/Stack'
import { Text } from '@increaser/ui/text'

import { ProjectsGoalsVisualization } from './ProjectsGoalsVisualization'
import { useBoolean } from '@increaser/ui/hooks/useBoolean'
import { CollapseToggleButton } from '@increaser/ui/buttons/CollapseToggleButton'
import { convertDuration } from '@increaser/utils/time/convertDuration'
import { sum } from '@increaser/utils/array/sum'

export const ManageGoals = () => {
  const { activeProjects } = useProjects()

  const projects = [...activeProjects].sort((a, b) => b.total - a.total)
  const [isExpanded, { toggle }] = useBoolean(false)

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
            <CollapseToggleButton onClick={toggle} isOpen={isExpanded} />
          </HStack>
        }
      >
        <ProjectsGoalsVisualization />
        {isExpanded && (
          <VStack gap={8}>
            {projects.map((project) => (
              <CurrentProjectProvider key={project.id} value={project}>
                <ProjectGoalInput />
              </CurrentProjectProvider>
            ))}
          </VStack>
        )}
      </TitledSection>
    </>
  )
}
