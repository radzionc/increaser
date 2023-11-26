import { ProjectsGoalsVisualization } from 'capacity/components/ProjectsGoalsVisualization'
import { useProjects } from 'projects/hooks/useProjects'
import { useEffect } from 'react'
import { formatDuration } from '@increaser/utils/time/formatDuration'
import { LabeledValue } from '@increaser/ui/text/LabeledValue'
import { Modal } from '@increaser/ui/modal'
import { HStack, VStack } from '@increaser/ui/layout/Stack'
import { Text } from '@increaser/ui/text'
import { useWeekTimeAllocation } from 'weekTimeAllocation/hooks/useWeekTimeAllocation'

import { ProjectGoalInput } from './ProjectGoalInput'
import { CurrentProjectProvider } from './ProjectView/CurrentProjectProvider'
import { ContinueButton } from 'ui/ContinueButton'
import { ClosableComponentProps } from '@increaser/ui/props'

interface Props extends ClosableComponentProps {
  onNext: () => void
}

export const GoalsOnboarding = ({ onNext, onClose }: Props) => {
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
      onClose={onClose}
      placement="top"
      subTitle="Do you want to work more on some projects?"
      title="Set weekly goal"
      footer={<ContinueButton onClick={onNext} />}
    >
      <VStack gap={20}>
        <VStack gap={4}>
          <Text as="div" size={14}>
            <HStack fullWidth justifyContent="space-between">
              <LabeledValue name="Used">
                {formatDuration(allocatedMinutes, 'min', { maxUnit: 'h' })} /{' '}
                <Text as="span" color="shy">
                  {formatDuration(totalMinutes, 'min', { maxUnit: 'h' })}
                </Text>
              </LabeledValue>
              <LabeledValue name="Available">
                {formatDuration(totalMinutes - allocatedMinutes, 'min', {
                  maxUnit: 'h',
                })}
              </LabeledValue>
            </HStack>
          </Text>
          <ProjectsGoalsVisualization />
        </VStack>

        <VStack gap={8}>
          {projects.map((project) => (
            <CurrentProjectProvider key={project.id} value={project}>
              <ProjectGoalInput />
            </CurrentProjectProvider>
          ))}
        </VStack>
      </VStack>
    </Modal>
  )
}
