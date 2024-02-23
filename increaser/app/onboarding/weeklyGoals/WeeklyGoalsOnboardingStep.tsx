import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { VStack } from '@lib/ui/layout/Stack'
import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'
import { InputContainer } from '@lib/ui/inputs/InputContainer'
import { LabelText } from '@lib/ui/inputs/LabelText'
import { ShyInfoBlock } from '@lib/ui/info/ShyInfoBlock'
import { WeeklyGoalItem } from './WeeklyGoalItem'
import { CreateWeeklyGoalForm } from './CreateWeeklyGoalForm'

export const WeeklyGoalsOnboardingStep = () => {
  const { activeProjects } = useProjects()

  const projectsWithGoals = activeProjects.filter(
    (project) => project.allocatedMinutesPerWeek,
  )

  return (
    <VStack style={{ maxWidth: 400 }} gap={40}>
      <CreateWeeklyGoalForm />
      <InputContainer as="div" style={{ gap: 8 }}>
        <LabelText size={16}>Your weekly goals</LabelText>
        {isEmpty(projectsWithGoals) ? (
          <ShyInfoBlock>
            With which project do you want to be more consistent?
          </ShyInfoBlock>
        ) : (
          <UniformColumnGrid gap={16} minChildrenWidth={240}>
            {projectsWithGoals.map((value) => (
              <WeeklyGoalItem value={value} key={value.id} />
            ))}
          </UniformColumnGrid>
        )}
      </InputContainer>
    </VStack>
  )
}
