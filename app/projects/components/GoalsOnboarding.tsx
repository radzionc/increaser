import { ProjectsGoalsVisualization } from 'capacity/components/ProjectsGoalsVisualization'
import { useProjects } from 'projects/hooks/useProjects'
import { useEffect } from 'react'
import { formatDuration } from 'shared/utils/formatDuration'
import { LabeledValue } from '@increaser/ui/ui/LabeledValue'
import { Modal } from '@increaser/ui/ui/Modal'
import { HStack, VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { useWeekTimeAllocation } from 'weekTimeAllocation/hooks/useWeekTimeAllocation'

import { ProjectGoalInput } from './ProjectGoalInput'
import { CurrentProjectProvider } from './ProjectView/CurrentProjectProvider'
import { ContinueButton } from 'ui/ContinueButton'

interface Props {
  onNext: () => void
}

export const GoalsOnboarding = ({ onNext }: Props) => {
  const { activeProjects } = useProjects()
  const { freeMinutes, allocatedMinutes, totalMinutes } =
    useWeekTimeAllocation()

  const projectsWithoutGoal = activeProjects.filter(
    (project) => !project.allocatedMinutesPerWeek,
  )

  useEffect(() => {
    // TODO: a better solution to wait for state update
    if (activeProjects.length < 1) return
  }, [activeProjects, freeMinutes, onNext, projectsWithoutGoal.length])

  const projects = [...activeProjects].sort((a, b) =>
    a.name.localeCompare(b.name),
  )

  return (
    <Modal
      placement="top"
      title={
        <VStack fullWidth gap={16}>
          <VStack gap={4}>
            <Text>Set weekly goals</Text>
            <Text size={16} color="supporting">
              Do you want to work more on some projects?
            </Text>
          </VStack>
          <VStack gap={4}>
            <Text as="div" size={14}>
              <HStack fullWidth justifyContent="space-between">
                <LabeledValue name="Used">
                  {formatDuration(allocatedMinutes, 'min')} /{' '}
                  <Text as="span" color="shy">
                    {formatDuration(totalMinutes, 'min')}
                  </Text>
                </LabeledValue>
                <LabeledValue name="Available">
                  {formatDuration(totalMinutes - allocatedMinutes, 'min')}
                </LabeledValue>
              </HStack>
            </Text>
            <ProjectsGoalsVisualization />
          </VStack>
        </VStack>
      }
      footer={
        <ContinueButton
          onClick={() => {
            onNext()
          }}
        />
      }
      renderContent={() => (
        <VStack gap={8}>
          {projects.map((project) => (
            <CurrentProjectProvider key={project.id} value={project}>
              <ProjectGoalInput />
            </CurrentProjectProvider>
          ))}
        </VStack>
      )}
    />
  )
}
