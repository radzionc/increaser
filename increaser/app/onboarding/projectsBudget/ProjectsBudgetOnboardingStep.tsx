import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { VStack } from '@lib/ui/layout/Stack'
import { InputContainer } from '@lib/ui/inputs/InputContainer'
import { LabelText } from '@lib/ui/inputs/LabelText'
import { ShyInfoBlock } from '@lib/ui/info/ShyInfoBlock'
import { WeeklyGoalItem } from './WeeklyGoalItem'
import { CreateWeeklyGoalForm } from './CreateWeeklyGoalForm'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { sum } from '@lib/utils/array/sum'
import { ProjectsBudgetVisualization } from '../../projects/budget/ProjectsBudgetVisualization'

export const ProjectsBudgetOnboardingStep = () => {
  const { activeProjects } = useProjects()
  const { weekTimeAllocation } = useAssertUserState()
  const totalMinutesAvailable = sum(weekTimeAllocation)
  const allocatedMinutes = sum(
    activeProjects.map((p) => p.allocatedMinutesPerWeek),
  )

  const projectsWithGoals = activeProjects.filter(
    (project) => project.allocatedMinutesPerWeek,
  )

  return (
    <VStack style={{ maxWidth: 400 }} gap={40}>
      <InputContainer style={{ gap: 8 }} as="div">
        <LabelText size={16}>New weekly goal</LabelText>
        {allocatedMinutes < totalMinutesAvailable ? (
          <CreateWeeklyGoalForm />
        ) : (
          <ShyInfoBlock>You've allocated all your time!</ShyInfoBlock>
        )}
      </InputContainer>
      <InputContainer as="div" style={{ gap: 16 }}>
        <LabelText size={16}>Your weekly goals</LabelText>
        <ProjectsBudgetVisualization />
        {isEmpty(projectsWithGoals) ? (
          <ShyInfoBlock>
            With which project do you want to be more consistent?
          </ShyInfoBlock>
        ) : (
          <VStack gap={8}>
            {projectsWithGoals.map((value) => (
              <WeeklyGoalItem value={value} key={value.id} />
            ))}
          </VStack>
        )}
      </InputContainer>
    </VStack>
  )
}
